import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import logoWeb from '@/../../resources/img/logo-web.png';
import logoMobile from '@/../../resources/img/logo.png';
import { BiQuestionMark  } from 'react-icons/bi';

const TopNavigation = () => {
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
        <div className="col-span-6 md:col-span-9">
          <Link href="/">
            <img
              src={isMobile ? logoMobile : logoWeb}
              alt="Logo"
              className="h-10 md:h-16 w-auto"
            />
          </Link>
        </div>
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex col-span-3 justify-end space-x-4">
            <Link
                href={route('register')}
                className="flex items-center gap-1 px-4 py-2 rounded-md  text-jaba-yellow  transition-colors duration-200"
            >
                Need help <BiQuestionMark />
            </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
