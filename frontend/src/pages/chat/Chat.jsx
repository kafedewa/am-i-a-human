import React from 'react'
import MessageContainer from '../../components/messageContainer/MessageContainer'
import LogoutButton from '../../components/sidebar/LogoutButton'

const Chat = () => {
  return (<div className="flex flex-col h-screen">
    <div className="navbar flex fixed top-0 left-0 right-0 bg-base-100 z-10">
      <h1 className="text-8xl flex-1 top-0 justify-center">Chat</h1>
      <div className="fixed right-4">
        <LogoutButton />
      </div>
    </div>
    
    {/* Adjust top padding to account for fixed navbar height */}
    <div className="flex-col">
      <div className="flex-1 object-contain rounded-lg">
        <MessageContainer />
      </div>
    </div>
  </div>)
}

export default Chat