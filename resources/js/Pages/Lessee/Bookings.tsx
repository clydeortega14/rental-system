import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { format } from "date-fns";
import Modal from "@/Components/Modal";
import Button from "@/Components/Renter/ui/Button";
import SecondaryButton from "@/Components/SecondaryButton";
import { BookingDetails } from "@/types/rental";
import { formatDateDisplay, formatPrice } from "@/utils/dateUtils";
import { BiCalendar } from "react-icons/bi";
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "completed":
      return "bg-blue-100 text-blue-700";
    case "canceled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function Bookings() {
  const { bookings = [] } = usePage<{ bookings: BookingDetails[] }>().props;

  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past" | "All">("Upcoming");
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null);



  const openModal = (booking: BookingDetails) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setShowModal(false);
  };

  const today = new Date();
  const filteredBookings = bookings.filter((booking) => {
    const end = new Date(booking.endDate ?? "");
    if (activeTab === "Upcoming") return end >= today && booking.status.toLowerCase() !== "canceled";
    if (activeTab === "Past") return end < today || booking.status.toLowerCase() === "canceled";
    return true;
  });

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-6">
      <h1 className="flex items-center text-3xl font-bold mb-6 text-orange-600">
        <BiCalendar className="w-6 h-6 text-orange-500 mr-2" />
        Reservations
      </h1>
      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        {["Upcoming", "Past", "All"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "Upcoming" | "Past" | "All")}
            className={`py-2 px-4 font-medium ${
              activeTab === tab
                ? "border-b-2 border-orange-600 text-orange-600"
                : "text-gray-500 hover:text-orange-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Display */}
      <div className="overflow-x-auto rounded-lg shadow-sm border">
        {filteredBookings.length ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">ID</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Image</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Property</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Category</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Total</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">Booking ID: {booking.id}</td>
                  <td className="px-4 py-3">
                    <img
                      src={booking.rentalItem?.imageUrl || ""}
                      alt={booking.itemName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  
                  <td className="px-4 py-3">{booking.rentalItem && booking.rentalItem.name}</td>
                  <td className="px-4 py-3">{booking.rentalItem?.category?.name || "N/A"}</td>
                  <td className="px-4 py-3">
                    {format(new Date(booking.startDate ?? ""), "PPP")} -{" "}
                    {format(new Date(booking.endDate ?? ""), "PPP")}
                  </td>
                  <td className="px-4 py-3">{booking.totalPrice && formatPrice( booking.totalPrice)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="outline" size="sm" onClick={() => openModal(booking)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-12">No {activeTab.toLowerCase()} bookings</div>
        )}
      </div>

      {/* Booking Detail Modal */}
      <Modal show={showModal} onClose={closeModal}>
        {selectedBooking && (
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Booking Details</h2>
            <img
              src={selectedBooking.rentalItem?.imageUrl || ""}
              className="w-full h-52 object-cover rounded-lg"
              alt={selectedBooking.rentalItem?.name}
            />
            <div>
              <p className="text-sm text-gray-500">Property</p>
              <p className="font-medium">{selectedBooking.rentalItem?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium">{selectedBooking.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">
                {format(new Date(selectedBooking.startDate ?? ""), "PPP")} to{" "}
                {format(new Date(selectedBooking.endDate ?? ""), "PPP")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getStatusColor(
                  selectedBooking.status
                )}`}
              >
                {selectedBooking.status}
              </span>
            </div>
            <div className="flex justify-end mt-4">
              <SecondaryButton onClick={closeModal}>Close</SecondaryButton>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
