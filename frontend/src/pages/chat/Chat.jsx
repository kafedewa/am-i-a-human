import React from 'react'
import MessageContainer from '../../components/messageContainer/MessageContainer'
import LogoutButton from '../../components/buttons/LogoutButton'
import { useConversationContext } from '../../context/ConversationContext'
import Matching from '../../components/matching/Matching'
import icon from '../../assets/back-svgrepo-com.svg'

const handleGoBack = () => {
  window.history.back();
};

const Chat = () => {
  const { conversation } = useConversationContext();

  return (
    <div className="flex flex-col h-dvh w-screen">
      <div className="navbar flex fixed bg-white top-0 left-0 right-0">
        <h1 className="text-5xl font-semibold text-black flex-1 top-0 justify-center">Chat</h1>
        <div className="fixed top-6 right-6">
          <LogoutButton />
        </div>
        <div className="fixed top-6 left-6">
          <div className='tooltip tooltip-bottom' data-tip='Back'>
          <button className='w-6 h-6 text-black cursor-pointer' onClick={handleGoBack}><img src={icon} /></button>
          </div>
        </div>
      </div>

      {/* Adjust top padding to account for fixed navbar height */}
      {
        conversation ?
          (<div className="flex flex-col">
            <div className="flex-1 rounded-lg">
              <MessageContainer />
            </div>
          </div>)
          :
          (<div className="flex flex-col">
            <div className="flex-1 rounded-lg">
              <Matching />
            </div>
          </div>)
      }

    </div>)
}

export default Chat