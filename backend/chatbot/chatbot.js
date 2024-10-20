import OpenAI from "openai";
import { io } from "../socket/socket.js";
import dotenv from "dotenv"
import { supabase } from "../supabaseServer/supabaseServer.js";
import getRandomInt from "../utils/getRandomInt.js";

dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const sendBotMessage = async (message, socketID) => {

    const conversationMessages = await getMessages(message);

    console.log(conversationMessages);
    
    let formattedMessages = [{ role: "system", content: "You are another random person someone is talking to for the first time. Please use incorrect grammar, misspellings and slang when appropriate.  Also, do not ask a question in every message and keep message length varied between short and long messages." }];

    formattedMessages = formattedMessages.concat(conversationMessages.map((m) => ({
        role: m.senderId === "6d9e71b3-7f1b-4b11-9807-48f4cc09de25" ? "assistant" : "user",
        content: m.message
    })));

    console.log(formattedMessages);

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: formattedMessages
    });
    
    console.log(completion.choices[0].message);

    const finalMessage = await sendToSupabase(message.receiverId, message.senderId, completion.choices[0].message.content);

    const delay = getRandomInt(5);
    setTimeout(() => {
        io.to(socketID).emit("newMessage", finalMessage);
    }, 1000*delay);

}

const getMessages = async (message) => {

    try {
        const {data,error} = await supabase.from('conversations').select('messages').contains('participants', [message.receiverId, message.senderId]);
        if(error) throw new Error(error.message);

        if(data.length > 0){
          const result = await supabase.from('messages').select().in('id', data[0].messages);
          if(result.error) throw new Error(result.error.message);
          return result.data;
        }else{
          return [];
        }
    } catch (error) {
        console.log(error.message);
    }

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