import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path, { dirname } from 'path'
import {app, server} from './socket/socket.js'

dotenv.config();

const PORT = process.env.PORT || 5100;

const __dirname = path.resolve();

app.use(express.json()); // to parse incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req,res) =>{
    const __dirname = path.resolve();
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

server.listen(PORT,() => {

    console.log('Server running on port ' + PORT);

});