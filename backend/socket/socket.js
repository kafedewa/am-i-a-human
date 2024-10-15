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

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; //(userID: socketID)

io.on('connection', (socket) => {
    console.log("A user connected", socket.id)

    const userId = socket.handshake.query.userId;

    if(userId != "undefined") userSocketMap[userId] = socket.id;

    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
    })

    socket.on("newMessage", (message) => {
        io.to(userSocketMap[message.receiverId]).emit("newMessage", message);
    });
});

export {app,io,server};
