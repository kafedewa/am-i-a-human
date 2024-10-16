
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Chat from './pages/chat/Chat'
import Welcome from './pages/welcome/Welcome'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  const {authUser, loading} = useAuthContext();

  return (
    <>
    {loading ? (<span className='loading loading-spinner'/>) : 
      (<div className='p-4 h-screen flex items-center justify-center bg-white'>

        <Routes>
          <Route path='/' element={authUser ? <Home/> : <Navigate to="/welcome"/>}/>
          <Route path='/login' element={authUser ? <Navigate to="/"/> : <Login/>}/>
          <Route path='/signup' element={authUser ? <Navigate to="/"/> : <SignUp/>}/>
          <Route path='/chat' element={authUser ? <Chat/> : <Login/> }/>
          <Route path='/welcome' element={<Welcome/>}/>
        </Routes>
        <Toaster/>

      </div>)
    }
    </>
  )
}

export default App
