export type RentalItem = {
  id: number;
  uuid?: string;
  description: string | null;
  name: string;
  role?: string | null;
  category: string;
  imageUrl?: string;
  images?: string[];
  price: {
    hourly: number;
    daily: number;
    weekly: number;
  };
  priceUnit?: string;
  specifications?: {
    [key: string]: string;
  };
  rating: number;
  reviewCount?: number;
  location: string;
  availability?: {
    available: boolean;
  };
  features?: string[];

  // ✅ Add these fields
  region_code?: string;
  province_code?: string;
  city_code?: string;
  barangay_code?: string;
};

export interface IRentalItems {
  items: RentalItem[];
}
