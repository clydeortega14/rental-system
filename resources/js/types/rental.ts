export interface RentalItem {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: {
    hourly: number;
    daily: number;
    weekly: number;
  };
  specifications: {
    [key: string]: string;
  };
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface DateAvailability {
  date: string;
  available: boolean;
  timeSlots: TimeSlot[];
}

export type RentalDuration = 'hourly' | 'daily' | 'weekly';

export interface BookingDetails {
  // startDate: Date | null;
  // endDate: Date | null;
  // startTime: string | null;
  // endTime: string | null;
  // duration: RentalDuration;
  // quantity: number;


  id: string;
  itemId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  totalPrice: number;
}