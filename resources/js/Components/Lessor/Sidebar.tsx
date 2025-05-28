import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 flex flex-col justify-between text-white">
      <div>
        <h1 className="text-2xl font-bold text-orange-400 mb-6">Lessor Dashboard</h1>
        <nav className="flex flex-col gap-2">
          <a href="#listings" className="text-white hover:bg-orange-500 px-3 py-2 rounded-md">My Listings</a>
          <a href="#inquiries" className="text-white hover:bg-orange-500 px-3 py-2 rounded-md">Inquiries</a>
          <a href="#profile" className="text-white hover:bg-orange-500 px-3 py-2 rounded-md">Profile</a>
        </nav>
      </div>
    </aside>
  );
}
