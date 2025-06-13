import React, { lazy, Suspense } from "react";
import { usePage } from "@inertiajs/react";
import { PageProps } from '@/types'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/Components/Lessee/ui/tabs";
import {
  LayoutDashboard,
  StarIcon,
  CalendarCheck,
} from "lucide-react";

import Header from "@/Components/Lessee/Header";
import Footer from "@/Components/Lessee/Footer";
import Profile from "@/Components/Lessee/Profile";
import LesseeSidebarContent from "@/Components/Lessee/LesseeSidebarContent";

// const Dashboard = lazy(() => import("@/Pages/Lessee/Dashboard"));
const Overview = lazy(() => import("@/Pages/Lessee/Overview"));
const Bookings = lazy(() => import("@/Pages/Lessee/Bookings"));
const Review = lazy(() => import("@/Pages/Lessee/Review"));

const LesseeLayout = () => {
  const { auth } = usePage().props as unknown as {
    auth: {
      user: {
        id: number;
        name: string;
        email: string;

      };
    };
  };
 const lessee = {
    name: auth.user.name,
    email: auth.user.email,
    phone: "+63 912 345 6789", // You can later fetch this from DB if needed
    image: "/images/avatar.jpg",
    rating: 4.7,
    joined: "March 2023",
    reviews: [
      {
        id: 1,
        property: "Cozy City Apartment",
        rating: 5,
        comment: "Very polite and respectful. Left the place spotless!",
        date: "2025-05-10",
      },
      {
        id: 2,
        property: "Beachfront Villa",
        rating: 4.5,
        comment: "Had great communication. Minor delays in checkout but overall great.",
        date: "2025-04-22",
      },
    ],
    bookings: [
      {
        id: 1,
        property: "Mountain Cabin Retreat",
        date: "2025-06-01 to 2025-06-05",
        status: "Confirmed",
      },
      {
        id: 2,
        property: "Modern Loft",
        date: "2025-04-10 to 2025-04-12",
        status: "Completed",
      },
    ],
    recentActivities: [
      'Booked "Mountain Cabin Retreat" for June 2025',
      'Left a 5-star review for "Cozy City Apartment"',
    ],
  };

  const tabs = [
   
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "bookings", label: "Bookings", icon: CalendarCheck },
    { key: "reviews", label: "Reviews", icon: StarIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
      <Header />

      <Tabs defaultValue="overview" className="flex flex-1 flex-col md:flex-row mt-16">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:flex flex-col w-80 bg-gray-50 border-r border-gray-200 p-6 space-y-6">
          <Suspense fallback={<div className="text-center p-6">Loading profile...</div>}>
            <Profile lessee={lessee} layout="sidebar" />
          </Suspense>

          <LesseeSidebarContent />
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 flex flex-col bg-gray-50 overflow-y-auto p-6">
          {/* Mobile Header */}
          <div className="block md:hidden p-4 bg-gray-50 border-b border-gray-200 shadow-sm">
            <Suspense fallback={<div className="text-center p-6">Loading profile...</div>}>
              <Profile lessee={lessee} layout="header" />
            </Suspense>

            {/* Tabs List for Mobile */}
            <TabsList className="flex mt-4 gap-2 border-b border-gray-200 overflow-x-auto flex-nowrap scrollbar-hide">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.key}
                  value={tab.key}
                  className={`
                    flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium
                    text-gray-600 bg-gray-100
                    data-[state=active]:bg-orange-600 data-[state=active]:text-white
                    hover:bg-orange-100 transition-colors whitespace-nowrap
                  `}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tabs Content */}
          <Suspense fallback={<div className="text-center text-orange-600 py-10">Loading...</div>}>
            {/* <TabsContent value="dashboard" className="h-full">
              <Dashboard auth={auth}/>
            </TabsContent> */}
            <TabsContent value="overview" className="h-full">
              <Overview recentActivities={lessee.recentActivities} />
            </TabsContent>

            <TabsContent value="bookings" className="h-full">
              <Bookings bookings={lessee.bookings} />
            </TabsContent>

            <TabsContent value="reviews" className="h-full">
              <Review reviews={lessee.reviews} />
            </TabsContent>
          </Suspense>
        </section>
      </Tabs>

      <Footer />
    </div>
  );
};

export default LesseeLayout;
