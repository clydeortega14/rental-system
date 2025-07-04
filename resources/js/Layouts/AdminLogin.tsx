import React from 'react'
import banner2 from '@/../../resources/img/logo-web.png';


interface Props {
  children: React.ReactNode
}

const AdminAuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* LOGO */}
        <div className="flex justify-center">
          <img
            src={banner2} // Change to your actual logo path (e.g. `/storage/logo.png`)
            alt="Admin Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500 text-sm">Please enter your credentials to continue</p>
        </div>

        {/* Slot content (form) */}
        {children}
      </div>
    </div>
  )
}

export default AdminAuthLayout
