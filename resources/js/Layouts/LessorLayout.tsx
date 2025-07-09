import React from "react";
import Header from "@/Components/Lessor/Header";
import Footer from "@/Components/Lessor/Footer";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function LessorLayout({ children }: { children: React.ReactNode }) {
  const { props } = usePage();
  const lessorName = props.lessorName ?? "Lessor";

  return (
    <>
      <Header />

      <div className="min-h-screen flex flex-col pt-16 bg-gray-100 text-gray-900">
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 pt-8">
            <div>
              <h1 className="text-2xl font-bold text-orange-400 mb-6">{lessorName}</h1>
              <nav className="flex flex-col gap-2">
                {[
                  { label: "Dashboard", routeName: "lessor.dashboard" },
                  { label: "Shops", routeName: "lessor.shop" },
                  { label: "Properties", routeName: "lessor.properties" },
                  { label: "Reservations", routeName: "lessor.property-reserve" },
                  // { label: "Invoice", routeName: "lessor.invoices" },
                  // { label: "Inquiries", routeName: "lessor.inquiries" },
                  // { label: "Reviews", routeName: "lessor.reviews" },
                  // { label: "Profile", routeName: "lessor.profile" },
                ].map(({ label, routeName }) => (
                  <Link
                    key={label}
                    href={route(routeName)}
                    className="text-white hover:bg-orange-500 px-3 py-2 rounded-md"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            <form method="POST" action="/logout" className="mt-6">
              <button className="w-full bg-orange-700 text-white py-2 rounded-md hover:bg-orange-400">
                Logout
              </button>
            </form>
          </aside>

          <main className="flex-1 bg-white overflow-auto p-6 pt-8">{children}</main>
        </div>

        <Footer />
      </div>
    </>
  );
}
