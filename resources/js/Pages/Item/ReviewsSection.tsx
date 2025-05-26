import React from 'react'
import { Star } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  content: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Alex Johnson',
    rating: 5,
    date: '2023-04-15',
    content: 'Excellent camera! The lenses were in perfect condition and the pictures came out amazing. Will definitely rent again.'
  },
  {
    id: '2',
    userName: 'Maya Roberts',
    rating: 4,
    date: '2023-03-22',
    content: 'Great camera kit with everything I needed for my photoshoot. The battery life was impressive. Only reason for 4 stars is that one of the lens caps was missing.'
  },
  {
    id: '3',
    userName: 'Daniel Kim',
    rating: 5,
    date: '2023-02-10',
    content: 'Top quality equipment and very easy rental process. The camera was clean and well-maintained. The included tripod was very sturdy.'
  }
];

interface ReviewSectionProps {
    rating: number;
    reviewCount: number;
}


const ReviewsSection = ({rating, reviewCount}:ReviewSectionProps) => {

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
        <Star 
            key={i} 
            className={`w-4 h-4 ${
            i < Math.floor(rating) 
                ? 'text-yellow-500 fill-yellow-500' 
                : i < rating 
                ? 'text-yellow-500 fill-yellow-500 opacity-50' 
                : 'text-gray-300'
            }`} 
        />
        ));
    };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Reviews</h3>
        <div className="flex items-center">
          <div className="flex mr-2">
            {renderStars(rating)}
          </div>
          <span className="text-gray-700">{rating} out of 5 ({reviewCount} reviews)</span>
        </div>
      </div>

      <div className="space-y-6">
        {mockReviews.map(review => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">{review.userName}</div>
                <div className="flex items-center mt-1">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm text-gray-600">{formatDate(review.date)}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mt-2">{review.content}</p>
          </div>
        ))}
        
        <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300">
          View all {reviewCount} reviews
        </button>
      </div>
    </div>
  )
}

export default ReviewsSection