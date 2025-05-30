import React, { useState, useEffect, lazy, Suspense } from "react";
import Header from "@/Components/Lessor/Header";
import Footer from "@/Components/Lessor/Footer";

const Dashboard = lazy(() => import("@/Pages/Lessor/Dashboard"));
const Properties = lazy(() => import("@/Pages/Lessor/Properties"));
const Reservations = lazy(() => import("@/Pages/Lessor/Reservations"));
const Invoice = lazy(() => import("@/Pages/Lessor/Invoice"));
const Inquiries = lazy(() => import("@/Pages/Lessor/Inquiries"));
const Reviews = lazy(() => import("@/Pages/Lessor/Reviews"));
const Profile = lazy(() => import("@/Pages/Lessor/Profile"));

interface LessorLayoutProps {
  lessorName?: string;
  incomeSummary?: any;
  upcomingReservations?: any[];
  reservationChartData?: any[];
  ratingsChartData?: any[];
}

export default function LessorLayout({
  lessorName,
  incomeSummary,
  upcomingReservations,
  reservationChartData,
  ratingsChartData,
}: LessorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("Dashboard");

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
  }, [sidebarOpen]);

  const renderContent = () => {
    switch (activeView) {
      case "Dashboard":
        return (
          <Dashboard
            incomeSummary={incomeSummary}
            upcomingReservations={upcomingReservations}
            reservationChartData={reservationChartData}
            ratingsChartData={ratingsChartData}
          />
        );
      case "Properties":
        return <Properties />;
      case "Reservations":
        return <Reservations />;
      case "Invoice":
        return <Invoice />;
      case "Inquiries":
        return <Inquiries isLessorSidebarOpen={sidebarOpen} />;
      case "Reviews":
        return <Reviews />;
      case "Profile":
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="min-h-screen flex flex-col pt-16 bg-gray-100 text-gray-900">
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`
              w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 pt-8
              transition-transform duration-300
              fixed top-16 left-0 h-[calc(100vh-4rem)] z-40
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              md:static md:translate-x-0 md:z-auto md:h-auto md:flex md:flex-col md:justify-between
            `}
          >
            <div>
              <h1 className="text-2xl font-bold text-orange-400 mb-6">
                {lessorName || "Lessor"}
              </h1>
              <nav className="flex flex-col gap-2">
                {[
                  "Dashboard",
                  "Properties",
                  "Reservations",
                  "Invoice",
                  "Inquiries",
                  "Reviews",
                  "Profile",
                ].map((label) => (
                  <button
                    key={label}
                    onClick={() => {
                      setActiveView(label);
                      setSidebarOpen(false);
                    }}
                    className={`text-left text-white hover:bg-orange-500 px-3 py-2 rounded-md ${
                      activeView === label ? "bg-orange-500" : ""
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            <form method="POST" action="/logout" className="mt-6">
              <button
                type="submit"
                className="w-full bg-orange-700 text-white py-2 rounded-md hover:bg-orange-400 transition-colors"
              >
                Logout
              </button>
            </form>
          </aside>

          {/* Main content */}
          <main
            className="flex-1 bg-white overflow-auto p-6 pt-8"
            style={{ overflowX: sidebarOpen ? "hidden" : undefined }}
          >
            <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
              {renderContent()}
            </Suspense>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
