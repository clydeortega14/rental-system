import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaEllipsisV } from "react-icons/fa";
import avatar1 from '@/../../resources/img/renmascot.png';

const categories = [
  "Over", "Cardiologist", "Orthopedic", "Neurologist", "Gynecologist", "Psychiatrist"
];

const doctors = [
  { name: "Bailey Dupont", specialization: "Neurologist", image: {avatar1} },
  { name: "Donna Stroupe", specialization: "Cardiologist", image: "/doctor2.jpg" },
  { name: "Juliana Silva", specialization: "Pediatrician", image: "/doctor3.jpg" },
  { name: "Connor Hamilton", specialization: "Psychiatrist", image: "/doctor4.jpg" },
];

export default function MobileDashboard() {
  return (
    <section className="flex-1 flex flex-col bg-gray-50 overflow-y-auto p-4 space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Welcome Back!</p>
          <h2 className="text-lg font-semibold">Jonathan Patterson</h2>
          <p className="text-xs text-gray-400">123 Anywhere Street, Any City</p>
        </div>
        <FaEllipsisV className="text-gray-600" />
      </div>

      {/* Banner */}
      <div className="bg-white rounded-xl p-4 shadow flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Your Health, Is Our Priority</h3>
          <button className="mt-2 px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg">Get Started</button>
        </div>
        <img src="/doctor-banner.png" alt="Doctor" className="h-20 w-20 object-cover rounded-xl" />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, index) => (
          <button
            key={index}
            className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700 shadow-sm"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Best Doctor Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-800 text-md">Best Doctor</h4>
          <button className="text-sm text-orange-600">See More</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {doctors.map((doc, index) => (
            <div key={index} className="bg-white p-3 rounded-xl shadow-md">
              <img src={avatar1} alt={doc.name} className="h-24 w-full object-cover rounded-lg mb-2" />
              <h5 className="font-medium text-gray-800 text-sm">{doc.name}</h5>
              <p className="text-xs text-gray-500">{doc.specialization}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
