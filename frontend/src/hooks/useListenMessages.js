import React, { useEffect } from 'react'
import {useSocketContext} from '../context/SocketContext'
import useConversation from '../zustand/useConversation'
import notificationSound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notificationSound);
            sound.play();
            console.log(newMessage);
            if(newMessage.senderId === selectedConversation.id){
                setMessages([...messages,newMessage]);
            }
        })
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
}

export default useListenMessages