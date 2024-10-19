import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useSocketContext } from '../context/SocketContext';
import { useConversationContext } from '../context/ConversationContext';
import { useNavigate } from 'react-router-dom';

const useStartConversation = () => {
    const [loading,setLoading] = useState(false);
    const {conversation, setConversation} = useConversationContext();
    const {authUser} = useAuthContext();
    const {socket} = useSocketContext();
    const navigate = useNavigate();

    const startConversation = async () => {
        setLoading(true);
        try {
            socket.emit('startConversation', authUser.id);

            socket.on("paired", (partner) => {
                setConversation(partner);
                console.log(`Paired with ${partner.id}`);
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