import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/Lessee/ui/avatar";
import { Star } from "lucide-react";

interface ProfileProps {
  lessee: {
    name: string;
    email: string;
    phone: string;
    image: string;
    rating: number;
    joined: string;
  };
  /** Optional: controls layout mode, 'sidebar' (default) or 'header' (mobile) */
  layout?: "sidebar" | "header";
}

const Profile: React.FC<ProfileProps> = ({ lessee, layout = "sidebar" }) => {
  const isSidebar = layout === "sidebar";

  return (
    <div
      className={`flex flex-col items-center ${
        isSidebar ? "space-y-6 p-8" : "space-y-3 p-4"
      } bg-white rounded-md shadow-sm`}
    >
      <Avatar
        className={isSidebar ? "w-32 h-32" : "w-20 h-20"}
      >
        <AvatarImage src={lessee.image} alt={lessee.name} />
        <AvatarFallback>{lessee.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className={`text-center ${isSidebar ? "text-lg" : "text-sm"}`}>
        <h2 className={`font-bold ${isSidebar ? "text-2xl" : "text-lg"} text-black`}>
          {lessee.name}
        </h2>
        <p className="text-gray-600">{lessee.email}</p>
        <p className="text-gray-600">{lessee.phone}</p>
        <p className="text-gray-500 mt-1">{`Joined ${lessee.joined}`}</p>
      </div>

      <div
        className={`flex items-center justify-center gap-3 ${
          isSidebar ? "mt-auto p-4 border border-orange-300 rounded-md" : "mt-2 p-2 border border-orange-200 rounded-md"
        } bg-white shadow-sm`}
      >
        <Star className={`text-orange-500 ${isSidebar ? "w-7 h-7" : "w-5 h-5"}`} />
        <div className="text-center">
          <p
            className={`font-semibold text-orange-600 ${
              isSidebar ? "text-3xl" : "text-xl"
            }`}
          >
            {lessee.rating.toFixed(1)}
          </p>
          <p className={`text-gray-500 ${isSidebar ? "text-sm" : "text-xs"}`}>
            Overall Rating
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
