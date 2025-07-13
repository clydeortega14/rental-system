import { RentalItem } from "@/Interface/RentalItems";
import { formatPrice } from "@/utils/dateUtils";

// Mock data for rental items
export const rentalItems: RentalItem[] = [
  {
    id: 1,
    name: 'Premium DSLR Camera',
    description: 'High-resolution professional DSLR camera perfect for photography enthusiasts and professionals.',
    category: 'Electronics',
    price: {
      hourly: 0,
      daily: 0,
      weekly: 0
    },
    priceUnit: 'day',
    imageUrl: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    availability: {
      available: true,
    },
    features: ['24.2MP sensor', '4K video recording', 'Built-in Wi-Fi', 'Weather-sealed body'],
    location: 'San Francisco, CA'
  },
  {
    id: 2,
    name: 'Mountain Bike - Pro Series',
    description: 'Professional mountain bike suitable for rough terrains and long trails.',
    category: 'Sports',
    price: {
      hourly: 0,
      daily: 0,
      weekly: 0
    },
    priceUnit: 'day',
    imageUrl: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    availability: {
      available: true,
    },
    features: ['Aluminum frame', '27-speed', 'Hydraulic disc brakes', 'Front suspension'],
    location: 'Denver, CO'
  },
  {
    id: 3,
    name: 'Luxury Cabin Retreat',
    description: 'Beautiful cabin in the woods with modern amenities and breathtaking views.',
    category: 'Real Estate',
    price: {
      hourly: 0,
      daily: 0,
      weekly: 0
    },
    priceUnit: 'day',
    imageUrl: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    availability: {
      available: true,
    },
    features: ['2 bedrooms', 'Hot tub', 'Fireplace', 'Full kitchen', 'WiFi'],
    location: 'Aspen, CO'
  },
  {
    id: 4,
    name: 'Projector - 4K Ultra HD',
    description: 'State-of-the-art 4K projector perfect for home theaters and business presentations.',
    category: 'Electronics',
    price: {
      hourly: 0,
      daily: 0,
      weekly: 0
    },
    priceUnit: 'day',
    imageUrl: 'https://images.pexels.com/photos/1782146/pexels-photo-1782146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    availability: {
      available: false,
    },
    features: ['4K resolution', 'HDR support', '3000 lumens brightness', 'Bluetooth audio'],
    location: 'Seattle, WA'
  },
  {
    id: 5,
    name: 'Event Space - Modern Loft',
    description: 'Spacious loft venue perfect for events, parties, and corporate functions.',
    category: 'Real Estate',
    price: {
      hourly: 0,
      daily: 0,
      weekly: 0
    },
    priceUnit: 'day',
    imageUrl: 'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    availability: {
      available: true,
    },
    features: ['3000 sq ft', 'Sound system', 'Catering options', 'Rooftop access', 'Parking'],
    location: 'New York, NY'
  },
  {
    id: 6,
    name: 'Kayak - Tandem',
    description: 'Two-person kayak perfect for exploring lakes and calm rivers.',
    category: 'Sports',
    price: {
      hourly: 0,
      daily: 0,
      weekly: 0
    },
    priceUnit: 'day',
    imageUrl: 'https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    availability: {
      available: true,
    },
    features: ['Stable design', 'Comfortable seats', 'Storage compartments', 'Paddles included'],
    location: 'Austin, TX'
  }
];