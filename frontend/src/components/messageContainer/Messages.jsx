import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/messageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const {messages, loading} = useGetMessages();
  const lastMessageRef = useRef();
  useListenMessages();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
    }, 100)
    
  },[messages])

  return (
    <div className='flex flex-col h-full w-full overflow-auto px-4 py-4 rounded-lg'>
        {!loading && messages.length > 0 && messages.map((message) => (
          <div className='w-full' key={message.id} ref={lastMessageRef}>
            <Message message={message}/>
          </div>
        ))}

        {!loading && messages.length === 0 && (
          <div className="flex flex-1 h-full w-full items-center justify-center overflow-auto px-4 py-4 rounded-lg">
          <h3 className='text-3xl font-semibold  text-black text-center'>
            <span>Send a message to start the conversation</span>
          </h3>
          </div>
        )} 
    </div>
  )
}

export default Messages