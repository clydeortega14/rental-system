import React, { useEffect, useState } from "react";
import { BiFile } from "react-icons/bi";
import { router } from "@inertiajs/react";

interface RecentActivity {
  id: number;
  message: string;
  status: string;
  date?: string;
}

interface OverviewTabProps {
  recentActivities: RecentActivity[];
}

export default function Overview({ recentActivities }: OverviewTabProps) {

  const [highlighted, setHighlighted] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      recentActivities.forEach((activity) => {
        if (Number(activity.status) === 1) {
          router.post(
            route("recent-activities.close", { id: activity.id }),
            {},
            { preserveScroll: true }
          );
        }
      });
    }, 30000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-6">
      <h1 className="flex items-center text-3xl font-bold mb-6 text-jaba-yellow">
        <BiFile className="w-6 h-6 text-jaba-yellow mr-2" />
        Recent Activity
      </h1>

      <ul className="space-y-4">
        {recentActivities.map((activity, index) => {
          const isOrange = Number(activity.status) === 1; // for vibrant orange

          return (
            <li
              key={index}
              className={`
                border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center
                ${isOrange ? "bg-orange-600 text-white" : "bg-white text-gray-800"}
              `}
            >
              <div>
                <p className="text-sm">
                  {activity.message}
                </p>
                {activity.date && (
                  <p className="text-xs mt-1 text-white/90">
                    {new Date(activity.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>

              {activity.status !== "0" && (
                <span
                  className={`mt-2 sm:mt-0 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    isOrange
                      ? "bg-white text-orange-600"
                      : activity.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : activity.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : activity.status === "Review"
                      ? "bg-blue-100 text-blue-700"
                      : activity.status === "Booking"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {activity.status}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
