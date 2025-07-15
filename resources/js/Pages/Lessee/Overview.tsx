import React from "react";
import { BiFile } from "react-icons/bi";

interface RecentActivity {
  message: string;
  status: string;
  date?: string;
}

interface OverviewTabProps {
  recentActivities: RecentActivity[];
}

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export default function Overview({ recentActivities }: OverviewTabProps) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-6">
    
      <h1 className="flex items-center text-3xl font-bold mb-6 text-orange-600">
        <BiFile className="w-6 h-6 text-orange-500 mr-2" />
        Recent Activity
      </h1>

      <ul className="space-y-4">
        {recentActivities.map((activity, index) => {
          const activityDate = activity.date ? new Date(activity.date) : null;
          const isToday = activityDate ? isSameDay(activityDate, today) : false;
          const isYesterday = activityDate ? isSameDay(activityDate, yesterday) : false;

          return (
            <li
              key={index}
              className={`border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center
                ${!isToday ? "bg-white" : ""}
              `}
              style={
                isToday
                  ? { backgroundColor: "#ea580c", color: "white" }
                  : {}
              }
            >
              <div>
                <p className="text-sm" style={isToday ? { color: "white" } : { color: "#1f2937" }}>
                  {activity.message}
                </p>
                {activity.date && (
                  <p
                    className="text-xs mt-1"
                    style={isToday ? { color: "white" } : { color: "#6b7280" }}
                  >
                    {activityDate?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>

              <span
                className={`mt-2 sm:mt-0 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  activity.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : activity.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : activity.status === "Review"
                    ? "bg-blue-100 text-blue-700"
                    : activity.status === "Booking"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700"
                }`}
                style={
                  isToday
                    ? { backgroundColor: "white", color: "#ea580c" }
                    : {}
                }
              >
                {activity.status}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
