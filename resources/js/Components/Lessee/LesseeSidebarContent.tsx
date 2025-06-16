import {
  BiSearch,
  BiFile,
  BiCalendar,
  BiLinkAlt,
  BiSolidUserCheck,
} from "react-icons/bi";

import { useState } from "react";
import { TabsList, TabsTrigger } from "@/Components/Lessee/ui/tabs";
import LessorApplyModal from "@/Components/Lessee/Modal/LessorApplyModal";

interface LesseeSidebarContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  submitForm: number; // 0 or 1
}

export default function LesseeSidebarContent({
  setActiveTab,
  activeTab,
  submitForm,
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
    {
      section: "Sign Up form",
      items: [
        { key: "signup", label: "Be A Lessor Now!", icon: <BiSolidUserCheck size={18} /> },
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
        {sidebarTabs.map((section) => (
          <div key={section.section} className="w-full space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase">{section.section}</p>
            {section.items
              .filter((item) => item.label.toLowerCase().includes(search.toLowerCase()))
              .map((item) => {
                const isSignup = item.key === "signup";

                return (
                  <TabsTrigger
                    key={item.key}
                    value={item.key}
                    onClick={() => {
                      if (isSignup) {
                        setIsModalOpen(true);
                      } else {
                        setActiveTab(item.key);
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
