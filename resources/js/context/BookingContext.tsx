import { confirmDialog } from "@/utils/alert";
import { router } from "@inertiajs/react";
import React, { useContext, createContext, useState} from "react";

interface IBooking {
    
}

const BookingContext = createContext<IBooking | undefined>(undefined);
 
export const BookingProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    return (
        <BookingContext.Provider value={{}}>
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