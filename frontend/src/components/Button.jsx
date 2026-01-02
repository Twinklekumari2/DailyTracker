import React from 'react'

const Button = ({ name, functionClick }) => {
  return (
    <button
      onClick={functionClick} 
      className="
        px-4 py-2.5 
        text-sm font-bold text-white tracking-wide
        bg-pink-600 rounded-lg shadow-md
        hover:bg-pink-500 hover:shadow-lg 
        active:scale-95 
        transition-all duration-200 
        cursor-pointer outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
      "
    >
      {name}
    </button>
  )
}

export default Button