import { Category } from "@/Interface/CategoryInterface";

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
  category: Category;
  rating: number;
  reviewCount: number;
  location: string;
  itemName: string;
  quantity: number | null
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
  id?: string;
  itemId?: string;
  userId?: string;
  startDate?: Date | null;
  startTime?: String | null;
  endDate?: Date | null;
  endTime?: Date | null;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  totalPrice?: number;
  duration?: 'hourly' | 'daily' | 'weekly';
  quantity?: number;
}