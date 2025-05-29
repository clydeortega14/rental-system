import React from "react";
import LessorLayout from "@/Layouts/LessorLayout";
import { Card, CardContent } from "@/Components/Lessor/ui/card";
import { Button } from "@/Components/Lessor/ui/button";
import { MoreHorizontal, CheckCircle, Clock, XCircle } from "lucide-react";

const reservationsData = [
  {
    id: 1,
    guestName: "John Doe",
    property: "Cozy Apartment Downtown",
    checkIn: "2025-06-01",
    checkOut: "2025-06-05",
    status: "Confirmed",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    property: "Beachfront Villa",
    checkIn: "2025-06-10",
    checkOut: "2025-06-15",
    status: "Pending",
  },
  {
    id: 3,
    guestName: "Mike Johnson",
    property: "Mountain Cabin",
    checkIn: "2025-07-01",
    checkOut: "2025-07-07",
    status: "Cancelled",
  },
];

const statusBadge = (status: string) => {
  const base = "inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full";
  switch (status) {
    case "Confirmed":
      return (
        <span className={`${base} bg-green-100 text-green-700`}>
          <CheckCircle className="w-4 h-4" /> Confirmed
        </span>
      );
    case "Pending":
      return (
        <span className={`${base} bg-yellow-100 text-yellow-800`}>
          <Clock className="w-4 h-4" /> Pending
        </span>
      );
    case "Cancelled":
      return (
        <span className={`${base} bg-red-100 text-red-700`}>
          <XCircle className="w-4 h-4" /> Cancelled
        </span>
      );
    default:
      return status;
  }
};

export default function Reservations() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-orange-600">Bookings</h1>
        <Button className="bg-orange-600 text-white hover:bg-orange-500">Export CSV</Button>
      </div>

      <Card className="bg-white shadow-sm rounded-xl">
        <CardContent className="p-0 overflow-x-auto">
          <table className="min-w-full text-sm table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="py-3 px-6 text-left">Guest</th>
                <th className="py-3 px-6 text-left">Property</th>
                <th className="py-3 px-6 text-left">Check-In</th>
                <th className="py-3 px-6 text-left">Check-Out</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reservationsData.map((res) => (
                <tr key={res.id} className="hover:bg-orange-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{res.guestName}</td>
                  <td className="px-6 py-4 text-gray-700">{res.property}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(res.checkIn).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(res.checkOut).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{statusBadge(res.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => alert(`Viewing reservation ${res.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={res.status !== "Pending"}
                        onClick={() => alert(`Confirm reservation ${res.id}`)}
                      >
                        Confirm
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {reservationsData.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500 italic">
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
