import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useSocketContext } from '../context/SocketContext';
import { useConversationContext } from '../context/ConversationContext';
import { useNavigate } from 'react-router-dom';
import useMessages from '../zustand/useMessages';

const useStartConversation = () => {
    const [loading,setLoading] = useState(false);
    const {setConversation} = useConversationContext();
    const {setIsComplete} = useMessages();
    const {authUser} = useAuthContext();
    const {socket} = useSocketContext();
    const navigate = useNavigate();

    const startConversation = async () => {
        setLoading(true);
        try {
            setIsComplete(false);
            setConversation(null);
            socket.emit('startConversation', authUser.id);

            socket.on("paired", (partner) => {
                setConversation(partner);
              });
            
        } catch (error) {
            
        }finally{
            setLoading(false);
            navigate('/chat')
        }
    }

  return {startConversation, loading}
}

export default useStartConversation