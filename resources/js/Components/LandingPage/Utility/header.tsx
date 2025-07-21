import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import logoWeb from '@/../../public/img/mobilelogo.png';
import { BiUser, BiLock, BiHome, BiPhoneCall, BiChat, BiBell,BiX,BiMenu } from 'react-icons/bi';

const TopNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const auth = usePage<PageProps>().props.auth;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md md:block hidden">
        <div className="container mx-auto px-4 py-4 grid grid-cols-12 items-center gap-4">
          {/* Logo */}
          <div className="col-span-6 md:col-span-3">
            <Link href="/">
              <img
                src={logoWeb}
                alt="Logo"
                className="h-10 md:h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex col-span-6 justify-center space-x-6 md:col-span-6">
            <Link href="/" className="text-gray-700 hover:text-brandYellow transition">Home</Link>
            <Link href="/about-us" className="text-gray-700 hover:text-orange-500 transition">About Us</Link>
            <Link href="/contact-us" className="text-gray-700 hover:text-orange-500 transition">Contact Us</Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex col-span-3 justify-end space-x-4">
            {auth.user ? (
              <Link
                href={route('lessee.profile')}
                className="flex items-center gap-1 px-4 py-2 rounded-md  text-gray-800 hover:text-brandYellow"
              >
                <BiUser /> Dashboard
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
        </div>
      </header>

      {/* Mobile Menu Button */}
      {/* <div className="md:hidden px-4 py-2 flex justify-center items-center bg-white shadow sticky top-0 z-50">
        <Link href="/">
          <img
            src={logoWeb}
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>
      </div> */}
      {/* <div className="md:hidden px-4 py-2 flex justify-between items-center bg-white shadow sticky top-0 z-50">
        <Link href="/">
          <img
            src={logoWeb}
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>
        
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-2xl text-gray-700"
        >
          {isMobileMenuOpen ? <BiX /> : <BiMenu />}
        </button>
      </div> */}
      <div className="md:hidden px-4 py-2 flex items-center justify-between bg-white shadow sticky top-0 z-50">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1">
            <Link href="/">
              <img
                src={logoWeb}
                alt="Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <button className="text-xl text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13L17 13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
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
      {/* Mobile Bottom Navigation */}
      {isMobile && (
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t z-50 shadow-[0_-4px_8px_rgba(0,0,0,0.05)] md:hidden">
        <div className="flex justify-around items-center px-4 py-2">
          {/* Home */}
          <Link
            href="/"
            className="flex flex-col items-center text-orange-600 transition-all duration-200"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300 animate-popBounce">
              <BiHome className="text-2xl" />
            </div>
            <span className="text-xs font-semibold mt-1">Home</span>
          </Link>
          {/* Contact */}
          <Link
            href="/contact-us"
            className="flex flex-col items-center text-gray-500 hover:text-brandYellow transition-all duration-200"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 hover:scale-110 transition-transform duration-300 animate-popBounce">
              <BiPhoneCall className="text-2xl" />
            </div>
            <span className="text-xs mt-1">Contact</span>
          </Link>
          {/* Notification */}
          <Link
            href="/notifications"  // or your actual notification route
            className="relative flex flex-col items-center text-gray-500 hover:text-brandYellow transition-all duration-200"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 hover:scale-110 transition-transform duration-300 animate-popBounce">
              <BiBell className="text-2xl" />
              {/* Red dot badge */}
              {/* <span className="absolute top-2 right-2 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500 animate-pulse" /> */}
            </div>
            <span className="text-xs mt-1">Notifications</span>
          </Link>

          {/* Account/Login */}
          {(auth.user ? (
            <Link
              href={route('lessee.profile')}
              className="flex flex-col items-center text-gray-500 hover:text-brandYellow transition-all duration-200"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 hover:scale-110 transition-transform duration-300 animate-popBounce">
                <BiUser className="text-2xl" />
              </div>
              <span className="text-xs mt-1">Me</span>
            </Link>
          ) : (
            <Link
              href={route('login')}
              className="flex flex-col items-center text-gray-500 hover:text-brandYellow transition-all duration-200"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 hover:scale-110 transition-transform duration-300 animate-popBounce">
                <BiUser className="text-2xl" />
              </div>
              <span className="text-xs mt-1">Login</span>
            </Link>
          ))}
        </div>
      </nav>
    )}
    </>
  );
};

export default TopNavigation;
