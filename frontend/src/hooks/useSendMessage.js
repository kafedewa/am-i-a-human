import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {supabase} from '../supabaseClient'
import { useAuthContext } from '../context/AuthContext';
import { useSocketContext } from '../context/SocketContext';
import useMessages from '../zustand/useMessages';
import { useConversationContext } from '../context/ConversationContext';

const useSendMessage = () => {
  const [loading,setLoading] = useState(false);
  const {messages, setMessages} = useMessages();
  const {authUser} = useAuthContext();
  const {socket} = useSocketContext();
  const {conversation} = useConversationContext();

  const sendMessage = async (message) => {
    setLoading(true)
    try {
        console.log(conversation)

        let participants = [authUser.id, conversation.id].sort();
        let s_conversation = await supabase.from('conversations').select().contains('participants', participants);

        if(s_conversation.data.length === 0){
            s_conversation = await supabase.from('conversations').insert({
                participants: participants
            }).select();
        }

        const { data, error } = await supabase.from('messages').insert({
            receiverId: conversation.id,
            senderId: authUser.id,
            message
        }).select();

        if(s_conversation.data[0].messages){
            s_conversation.data[0].messages.push(data[0].id);
        } else s_conversation.data[0].messages = [data[0].id];


        s_conversation = await supabase.from('conversations').update({
            messages: s_conversation.data[0].messages
        }).contains('participants', [authUser.id, conversation.id]).select();

        socket.emit("newMessage", data[0]);

        if(error){
            throw new Error(error.message)
        }

        setMessages([...messages,data[0]])

    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    }finally{
        setLoading(false)
    }
  }
  return {sendMessage, loading}
}

export default useSendMessage