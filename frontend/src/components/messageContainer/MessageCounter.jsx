import React from 'react'
import useMessages from '../../zustand/useMessages'

const MessageCounter = () => {
    const {messages} = useMessages();

  return (
    <div className='flex mt-4 text-lg text-black items-center justify-center w-full'>
        Messages sent: {messages.length} / 20
    </div>
  )
}

export default MessageCounter