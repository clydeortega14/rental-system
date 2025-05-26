import { PageProps } from '@/types'
import { Link } from '@inertiajs/react'
import React, { PropsWithChildren } from 'react'

const TopNavigation = ({auth}:PageProps) => {
  return (
    
      <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10">
          <div className="px-4 flex justify-between items-center">
          <div className="font-bold text-2xl text-orange-500">Rentify</div>
          <nav className="hidden md:flex space-x-6">

              <a href={route('landing.page.index')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Home</a>
                {
                  auth && <a href={route('landing.page.index')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">My Bookings</a>
                }
          </nav>
          <div className="flex items-center space-x-4">
              <Link href={route('login')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Sign In
              </Link>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
              Sign Up
              </button>
          </div>
          </div>
      </header>
    
  )
}

export default TopNavigation