import React from 'react'
import HomePage from './pages/HomePage'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App