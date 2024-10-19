import {Server} from 'socket.io'
import { createServer } from 'node:http';
import express from 'express'
import sendBotMessage from '../chatbot/chatbot.js'

const app = express();
const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

const userSocketMap = {}; //(userID: socketID)

const waitingUserSocketMap = {};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

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
    });

    socket.on('startConversation', (authUserId) => {
        console.log("got startConversation", authUserId);
        const num = 2; // getRandomInt(3);
        console.log(num);

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
            delete waitingUserSocketMap[partnerId]; // Reset waiting user
          } else {
            // Set the current user as waiting
            waitingUserSocketMap[authUserId] = socket.id;
          }

    });

    socket.on("newMessage", (message) => {
        if(message.receiverId === "6d9e71b3-7f1b-4b11-9807-48f4cc09de25"){
            sendBotMessage(message, userSocketMap[message.senderId]);
        }else{
            io.to(userSocketMap[message.receiverId]).emit("newMessage", message);
        }
    });
});

export {app,io,server};
