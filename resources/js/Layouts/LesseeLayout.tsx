import React, { lazy, Suspense } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/Lessee/ui/tabs";
import { LayoutDashboard, StarIcon, CalendarCheck } from "lucide-react";

import Header from "@/Components/Lessee/Header";
import Footer from "@/Components/Lessee/Footer";
import Profile from "@/Components/Lessee/Profile";

const Overview = lazy(() => import("@/Pages/Lessee/Overview"));
const Bookings = lazy(() => import("@/Pages/Lessee/Bookings"));
const Review = lazy(() => import("@/Pages/Lessee/Review"));

const LesseeLayout = () => {
  const lessee = {
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "+63 912 345 6789",
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

      <div className="flex flex-1 mt-16">
        {/* Desktop Sidebar Profile */}
        <aside className="hidden md:flex flex-col w-80 bg-gray-50 border-r border-gray-200 p-8">
          <Suspense fallback={<div className="text-center p-6">Loading profile...</div>}>
            <Profile lessee={lessee} layout="sidebar" />
          </Suspense>
        </aside>

        {/* Main Content */}
        <section className="flex flex-col flex-1 bg-gray-50 relative">
          {/* Mobile Profile (above tabs) */}
          <div className="block md:hidden p-4 bg-gray-50 border-b border-gray-200 shadow-sm">
            <Suspense fallback={<div className="text-center p-6">Loading profile...</div>}>
              <Profile lessee={lessee} layout="header" />
            </Suspense>
          </div>

          <Tabs defaultValue="overview" className="flex flex-col h-full">
            {/* Tabs Navigation */}
            <TabsList
                className="flex px-4 py-3 bg-gray-50 sticky top-[calc(4rem+18px)] z-30 border-b border-gray-200"
                style={{ height: 40 }}
                >
                {tabs.map((tab) => (
                    <TabsTrigger
                    key={tab.key}
                    value={tab.key}
                    className={`
                        flex flex-1 items-center justify-center gap-1 px-3 py-1 rounded-full text-sm font-medium
                        text-gray-600 bg-gray-100
                        data-[state=active]:bg-orange-600 data-[state=active]:text-white
                        hover:bg-orange-100 hover:text-orange-700
                        transition-colors whitespace-nowrap
                        select-none
                    `}
                    >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    </TabsTrigger>
                ))}
                </TabsList>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <Suspense fallback={<div className="text-center text-orange-600 py-10">Loading...</div>}>
                <TabsContent value="overview" className="h-full">
                  <Overview recentActivities={lessee.recentActivities} />
                </TabsContent>

                <TabsContent value="reviews" className="h-full">
                  <Review reviews={lessee.reviews} />
                </TabsContent>

                <TabsContent value="bookings" className="h-full">
                  <Bookings bookings={lessee.bookings} />
                </TabsContent>
              </Suspense>
            </div>
          </Tabs>
        </section>
      </div>

      <Footer />

      <style jsx>{`
        @media (max-width: 767px) {
          /* On mobile, the sticky tabs top = header (64px) + mobile profile height (72px) */
          div[role='tablist'] {
            top: 136px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LesseeLayout;
