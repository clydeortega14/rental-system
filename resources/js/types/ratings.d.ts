import { User, Booking } from './models';
import { PaginatedResults } from './types';

export interface Rating {
    id: number;
    rating: number;
    review: string | null;
    created_at: string;
    updated_at: string;
    booking_id: number;
    rater_id: number;
    ratee_id: number;
    type: 'renter' | 'owner';
    rater: Pick<User, 'id' | 'name' | 'email'>;
}

export interface ExtendedBooking extends Booking {
  ratings: PaginatedResults<Rating>;
  canRate: boolean;
  rental_listing: {
    id: number;
    user_id: number;
    itemName: string;
  };
  category: {
    name: string;
  };
  duration: number;
  formatPickUp: string;
  formatDropOff: string;
  booking_status: {
    name: string;
    background: string;
    text: string;
  };
  partial_total: number;
  service_fee: number;
  total_cost: number;
  completed_at: string | null;
}