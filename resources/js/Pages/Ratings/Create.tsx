import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { RatingType } from '@/types/Rating';
import { PageProps } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Props extends PageProps {
    booking: {
        id: number;
        rentalListing: {
            user: {
                id: number;
            };
        };
    };
    ratingTypes: RatingType[];
    existingRating?: {
        rating?: number;
        review?: string;
    };
}

export default function Create({ auth, booking, ratingTypes, existingRating }: Props) {
    if (!booking || !booking.rentalListing) {
        return <div>Loading booking data...</div>;
    }
    const [rating, setRating] = useState(existingRating?.rating || 0);
    const { data, setData, post, processing } = useForm({
        rating: existingRating?.rating || 0,
        review: existingRating?.review || '',
        type: ratingTypes[0],
        booking_id: booking.id,
        ratee_id: booking.rentalListing.user.id
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('ratings.store', { booking: booking.id }));
    };

    return (
        <AuthenticatedLayout user={auth.user as import("c:/xampp/htdocs/rental-system/resources/js/types/index").User}>
            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            {existingRating ? 'Update Your Review' : 'Rate Your Experience'}
                        </h2>
                        
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="type" value={data.type} />
                            
                            <StarRating 
                                value={rating} 
                                onChange={(newRating) => {
                                    setRating(newRating);
                                    setData('rating', newRating);
                                }} 
                            />
                            
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
                                {processing ? 'Submitting...' : (existingRating ? 'Update Review' : 'Submit Review')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

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