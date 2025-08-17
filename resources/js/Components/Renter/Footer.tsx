import React from 'react'
import logoWeb from '@/../../resources/img/logo-web.png'
import secLogo from '@/../../public/img/banner/sec.svg'
import { Send, Facebook, Twitter, Mail } from 'lucide-react'
  const categoryImages = [
    "img/background/footer.png",
    ];

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10 bg-cover bg-center bg-no-repeat"  style={{ backgroundImage: `url(${categoryImages})` }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-4">
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
              <li>
                <a
                  href="/about-us"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/how-it-works"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/contact-us"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Safety
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 mb-4">
              <li className="text-gray-600">info@rent-hive.co</li>
              <li className="text-gray-600">+63 (995) 931-30881</li>
            </ul>

            {/* Email / message input */}
            <div className="flex items-center gap-2 mb-3 max-w-md">
              <label htmlFor="footer-contact" className="sr-only">
                Your email or message
              </label>
              <input
                id="footer-contact"
                type="text"
                placeholder="Your email or message"
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                aria-label="Send message"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md flex items-center justify-center transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@rent-hive.co"
                aria-label="Email"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
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
