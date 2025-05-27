import { PageProps, User } from '@/types'
import { Link } from '@inertiajs/react'
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import React, { PropsWithChildren, useEffect, useState } from 'react'

const TopNavigation = ({user}:PropsWithChildren<{user?: User}>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [navs, setNavs] = useState([
    {title: 'Home', link: route('landing.page.index'), isActive: route().current('landing.page.index'), display: user || user === undefined ? true : false },
    {title: 'My Bookings', link: route('reservations.index'), isActive: route().current('reservations.index'), display:  user === undefined ? false : true},
  ]);


    useEffect(() => {
    setIsOpen(false);
  }, [location]);
  return (
    
      <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10">
          <div className="px-4 flex justify-between items-center">
          <div className="font-bold text-2xl text-orange-500">Rentify</div>
          <nav className="hidden md:flex space-x-6">

              {navs.map((nav, index) => (
                nav.display &&
                <Link key={index} href={nav.link} className={`hover:text-blue-600 transition-colors ${ nav.isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                    {nav.title}
                </Link>
              ))}
          </nav>

          
          <div className="flex items-center space-x-4">
              <Link href={route('login')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Sign In
              </Link>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
              Sign Up
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-700"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
          </div>
          </div>
      </header>
    
  )
}

export default TopNavigation