import React from 'react'
import icon from '../../assets/logout-svgrepo-com.svg'
import useLogout from '../../hooks/useLogout'

const LogoutButton = () => {

  const {loading, logout} = useLogout();

  return (
    <div className=''>

      {
        !loading ? (<div className="tooltip tooltip-bottom" data-tip="Logout"><button className='w-6 h-6 text-black cursor-pointer' onClick={logout}><img src={icon}/></button></div>) : (<span className='loading loading-spinner'/>)
      }
        
    </div>
  )
}

export default LogoutButton