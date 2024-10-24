import OpenAI from "openai";
import { io } from "../socket/socket.js";
import dotenv from "dotenv"
import { sendToSupabase, getMessages } from "../supabaseServer/supabaseServer.js";
import getRandomInt from "../utils/getRandomInt.js";

dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const sendBotMessage = async (message, socketID) => {

    const conversationMessages = await getMessages(message);

    if(conversationMessages.length >= 20){
        return;
    }
    
    let formattedMessages = [{ role: "system", content: "You are another random person someone is talking to for the first time. Feel free to occasionally use incorrect grammar, misspellings and slang when appropriate.  Do not ask a question in every message and keep message length varied between short and long messages, preferring short messages." }];

    formattedMessages = formattedMessages.concat(conversationMessages.map((m) => ({
        role: m.senderId === "6d9e71b3-7f1b-4b11-9807-48f4cc09de25" ? "assistant" : "user",
        content: m.message,
        max_tokens: 50
    })));

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: formattedMessages
    });

    const finalMessage = await sendToSupabase(message.receiverId, message.senderId, completion.choices[0].message.content);

    for(let i = 0; i < socketID.length; i++){
        io.to(socketID[i]).emit("newMessage", finalMessage);
    }

}

export default sendBotMessage;