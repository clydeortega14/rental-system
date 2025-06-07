// models.d.ts
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  company?: {
    id: number;
    uuid: string;
    name: string;
    tin: string;
    email: string;
  };
}

export interface Booking {
  id: number;
  uuid: string;
  // all your booking fields are added
  user_id: number;
  rental_item_id: number;
  start_date: string;
  end_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_price: number;
  created_at: string;
  updated_at: string;
}

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
}