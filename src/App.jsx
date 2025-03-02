import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Page/Home/Home'
import Header from './component/Header/Header'
import Login from './Page/Login/Login'
import SignUp from './Page/SignUp/SignUp'
import Hub from './Page/Hub/Hub'
import PostDetail from './Page/PostDetail/PostDetail'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Header />}>
      <Route index element={<Home />}/>
      <Route path='login' element={<Login/>}/>
      <Route path='sign_up' element={<SignUp/>}/>
      <Route path='hub' element={<Hub/>}/>
      <Route path="/post/:id" element={<PostDetail />} />
      </Route>
    </Routes>
  )
}

export default App
