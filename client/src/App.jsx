import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

import { Toaster } from 'react-hot-toast'
import Login from './pages/login'
import Layout from './pages/layout'
import Feed from './pages/feed'
import Messages from './pages/messages'
import Chatbox from './pages/chatbox'
import Connections from './pages/connections'
import Discover from './pages/discover'
import Profile from './pages/profile'
import CreatePost from './pages/createpost'


const App = () => {
  const {user} = useUser()
  return (
    <>
     <Toaster />
     <Routes>
        <Route path ='/' element ={ !user ? <Login/> : <Layout />}>
          <Route index element ={<Feed/>}/>
          <Route path='Messages' element ={<Messages/>}/>
          <Route path='Messages/:userid' element ={<Chatbox/>}/>
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

export default App