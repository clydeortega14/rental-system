import { BookingDetails, RentalDuration } from '@/types/rental';
import { computeDateBetweenTwoDates, formatDateLocale, formatPrice, formatTimeLocale } from '@/utils/dateUtils';
import { useEffect, useState } from 'react';
import Button from '../Renter/ui/Button';
import PrimaryButton from '../PrimaryButton';

interface BookingSummaryProps {
    bookingDetails: BookingDetails;
    itemPrice: {
        hourly: number;
        daily: number;
        weekly: number;
    }
    onBookNow: () => void;
    calculatedTotal: number;
    processing: boolean;
}
const BookingSummary = ({bookingDetails, itemPrice, onBookNow, calculatedTotal, processing}: BookingSummaryProps) => {

    const [hasSelectedDateTime, setHasSelectedDateTime] = useState<boolean>(false);
    const getDurationText = (duration: RentalDuration) => {
        switch (duration) {
          case 'hourly': return 'hour';
          case 'daily': return 'day';
          case 'weekly': return 'week';
        }
    };

    useEffect( () => {
      //
      if(bookingDetails.startDate && bookingDetails.startTime) setHasSelectedDateTime(true)
      
    }, [bookingDetails]);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Duration</span>
          <span className="font-medium">
            {bookingDetails.quantity} {getDurationText(bookingDetails.duration)}
            {bookingDetails.quantity > 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Price per {getDurationText(bookingDetails.duration)}</span>
          <span className="font-medium">{formatPrice(itemPrice[bookingDetails.duration])}</span>
        </div>
        
        {hasSelectedDateTime && (
          <>
            <div className="flex justify-between">
              <span className="text-gray-600">Start</span>
              <span className="font-medium">
                {
                  bookingDetails.startDate && formatDateLocale(bookingDetails.startDate) + ' @ ' + bookingDetails.startTime
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">End</span>
              <span className="font-medium">
                {
                  bookingDetails.endDate && formatDateLocale(bookingDetails.endDate) + ' @ ' + bookingDetails.startTime
                }
              </span>
            </div>
          </>
        )}
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatPrice(calculatedTotal)}</span>
          </div>
        </div>
      </div>

      <Button onClick={onBookNow} className={hasSelectedDateTime ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-600'} disabled={processing}>
        {hasSelectedDateTime ? 'Book Now' : 'Select Date & Time'}
      </Button>
      
      {/* <button 
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
          hasSelectedDateTime 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={hasSelectedDateTime}
        onClick={onBookNow}
      >
        {hasSelectedDateTime ? 'Book Now' : 'Select Date & Time'}
      </button> */}
    </div>
  )
}

export default BookingSummary