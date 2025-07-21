import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white shadow-inner text-gray-600 text-sm py-6 mt-auto border-t">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} Rent Hive Technology Inc. All rights reserved.</p>
        <nav className="flex flex-wrap justify-center gap-6 text-gray-500">
          <a href="/privacy" className="hover:underline hover:text-orange-400">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline hover:text-orange-400">
            Terms of Service
          </a>
          <a href="/contact" className="hover:underline hover:text-orange-400">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
