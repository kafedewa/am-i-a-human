import { useEffect } from 'react'
import {useSocketContext} from '../context/SocketContext'
import notificationSound from '../assets/sounds/notification.mp3'
import { useConversationContext } from '../context/ConversationContext'
import useMessages from '../zustand/useMessages'

const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages, setIsComplete, setConvId} = useMessages();
    const {conversation} = useConversationContext();

    useEffect(() => {
        socket?.on("newMessage", (newMessage, convId) => {
            if(convId){
                setConvId(convId);
            }
            setMessages([...messages,newMessage]);

            if((messages.length + 1) >= 20){
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