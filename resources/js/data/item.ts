import { RentalItem } from "@/Interface/RentalItems";

export const rentalItem: RentalItem = {
    id: 1,
    name: 'Professional DSLR Camera Kit',
    description: 'High-end DSLR camera with multiple lenses, perfect for professional photography. Includes a 24-70mm lens, 70-200mm telephoto lens, macro lens, and all necessary accessories like extra batteries, memory cards, and a sturdy tripod. This kit is ideal for portrait, landscape, and event photography.',
    images: [
        'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/3944154/pexels-photo-3944154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
  price: {
    hourly: 25,
    daily: 120,
    weekly: 600
  },
  specifications: {
    'Brand': 'Canon',
    'Model': 'EOS 5D Mark IV',
    'Sensor': 'Full Frame CMOS',
    'Resolution': '30.4 Megapixels',
    'Video': '4K Ultra HD',
    'Weight': '1.76 lbs (800g)',
    'Battery Life': 'Approx. 900 shots',
    'Included Lenses': '24-70mm, 70-200mm, 100mm Macro',
    'Accessories': 'Tripod, 2 Extra Batteries, 64GB Memory Card, Camera Bag'
  },
  category: 'Photography Equipment',
  rating: 4.8,
  reviewCount: 124,
  location: 'Downtown Studio'
}


export const rentalItems: RentalItem[] = [];