import {
  BiSearch,
  BiFile,
  BiCalendar,
  BiLinkAlt,
  BiSolidUserCheck,
  BiLockOpen,
  BiSolidDashboard,
  BiBuildingHouse,
  BiCalendarCheck,
  BiReceipt,
  BiMessageDetail,
  BiStar,
  BiUserCircle,
} from "react-icons/bi";

import { useState } from "react";
// import { TabsList, TabsTrigger } from "@/Components/Lessee/ui/tabs";
import { TabsList, TabsTrigger } from "@/Components/Lessee/ui/tabs";
import LessorApplyModal from "../../Components/Lessee/modal/LessorApplyModal";
import { Link } from '@inertiajs/react';

interface LesseeSidebarContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  submitForm: number; // 0 or 1
  isApprovedLessor: boolean; // <-- Add this prop
}

export default function LesseeSidebarContent({
  setActiveTab,
  activeTab,
  submitForm,
  isApprovedLessor,
}: LesseeSidebarContentProps) {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sidebarTabs = [
    {
      section: "Menu",
      items: [
        { key: "overview", label: "Overview", icon: <BiFile size={18} /> },
        { key: "bookings", label: "Bookings", icon: <BiCalendar size={18} /> },
        { key: "reviews", label: "Reviews", icon: <BiLinkAlt size={18} /> },
      ],
    },
    ...(!isApprovedLessor
      ? [
          {
            section: "Sign Up form",
            items: [
              { key: "signup", label: "Be A Lessor Now!", icon: <BiSolidUserCheck size={18} /> },
            ],
          },
        ]
      : []),
    ...(isApprovedLessor
      ? [
          {
            section: "Lessor Access",
            items: [
                { key: "lessorDashboard", label: "Dashboard Lessor", icon: <BiSolidDashboard size={18} /> },
                { key: "lessorShop", label: "Shop", icon: <BiStar size={18} /> },
                { key: "lessorProperties", label: "Properties", icon: <BiBuildingHouse size={18} /> },
                { key: "lessorReservations", label: "Reservations", icon: <BiCalendarCheck size={18} /> },
                // { key: "lessorInvoice", label: "Invoice", icon: <BiReceipt size={18} /> },
                // { key: "lessorInquiries", label: "Inquiries", icon: <BiMessageDetail size={18} /> },
                // { key: "lessorReviews", label: "Reviews", icon: <BiStar size={18} /> },
                // { key: "lessorReviews", label: "Profile", icon: <BiUserCircle size={18} /> },
            ],
          },
        ]
      : []),
    {
      section: "Settings",
      items: [
        { key: "logout", label: "Logout", icon: <BiLockOpen size={18} /> },
      ],
    },
  ];

  return (
    <div className="mt-6 space-y-6 text-sm text-gray-700">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <BiSearch size={18} />
        </span>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Sidebar Tabs */}
      <TabsList className="flex flex-col space-y-6 items-start">
        {sidebarTabs.map((section, index) => (
          <div key={`section-${section.section}-${index}`} className="w-full space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase">{section.section}</p>
            {section.items
            .filter((item) => item.label.toLowerCase().includes(search.toLowerCase()))
            .map((item) => {
              const isSignup = item.key === "signup";
              const isLogout = item.key === "logout";

              if (isLogout) {
                return (
                  <Link
                    key={item.key} // ←✅ Add this line
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    <BiLockOpen size={18} />
                    Logout
                  </Link>
                );
              }

              return (
                <TabsTrigger
                  key={item.key}
                  value={item.key}
                  onClick={() => {
                    if (isSignup) {
                      setIsModalOpen(true);
                    } else {
                      setActiveTab(item.key);
                      window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 this line ensures top scroll
                    }
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors
                    ${
                      isSignup
                        ? "bg-orange-100 text-orange-600 hover:bg-orange-200 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-orange-200 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </TabsTrigger>
              );
            })}
          </div>
        ))}
      </TabsList>

      <LessorApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProceed={() => {
          setIsModalOpen(false);
          setActiveTab("lessor"); // <- This must match TabsContent value!
        }}
        submitForm={submitForm} // <-- pass this
      />
    </div>
  );
}
