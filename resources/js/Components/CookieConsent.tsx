import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

interface CookieConsentProps {
  onVisibleChange?: (visible: boolean) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onVisibleChange }) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookie_consent');
    if (!hasConsented) {
      setShowBanner(true);
      onVisibleChange?.(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
    onVisibleChange?.(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <div className="text-center sm:text-left">
          <p>
            We use cookies to enhance your browsing experience. By continuing to use our site, you agree to our use of cookies.{' '}
            <Link href="/cookies-policy" className="underline text-blue-400 hover:text-blue-300 transition">
              Learn more
            </Link>
          </p>
        </div>
        <button
          onClick={handleAccept}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Accept All
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
