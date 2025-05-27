import { BookingDetails, RentalDuration } from '@/types/rental';
import { formatPrice } from '@/utils/dateUtils';
import { useEffect } from 'react';

interface BookingSummaryProps {
    bookingDetails: BookingDetails;
    itemPrice: {
        hourly: number;
        daily: number;
        weekly: number;
    }
    onBookNow: () => void;
}
const BookingSummary = ({bookingDetails, itemPrice, onBookNow}: BookingSummaryProps) => {
    const getDurationText = (duration: RentalDuration) => {
        switch (duration) {
          case 'hourly': return 'hour';
          case 'daily': return 'day';
          case 'weekly': return 'week';
        }
    };
  
  const calculateTotal = () => {
    const basePrice = itemPrice[bookingDetails.duration];
    
    let calculated_total = Number(basePrice) * bookingDetails.quantity;
    
    return calculated_total;
  };

  const hasSelectedDateTime = bookingDetails.startDate && bookingDetails.startTime;


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
              <span className="text-gray-600">Date</span>
              <span className="font-medium">
                {bookingDetails.startDate?.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Time</span>
              <span className="font-medium">{bookingDetails.startTime}</span>
            </div>
          </>
        )}
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatPrice(calculateTotal())}</span>
          </div>
        </div>
      </div>
      
      <button 
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
          hasSelectedDateTime 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={!hasSelectedDateTime}
        onClick={onBookNow}
      >
        {hasSelectedDateTime ? 'Book Now' : 'Select Date & Time'}
      </button>
    </div>
  )
}

export default BookingSummary