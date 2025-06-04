import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Booking } from '@/types/models';
import { Rating } from '@/types/ratings';
import { RatingType, isRatingType} from '@/types/Rating';

interface Props {
    booking: Booking;
    existingRating?: Rating;
    ratingType: RatingType;
}
interface RatingFormData {
    rating: number;
    review?: string;
    type: RatingType;
    booking_id: number;
}

const RatingForm: React.FC<Props> = ({ booking, existingRating, ratingType }) => {
    const [rating, setRating] = useState(existingRating?.rating || 0);
    const { data, setData, post, processing } = useForm<RatingFormData>({
        rating: existingRating?.rating || 0,
        review: existingRating?.review || '',
        type: ratingType,
        booking_id: booking.id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        if (!isRatingType(data.type)) {
            return;
        }
        e.preventDefault();
        post(route('ratings.store', booking.id));
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
                {existingRating ? 'Update Your Review' : 'Rate Your Experience'}
            </h2>
            
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="type" value={ratingType} />
                
                <StarRating value={rating} onChange={setRating} />
                
                <textarea
                    name="review"
                    value={data.review}
                    onChange={e => setData('review', e.target.value)}
                    className="w-full mt-4 p-2 border rounded"
                    placeholder="Share your experience (optional)"
                    rows={4}
                />
                
                <button
                    type="submit"
                    disabled={processing || rating === 0}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400"
                >
                    {existingRating ? 'Update Review' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

const StarRating = ({ value, onChange }: { value: number; onChange: (val: number) => void }) => (
    <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
            <button
                key={star}
                type="button"
                onClick={() => onChange(star)}
                className={`text-3xl ${star <= value ? 'text-yellow-400' : 'text-gray-300'}`}
            >
                ★
            </button>
        ))}
    </div>
);

export default RatingForm;