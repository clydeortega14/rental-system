import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/Lessee/ui/avatar";
import { Star, StarHalf, StarOff } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

interface ProfileProps {
  lessee?: {
    name: string;
    email: string;
    phone: string;
    image: string;
    rating: number;
    joined: string;
  };
  layout?: "sidebar" | "header";
}

const Profile: React.FC<ProfileProps> = ({ layout = "sidebar" }) => {

  const { auth } = usePage<PageProps>().props as any;

  const user = auth.user;

  const isSidebar = layout === "sidebar";

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
      p-4 sm:p-6 ${isSidebar ? "space-y-4 text-center" : "flex flex-col sm:flex-row items-center gap-4"}`}
    >
      <Avatar className={`${isSidebar ? "w-24 h-24 mx-auto" : "w-20 h-20 sm:w-24 sm:h-24"}`}>
        <AvatarImage src={ user.avatar ?? '/images/avatar.jpg'} alt={user.name} />
        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className={`${isSidebar ? "" : "flex-1 text-center sm:text-left"}`}>
        <h2 className={`font-semibold text-gray-800 ${isSidebar ? "text-xl" : "text-lg sm:text-xl"}`}>
          {user.name}
        </h2>
        {/* <p className="text-sm text-gray-500 break-words">{user.email}</p> */}
        {/* <p className="text-sm text-gray-500 break-words">{user.contact.mobile}</p> */}
        {/* <p className="text-xs text-gray-400 mt-1">{`Joined ${user.created_at}`}</p> */}
      </div>
    </div>
  );
};

export default Profile;
