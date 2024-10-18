import {Server} from 'socket.io'
import { createServer } from 'node:http';
import express from 'express'


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
            delete waitingUserSocketMap[partnerId];
        }
    });

    socket.on('startConversation', (authUserId) => {
        console.log("got startConversation", authUserId);

        if (Object.keys(waitingUserSocketMap).length != 0) {
            // Pair the two users
            const partnerId = Object.keys(waitingUserSocketMap)[0];;
            io.to(socket.id).emit("paired", partnerId);
            io.to(waitingUserSocketMap[partnerId]).emit("paired", authUserId);
            delete waitingUserSocketMap[partnerId]; // Reset waiting user
          } else {
            // Set the current user as waiting
            waitingUserSocketMap[authUserId] = socket.id;
          }

    });

    socket.on("newMessage", (message) => {
        io.to(userSocketMap[message.receiverId]).emit("newMessage", message);
    });
});

export {app,io,server};
