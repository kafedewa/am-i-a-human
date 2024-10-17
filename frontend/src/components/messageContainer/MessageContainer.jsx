import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';


const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();  
  
  useEffect(() => {
    //cleanup function 
    return () => setSelectedConversation(null);
  }, [setSelectedConversation])

  return (
    <div className='flex h-screen items-center justify-between pt-24 flex-col'>
      <>
        <Messages/>
        <MessageInput/>
      </>
    </div>
  )
}

export default MessageContainer;
