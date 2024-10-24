import React from 'react'
import PastChatsTable from '../../components/pastChatsTable/PastChatsTable'
import { useAuthContext } from '../../context/AuthContext'
import { Link, redirect } from 'react-router-dom';
import LogoutButton from '../../components/buttons/LogoutButton';
import useStartConversation from '../../hooks/useStartConversation';
import { useConversationContext } from '../../context/ConversationContext';
import useMessages from '../../zustand/useMessages';

const Home = () => {
    const {authUser} = useAuthContext();
    const {startConversation, loading}  = useStartConversation();
    const {conversation} = useConversationContext();
    const {isComplete} = useMessages();

    const handleClick = async (e) => {
        e.preventDefault();
        await startConversation();
    }

  return (
    <div className="flex flex-col items-center h-screen w-screen">
        <div className="navbar flex w-screen top-0 left-0 right-0">
            <div className="fixed top-6 right-6">
                <LogoutButton />
            </div>
      </div>
        <div className='flex flex-col w-screen h-screen overflow-auto items-center justify-center'>
            <h1 className='flex text-center text-5xl font-semibold text-black'>
                <span>Welcome, {authUser.fullName}!</span>
            </h1>
            <h3 className='flex text-lg text-center text-black mt-4'>
                <span>Click below to chat with another. In 20 messages, your chat will be over and you'll need to decide “Was that a person or a bot?”</span>
            </h3>
            {conversation && !isComplete ? (
                <Link to='/chat'>
                    <button className="btn btn-outline mt-10" >Return to Chat</button>
                </Link>
            ) 
            : (<button className="btn btn-outline mt-10" onClick={handleClick}>Chat Now</button>)}
            

            <PastChatsTable/>
        </div>

    </div>
  )
}

export default Home