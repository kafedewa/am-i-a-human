import OpenAI from "openai";
import { io } from "../socket/socket.js";
import dotenv from "dotenv"
import { supabase } from "../supabaseServer/supabaseServer.js";

dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const sendBotMessage = async (message, socketID) => {

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Write a haiku about recursion in programming.",
            },
        ],
    });
    
    console.log(completion.choices[0].message);

    const finalMessage = await sendToSupabase(message.receiverId, message.senderId, completion.choices[0].message.content);

    io.to(socketID).emit("newMessage", finalMessage);

}

const sendToSupabase = async (senderId, receiverId, messageContent) => {
    try {
        let participants = [senderId, receiverId].sort();
        let s_conversation = await supabase.from('conversations').select().contains('participants', participants);

        console.log(s_conversation);
        if(s_conversation.data.length === 0){
            s_conversation = await supabase.from('conversations').insert({
                participants: participants
            }).select();
            console.log("in if 1");
        }

        const { data, error } = await supabase.from('messages').insert({
            receiverId,
            senderId,
            message : messageContent
        }).select();

        console.log(data);
        if(s_conversation.data[0].messages){
            s_conversation.data[0].messages.push(data[0].id);
        } else s_conversation.data[0].messages = [data[0].id];


        s_conversation = await supabase.from('conversations').update({
            messages: s_conversation.data[0].messages
        }).contains('participants', participants).select();

        if(error){
            throw new Error(error.message)
        }

        return data[0];

    } catch (error) {
        console.log(error.message)
    }
}

export default sendBotMessage;