import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import MessageContainer from './components/messages/MessageContainer'
import Chat from './pages/chat/Chat'

function App() {
  const {authUser}= useAuthContext()

  return (
    <>
 <Routes>
  <Route path='/' element={authUser?<Home/>: <Navigate to={'/login'}/>}/>
  <Route path='/convo' element={authUser?<Chat/>: <Navigate to={'/login'}/>}/>
  <Route path='/login' element={authUser?<Navigate to={'/'}/>: <Login/>}/>
  <Route path='/signup' element={authUser?<Navigate to={'/'}/>:<SignUp/>}/>
 </Routes> 
 <Toaster/>
 </>

  )
}

export default App
