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
		origin: ["https://am-i-a-human.onrender.com"],
		methods: ["GET", "POST"],
	},
});

const userSocketMap = {}; //(userID: [socketID])

const waitingUsers= [];

const activeConversations = {}; // (userID : {partnerID, userType})

const timeouts = {} //(userID : timeout)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

io.on('connection', (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;

    if(userId != "undefined"){
        if(userSocketMap[userId]){
            userSocketMap[userId].push(socket.id);
        } else{
            userSocketMap[userId] = [socket.id];
        }
        
    }

    socket.on("disconnect", ()=>{

        if(userSocketMap[userId].length > 1){
            const idxToRemove = userSocketMap[userId].indexOf(socket.id);
            if(idxToRemove > -1){
                userSocketMap[userId].splice(idxToRemove,1);
            }
        } else{
            delete userSocketMap[userId];

            const waitingUserToRemove = waitingUsers.indexOf(userId);
            if(waitingUserToRemove > -1){
                waitingUsers.splice(waitingUserToRemove, 1);
            }

            if(activeConversations[userId]){
                delete activeConversations[userId];
            }

            if(timeouts[userId]){
                delete timeouts[userId];
            }
        }
    });

    socket.on('startConversation', (authUserId) => {
        const num = getRandomInt(3);

        if(activeConversations[authUserId]){
            io.to(socket.id).emit("paired", activeConversations[authUserId]);
        } 
        else if(num === 2){
            const delay = getRandomInt(10);
            setTimeout(() => {
                activeConversations[authUserId] =  {id: "6d9e71b3-7f1b-4b11-9807-48f4cc09de25", userType: "bot"};
                for(let i = 0; i < userSocketMap[userId].length; i++){
                    io.to(userSocketMap[userId][i]).emit("paired", {id: "6d9e71b3-7f1b-4b11-9807-48f4cc09de25", userType: "bot"});
                }             
            }, 1000*delay);
        }
        else if (waitingUsers.length != 0 && waitingUsers[0] != userId) {
            // Pair the two users
            const partnerId = waitingUsers[0];
            waitingUsers.shift(); 

            activeConversations[userId] =  {id: partnerId, userType: "person"};
            activeConversations[partnerId] =  {id: authUserId, userType: "person"};

            for(let i = 0; i < userSocketMap[userId].length; i++){
                io.to(userSocketMap[userId][i]).emit("paired", {id: partnerId, userType: "person"});
            }
            for(let i = 0; i < userSocketMap[partnerId].length; i++){
                io.to(userSocketMap[partnerId][i]).emit("paired", {id: authUserId, userType: "person"});
            }

          } else {
            // Set the current user as waiting
            if(waitingUsers.indexOf(userId) === -1){
                waitingUsers.push(userId);
             }

            setTimeout(() => {
                if(waitingUsers.indexOf(userId) > -1){
                    waitingUsers.splice(waitingUsers.indexOf(userId), 1);
                    activeConversations[authUserId] =  {id: "6d9e71b3-7f1b-4b11-9807-48f4cc09de25", userType: "bot"};
                    for(let i = 0; i < userSocketMap[userId].length; i++){
                        io.to(userSocketMap[userId][i]).emit("paired", {id: "6d9e71b3-7f1b-4b11-9807-48f4cc09de25", userType: "bot"});
                    }
                }
            }, 30000);

        }
            
    });

    socket.on("newMessage", (message) => {
        sendToSupabase(message.senderId, message.receiverId, message.message, (messageEntry, convId) => {
            for(let i = 0; i < userSocketMap[message.senderId].length; i++){
                io.to(userSocketMap[message.senderId][i]).emit("newMessage", messageEntry, convId);
            }
            if(message.receiverId === "6d9e71b3-7f1b-4b11-9807-48f4cc09de25"){
                if(timeouts[message.senderId]){
                    clearTimeout(timeouts[message.senderId]);
                    delete timeouts[message.senderId];
                }

                const delay = getRandomInt(5);
                const timeoutId = setTimeout(() => {
                    sendBotMessage(message, userSocketMap[message.senderId]);
                }, 1500*(delay + 2));

                timeouts[message.senderId] = timeoutId;
            }else{
                for(let i = 0; i < userSocketMap[message.receiverId].length; i++){
                    io.to(userSocketMap[message.receiverId][i]).emit("newMessage", messageEntry, convId);
                }
            }
        });
    });

    socket.on("endConversation", (authUserId) => {
        if(activeConversations[authUserId]){
            delete activeConversations[authUserId];
        }
    })
});

export {app,io,server};
