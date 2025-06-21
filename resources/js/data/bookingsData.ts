import { RentalItem } from "@/Interface/RentalItems";
import { BookingDetails } from "@/types/rental";
import { rentalItems } from "./rentalItemsData";

// Mock data for bookings
export const bookings: BookingDetails[] = [
  {
    id: 'b1',
    itemId: '1',
    userId: 'u1',
    startDate: new Date('2025-05-15'),
    endDate: new Date('2025-05-18'),
    status: 'confirmed',
    totalPrice: 150
  },
];

// Helper function to get an item by ID
export const getItemById = (id: number): RentalItem | undefined => {
  return rentalItems.find(item => item.id === id);
};