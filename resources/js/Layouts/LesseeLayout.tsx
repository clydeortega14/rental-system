import React, { lazy, Suspense, useState, useEffect } from "react";
import { usePage,useRemember,Link  } from "@inertiajs/react";
import { PageProps } from "@/types";
import { BookingDetails } from "@/types/rental";
import { Reservation } from "@/Pages/Lessor/types/ReservationProps";
import {
  LayoutDashboard,
  StarIcon,
  CalendarCheck,
} from "lucide-react";
import { BiSolidUserCheck,BiSolidStore} from "react-icons/bi";

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
  BiLockOpen,
} from "react-icons/bi";
import { join } from "path";

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
  uuid: string;
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

  const mediaPaths = booking.rentalItem?.media_paths;

  let imagePath: string;
  if (Array.isArray(mediaPaths)) {
    imagePath = mediaPaths.length > 0 ? mediaPaths[0] : "";
  } else {
    imagePath = mediaPaths ?? "";
  }

  return {
    id: Number(booking.id) || 0,
    guestName: booking.customerName ?? "Unknown Guest",
    property: booking.rentalItem?.name ?? booking.itemName ?? "Unnamed",
    media_paths: imagePath,
    acquire: `${booking.startDate ?? ""} ${booking.startTime ?? ""}`,
    return: `${booking.endDate ?? ""} ${booking.endTime ?? ""}`,
    status: booking.status,
    location: booking.rentalItem?.location ?? "Unknown location",
    pricePerNight: booking.totalPrice ?? 0,
    description: booking.rentalItem?.description ?? "",
    contactInfo: booking.customerName ?? "Unknown contact",
    hasConflict: false // optional logic if needed
  };
}


export default function LesseeLayout({ defaultTab = "overview" }: LayoutProps) {
  const { bookings, headerData, isApprovedLessor, lessorApplicationStatus, shops: rawShops, auth, categories, rentals,lessorReservations,lessorDashboard } = usePage().props as unknown as Props;
  const [activeTab, setActiveTab] = useState(defaultTab); 
  // const urlParams = new URLSearchParams(window.location.search);
  // const initialTab = urlParams.get('tab') || defaultTab;
  // const [activeTab, setActiveTab] = useState(initialTab);

  const [showLessorModal, setShowLessorModal] = useState(false);
  const { recentActivities } = usePage().props as unknown as Props;

    // Provide fallback to ensure shape
  const shops = rawShops && 'data' in rawShops
  ? rawShops
  : { data: [], current_page: 1, last_page: 1, links: [] };

  const joinedDate = new Date(auth.user.created_at).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const lessee = {
    name: auth.user.name,
    email: auth.user.email,
    phone: auth.user.contact.mobile,
    image: auth.user.avatar ?? "/images/avatar.jpg",
    rating: 4.7,
    joined: joinedDate,
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

  const sidebarTabs = [
    {
      section: "Menu",
      items: [
        { key: "overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
        { key: "bookings", label: "Bookings", icon: <CalendarCheck className="w-5 h-5" /> },
        { key: "reviews", label: "Reviews", icon: <StarIcon className="w-5 h-5" /> },
        { key: "lessorProfile", label: "Settings", icon: <BiCog size={20} /> },
      ],
    },
    {
      section: "Lessor Access",
      items: [
        ...(isApprovedLessor
          ? [
              { key: "lessorDashboard", label: "Dashboard", icon: <BiSolidDashboard size={20} /> },
              { key: "lessorShop", label: "Shop", icon: <BiSolidUserCheck size={20} /> },
              { key: "lessorProperties", label: "Properties", icon: <BiBuildingHouse size={20} /> },
              { key: "lessorReservations", label: "Reservations", icon: <BiCalendarCheck size={20} /> },
              { key: "lessorInvoice", label: "Invoice", icon: <BiReceipt size={20} /> },
              { key: "lessorInquiries", label: "Inquiries", icon: <BiMessageDetail size={20} /> },
              { key: "LessorReviews", label: "Reviews", icon: <BiStar size={20} /> },
            ]
          : [{ key: "signup", label: "Be a Lessor", icon: <BiSolidUserCheck size={20} /> }]),
      ],
    },
  ];

  useEffect(() => {
    const tab = localStorage.getItem('lessee.activeTab');
    if (tab) {
      setActiveTab(tab); // your state logic
      localStorage.removeItem('lessee.activeTab');
    }
  }, []);
  
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
            <div className="mt-4 px-2 flex flex-col gap-2">
              <div className="flex gap-2">
                {/* Rent Now */}
                <Link
                  href="/"
                  className="relative flex-1 flex items-center justify-center bg-brandYellow gap-2 px-4 py-2 text-sm text-white rounded-lg shadow transition overflow-hidden"
                >
                  {/* Shine effect */}
                  {/* <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.6)_30%,rgba(255,255,255,0.8)_50%,rgba(255,255,255,0.6)_70%,transparent)] blur-[4px] animate-shine pointer-events-none" /> */}

                  {/* Icon + label with shrink-on-shine */}
                  <span className="relative z-10 inline-flex items-center gap-2 animate-shrink-during-shine">
                    <BiSolidStore size={18} />
                    <span className="hidden md:inline">Rent Now!</span>
                  </span>
                </Link>

                {/* Be a Lessor (only if not yet approved) */}
                {!isApprovedLessor && (
                  <button
                    type="button"
                    onClick={() => setShowLessorModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm text-white bg-brandYellow hover:bg-orange-700 rounded-lg shadow transition"
                  >
                    <BiSolidUserCheck size={18} />
                    <span className="hidden md:inline">Be a Lessor</span>
                  </button>
                )}

                {/* Logout */}
                <Link
                  href={route("logout")}
                  method="post"
                  as="button"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm text-white rounded-lg shadow transition"
                  style={{ backgroundColor: "#081328" }}
                >
                  <BiLockOpen size={18} />
                  <span className="hidden md:inline">Logout</span>
                </Link>
              </div>
            </div>
            <TabsList className="flex flex-col gap-4 mt-4 px-2">
              {sidebarTabs.map((section, index) => {
                // Skip "Lessor Access" section if not approved
                if (section.section === "Lessor Access" && !isApprovedLessor) {
                  return null; // don't render this section
                }

                return (
                  <div key={index} className="space-y-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase ">{section.section}</p>
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                      {section.items.map((item) => (
                        <TabsTrigger
                          key={item.key}
                          value={item.key}
                          title={item.label}
                          onClick={() => {
                            if (item.key === "signup") {
                              setShowLessorModal(true);
                            } else {
                              setActiveTab(item.key);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                          }}
                          className={`
                            flex flex-col items-center justify-center gap-1 mt-1 px-3 py-2= min-w-[80px]
                            rounded-xl text-sm md:text-base lg:text-lg font-medium shadow-sm border
                            text-gray-600 bg-white border-gray-200
                            data-[state=active]:bg-brandYellow data-[state=active]:text-white data-[state=active]:border-brandYellow
                            hover:bg-orange-50 transition-colors whitespace-nowrap
                          `}
                        >
                          {item.icon}
                          <span className="hidden min-[360px]:inline">{item.label}</span>
                        </TabsTrigger>
                      ))}
                    </div>
                  </div>
                );
              })}
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
                  imageUrl: rental.imageUrl ?? "",
                }))}
              />
              </TabsContent>
              <TabsContent value="lessorReservations" className="h-full">
                <LessorReservations lessorReservations={lessorReservations.map(transformBookingToReservation)} />
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
