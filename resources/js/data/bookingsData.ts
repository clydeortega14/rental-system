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
  {
    id: 'b2',
    itemId: '3',
    userId: 'u1',
    startDate: '2025-06-10',
    endDate: '2025-06-15',
    status: 'pending',
    totalPrice: 1000
  },
  {
    id: 'b3',
    itemId: '2',
    userId: 'u1',
    startDate: '2025-05-20',
    endDate: '2025-05-22',
    status: 'completed',
    totalPrice: 70
  }
];

// Helper function to get an item by ID
export const getItemById = (id: number): RentalItem | undefined => {
  return rentalItems.find(item => item.id === id);
};