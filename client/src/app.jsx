import React from 'react'
import {Route, Routes} from 'react-router-dom'
import login from './pages/login'
import feed from './pages/feed'
import messages from './pages/messages'
import chatbox from './pages/chatbox'
import connections from './pages/connections'
import discover from './pages/discover'
import profile from './pages/profile'
import createpost from './pages/createpost'

const app = () => {
  return (
    <>
     <Routes>
        <Route path ='/' element ={<login/>}>
          <Route index element ={<feed/>}/>
          <Route path='messages' element ={<messages/>}/>
          <Route path='messages/:userid' element ={<chatbox/>}/>
          <Route path='connections' element ={<connections/>}/>
          <Route path='discover' element ={<discover/>}/>
          <Route path='profile' element ={<profile/>}/>
          <Route path='profile/:profileid' element ={<profile/>}/>
          <Route path='createpost' element ={<createpost/>}/>
        </Route>
     </Routes>
    </>
  )
}

export default app