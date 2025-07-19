import React, { lazy, Suspense, useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { BookingDetails } from "@/types/rental";
import { Reservation } from "@/Pages/Lessor/types/ReservationProps";
import {
  LayoutDashboard,
  StarIcon,
  CalendarCheck,
} from "lucide-react";
import { BiSolidUserCheck } from "react-icons/bi";

import Header from "@/Components/Lessee/Header";
import Footer from "@/Components/Lessee/Footer";
import Profile from "@/Components/Lessee/Profile";
import LesseeSidebarContent from "@/Components/Lessee/LesseeSidebarContent";
import LessorApplyModal from "../Components/Lessee/Modals/LessorApplyModal";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/Components/Lessee/ui/tabs";
import {
  BiSolidDashboard,
  BiBuildingHouse,
  BiCalendarCheck,
  BiReceipt,
  BiMessageDetail,
  BiStar,
  BiCog,
} from "react-icons/bi";

const Overview = lazy(() => import("@/Pages/Lessee/Overview"));
const Bookings = lazy(() => import("@/Pages/Lessee/Bookings"));
// const Reservations = lazy(() => import("@/Pages/Reservation/Index"));
const Review = lazy(() => import("@/Pages/Lessee/Review"));
const LesseeSignForm = lazy(() => import("@/Pages/Lessee/LessorSignupForm"));
const LessorDashboard = lazy(() => import("@/Pages/Lessor/Dashboard"));
const LessorProfile = lazy(() => import("@/Pages/User/Profile"));
const LessorProperties = lazy(() => import("@/Pages/Lessor/PropertiesV1"));
const LessorReservations = lazy(() => import("@/Pages/Lessor/Reservations"));
const LessorInvoice = lazy(() => import("@/Pages/Lessor/Invoice"));
const LessorInquiries = lazy(() => import("@/Pages/Lessor/Inquiries"));
const LessorReviews = lazy(() => import("@/Pages/Lessor/Reviews"));
const LessorShop = lazy(() => import("@/Pages/Lessor/Shop"));

export interface Category {
  id: number;
  name: string;
  custom_fields: any[]; // Or use correct field type
}

interface RentalItem {
  id: number;
  name: string;
  description: string; // optional
  categoryId?: number;
  categoryType?: string;
  reservationAmt?: number;
  imageUrl?: string;
  customFieldAnswers?: any;
  address?: string;
  shopId?: number;
}

interface Props extends PageProps {
  bookings: BookingDetails[];
  headerData: { name: string }[];
  isApprovedLessor: boolean;
  lessorApplicationStatus?: 'pending' | 'approved' | 'rejected' | null; 
  shops: {
    data: {
      id: number;
      name: string;
      description?: string;
      location?: string;
      created_at?: string;
    }[];
    current_page: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
  };
  categories: Category[];
  rentals: RentalItem[];
  lessorReservations: BookingDetails[];
    lessorDashboard: {
    lessorName: string;
    incomeSummary: { total: number; monthly: number };
    upcomingReservations: { property: string; date: string; lessee: string }[];
    reservationChartData: { month: string; reservations: number }[];
  } | null;
  recentActivities: {
    id: number;
    message: string;
    status: string;
    date: string;
  }[];
}

interface LayoutProps {
  defaultTab?: string;
  children?: React.ReactNode;
}

function transformBookingToReservation(booking: BookingDetails): Reservation {
  return {
    id: Number(booking.id) || 0,
    guestName: booking.customerName ?? "Unknown Guest",
    property: booking.rentalItem?.name ?? booking.itemName ?? "Unnamed",
    imageUrl: booking.rentalItem?.imageUrl ?? "/placeholder.jpg",
    acquire: `${booking.startDate ?? ""} ${booking.startTime ?? ""}`,
    return: `${booking.endDate ?? ""} ${booking.endTime ?? ""}`,
    status: booking.status,
    location: booking.rentalItem?.location ?? "Unknown location",
    pricePerNight: booking.totalPrice ?? 0,
    description: booking.rentalItem?.description ?? "",
    amenities: [], // optional
    contactInfo: booking.customerName ?? "Unknown contact",
    hasConflict: false // optional logic if needed
  };
}


export default function LesseeLayout({ defaultTab = "overview" }: LayoutProps) {
  const { bookings, headerData, isApprovedLessor, lessorApplicationStatus, shops: rawShops, auth, categories, rentals,lessorReservations,lessorDashboard } = usePage().props as unknown as Props;
  const [activeTab, setActiveTab] = useState(defaultTab); 

  const [showLessorModal, setShowLessorModal] = useState(false);
  const { recentActivities } = usePage().props as unknown as Props;

    // Provide fallback to ensure shape
  const shops = rawShops && 'data' in rawShops
  ? rawShops
  : { data: [], current_page: 1, last_page: 1, links: [] };

  const lessee = {
    name: auth.user.name,
    email: auth.user.email,
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
    recentActivities,
  };


  const tabs = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "bookings", label: "Bookings", icon: CalendarCheck },
    { key: "reservations", label: "Reservations", icon: CalendarCheck },
    { key: "reviews", label: "Reviews", icon: StarIcon },
    ...(!isApprovedLessor ? [
      { key: "lessor", label: "Be a Lessor", icon: BiSolidUserCheck },
    ] : []),
    ...(isApprovedLessor ? [
      { key: "lessorDashboard", label: "Dashboard", icon: BiSolidDashboard },
      { key: "lessorShop", label: "Shop", icon: BiSolidUserCheck },
      { key: "lessorProperties", label: "Properties", icon: BiBuildingHouse },
      { key: "lessorReservations", label: "Reservations", icon: BiCalendarCheck },
       //ongoing --- need backend and ui-----
      { key: "lessorInvoice", label: "Invoice", icon: BiReceipt },
      { key: "lessorInquiries", label: "Inquiries", icon: BiMessageDetail },
      { key: "LessorReviews", label: "Reviews", icon: BiStar },
      { key: "lessorProfile", label: "Account Settings", icon: BiCog },
    ] : []),
  ];

  
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
      <Header />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col md:flex-row mt-16">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-80 bg-gray-50 border-r border-gray-200 p-6 space-y-6">
          <Suspense fallback={<div className="text-center p-6">Loading profile...</div>}>
            <Profile lessee={lessee} layout="sidebar" />
          </Suspense>

          <LesseeSidebarContent activeTab={activeTab} setActiveTab={setActiveTab}  submitForm={auth.user.submitForm} isApprovedLessor={isApprovedLessor}  />
        </aside>

        {/* Main Content */}
        <section className="flex-1 flex flex-col bg-gray-50 overflow-y-auto p-6">
          {/* Mobile Header */}
          <div className="block md:hidden p-4 bg-gray-50 border-b border-gray-200 shadow-sm">
            <Suspense fallback={<div className="text-center p-6">Loading profile...</div>}>
              <Profile lessee={lessee} layout="header" />
            </Suspense>
             {/* <LesseeSidebarContent activeTab={activeTab} setActiveTab={setActiveTab}  submitForm={auth.user.submitForm} /> */}
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

          {/* Tab Content */}
          <Suspense fallback={<div className="text-center text-orange-600 py-10">Loading...</div>}>
           <TabsContent value="overview" className="h-full">
              <Overview recentActivities={recentActivities} />
            </TabsContent>
            <TabsContent value="bookings" className="h-full">
              <Bookings />
            </TabsContent>
            <TabsContent value="lessor" className="h-full">
              {auth.user?.kyc?.kyc_verified === true ? (
                <LesseeSignForm signUser={auth} />
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-20">
                  <h2 className="text-2xl font-semibold text-red-600">KYC Verification Required</h2>
                  <p className="mt-2 text-gray-600 max-w-md">
                    You must complete and get approved for identity verification before becoming a lessor. 
                    Please visit your account settings to upload required documents.
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="reviews" className="h-full">
              <Review reviews={lessee.reviews} />
            </TabsContent>
            {/* Start Lessor Access */}
            <TabsContent value="lessorProfile" className="h-full">
              <LessorProfile />
            </TabsContent>
            <TabsContent value="lessorDashboard" className="h-full">
              {lessorDashboard && <LessorDashboard dashboardData={lessorDashboard} />}
            </TabsContent>
            <TabsContent value="lessorProperties" className="h-full">
           <LessorProperties
              shops={shops}
              categories={categories}
              rentals={rentals.map((rental) => ({
                ...rental,
                categoryId: rental.categoryId ?? null,
                shopId: rental.shopId ?? null,
                description: rental.description ?? "",
                categoryType: rental.categoryType ?? "General",
                reservationAmt: rental.reservationAmt ?? 0,
                imageUrl: rental.imageUrl ?? "/placeholder.jpg",
              }))}
            />
            </TabsContent>
            <TabsContent value="lessorReservations" className="h-full">
              <LessorReservations bookings={lessorReservations.map(transformBookingToReservation)} />
            </TabsContent>
            <TabsContent value="lessorInvoice" className="h-full">
              <LessorInvoice />
            </TabsContent>
            <TabsContent value="lessorInquiries" className="h-full">
              <LessorInquiries />
            </TabsContent>
            <TabsContent value="LessorReviews" className="h-full">
              <LessorReviews />
            </TabsContent>
            <TabsContent value="lessorShop" className="h-full">
              {/* Pass shops to LessorShop */}
              <LessorShop shops={shops} />
            </TabsContent>
              {/* End Lessor Access */}
        </Suspense>
        </section>
      </Tabs>

      {/* Conditionally show your modal */}
      {showLessorModal && (
        <LessorApplyModal
          isOpen={showLessorModal}
          onClose={() => setShowLessorModal(false)}
          onProceed={() => {
            setShowLessorModal(false);
            setActiveTab("lessor");
          }}
          submitForm={auth.user.submitForm}
        />
      )}

      <Footer />
    </div>
  );
}
