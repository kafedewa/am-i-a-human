import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({conversation, lastIdx}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?.id === conversation.id;
    const {onlineUsers} = useSocketContext();

  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}>
        <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-xs">{conversation.fullname[0]}</span>
            </div>
        </div>
        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>{conversation.fullname}</p>
            </div>
        </div>
    </div>
    {!lastIdx && <div className='divider my-0 py-0 h-1'></div>}
    </>
  )
}

export default Conversation