import React, { useEffect, useMemo } from 'react'
import {useSocketContext} from '../context/SocketContext'
import notificationSound from '../assets/sounds/notification.mp3'
import { useConversationContext } from '../context/ConversationContext'
import useMessages from '../zustand/useMessages'

const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages, setIsComplete} = useMessages();
    const {conversation} = useConversationContext();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages,newMessage]);
            console.log(messages.length);
            if((messages.length + 1) >= 4){
                setIsComplete(true);
            }
            if(newMessage.senderId === conversation.id){
                const sound = new Audio(notificationSound);
                sound.play();
            }
        })
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
}

export default useListenMessages