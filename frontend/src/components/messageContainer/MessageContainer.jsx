import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import useMessages from '../../zustand/useMessages'
import useEndConversation from '../../hooks/useEndConversation'
import VotingContainer from '../voting/VotingContainer'
import MessageCounter from './MessageCounter'


const MessageContainer = () => {
  const {isComplete} = useMessages();

  useEndConversation();

  return (
    <div className='flex h-screen w-full pt-12 flex-col'>
      <>
      <MessageCounter/>
      {isComplete ? (<VotingContainer/>) : ('')}
        <Messages/>
        <MessageInput disabled={isComplete}/>
      </>
    </div>
  )
}

export default MessageContainer;
