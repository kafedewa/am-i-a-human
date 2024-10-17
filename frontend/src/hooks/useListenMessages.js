import React, { useEffect, useMemo } from 'react'
import {useSocketContext} from '../context/SocketContext'
import notificationSound from '../assets/sounds/notification.mp3'
import { useConversationContext } from '../context/ConversationContext'
import useMessages from '../zustand/useMessages'

const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useMessages();
    const {selectedConversation} = useConversationContext();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notificationSound);
            sound.play();
            if(newMessage.senderId === selectedConversation.id){
                setMessages([...messages,newMessage]);
            }
        })
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
}

export default useListenMessages