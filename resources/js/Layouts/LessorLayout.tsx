import React, { useState, useEffect } from "react";

export default function LessorLayout({
  children,
  lessorName,
}: {
  children: React.ReactNode;
  lessorName?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

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
        {/* Sidebar */}
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
                ["#listings", "Properties"],
                ["#reservation", "Reservations"],
                ["#invoice", "Invoice"],
                ["#inquiries", "Inquiries"],
                ["#review", "Reviews"],
                ["#profile", "Profile"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="text-white hover:bg-orange-500 px-3 py-2 rounded-md"
                  onClick={() => setSidebarOpen(false)}
                >
                  {label}
                </a>
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

        {/* Main content */}
        <main
          className="flex-1 p-6 pt-20 bg-white overflow-y-auto min-h-screen md:ml-64"
          style={{ overflowX: sidebarOpen ? "hidden" : undefined }}
        >
          {children}
        </main>
      </div>
    </>
  );
}
