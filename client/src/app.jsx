import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Messages from './pages/Messages'
import ChatBox from './pages/chatbox'
import Connections from './pages/Connections'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import Createpost from './pages/Createpost'
import { useUser } from '@clerk/clerk-react'
import Layout from './pages/Layout'


const app = () => {
  const {user} = useUser()
  return (
    <>
     <Routes>
        <Route path ='/' element ={ !user ? <Login/> : <Layout/>}>
          <Route index element ={<Feed/>}/>
          <Route path='Messages' element ={<Messages/>}/>
          <Route path='Messages/:userid' element ={<ChatBox/>}/>
          <Route path='Connections' element ={<Connections/>}/>
          <Route path='Discover' element ={<Discover/>}/>
          <Route path='Profile' element ={<Profile/>}/>
          <Route path='Profile/:Profileid' element ={<Profile/>}/>
          <Route path='Createpost' element ={<Createpost/>}/>
        </Route>
     </Routes>
    </>
  )
}

export default app