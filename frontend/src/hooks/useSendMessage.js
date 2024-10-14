import React, { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast';
import {supabase} from '../supabaseClient'
import { useAuthContext } from '../context/AuthContext';

const useSendMessage = () => {
  const [loading,setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConversation();
  const {authUser} = useAuthContext();

  const sendMessage = async (message) => {
    setLoading(true)
    try {

        let participants = [authUser.sub, selectedConversation.id].sort();
        let conversation = await supabase.from('conversations').select().contains('participants', participants);

        if(conversation.data.length === 0){
            conversation = await supabase.from('conversations').insert({
                participants: participants
            }).select();
        }

        const { data, error } = await supabase.from('messages').insert({
            receiverId: selectedConversation.id,
            senderId: authUser.sub,
            message
        }).select();

        if(conversation.data[0].messages){
            conversation.data[0].messages.push(data[0].id);
        } else conversation.data[0].messages = [data[0].id];


        conversation = await supabase.from('conversations').update({
            messages: conversation.data[0].messages
        }).contains('participants', [authUser.sub, selectedConversation.id]).select();

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