import React, { useState } from 'react'
import {BsSend} from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const {loading, sendMessage} = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!message) return;
    await sendMessage(message)
    setMessage("")
  }

  return (
    <form className='w-full bottom-0 pb-4' onSubmit={handleSubmit}>
        <div className=' relative w-full'>
            <input type="text" 
                className='border text-sm rounded-lg block w-full pr-10 p-2.5 text-black'
                placeholder='Send a message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}/>
            <button type='submit' className='absolute inset-y-0 end-0 right-0 pr-3 flex items-center pe-3'>
              {
                         !loading ? (<BsSend/>) : (<span className='loading loading-spinner'/>)
                     }
            </button>
                
        </div>


    </form>
  )
}

export default MessageInput