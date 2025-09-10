import React, { useState } from "react";
import { usePage, router, useForm } from "@inertiajs/react"; // 👈 add router
import { format, formatDate } from "date-fns";
import Modal from "@/Components/Modal";
import Button from "@/Components/Renter/ui/Button";
import SecondaryButton from "@/Components/SecondaryButton";
import { BookingDetails } from "@/types/rental";
import { formatDateDisplay, formatPrice } from "@/utils/dateUtils";
import { BiCalendar, BiMessageDetail } from "react-icons/bi"; // 👈 icon for inquiries
import { toTwelveFormat } from "@/utils/timeUtils";
import { Calendar } from "lucide-react";
import { confirmDialog, isConfirmedAlert } from "@/utils/alert";

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

interface BookingsProps {
  onSwitchTab?: (tab: string) => void;
}

export default function Bookings({ onSwitchTab }: BookingsProps) {
  const { bookings = [] } = usePage<{ bookings: BookingDetails[] }>().props;

  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past" | "All">("Upcoming");
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null);

  const { post } = useForm({});

  const openModal = (booking: BookingDetails) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setShowModal(false);
  };

  const handleInquiries = (booking: BookingDetails) => {
    router.post(
      "/conversations",
      {
        id: booking.id,
        uuid: booking.uuid,
        rentalItem: {
          id: booking.rentalItem?.id,
          imageUrl: booking.rentalItem?.imageUrl,
          name: booking.rentalItem?.name,
          description: booking.rentalItem?.description,
          shopId: booking.rentalItem?.shopId,
          shopName: booking.rentalItem?.shopName,
          shopLocation: booking.rentalItem?.shopLocation,
        },
        itemId: booking.itemId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        status: booking.status,
        totalPrice: booking.totalPrice,
      },
      {
        onSuccess: () => {
          // call parent to switch tab
          onSwitchTab?.("lessorInquiries");
        },
      }
    );
  };

  const today = new Date();
  const filteredBookings = bookings.filter((booking) => {
    const end = new Date(booking.endDate ?? "");
    if (activeTab === "Upcoming") return end >= today && booking.status.toLowerCase() !== "canceled";
    if (activeTab === "Past") return end < today || booking.status.toLowerCase() === "canceled";
    return true;
  });

  const handleClickReturn = (booking_id: string) => 
  {
      confirmDialog(
        'Do you wish to return this already?', 
        'Yes i will return it now', 
        'Cancel'
      ).then((result) => {
        if(result.isConfirmed) {
          post(route('booking.update.status', {
            booking_id: booking_id,
            action: 'returning'
          }), {
            preserveScroll: false,
            onSuccess: () => {
              isConfirmedAlert('Success', "success");
            }
          })
        }
      });
  }

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-6">
      <h1 className="flex items-center text-3xl font-bold mb-6 text-brandYellow">
        <BiCalendar className="w-6 h-6 text-brandYellow mr-2" />
        Reservations
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        {["Upcoming", "Past", "All"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "Upcoming" | "Past" | "All")}
            className={`py-2 px-4 font-medium ${activeTab === tab
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
                {/* <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">ID</th> */}
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Image</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Property</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Category</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Date & Time</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Total</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  {/* <td className="px-4 py-3">Booking ID: {booking.id}</td> */}
                  <td className="px-4 py-3">
                    <img
                      src={booking.rentalItem?.imageUrl || ""}
                      alt={booking.itemName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">{booking.rentalItem?.name}</td>
                  <td className="px-4 py-3">{booking.category?.name || "N/A"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{ formatDateDisplay(String(booking.startDate)) } - {formatDateDisplay(String(booking.endDate))}</span>
                    </div>
                    
                    {
                      booking.startTime && booking.returnTime && (
                        <>
                        <div>
                          <small>Delivery Time: { toTwelveFormat(booking.startTime) }</small>
                        </div>
                        <div>
                          <small>Return Time: { toTwelveFormat(booking.returnTime) }</small>
                        </div>
                        </>
                      )
                    }
                    
                  </td>
                  <td className="px-4 py-3">
                    {booking.totalPrice && formatPrice(booking.totalPrice)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 flex items-center space-x-2 ">
                    <Button variant="outline" size="sm" onClick={() => openModal(booking)}>
                      View
                    </Button>

                    { booking.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-blue-600 border-blue-600"
                          onClick={() => handleInquiries(booking)}
                        >
                          <BiMessageDetail className="w-4 h-4" />
                          Inquiries
                        </Button>

                        <Button variant="outline" size="sm" className="gap-1" onClick={ () => handleClickReturn(booking.id) }>
                          Return
                        </Button>
                      </>
                    )}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-12">
            No {activeTab.toLowerCase()} bookings
          </div>
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
