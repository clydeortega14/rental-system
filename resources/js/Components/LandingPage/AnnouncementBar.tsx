import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { BiUser, BiLock, BiHome, BiPhoneCall, BiChat, BiBell,BiX,BiMenu,BiEnvelope,BiCheckShield } from 'react-icons/bi';

const AnnouncementBar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (key: string) => {
    setOpenDropdown(prev => (prev === key ? null : key));
  };

  return (
        <div className="bg-gray-100 text-sm text-gray-700 py-2 px-4 hidden md:block">
            <div className="container mx-auto flex justify-between items-center">
            {/* Left Side: Contact Info */}
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                <BiPhoneCall className="text-base" />
                +63 (995) 931-30881
                </span>
                <span className="flex items-center gap-1">
                <BiEnvelope className="text-base" />
                info@rent-hive.co
                </span>
            </div>

            {/* Right Side: Auth Links */}
            <div className="flex items-center gap-4">
                <nav className="hidden md:flex col-span-6 justify-center space-x-6 md:col-span-6">
                    <Link href="/" className="text-gray-700 hover:text-brandYellow transition">Home</Link>
                    <Link href="/about-us" className="text-gray-700 hover:text-orange-500 transition">About Us</Link>
                    <Link href="/how-it-works" className="text-gray-700 hover:text-orange-500 transition">How It Works</Link>
                    <Link href="/blogs" className="text-gray-700 hover:text-orange-500 transition">Blogs</Link>
                    <Link href="/contact-us" className="text-gray-700 hover:text-orange-500 transition">Contact Us</Link>
                </nav>
                <span className="flex items-center gap-1">
                <BiCheckShield className="text-base" />
                100% Secured delivery and trusted  courier!
                </span>
            </div>
            </div>
        </div>
  );
};

export default AnnouncementBar;
