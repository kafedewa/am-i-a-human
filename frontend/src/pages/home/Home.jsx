import React from 'react'
import PastChatsTable from '../../components/pastChatsTable/PastChatsTable'
import { useAuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import LogoutButton from '../../components/sidebar/LogoutButton';

const Home = () => {
    const {authUser} = useAuthContext();

  return (
    <div>
        <div className="navbar navbar-end fixed bg-base-100 right-4 top-0">
            <LogoutButton/>
        </div>
        <div className='flex flex-col items-center'>
            <h1 className='text-6xl font-semibold text-black'>
                <span >Welcome, {authUser.fullName}!</span>
            </h1>
            <h3 className='text-lg text-center text-black mt-4'>
                <span>Click below to chat with another. In 10 messages, your chat will be over and you will need to decide “Am I human?”</span>
            </h3>
            <Link to="/chat">
                <button className="btn btn-outline mt-10">Chat Now</button>
            </Link>

            <PastChatsTable/>
        </div>

    </div>
  )
}

export default Home