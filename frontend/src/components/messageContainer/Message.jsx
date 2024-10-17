import React from 'react'
import {useAuthContext} from '../../context/AuthContext'
import {useConversationContext} from '../../context/ConversationContext'
import { extractTime } from '../../../../backend/utils/extractTime';
import filledIcon from '../../assets/person-square-fill-svgrepo-com.svg'
import unfilledIcon from '../../assets/person-square-svgrepo-com.svg'

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {conversation} = useConversationContext();

  const fromMe = message.senderId === authUser.id;
  const formattedTime = extractTime(message.created_at);
  const pic = fromMe ? filledIcon : unfilledIcon;
  const bubbleBgColor = fromMe ? 'bg-black' : 'bg-white';
  const bubbleTxtColor = fromMe ? 'text-white' : 'text-black';

  return (
    <div className={`chat w-full chat-start`}>
        <div className="chat-image w-8 avatar placeholder">
            <img src={pic}/>
        </div>
        <div className={`chat-bubble border ${bubbleTxtColor} ${bubbleBgColor}`}>{message.message} </div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message