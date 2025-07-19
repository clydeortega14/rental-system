import React from "react";
import { Card, CardContent } from "@/Components/Lessee/ui/card";
import { Star } from "lucide-react";
import { BiCalendarEvent  } from "react-icons/bi";

interface Review {
  id: number;
  property: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsTabProps {
  reviews: Review[];
}

export default function Review({ reviews }: { reviews: any[] }) {
  return (

    <div className="max-w-8xl mx-auto p-6 space-y-6">
      <h1 className="flex items-center text-3xl font-bold mb-6 text-orange-600">
        <BiCalendarEvent  className="w-6 h-6 text-orange-500 mr-2" />
        Your Reviews
      </h1>
      <div className="grid gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{review.property}</h3>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(review.rating) ? "fill-yellow-500" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">{review.rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{review.comment}</p>
            <p className="text-xs text-gray-400">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
