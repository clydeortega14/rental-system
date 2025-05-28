import { useCart } from '@/context/CartContext';
import { PageProps, User } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { Menu, Search, ShoppingCart as CartIcon, X, LogIn, Signature } from 'lucide-react';
import React, { PropsWithChildren, useEffect, useState } from 'react'

const TopNavigation = () => {

  const auth = usePage<PageProps>().props.auth;

  const user = auth.user;

  const [isOpen, setIsOpen] = useState(false);
  
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  // const location = useLocation();

  
  
  const [navs, setNavs] = useState([
    {title: 'Home', link: route('landing.page.index'), isActive: route().current('landing.page.index'), display: user || user === undefined || user === null ? true : false },
    {title: 'My Bookings', link: route('reservations.index'), isActive: route().current('reservations.index'), display:  user === undefined  || user === null ?false : true},
  ]);

  const [rightNavs, setRightNavs] = useState([
    {title: 'Shopping Cart', link: route('cart.index'), display:  user === undefined || user === null ? false : true, icon: <CartIcon />},
    {title: 'Sign In', link: route('login'), display: user !== undefined || user !== null ? false : true, icon:  <LogIn />},
    {title: 'Sign Up', link: route('register'), display:  user !== undefined || user !== null ? false : true, icon: <Signature />},
    
    // {title: 'Avatar', link: route('cart.index'), display:  user === undefined ? false : true, },
  ])

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  return (
    
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4 py-4">
            <div className=" flex justify-between items-center">
              <Link href={route('landing.page.index')} className="text-2xl font-bold text-orange-500 flex items-center">
                Rentify
              </Link>
              <nav className="hidden md:flex space-x-6 items-center space-x-8">

                {navs.map((nav, index) => (
                  nav.display &&
                  <Link key={index} href={nav.link} className={`hover:text-blue-600 transition-colors ${ nav.isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                      {nav.title}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center space-x-4">
                {
                  rightNavs.map((rightNav, index) => (
                    <div key={index}>
                      {<Link href={rightNav.link} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
                      <div className="flex gap-x-2">
                          {rightNav.icon } { rightNav.title}
                      </div>
                       
                      </Link>}
                    </div>
                  ))
                }
                
                {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                Sign Up
                </button> */}

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden text-gray-700"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
      </header>
    
  )
}

export default TopNavigation