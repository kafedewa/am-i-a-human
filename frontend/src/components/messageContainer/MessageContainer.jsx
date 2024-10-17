import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { useConversationContext } from '../../context/ConversationContext';


const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversationContext();  
  /*
  useEffect(() => {
    //cleanup function 
    return () => setSelectedConversation(null);
  }, [setSelectedConversation])*/

  return (
    <div className='flex h-screen w-full pt-24 flex-col'>
      <>
        <Messages/>
        <MessageInput/>
      </>
    </div>
  )
}

export default MessageContainer;
