import React, { useState, useMemo } from "react";
import { Card } from "@/Components/Lessor/ui/card";
import { Button } from "@/Components/Lessor/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Lessor/ui/select";
import { Textarea } from "@/Components/Lessor/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/Lessor/ui/dialog";
import {
  BiStar,
} from "react-icons/bi";

interface Review {
  id: number;
  lesseeName: string;
  rating: number; // Lessee → Lessor
  comment: string;
  date: string;
  reply?: string;
  propertyId: number;
  lesseeRating?: number; // Lessor → Lessee
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
    image: "/images/lease/seaside.jpeg",
    reviews: [
      {
        id: 1,
        lesseeName: "Jane Doe",
        rating: 5,
        comment: "Lovely view and very peaceful!",
        date: "2025-05-01",
        propertyId: 1,
      },
    ],
  },
  {
    id: 2,
    name: "City Loft",
    image: "/images/lease/city_loft.jpg",
    reviews: [
      {
        id: 2,
        lesseeName: "John Smith",
        rating: 4,
        comment: "Great location, a bit noisy at night though.",
        date: "2025-04-28",
        propertyId: 2,
      },
    ],
  },
];

const calculateAverageRating = (
  reviews: Review[],
  key: keyof Review = "rating"
) => {
  const valid = reviews.filter((r) => typeof r[key] === "number");
  if (valid.length === 0) return 0;
  return valid.reduce((sum, r) => sum + (r[key] as number), 0) / valid.length;
};

export default function Reviews() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    properties[0]?.id || null
  );
  const [replyContent, setReplyContent] = useState<Record<number, string>>({});
  const [ratingContent, setRatingContent] = useState<Record<number, number>>({});
  const { toast } = useToast();

  // For confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<{
    reviewId: number;
    propertyId: number;
  } | null>(null);

  const selectedProperty = useMemo(
    () => properties.find((p) => p.id === selectedPropertyId),
    [properties, selectedPropertyId]
  );

  const allReviews = useMemo(
    () => properties.flatMap((p) => p.reviews),
    [properties]
  );

  const lessorAvgRating = useMemo(
    () => calculateAverageRating(allReviews, "rating"),
    [allReviews]
  );

  const proceedSubmit = (reviewId: number, propertyId: number) => {
    const reply = replyContent[reviewId]?.trim();
    const rating = ratingContent[reviewId];

    setProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              reviews: property.reviews.map((r) =>
                r.id === reviewId ? { ...r, reply, lesseeRating: rating } : r
              ),
            }
          : property
      )
    );

    setReplyContent((prev) => {
      const copy = { ...prev };
      delete copy[reviewId];
      return copy;
    });
    setRatingContent((prev) => {
      const copy = { ...prev };
      delete copy[reviewId];
      return copy;
    });

    toast({
      title: "Response Submitted",
      description: "Your reply and rating have been saved.",
    });
  };

  const handleSubmit = (reviewId: number, propertyId: number) => {
    const reply = replyContent[reviewId]?.trim();
    const rating = ratingContent[reviewId];

    if (!rating) {
      toast({
        title: "Missing Rating",
        description: "You have not provided a rating.",
        variant: "destructive",
      });
      setPendingSubmit({ reviewId, propertyId });
      setIsDialogOpen(true);
      return;
    }

    if (!reply) {
      toast({
        title: "Missing Reply",
        description: "You have not provided a reply.",
        variant: "destructive",
      });
      setPendingSubmit({ reviewId, propertyId });
      setIsDialogOpen(true);
      return;
    }

    // All good - proceed immediately
    proceedSubmit(reviewId, propertyId);
  };

  // Confirm dialog handler
  const onConfirm = () => {
    if (pendingSubmit) {
      proceedSubmit(pendingSubmit.reviewId, pendingSubmit.propertyId);
      setPendingSubmit(null);
    }
    setIsDialogOpen(false);
  };

  const onCancel = () => {
    setPendingSubmit(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-6">
      <h1 className="flex items-center text-3xl font-bold mb-6 text-brandYellow">
        <BiStar className="w-6 h-6 text-brandYellow mr-2" />
          Reviews & Ratings
      </h1>

      {/* Lessor Rating (from lessees) */}
      <Card className="mb-10 p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Lessor Overall Rating (from Lessees)
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-4xl font-bold text-orange-500 tracking-tight">
            {lessorAvgRating.toFixed(1)}
          </div>
          <div className="flex text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(lessorAvgRating)
                    ? "fill-yellow-400 stroke-yellow-500"
                    : "stroke-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Property Selector */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-2">Select a Property</h2>
        <Select
          value={selectedPropertyId?.toString()}
          onValueChange={(val) => setSelectedPropertyId(Number(val))}
        >
          <SelectTrigger className="w-full max-w-sm">
            <SelectValue placeholder="Choose property" />
          </SelectTrigger>
          <SelectContent>
            {properties.map((property) => (
              <SelectItem key={property.id} value={property.id.toString()}>
                {property.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Reviews Section */}
      {selectedProperty && (
        <Card className="bg-white shadow-lg rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <img
              src={selectedProperty.image}
              alt={selectedProperty.name}
              className="w-full max-w-xs h-48 object-cover rounded-lg shadow-md"
              loading="lazy"
            />
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {selectedProperty.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xl text-orange-500 font-medium">
                  {calculateAverageRating(selectedProperty.reviews).toFixed(1)}
                </span>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i <
                        Math.round(calculateAverageRating(selectedProperty.reviews))
                          ? "fill-yellow-400 stroke-yellow-500"
                          : "stroke-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {selectedProperty.reviews.map((review) => {
              const userReply = replyContent[review.id] || "";
              const userRating = ratingContent[review.id] || 0;
              const hasReplied = review.reply && review.lesseeRating;

              return (
                <div key={review.id} className="border-t pt-6 border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {review.lesseeName}
                    </h4>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? "fill-yellow-400 stroke-yellow-500"
                              : "stroke-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(review.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  {hasReplied ? (
                    <div className="mt-4 space-y-2">
                      <blockquote className="bg-gray-50 p-4 border-l-4 border-orange-400 rounded-md text-gray-700 italic">
                        <strong className="block text-gray-800 mb-1">
                          Lessor reply:
                        </strong>
                        {review.reply}
                      </blockquote>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">You rated the lessee:</span>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (review.lesseeRating || 0)
                                  ? "fill-yellow-400 stroke-yellow-500"
                                  : "stroke-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-2">
                      <Textarea
                        placeholder="Write your reply..."
                        value={userReply}
                        onChange={(e) =>
                          setReplyContent((prev) => ({
                            ...prev,
                            [review.id]: e.target.value,
                          }))
                        }
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Rate this Lessee:</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              aria-label={`Rate ${i + 1} star`}
                              onClick={() =>
                                setRatingContent((prev) => ({
                                  ...prev,
                                  [review.id]: i + 1,
                                }))
                              }
                              className="cursor-pointer"
                            >
                              <Star
                                className={`h-5 w-5 ${
                                  i < userRating
                                    ? "fill-yellow-400 stroke-yellow-500"
                                    : "stroke-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleSubmit(review.id, selectedProperty.id)}
                        disabled={!userReply.trim() && ratingContent[review.id] === 0}
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              You are submitting without providing{" "}
              {!ratingContent[pendingSubmit?.reviewId || 0] ? "a rating" : ""}{" "}
              {!replyContent[pendingSubmit?.reviewId || 0] ? "a reply" : ""}.
              Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onConfirm}>Yes, Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
