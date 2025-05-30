import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Lessee/ui/card";

interface OverviewTabProps {
  recentActivities: string[];
}

export default function Overview({ recentActivities }: { recentActivities: string[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Recent Activity</h2>

      <ul className="space-y-4">
        {recentActivities.map((activity, index) => (
          <li key={index} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
            <p className="text-gray-800 text-sm">{activity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

