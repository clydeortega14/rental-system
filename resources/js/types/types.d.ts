import { User } from './models';

declare global {
  // Pagination interface
  interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
  }
  interface PaginatedResults<T> {
    data: T[];
    links: PaginationLink[];
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  }
}

  // Rating interface
  interface Rating {
    id: number;
    rating: number;
    review: string | null;
    created_at: string;
    updated_at: string;
    booking_id: number;
    rater_id: number;
    ratee_id: number;
    type: 'renter' | 'owner';
    rater: User;
  }

  // Booking interface
  interface Booking {
    id: number;
    uuid: string;
    // ... all the booking fields ...
    ratings: PaginatedResults<Rating>;
    canBeRated: boolean;
    rental_listing: {
      id: number;
      user_id: number;
      itemName: string;
    };
  }

  // Export all types
  export {
    PaginationLink,
    PaginatedResults,
    Rating,
    Booking
  };

  // Extend Inertia's default PageProps
declare module '@inertiajs/react' {
  interface PageProps {
    auth: {
      user: User;
    };
    flash: {
      success?: string;
      error?: string;
      warning?: string;
      info?: string;
      old?: Record<string, unknown>;
    };
    errors: Record<string, string>;
  }
}