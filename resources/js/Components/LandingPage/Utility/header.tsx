import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import logoWeb from '@/../../resources/img/logo-web.png';
import logoMobile from '@/../../resources/img/logo.png';
import { BiUser, BiLock, BiMenu, BiX } from 'react-icons/bi';
import { Category } from '@/Interface/CategoryInterface';


interface User {
  id: number
  name: string
  email: string
}

interface TopNavigationProps {
  categories: Category[]
  auth: {
    user: User | null
  }
}


const TopNavigation = ({ auth, categories }: PageProps<{categories:Category[]}>) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 grid grid-cols-12 items-center gap-4">
        {/* Logo */}
        <div className="col-span-6 md:col-span-3">
          <Link href="/">
            <img
              src={isMobile ? logoMobile : logoWeb}
              alt="Logo"
              className="h-20 md:h-20 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
         <nav className="hidden md:flex col-span-6 justify-center space-x-6 md:col-span-6">
          <Link href="/" className="text-gray-700 hover:text-orange-500 transition">Home</Link>

          {/* Categories Dropdown */}
          {/* <div className="relative group">
            <div className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition cursor-pointer">
              <span>Categories</span>
              <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
              {categories.length > 0 ? (
                categories.map(category => (
                  <Link
                    key={category.id}
                    href={`${route('rental.browser.index', category.name)}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100"
                  >
                    {category.detail?.label ?? 'No Label'}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-400">No categories found</div>
              )}
            </div>
          </div> */}

          <Link href="/about-us" className="text-gray-700 hover:text-orange-500 transition">About Us</Link>
          <Link href="/contact-us" className="text-gray-700 hover:text-orange-500 transition">Contact Us</Link>
          
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex col-span-3 justify-end space-x-4">
          {auth.user ? (
              <Link
                href={route('dashboard')}
                className="text-orange-600 font-semibold"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="flex items-center gap-1 px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  <BiUser /> Sign In
                </Link>
                <Link
                  href={route('register')}
                  className="flex items-center gap-1 px-4 py-2 rounded-md bg-brandYellow text-white hover:bg-orange-600"
                >
                  <BiLock /> Sign Up
                </Link>
              </>
            )}
        </div>

        {/* Mobile Menu Button */}
        <div className="col-span-6 flex justify-end md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl text-gray-700"
          >
            {isMobileMenuOpen ? <BiX /> : <BiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
          <Link href="/" className="block text-gray-800 hover:text-orange-500">Home</Link>
          <Link href="/categories/Vehicles" className="block text-gray-800 hover:text-orange-500">Categories</Link>
          <Link href="/about-us" className="block text-gray-800 hover:text-orange-500">About</Link>
          <Link href="/contact-us" className="block text-gray-800 hover:text-orange-500">Contact</Link>
          <Link href="/blog-list" className="block text-gray-800 hover:text-orange-500">Blog</Link>
          {auth.user ? (
            <Link href={route('dashboard')} className="block text-orange-600 font-semibold">Dashboard</Link>
          ) : (
            <>
              <Link href={route('login')} className="block flex items-center gap-1 text-gray-700 hover:text-orange-500 ">
                <BiUser /> Sign In
              </Link>
              <Link href={route('register')} className="block flex items-center gap-1 text-gray-700 hover:text-orange-500 ">
                <BiLock /> Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default TopNavigation;
