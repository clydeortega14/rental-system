import React from 'react'

import { formatPrice, formatDateDisplay } from "@/utils/dateUtils";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { BookingDetails } from '@/types/rental';
import DangerButton from '../DangerButton';
import SecondaryButton from '../SecondaryButton';

interface BookingDetailsProps {
  booking: BookingDetails
}

const BookingInfo: React.FC<BookingDetailsProps> = ({booking}) => {

    const getStatusColor = (status: string) => {
        switch (status) {
        case 'confirmed': return 'bg-green-100 text-green-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'canceled': return 'bg-red-100 text-red-800';
        case 'completed': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed': return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'pending': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
            case 'canceled': return <XCircle className="h-5 w-5 text-red-600" />;
            case 'completed': return <CheckCircle className="h-5 w-5 text-blue-600" />;
            default: return null;
        }
    };
  return (
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl mx-auto my-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h3 className="text-xl font-bold text-gray-800">Booking ID: {booking.uuid}</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                {getStatusIcon(booking.status)}
                <span className="ml-1 capitalize">{booking.status}</span>
            </span>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Customer:</p>
            <p className="text-lg font-semibold">{booking.customerName}</p>
          </div>
          <div>
            <p className="text-gray-600">Rental Item:</p>
            <p className="text-lg font-semibold">{booking.itemName}</p>
          </div>
          <div>
            <p className="text-gray-600">Start Date:</p>
            <p className="text-lg">{formatDateDisplay(String(booking.startDate))}</p>
          </div>
          <div>
            <p className="text-gray-600">End Date:</p>
            <p className="text-lg">{formatDateDisplay(String(booking.endDate))}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Amount:</p>
            <p className="text-lg font-bold text-blue-600">{formatPrice(Number(booking.totalPrice))}</p>
          </div>
        </div>
  
        <div className="mt-6 flex gap-3 justify-end">
            <SecondaryButton>
                Reschedule
            </SecondaryButton>
            <DangerButton>
                Cancel
            </DangerButton>
        </div>
      </div>
    );
}

export default BookingInfo