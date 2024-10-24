import {Server} from 'socket.io'
import { createServer } from 'node:http';
import express from 'express'
import sendBotMessage from '../chatbot/chatbot.js'
import getRandomInt from '../utils/getRandomInt.js'
import { sendToSupabase } from '../supabaseServer/supabaseServer.js';

const app = express();
const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

const userSocketMap = {}; //(userID: socketID)

const waitingUserSocketMap = {}; //(userID: socketID)

const timeouts = {} //(userID : timeout)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

io.on('connection', (socket) => {
    console.log("A user connected", socket.id)

    const userId = socket.handshake.query.userId;

    if(userId != "undefined") userSocketMap[userId] = socket.id;

    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        if(waitingUserSocketMap[userId]){
            delete waitingUserSocketMap[userId];
        }
        if(timeouts[userId]){
            delete timeouts[userId];
        }
    });

    socket.on('startConversation', (authUserId) => {
        const num = getRandomInt(3);
        if(num === 2){
            const delay = getRandomInt(10);
            setTimeout(() => {
                io.to(socket.id).emit("paired", {id: "6d9e71b3-7f1b-4b11-9807-48f4cc09de25", userType: "bot"});
            }, 1000*delay);
        }
        else if (Object.keys(waitingUserSocketMap).length != 0) {
            // Pair the two users
            const partnerId = Object.keys(waitingUserSocketMap)[0];;
            io.to(socket.id).emit("paired", {id: partnerId, userType: "person"});
            io.to(waitingUserSocketMap[partnerId]).emit("paired", {id: authUserId, userType: "person"});
            delete waitingUserSocketMap[partnerId]; 
          } else {
            // Set the current user as waiting
            waitingUserSocketMap[authUserId] = socket.id;
          }

    });

    socket.on("newMessage", (message) => {
        sendToSupabase(message.senderId, message.receiverId, message.message, (messageEntry, convId) => {
            io.to(userSocketMap[message.senderId]).emit("newMessage", messageEntry, convId);
            if(message.receiverId === "6d9e71b3-7f1b-4b11-9807-48f4cc09de25"){
                if(timeouts[message.senderId]){
                    clearTimeout(timeouts[message.senderId]);
                    delete timeouts[message.senderId];
                }

                const delay = getRandomInt(5);
                const timeoutId = setTimeout(() => {
                    sendBotMessage(message, userSocketMap[message.senderId]);
                }, 1500*delay);

                timeouts[message.senderId] = timeoutId;
            }else{
                io.to(userSocketMap[message.receiverId]).emit("newMessage", messageEntry, convId);
            }
        });
    });
});

export {app,io,server};
