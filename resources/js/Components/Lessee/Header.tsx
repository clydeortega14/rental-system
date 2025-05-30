import { Link } from "@inertiajs/react";
import { HelpCircle, Bell } from "lucide-react";
import logoWeb from '@/../../resources/img/logo-web.png';
import logoMobile from '@/../../resources/img/logo.png';

export default function LesseeHeader({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  return (
    <header className="fixed top-0 w-full h-16 bg-white shadow-md z-40 flex items-center justify-between px-4">
      {/* Left section: Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img src={logoMobile} alt="Logo" className="h-10 w-auto md:hidden" />
          <img src={logoWeb} alt="Logo" className="h-10 md:h-12 w-auto hidden md:block" />
        </Link>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Be a Lessor button */}
        <Link
          href="/lessor"
          className="text-sm font-medium border border-orange-600 text-orange-600 px-3 py-1.5 rounded-md hover:bg-orange-50 transition"
        >
          Be a Lessor
        </Link>

        {/* Notification bell */}
        <button
          className="relative text-gray-700 hover:text-orange-600 transition-colors duration-200"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Help button */}
        <Link
          href="/help"
          className="text-gray-700 hover:text-orange-600 transition-colors duration-200"
          aria-label="Help and Support"
        >
          <HelpCircle className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}
