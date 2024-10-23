import React from 'react'
import useMessages from '../../zustand/useMessages'

const MessageCounter = () => {
    const {messages} = useMessages();

  return (
    <div className='flex pt-6 items-center justify-center w-full'>
        Messages sent: {messages.length} / 20
    </div>
  )
}

export default MessageCounter