import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'
import Layout from './pages/Layout'
import Messages from './pages/Messages'
import Connections from './pages/Connections'
import Profile from './pages/Profile'
import CreatePost from './pages/Createpost'
import Feed from './pages/Feed'
import ChatBox from './pages/ChatBox'
import Discover from './pages/Discover'


const app = () => {
  const {user} = useUser()
  return (
    <>
     <Toaster />
     <Routes>
        <Route path ='/' element ={ !user ? <Login/> : <Layout />}>
          <Route index element ={<Feed/>}/>
          <Route path='Messages' element ={<Messages/>}/>
          <Route path='Messages/:userid' element ={<ChatBox/>}/>
          <Route path='Connections' element ={<Connections/>}/>
          <Route path='Discover' element ={<Discover/>}/>
          <Route path='Profile' element ={<Profile/>}/>
          <Route path='Profile/:Profileid' element ={<Profile/>}/>
          <Route path='Createpost' element ={<CreatePost/>}/>
        </Route>
     </Routes>
    </>
  )
}

export default app