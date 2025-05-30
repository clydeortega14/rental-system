import { Link } from "@inertiajs/react";
import { HelpCircle, Bell, Menu } from "lucide-react";
import logoWeb from '@/../../resources/img/logo-web.png';
import logoMobile from '@/../../resources/img/logo.png';

export default function LessorHeader({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  return (
    <header className="fixed top-0 w-full h-16 bg-white shadow-md z-40 flex items-center justify-between px-4">
      {/* Left section: button + logo */}
      <div className="flex items-center">
        {/* Sidebar toggle button (mobile only) */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden h-16 w-10 flex items-center justify-center text-orange-600 hover:text-orange-700 transition-colors duration-200"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link href="/" className="flex items-center">
          {/* Show mobile logo on small screens, desktop logo on medium+ */}
          <img src={logoMobile} alt="Logo" className="h-10 w-auto md:hidden" />
          <img src={logoWeb} alt="Logo" className="h-10 md:h-12 w-auto hidden md:block" />
        </Link>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        <Link href="/categories" className="text-sm text-gray-700 hover:text-orange-600">
          Property Catalog
        </Link>

        {/* Notification bell button */}
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
