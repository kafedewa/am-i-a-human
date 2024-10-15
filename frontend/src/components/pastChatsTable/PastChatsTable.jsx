import React from 'react'
import useGetConversations from '../../hooks/useGetConversations';
import TableRow from './TableRow';

const PastChatsTable = () => {
  //TODO update with chat data
  const chatRecord = ['chat1', 'chat2']

  return (
    <div>
      {chatRecord.length > 0 ? (
        <div>
        <h1 className='text-4xl mt-10 text-center font-semibold text-black'>
          <span >Past Votes</span>
        </h1>

        <div className="overflow-x-auto mt-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Your Vote</th>
              <th>Reality</th>
            </tr>
          </thead>
          <tbody>
            <TableRow/>
          </tbody>
        </table>
      </div>
      </div>
      ) : (<div></div>)}
    </div>
  )
}

export default PastChatsTable
