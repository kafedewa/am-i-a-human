
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import Welcome from './pages/welcome/Welcome'
import WaitingRoom from './pages/waitingRoom/WaitingRoom'
import Matching from './pages/matching/matching'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  const{authUser} = useAuthContext();

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center bg-white'>

        <Routes>
          <Route path='/' element={authUser ? <Home/> : <Navigate to="/login"/>}/>
          <Route path='/login' element={authUser ? <Navigate to="/"/> : <Login/>}/>
          <Route path='/signup' element={authUser ? <Navigate to="/"/> : <SignUp/>}/>
          <Route path='/welcome' element={<Welcome/>}/>
        </Routes>
        <Toaster/>

      </div>
    </>
  )
}

export default App
