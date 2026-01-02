import React from 'react'
import Notes from '../components/Homepage/Notes'
import Card from '../components/Homepage/Card'

const HomePage = () => {
  return (
    <div>  
         <div className="absolute top-5 left-5 w-40 h-40 sm:w-56 sm:h-56 bg-pink-200 rounded-full blur-3xl opacity-70 -z-10"></div>

      <div className="absolute top-1/3 left-1/4 hidden md:block w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-70 -z-10"></div>

      <div className="absolute top-10 right-10 hidden lg:block w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-70 -z-10"></div>

      <div className="absolute bottom-5 right-5 w-40 h-40 sm:w-56 sm:h-56 bg-pink-200 rounded-full blur-3xl opacity-70 -z-10"></div>
        <Notes/>
        <Card/>
    </div>
  )
}

export default HomePage