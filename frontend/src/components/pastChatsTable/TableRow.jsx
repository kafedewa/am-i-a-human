import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { extractDate } from '../../../../backend/utils/extractTime';

const TableRow = ({conversation,idx}) => {
  const {authUser} = useAuthContext();
  const formattedDate = extractDate(Date(conversation.created_at));

  return (
    <tr>
        <th>{idx + 1}</th>
        <td>{formattedDate}</td>
        <td>{conversation.completed ? "Complete" : "Incomplete"}</td>
        <td>{conversation.vote ? conversation[authUser.id] : ""}</td>
        <td>{conversation.isHuman ? "Human" : "Bot"}</td>
    </tr>
  )
}

export default TableRow