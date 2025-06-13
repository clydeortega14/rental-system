import {
  BiSearch,
  BiLayout,
  BiFile,
  BiCalendar,
  BiLinkAlt,
  BiEnvelope,
  BiMessage,
  BiCandles,
  BiSolidBookmarks,
} from "react-icons/bi";
import { useState } from "react";
import { TabsList, TabsTrigger } from "@/Components/Lessee/ui/tabs";

export default function LesseeSidebarContent() {
  const [search, setSearch] = useState("");

  // Define the tabs you want to use
  const sidebarTabs = [
    // {
    //   section: "Main",
    //   items: [
    //     { key: "dashboard", label: "Dashboard", icon: <BiLayout size={18} /> },
    //   ],
    // },
    {
      section: "Menu",
      items: [
        { key: "overview", label: "Overview", icon: <BiFile size={18} /> },
        { key: "bookings", label: "Bookings", icon: <BiCalendar size={18} /> },
        { key: "reviews", label: "Reviews", icon: <BiLinkAlt size={18} /> },
        
      ],
    },
    // {
    //   section: "Support",
    //   items: [
    //     { key: "enquiries", label: "Enquiries", icon: <BiEnvelope size={18} /> },
    //     { key: "messages", label: "Contact Messages", icon: <BiMessage size={18} /> },
    //     { key: "announcements", label: "Announcements", icon: <BiCandles size={18} /> },
    //     { key: "tickets", label: "Tickets", icon: <BiSolidBookmarks size={18} /> },
    //   ],
    // },
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

      {/* Sidebar Tabs List */}
      <TabsList className="flex flex-col space-y-6 items-start">
        {sidebarTabs.map((section) => (
          <div key={section.section} className="w-full space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase">{section.section}</p>
            {section.items
              .filter((item) =>
                item.label.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
                <TabsTrigger
                  key={item.key}
                  value={item.key}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-gray-600
                    bg-gray-100 hover:bg-orange-200 transition-colors
                    data-[state=active]:bg-orange-600 data-[state=active]:text-white
                  `}
                >
                  {item.icon}
                  {item.label}
                </TabsTrigger>
              ))}
          </div>
        ))}
      </TabsList>
    </div>
  );
}
