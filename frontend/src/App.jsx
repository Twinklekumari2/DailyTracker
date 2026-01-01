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
        <Route path='/notes' element={<HomePage/>}/>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App