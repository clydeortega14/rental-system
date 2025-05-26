import { RentalItem } from "@/Interface/RentalItems";

export const similarItems: RentalItem[] = [
  {
    id: 2,
    name: 'Mirrorless Camera with Lens',
    description: 'Compact mirrorless camera with 18-55mm lens',
    images: ['https://images.pexels.com/photos/3602258/pexels-photo-3602258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    price: {
      hourly: 15,
      daily: 75,
      weekly: 350
    },
    specifications: {
      'Brand': 'Sony',
      'Model': 'Alpha a7 III',
      'Sensor': 'Full Frame CMOS',
      'Resolution': '24.2 Megapixels'
    },
    category: 'Photography Equipment',
    rating: 4.7,
    reviewCount: 89,
    location: 'Downtown Studio'
  },
  {
    id: 3,
    name: 'Professional Lighting Kit',
    description: 'Studio lighting kit with softboxes and stands',
    images: ['https://images.pexels.com/photos/1051544/pexels-photo-1051544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    price: {
      hourly: 20,
      daily: 90,
      weekly: 400
    },
    specifications: {
      'Type': 'LED',
      'Power': '600W equivalent',
      'Color Temperature': '3200K-5600K adjustable'
    },
    category: 'Photography Equipment',
    rating: 4.5,
    reviewCount: 56,
    location: 'Downtown Studio'
  },
  {
    id: 4,
    name: 'Drone with 4K Camera',
    description: 'Professional drone with stabilized 4K camera',
    images: ['https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    price: {
      hourly: 30,
      daily: 140,
      weekly: 700
    },
    specifications: {
      'Brand': 'DJI',
      'Model': 'Mavic Pro 2',
      'Flight Time': '31 minutes',
      'Range': '8km'
    },
    category: 'Photography Equipment',
    rating: 4.9,
    reviewCount: 72,
    location: 'Downtown Studio'
  }
];