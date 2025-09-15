import { Category } from "@/Interface/CategoryInterface";

export interface RentalItem {
  id?: string;
  name: string;
  description: string;
  images?: string[];
  rentalPrice?: string;
  price: {
    hourly: number;
    daily: number;
    weekly: number;
  };
  specifications?: {
    [key: string]: string;
  };
  category: Category;
  rating: number;
  reviewCount: number;
  location: string;
  itemName?: string;
  quantity?: number | null
  imageUrl?: string;
  priceUnit?: string;
  media_paths?: string[];
  shopId?: number
  shopName?: string;
  shopLocation?: string;

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

export type RentalDuration = 'hourly' | 'daily' | 'weekly' | 'days' | undefined;

export interface BookingDetails {
  id?: string;
  uuid?: string | null;
  itemId?: string;
  itemName?: string,
  userId?: string;
  customerId?: string;
  customerName?: string;
  startDate?: string | null;
  startTime?: string | null;
  endDate?: string | null;
  endTime?: string | null;
  returnTime?: string | null;
  service_fee?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'reserved' | 'returning';
  totalPrice?: number;
  rentalPrice?: string;
  duration?: number;
  duration_type?: 'hourly' | 'daily' | 'weekly' | 'days',
  quantity?: number;
  rentalItem?: RentalItem;
  category?: {
    id: number;
    name: string;
  }
}


export interface BookingSession {
  startDate: Date;
  endDate: Date;
  startTime: Date | string;
  endTime: Date | string;
  returnTime: string;
  duration: number;
  category: Category;
  rental_listing: {
    id: number;
    itemName: string;
    description: string; 
    price: number;
  };
  status: {
    id: number;
    name: string;
  };
  partial_total: number;
  duration_quantity: number;
}