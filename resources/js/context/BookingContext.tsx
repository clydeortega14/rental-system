import { confirmDialog } from "@/utils/alert";
import { router } from "@inertiajs/react";
import React, { useContext, createContext, useState} from "react";

interface IBooking {
    cancel: (booking_id: string) => void; 
}

const BookingContext = createContext<IBooking | undefined>(undefined);
 
export const BookingProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

  const cancel = (booking_id: string) => {

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
        <BookingContext.Provider value={{
            cancel
         }}>
            {children}
        </BookingContext.Provider>
    );
}

export const useKyc = (): IBooking => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useKyc must be used within a CartProvider');
  }
  return context;
};