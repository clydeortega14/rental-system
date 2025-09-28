import React from 'react'

import { formatPrice, formatDateLocale } from "@/utils/dateUtils";
import { CheckCircle, AlertCircle, XCircle, Undo2Icon, CalendarClock } from "lucide-react"
import { BookingDetails } from '@/types/rental';
import { toTwelveFormat } from '@/utils/timeUtils';
import ImageSlider from './ImageSlider';
import { getStatusColor } from '@/utils/statusHelper';
import BookingActions from './BookingActions';
import BookingStatus from './BookingStatus';

interface BookingDetailsProps {
  booking: BookingDetails
  serviceFee: number;
}

const BookingInfo: React.FC<BookingDetailsProps> = ({booking, serviceFee}:BookingDetailsProps) => {

    const images = [
      "https://picsum.photos/seed/picsum/200/300",
      "https://picsum.photos/id/237/200/300",
      "https://picsum.photos/200/300?random=1",
      "https://picsum.photos/200/300?random=2",
      "https://picsum.photos/200/300?random=3",
      "https://picsum.photos/200/300?random=4"
    ];
   
  return (
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl mx-auto my-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
            {/* <h3 className="text-xl font-bold text-gray-800">Booking ID: {booking.uuid}</h3> */}
            <div>
              <p>Status:</p>
              <BookingStatus booking={booking} />
            </div>

            <BookingActions booking={booking} />

        </div>

        <div className="flex items-center justify-center">
            <ImageSlider images={images} interval={4000} />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b py-4">
          <div>
            <p className="text-gray-600">Customer:</p>
            <p className="text-lg font-semibold text-slate-700 px-3">{booking.customerName}</p>
          </div>
          <div>
            <p className="text-gray-600">Rental Item:</p>
            <p className="text-lg font-semibold text-slate-700 px-3">{booking.itemName}</p>
          </div>
          <div>
            <p className="text-gray-600">Start Date:</p>
            <p className="text-lg font-semibold text-slate-700 px-3">{formatDateLocale(String(booking.startDate))}</p>
          </div>

          <div>
            <p className="text-gray-600">Pickup Time:</p>
            <p className="text-lg font-semibold text-slate-700 px-3">{booking.startTime && toTwelveFormat(booking.startTime)}</p>
          </div>

          <div>
            <p className="text-gray-600">End Date:</p>
            <p className="text-lg font-semibold text-slate-700 px-3">{formatDateLocale(String(booking.endDate))}</p>
          </div>

          <div>
            <p className="text-gray-600">Return Time:</p>
            <p className="text-lg font-semibold text-slate-700 px-3">{booking.endTime && toTwelveFormat(booking.endTime)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600">Rate:</p>
            <p className="text-lg font-semibold text-slate-700">{formatPrice(Number(booking.rentalPrice))} {booking.duration_type}</p>
          </div>

          <div>
            <p className="text-gray-600">Duration:</p>
            <p className="text-lg font-semibold text-slate-700">{`${booking.duration} ${booking.duration_type === 'daily' ? 'Days' : 'booking.duration_type'}`}</p>
          </div>

          <div>
            <p className="text-gray-600">Service Fee:</p>
            <p className="text-lg font-semibold text-slate-700">{`${booking.service_fee}`}</p>
          </div>

          <div>
            <p className="text-gray-600">Total:</p>
            <p className="text-lg font-semibold text-slate-700">{formatPrice(Number(booking.totalPrice))}</p>
          </div>
        </div>
  
        
      </div>
    );
}

export default BookingInfo