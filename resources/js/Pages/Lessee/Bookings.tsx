import React, { useState } from "react";

interface Booking {
  id: number;
  property: string;
  category: string;
  date: string;
  status: string;
  image: string;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    property: "Ocean View Apartment",
    category: "Beach",
    date: "2025-06-01 to 2025-06-05",
    status: "Confirmed",
    image: "/Images/lease/ocean_view_apt.jpg",
  },
  {
    id: 2,
    property: "Modern Loft",
    category: "Apertment",
    date: "2025-04-10 to 2025-04-12",
    status: "Completed",
    image: "/Images/lease/city_loft.jpg",
  },
  {
    id: 3,
    property: "Harley Davidson Motorcycle",
    category: "Motorcycle",
    date: "2025-07-10 to 2025-07-15",
    status: "Pending",
    image: "/Images/lease/harley.jpg",
  },
  {
    id: 4,
    property: "Beachfront Villa",
    category: "Event",
    date: "2025-08-01 to 2025-08-07",
    status: "Confirmed",
    image: "/Images/lease/seaside.jpeg",
  },
  // Add more for testing pagination...
];

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<string>("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const statuses = ["Pending", "Confirmed", "Completed"];

  const filteredBookings = mockBookings.filter(
    (b) => b.status === activeTab
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Reservations</h2>

      {/* Tabs */}
      <div className="flex justify-start mb-6 border-b border-gray-300 overflow-hidden">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => {
              setActiveTab(status);
              setCurrentPage(1);
            }}
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

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Property
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedBookings.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-gray-500 text-center">
                  No {activeTab.toLowerCase()} bookings.
                </td>
              </tr>
            ) : (
              paginatedBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 py-3">
                    <img
                      src={booking.image}
                      alt={booking.property}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {booking.property}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {booking.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {booking.date}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4">
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === page
                    ? "bg-orange-600 text-white border-orange-600"
                    : "bg-white text-gray-700 hover:bg-orange-50 border-gray-300"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
