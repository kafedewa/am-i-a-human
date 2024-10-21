import React, { useEffect, useMemo } from 'react'
import {useSocketContext} from '../context/SocketContext'
import notificationSound from '../assets/sounds/notification.mp3'
import { useConversationContext } from '../context/ConversationContext'
import useMessages from '../zustand/useMessages'

const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useMessages();
    const {conversation} = useConversationContext();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            console.log("in listent messages", newMessage)
            setMessages([...messages,newMessage]);
            if(newMessage.senderId === conversation.id){
                const sound = new Audio(notificationSound);
                sound.play();
            }
        })
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
}

export default useListenMessages