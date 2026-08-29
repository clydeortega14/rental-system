import { confirmDialog } from "@/utils/alert";
import { router } from "@inertiajs/react";
import React, { useContext, createContext, useState} from "react";

interface IBooking {
    categoryId: number | null;
    rental_item_id: number;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    customerId: number;
}

const BookingContext = createContext<IBooking | undefined>(undefined);
 
export const BookingProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [categoryId, setCategoryId] = useState<number | null>(null);



    return (
        <BookingContext.Provider value={{
          categoryId
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