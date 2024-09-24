import React from 'react'
import PastChatsTable from '../../components/pastChatsTable/PastChatsTable'

const WaitingRoom = () => {
  return (
    <div>

        <div className='flex flex-col items-center'>
            <h1 className='text-6xl font-semibold text-black'>
                <span >Welcome, TODO Name!</span>
            </h1>
            <h3 className='text-lg text-center mt-4 text-black'>
                <span>Click below to chat with another.</span>
            </h3>
            <h3 className='text-lg text-center text-black'>
                <span> In 10 messages, your chat will be over and you will need to decide “Am I human?”</span>
            </h3>
            <button className="btn btn-outline mt-10">Chat Now</button>

            <h1 className='text-4xl mt-10 font-semibold text-black'>
                <span >Past Chats</span>
            </h1>

            <PastChatsTable/>
        </div>


    </div>
  )
}

export default WaitingRoom