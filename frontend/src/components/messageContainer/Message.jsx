import React from 'react'
import {useAuthContext} from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../../../backend/utils/extractTime';

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();

  const fromMe = message.senderId === authUser.sub;
  const formattedTime = extractTime(message.created_at);
  const chatClassname = fromMe ? 'chat-end' : 'chat-start';
  const picName = fromMe ? authUser.fullName : selectedConversation.fullname;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : '';

  return (
    <div className={`chat ${chatClassname}`}>
        <div className="chat-image avatar placeholder">
            <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-xs">{picName[0]}</span>
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message} </div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message