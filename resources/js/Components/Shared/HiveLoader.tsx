import React from 'react'

const SharedLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 border-4 border-yellow-500 border-dashed rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm">Loading admin portal...</p>
      </div>
    </div>
  )
}

export default SharedLoader
