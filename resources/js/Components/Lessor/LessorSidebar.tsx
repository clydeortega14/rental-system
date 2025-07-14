import React from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

interface Props {
  lessorName?: string;
}

export default function LessorSidebar({ lessorName = "Lessor" }: Props) {
  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 pt-8 hidden md:block">
      <div>
        <h1 className="text-2xl font-bold text-orange-400 mb-6">{lessorName}</h1>
        <nav className="flex flex-col gap-2">
          {[
            { label: "Dashboard", routeName: "lessor.dashboard" },
            { label: "Shops", routeName: "lessor.shop" },
            { label: "Properties", routeName: "lessor.properties" },
            { label: "Reservations", routeName: "lessor.property-reserve" },
            // Uncomment if needed later
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
  );
}
