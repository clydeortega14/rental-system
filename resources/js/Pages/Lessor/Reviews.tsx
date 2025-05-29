import React, { useState } from "react";
import { Card } from "@/Components/Lessor/ui/card";
import { Button } from "@/Components/Lessor/ui/button";

interface Review {
  id: number;
  lesseeName: string;
  rating: number;
  comment: string;
  date: string;
  reply?: string;
  propertyId: number;
  imageUrl?: string;
}

interface Property {
  id: number;
  name: string;
  image: string;
  reviews: Review[];
}

const mockProperties: Property[] = [
  {
    id: 1,
    name: "Seaside Escape",
    image: "/images/property1.jpg",
    reviews: [
      {
        id: 1,
        lesseeName: "Jane Doe",
        rating: 5,
        comment: "Lovely view and very peaceful!",
        date: "2025-05-01",
        propertyId: 1,
        reply: "Thank you, Jane! We're glad you enjoyed it.",
      },
      {
        id: 2,
        lesseeName: "John Smith",
        rating: 4,
        comment: "Great location, a bit noisy at night though.",
        date: "2025-04-28",
        propertyId: 1,
      },
    ],
  },
  {
    id: 2,
    name: "City Loft",
    image: "/images/property2.jpg",
    reviews: [
      {
        id: 3,
        lesseeName: "Alex Johnson",
        rating: 3,
        comment: "Okay stay, convenient for travel.",
        date: "2025-04-15",
        propertyId: 2,
      },
    ],
  },
];

const calculateAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
};

export default function Reviews() {
  const [properties] = useState<Property[]>(mockProperties);

  // Aggregate all reviews across properties for lessor rating
  const allReviews = properties.flatMap((p) => p.reviews);
  const lessorAvgRating = calculateAverageRating(allReviews);

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-orange-600 mb-8 tracking-tight">
        Reviews & Ratings
      </h1>

      {/* Lessor Overall Rating Summary */}
      <Card className="mb-10 p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Lessor Overall Rating</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-4xl font-bold text-orange-500 tracking-tight">
            {lessorAvgRating.toFixed(1)}
          </div>
          <div className="flex text-yellow-400 text-2xl select-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.round(lessorAvgRating) ? "★" : "☆"}</span>
            ))}
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Based on {allReviews.length} review{allReviews.length !== 1 ? "s" : ""}
          </p>
        </div>
      </Card>

      {/* Properties with their reviews */}
      {properties.map((property) => {
        const avgRating = calculateAverageRating(property.reviews);

        return (
          <Card
            key={property.id}
            className="mb-12 bg-white shadow-lg rounded-xl p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <img
                src={property.image}
                alt={property.name}
                className="w-full max-w-xs h-48 object-cover rounded-lg shadow-md sm:rounded-xl"
                loading="lazy"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{property.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-semibold text-orange-500">
                    {avgRating.toFixed(1)}
                  </span>
                  <div className="flex text-yellow-400 text-xl select-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < Math.round(avgRating) ? "★" : "☆"}</span>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({property.reviews.length} review
                    {property.reviews.length !== 1 ? "s" : ""})
                  </span>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {property.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-t border-gray-200 pt-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h4 className="font-semibold text-gray-800 text-lg">{review.lesseeName}</h4>
                    <div className="flex text-yellow-400 text-lg select-none">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2 leading-relaxed">{review.comment}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {new Date(review.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  {review.reply && (
                    <blockquote className="mt-4 ml-6 p-4 bg-gray-50 border-l-4 border-orange-400 rounded-md text-gray-700 italic">
                      <strong className="block mb-1 text-gray-800">Lessor reply:</strong>
                      {review.reply}
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
