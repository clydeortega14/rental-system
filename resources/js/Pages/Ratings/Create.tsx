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
            <div className="py-8 bg-gray-50 min-h-screen">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="bg-orange-600 py-4 px-6">
                            <h2 className="text-2xl font-bold text-white">
                                {existingRating ? 'Update Your Rental Experience' : 'Rate Your Experience'}
                            </h2>
                            <p className="text-blue-100 mt-1">
                                Share your thoughts about your rental experience
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Your Rating
                                </label>
                                <div className="flex justify-center py-2">
                                    <StarRating 
                                        value={rating} 
                                        onChange={(newRating) => {
                                            setRating(newRating);
                                            setData('rating', newRating);
                                        }} 
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                                    Comments
                                </label>
                                <textarea
                                    id="review"
                                    name="review"
                                    value={data.review}
                                    onChange={e => setData('review', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Tell us about your experience..."
                                    rows={5}
                                />
                            </div>

                            <input type="hidden" name="type" value={data.type} />

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing || rating === 0}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : existingRating ? 'Update Review' : 'Submit Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Star Rating Component
const StarRating = ({ value, onChange }: { value: number; onChange: (val: number) => void }) => (
    <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map(star => (
            <button
                key={star}
                type="button"
                onClick={() => onChange(star)}
                className={`text-4xl ${star <= value ? 'text-yellow-400' : 'text-gray-300'} transition-colors duration-200`}
            >
                ★
            </button>
        ))}
    </div>
);