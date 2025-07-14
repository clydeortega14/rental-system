import { RentalItem } from "@/Interface/RentalItems";
import { BookingDetails } from "@/types/rental";
import { rentalItems } from "./rentalItemsData";

// Mock data for bookings
export const bookings: BookingDetails[] = [
  {
    id: 'b1',
    itemId: '1',
    userId: 'u1',
    startDate: '2025-05-15',
    endDate: '2025-05-18',
    status: 'confirmed',
    totalPrice: 150
  },
];


//
export const booking: BookingDetails = {
    id: "BK202506",
    userId: "Juan Dela Cruz",
    itemId: "Toyota Vios 2020",
    startDate: "2025-07-01",
    endDate: "2025-07-05",
    status: "pending" as const,
    totalPrice: 12500,
}

// Helper function to get an item by ID
export const getItemById = (id: number): RentalItem | undefined => {
  return rentalItems.find(item => item.id === id);
};