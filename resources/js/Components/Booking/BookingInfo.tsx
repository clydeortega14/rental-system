import React from 'react'

import { formatPrice, formatDateDisplay, formatDateLocale, computeDateBetweenTwoDates } from "@/utils/dateUtils";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { BookingDetails } from '@/types/rental';
import DangerButton from '../DangerButton';
import SecondaryButton from '../SecondaryButton';
import { formatTo24Hour, timeInUTCFormat, toTwelveFormat } from '@/utils/timeUtils';
import ImageSlider from './ImageSlider';
import { getStatusColor } from '@/utils/statusHelper';
import { confirmDialog, isConfirmedAlert } from '@/utils/alert';
import { useForm } from '@inertiajs/react';

interface BookingDetailsProps {
  booking: BookingDetails
}

const BookingInfo: React.FC<BookingDetailsProps> = ({booking}) => {

  const { post } = useForm({});

    const images = [
      "https://picsum.photos/seed/picsum/200/300",
      "https://picsum.photos/id/237/200/300",
      "https://picsum.photos/200/300?random=1",
      "https://picsum.photos/200/300?random=2",
      "https://picsum.photos/200/300?random=3",
      "https://picsum.photos/200/300?random=4"
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed': return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'reserved': return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'pending': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
            case 'canceled': return <XCircle className="h-5 w-5 text-red-600" />;
            case 'completed': return <CheckCircle className="h-5 w-5 text-blue-600" />;
            case 'returning': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
            default: return null;
        }
    };

    const handleClickCancel = (booking_id: string | undefined) => {
      confirmDialog(
            'Are you sure, you want to cancel this booking?',
            'Yes, cancel it',
            'No'
          ).then((result) => {
            if(result.isConfirmed)
            {
              post(route('booking.update.status', {
                booking_id,
                action: 'cancelled'
              }), {
                preserveScroll: true,
                onSuccess: () => {
                  isConfirmedAlert('Booking has been cancelled', 'warning')
                }
              });
            }
          })
    }
  return (
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl mx-auto my-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
            {/* <h3 className="text-xl font-bold text-gray-800">Booking ID: {booking.uuid}</h3> */}
            <div>
              <p>Status:</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {getStatusIcon(booking.status)}
                  <span className="ml-1 capitalize">{booking.status}</span>
              </span>
            </div>
            
            <div className="space-x-2">
              <SecondaryButton>
                  Reschedule
              </SecondaryButton>
              {  (
              <DangerButton onClick={ () => handleClickCancel(booking.id) }>
                  Cancel
              </DangerButton>
              )}
              
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600">Rate:</p>
            <p className="text-lg font-semibold text-slate-700">{formatPrice(Number(booking.rentalPrice))} {booking.duration_type}</p>
          </div>

          <div>
            <p className="text-gray-600">Duration:</p>
            <p className="text-lg font-semibold text-slate-700">{`${booking.duration} ${booking.duration_type === 'daily' ? 'Days' : 'booking.duration_type'}`}</p>
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