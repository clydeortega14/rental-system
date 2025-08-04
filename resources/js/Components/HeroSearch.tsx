import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Search } from 'lucide-react';

const HeroSearch: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger fade-in after mount
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      pickupLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
    });
  };

  return (
    <div className="relative w-full flex justify-center -mt-4 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSearch}
        className={`w-full max-w-6xl bg-white backdrop-blur-sm shadow-lg rounded-xl px-5 py-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end transition-all duration-500 ease-out transform ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        aria-label="Hero search form"
      >
        {/* Pickup Location */}
        <div className="col-span-1">
          <label className="text-[10px] font-medium text-gray-600 block mb-1">
            Pickup Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={16} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Enter City, Airport, or Address"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full h-12 pl-10 pr-3 border rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Pickup location"
            />
          </div>
        </div>

        {/* Pickup Date & Time */}
        <div className="col-span-1">
          <label className="text-[10px] font-medium text-gray-600 block mb-1">
            Pickup Date & Time
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-gray-500" />
              </div>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full h-12 pl-10 pr-3 border rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Pickup date"
              />
            </div>
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock size={16} className="text-gray-500" />
              </div>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full h-12 pl-10 pr-3 border rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Pickup time"
              />
            </div>
          </div>
        </div>

        {/* Return Date & Time */}
        <div className="col-span-1">
          <label className="text-[10px] font-medium text-gray-600 block mb-1">
            Return Date & Time
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-gray-500" />
              </div>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full h-12 pl-10 pr-3 border rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Return date"
              />
            </div>
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock size={16} className="text-gray-500" />
              </div>
              <input
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="w-full h-12 pl-10 pr-3 border rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Return time"
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="col-span-1 flex items-center">
          <button
            type="submit"
            className="w-full h-12 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md shadow transition"
            aria-label="Search"
          >
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSearch;
