import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type Reservation = {
  property: string;
  date: string;
  lessee: string;
};

type ReservationChartData = {
  month: string;
  reservations: number;
};

type RatingsChartData = {
  rating: string;
  count: number;
};

type IncomeSummary = {
  total: number;
  monthly: number;
};

interface DashboardProps {
  incomeSummary?: IncomeSummary;
  upcomingReservations?: Reservation[];
  reservationChartData?: ReservationChartData[];
  ratingsChartData?: RatingsChartData[];
}

export default function Dashboard({
  incomeSummary = { total: 12000, monthly: 2000 },
  upcomingReservations = [
    { property: "Ocean View Apartment", date: "2025-06-05", lessee: "John Doe" },
    { property: "Downtown Studio", date: "2025-06-12", lessee: "Jane Smith" },
  ],
  reservationChartData = [
    { month: "Dec", reservations: 8 },
    { month: "Jan", reservations: 12 },
    { month: "Feb", reservations: 15 },
    { month: "Mar", reservations: 10 },
    { month: "Apr", reservations: 18 },
    { month: "May", reservations: 20 },
  ],
  ratingsChartData = [
    { rating: "5 Stars", count: 30 },
    { rating: "4 Stars", count: 12 },
    { rating: "3 Stars", count: 5 },
    { rating: "2 Stars", count: 3 },
    { rating: "1 Star", count: 1 },
  ],
}: DashboardProps) {
  console.log("Dashboard props:", {
    incomeSummary,
    upcomingReservations,
    reservationChartData,
    ratingsChartData,
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Dashboard</h1>

      {/* Income Summary */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Income Summary</h2>
          <p className="text-4xl font-bold text-green-600">&#8369;{incomeSummary.total.toLocaleString()}</p>
          <p className="text-gray-600">Total Income</p>
          <p className="mt-2 text-lg">&#8369;{incomeSummary.monthly.toLocaleString()} / month</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Upcoming Reservations</h2>
          {upcomingReservations.length ? (
            <ul className="space-y-3">
              {upcomingReservations.map((res, i) => (
                <li key={i} className="border-b pb-2">
                  <p className="font-semibold">{res.property}</p>
                  <p className="text-gray-600 text-sm">{new Date(res.date).toLocaleDateString()}</p>
                  <p className="text-gray-700">{res.lessee}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming reservations</p>
          )}
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Reservations (Last 6 Months)</h2>
          {reservationChartData.length ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={reservationChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="reservations" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Ratings Distribution</h2>
          {ratingsChartData.length ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ratingsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </section>
    </div>
  );
}
