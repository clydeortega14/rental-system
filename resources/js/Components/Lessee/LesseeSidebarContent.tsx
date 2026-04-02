import {
  BiSearch,
  BiFile,
  BiCalendar,
  BiSolidUserCheck,
  BiLockOpen,
  BiSolidDashboard,
  BiBuildingHouse,
  BiCalendarCheck,
  BiReceipt,
  BiMessageDetail,
  BiStar,
  BiSolidStore,
  BiUserCircle,
  BiCalendarEvent,
  BiCog
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
    // {
    //   section: "Menu",
    //   items: [
    //     { key: "overview", label: "Overview", icon: <BiFile size={18} /> },
    //     { key: "bookings", label: "Bookings", icon: <BiCalendar size={18} /> },
    //     { key: "reviews", label: "Reviews", icon: <BiCalendarEvent size={18} /> },
    //     { key: "lessorInquiries", label: "Inquiries", icon: <BiMessageDetail size={18} /> },
    //     { key: "lessorProfile", label: "Account Settings", icon: <BiCog size={18} /> },
    //   ],
    // },
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
          section: "Main Menu",
          items: [
            { key: "lessorDashboard", label: "Dashboard", icon: <BiSolidDashboard size={18} />, route: route('lessee.profile') },
            // { key: "lessorShop", label: "Shop", icon: <BiSolidStore size={18} /> },
            { key: "lessorProperties", label: "Properties", icon: <BiBuildingHouse size={18}/>, route: route('lessor.properties')  },
            { key: "lessorReservations", label: "Reservations", icon: <BiCalendarCheck size={18} /> },
            //ongoing --- need backend and ui-----
            { key: "lessorInvoice", label: "Invoice", icon: <BiReceipt size={18} /> },
            { key: "LessorReviews", label: "Reviews", icon: <BiStar size={18} /> },
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
      {/* Rent Now button replacing search */}
      <div className="mb-4 flex justify-center">
        <div className="w-full max-w-xs">
          <Link
            href="/"
            className="relative w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-[#081328] hover:bg-[#0d1f4a] text-white rounded-lg font-semibold transition shadow overflow-hidden"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.6)_30%,rgba(255,255,255,0.8)_50%,rgba(255,255,255,0.6)_70%,transparent)] blur-[4px] animate-shine pointer-events-none" />

            {/* Content with shrink effect */}
            <span className="relative z-10 inline-flex items-center gap-2 animate-shrink-during-shine">
              <BiSolidStore size={18} />
              <span>Hot Rentals — Book Now!</span>
            </span>
          </Link>
        </div>
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
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors bg-jaba-yellow text-black hover:bg-jaba-hover"
                    >
                      <BiLockOpen size={18} />
                      Logout
                    </Link>
                  );
                }

                return (
                  <Link href={item.route}>
                    <TabsTrigger
                      key={item.key}
                      value={item.key}
                      onClick={() => {
                        if (item.key === "signup") {
                          setIsModalOpen(true);
                        } else {
                          setActiveTab(item.key);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className={`
                      relative w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors overflow-hidden
                      ${isSignup
                          ? "bg-brandYellow text-white hover:bg-jaba-hover data-[state=active]:bg-brandYellow data-[state=active]:text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-jaba-hover data-[state=active]:bg-brandYellow data-[state=active]:text-white"
                        }
                    `}
                      title={item.label}
                    >
                      
                      {isSignup && (
                        <>
                          {/* Shine effect only for signup */}
                          {/* <span className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.6)_30%,rgba(255,255,255,0.8)_50%,rgba(255,255,255,0.6)_70%,transparent)] blur-[4px] animate-shine" /> */}

                          {/* Shrink-wrapper synced with shine */}
                          <span className="relative z-10 inline-flex items-center gap-2 animate-shrink-during-shine">
                            {item.icon}
                            <span className="truncate">{item.label}</span>
                          </span>
                        </>
                      )}
                      {!isSignup && (
                        <>
                          {item.icon}
                          <span className="truncate">{item.label}</span>
                        </>
                      )}
                    </TabsTrigger>
                  </Link>
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
