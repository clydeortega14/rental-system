import React from 'react'

const TopNavigation = () => {
  return (
    
      <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10">
          <div className="px-4 flex justify-between items-center">
          <div className="font-bold text-2xl text-orange-500">Rentify</div>
          <nav className="hidden md:flex space-x-6">
              <a href={route('landing.page.index')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Home</a>
              
          </nav>
          <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
              Sign In
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
              Sign Up
              </button>
          </div>
          </div>
      </header>
    
  )
}

export default TopNavigation