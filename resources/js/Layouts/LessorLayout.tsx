import React, { useState, useEffect, lazy, Suspense } from "react";

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
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-4 text-orange-600 rounded-md shadow-md"
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <div className="min-h-screen flex bg-gray-100 text-gray-900">
        <aside
          className={`
            fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 p-6 pt-20 text-white
            transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            md:flex md:flex-col md:justify-between
            md:z-40
          `}
        >
          <div>
            <h1 className="text-2xl font-bold text-orange-400 mb-6">
              {lessorName ? `${lessorName}'s Dashboard` : "Lessor"}
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
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-400 transition-colors"
            >
              Logout
            </button>
          </form>
        </aside>

        <main
          className="flex-1 p-6 pt-20 bg-white overflow-y-auto min-h-screen md:ml-64"
          style={{ overflowX: sidebarOpen ? "hidden" : undefined }}
        >
          <Suspense
            fallback={
              <div className="text-center text-gray-500">Loading...</div>
            }
          >
            {renderContent()}
          </Suspense>
        </main>
      </div>
    </>
  );
}
