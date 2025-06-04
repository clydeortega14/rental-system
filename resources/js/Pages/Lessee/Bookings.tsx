import React, { useState } from "react";

interface Booking {
  id: number;
  property: string;
  date: string;
  status: string;
  image: string;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    property: "Ocean View Apartment",
    date: "2025-06-01 to 2025-06-05",
    status: "Confirmed",
    image: "/Images/lease/ocean_view_apt.jpg",
  },
  {
    id: 2,
    property: "Modern Loft",
    date: "2025-04-10 to 2025-04-12",
    status: "Completed",
    image: "/Images/lease/city_loft.jpg",
  },
  {
    id: 3,
    property: "Harley Davidson Motorcycle",
    date: "2025-07-10 to 2025-07-15",
    status: "Pending",
    image: "/Images/lease/harley.jpg",
  },
  {
    id: 4,
    property: "Beachfront Villa",
    date: "2025-08-01 to 2025-08-07",
    status: "Confirmed",
    image: "/Images/lease/seaside.jpeg",
  },
];

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<string>("Pending");

  const statuses = ["Pending", "Confirmed", "Completed"];

  const filteredBookings = mockBookings.filter((b) => b.status === activeTab);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Reservations</h1>

      {/* Tabs */}
        <div className="flex justify-start mb-6 border-b border-gray-300 overflow-hidden">
            {statuses.map((status) => (
                <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                    activeTab === status
                    ? "bg-orange-600 text-white shadow"
                    : "text-gray-700 hover:bg-orange-100"
                }`}
                >
                {status}
                </button>
            ))}
        </div>

      {/* Booking cards */}
      <div className="space-y-6">
        {filteredBookings.length === 0 && (
          <p className="text-gray-500">No {activeTab.toLowerCase()} bookings.</p>
        )}

        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
          >
            {/* Image */}
            <img
              src={booking.image}
              alt={`${booking.property} photo`}
              className="w-full sm:w-28 h-48 sm:h-20 object-cover rounded-md flex-shrink-0"
            />

            {/* Details */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{booking.property}</h3>
                <p className="text-sm text-gray-500">{booking.date}</p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  booking.status === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : booking.status === "Completed"
                    ? "bg-blue-100 text-blue-700"
                    : booking.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
