import React from 'react';
import { Star, MapPin } from 'lucide-react';
import Button from './Button';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { formatPrice } from '@/utils/dateUtils';
import { RentalItem } from '@/Interface/RentalItems';
interface CardProps {
  item: RentalItem;
  compact?: boolean;
  link: string;
}


const Card: React.FC<CardProps> = ({ item, compact = false, link }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
      compact ? 'h-full flex flex-col' : ''
    }`}>
      <Link href={link} className="block relative">
        <div className={`w-full ${compact ? 'h-48' : 'h-64'} bg-gray-100`}>
          <img 
            src={item.imageUrl || "/img/banner/default.png"} 
            alt={item.name}
            className="w-full h-full object-contain" 
          />
        </div>

        {item.availability && !item.availability.available && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 m-2 rounded">
            Unavailable
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{item.name}</h3>
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{item.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{item.location}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="font-bold text-lg text-gray-900">{formatPrice(item.price['daily'])}</span>
              <span className="text-gray-500 text-sm">/{item.priceUnit}</span>
            </div>
            <div className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-700">
              {item.category}
            </div>
          </div>
          <Link href={link}>
            <Button 
              variant="primary" 
              fullWidth 
              disabled={item.availability ? !item.availability.available : false}
            >
              {item.availability && item.availability.available ? 'View Details' : 'Not Available'}
            </Button>
          </Link> 
        </div>
      </div>
    </div>
  );
};

export default Card;