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
    <div className='px-4 flex-1 overflow-auto'>
        {!loading && messages.length > 0 && messages.map((message) => (
          <div key={message.id} ref={lastMessageRef}>
            <Message message={message}/>
          </div>
        ))}

        {loading && [...Array(3)].map((_,idx) => <MessageSkeleton key={idx}/>)}

        {!loading && messages.length === 0 && (
          <div className="flex flex-1 h-full overflow-auto px-4 py-4 rounded-lg">
          <h3 className='text-5xl items-center justify-center font-semibold text-center'>
            <span>Send a message to start the conversation</span>
          </h3>
          </div>
        )} 
    </div>
  )
}

export default Messages