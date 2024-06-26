import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Homepage from './pages/Homepage'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Inbox from './pages/Inbox'
import Archieve from './pages/Archieve'
import UserPage from './pages/UserPage'


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/homepage' element={<Homepage/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/editprofile' element={<EditProfile/>}></Route>
        <Route path='/inbox' element={<Inbox/>}></Route>
        <Route path='/archieve' element={<Archieve/>}></Route>
        <Route path='/userpage' element={<UserPage/>}></Route>
      </Routes>
    </HashRouter>
    
  )
}

export default App
