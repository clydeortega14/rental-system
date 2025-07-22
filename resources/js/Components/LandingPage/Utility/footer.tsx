import React from 'react'
import logoWeb from '@/../../resources/img/logo-web.png';
import secLogo from '@/../../public/img/banner/sec.svg';

const Footer = () => {

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              {/* <img
                src={logoWeb}
                alt="Logo"
                className="h-20 md:h-35 w-auto"
              /> */}
              
              {/* Additional logos: RentHive + SEC */}
              <div className="flex items-center gap-4 mt-4">
                <img src={logoWeb} alt="RentHive Logo" className="h-10 w-auto" />
                <img src={secLogo} alt="SEC Logo" className="h-10 w-auto" />
              </div>

              <p className="text-gray-600 mt-5">
                Smarter, simpler way, to manage and grow rental businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about-us" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">About Us</a></li>
                <li><a href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">How It Works</a></li>
                <li><a href="/blogs" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Blogs</a></li>
               
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                 <li><a href="/contact-us" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Safety</a></li>
                {/* <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Cancellation Options</a></li> */}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-600">info@rent-hive.co</li>
                <li className="text-gray-600">+63 (995) 931-30881</li>
                {/* <li className="text-gray-600">123 Main St, Anytown, USA</li> */}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>© 2025 Rent Hive Technology Inc. All rights reserved.</p>
          </div>
        </div>
    </footer>
  )
}

export default Footer