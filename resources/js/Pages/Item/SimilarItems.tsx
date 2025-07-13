import { RentalItem } from '@/Interface/RentalItems'
import { formatPrice } from '@/utils/dateUtils';
import { Star } from 'lucide-react';

interface SimilarItemsProps {
    items: RentalItem[];
}

const SimilarItems = ({items}:SimilarItemsProps) => {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-6">You Might Also Like</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="aspect-w-16 aspect-h-9">
              {item.images && <img 
                src={item.images[0]} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />}
            </div>
            <div className="p-4">
              <h4 className="font-medium text-lg mb-1 text-gray-900">{item.name}</h4>
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm ml-1 text-gray-700">{item.rating} ({item.reviewCount})</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">{formatPrice(item.price.daily)}/day</span>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SimilarItems