import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/Lessee/ui/avatar";
import { Star, StarHalf, StarOff } from "lucide-react";

interface ProfileProps {
  lessee: {
    name: string;
    email: string;
    phone: string;
    image: string;
    rating: number; // Ex: 4.5
    joined: string;
  };
  layout?: "sidebar" | "header";
}

const Profile: React.FC<ProfileProps> = ({ lessee, layout = "sidebar" }) => {
  const isSidebar = layout === "sidebar";

  // Create star array based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    return (
      <div className="flex items-center gap-0.5 text-orange-500">
        {[...Array(fullStars)].map((_, idx) => (
          <Star key={`full-${idx}`} className="w-4 h-4 fill-orange-500" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-orange-500" />}
        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, idx) => (
          <StarOff key={`empty-${idx}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md transition-all duration-200 
        ${isSidebar ? "p-6 space-y-6" : "p-4 space-y-4 flex items-center gap-4"}`}
    >
      {isSidebar ? (
        <div className="flex justify-center">
          <Avatar className="w-24 h-24 rounded-full">
            <AvatarImage src={lessee.image} alt={lessee.name} />
            <AvatarFallback>{lessee.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <Avatar className="w-16 h-16 rounded-full">
          <AvatarImage src={lessee.image} alt={lessee.name} />
          <AvatarFallback>{lessee.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}

      <div className={`${isSidebar ? "text-center" : "flex-1"}`}>
        <h2 className={`font-semibold ${isSidebar ? "text-xl" : "text-base"} text-gray-800`}>
          {lessee.name}
        </h2>
        <p className="text-sm text-gray-500">{lessee.email}</p>
        <p className="text-sm text-gray-500">{lessee.phone}</p>
        <p className="text-xs text-gray-400 mt-1">{`Joined ${lessee.joined}`}</p>
      </div>

      <div
        className={`flex items-center gap-1 rounded-lg border border-orange-300 bg-orange-50 px-3 py-2
          ${isSidebar ? "justify-center" : "ml-auto"}`}
      >
        <div className="flex items-center gap-1 text-orange-500">
          {renderStars(lessee.rating)}
          <span className="font-bold text-sm text-orange-600">{lessee.rating.toFixed(1)}</span>
          <span className="font-bold text-sm text-orange-600">Nice!</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
