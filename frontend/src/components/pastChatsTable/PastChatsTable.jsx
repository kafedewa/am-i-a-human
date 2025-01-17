import React from 'react'
import useGetConversations from '../../hooks/useGetConversations';
import TableRow from './TableRow';

const PastChatsTable = () => {
  const {loading, conversations} = useGetConversations();

  return (
    <div className='flex flex-col h-80'>
        <h1 className='text-3xl mt-10 text-center font-semibold text-black'>
          <span >Past Chats</span>
        </h1>
      
        
        <div className="mt-4 overflow-auto">
        <table className="table min-w-full table-auto">
          <thead>
            <tr className='text-black'>
              <th>Date</th>
              <th>Completed</th>
              <th>Your Vote</th>
              <th>Reality</th>
            </tr>
          </thead>
          {conversations.length > 0 ? (loading ? (<></>) : (
          <tbody>
            {
              conversations.map((conversation, idx) => (
                <TableRow
                  key={conversation.id}
                  conversation={conversation}
                  idx={idx}
                />
              ))
            }
          </tbody>
                ))
                : (<></>)}
        </table>
      </div>

      </div>
  )
}

export default PastChatsTable
