import React from 'react'
import logoWeb from '@/../../resources/img/logo-web.png';
import logoMobile from '@/../../resources/img/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
              src={logoWeb}
              alt="Logo"
              className="h-10 md:h-16 w-auto"
            />
              <p className="text-gray-600">
                Making equipment rental simple, reliable, and accessible for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Safety</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Cancellation Options</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-600">info@Rentify.com</li>
                <li className="text-gray-600">+1 (555) 123-4567</li>
                <li className="text-gray-600">123 Main St, Anytown, USA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>© 2025 Rentify. All rights reserved.</p>
          </div>
        </div>
    </footer>
  )
}

export default Footer