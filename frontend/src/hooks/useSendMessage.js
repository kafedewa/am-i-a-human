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

        socket.emit("newMessage", {
          senderId : authUser.id,
          receiverId: conversation.id,
          message
        });

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