import React, { ReactElement } from "react";
import LessorLayout from "@/Layouts/LessorLayout";
import logoWeb from '@/../../resources/img/logo-web.png';
import { CalendarDays, BarChart3, Wallet } from "lucide-react";
import {
  BiSolidDashboard,
} from "react-icons/bi";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
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

type IncomeSummary = {
  total: number;
  monthly: number;
};

interface DashboardProps {
  dashboardData: {
    incomeSummary: IncomeSummary;
    upcomingReservations: Reservation[];
    reservationChartData: ReservationChartData[];
  };
}

const Dashboard = ({ dashboardData }: DashboardProps) => {
  const {
    incomeSummary = { total: 0, monthly: 0 },
    upcomingReservations = [],
    reservationChartData = [],
  } = dashboardData;

  return (
    <div className="max-w-8xl mx-auto p-6">
      {/* <h1 className="text-3xl font-bold mb-6 text-orange-600">Dashboard</h1> */}
      <h1 className="flex items-center text-3xl font-bold mb-6 text-orange-600">
        <BiSolidDashboard className="w-6 h-6 text-orange-500 mr-2" />
        Dashboard
      </h1>
      

      {/* Income Summary & Upcoming Reservations */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="flex items-center text-xl font-semibold mb-3">
            <Wallet className="w-5 h-5 text-orange-500 mr-2" />
            Income Summary
          </h2>
          <p className="text-4xl font-bold text-green-600">
            &#8369;{incomeSummary.total.toLocaleString()}
          </p>
          <p className="text-gray-600">Total Income</p>
          <p className="mt-2 text-lg">
            &#8369;{incomeSummary.monthly.toLocaleString()} / month
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="flex items-center text-xl font-semibold mb-3">
            <CalendarDays className="w-5 h-5 text-orange-500 mr-2" />
            Upcoming Reservations
          </h2>
          {upcomingReservations.length ? (
            <ul className="space-y-4">
              {upcomingReservations.map((res, i) => (
                <li key={i} className="flex items-center space-x-4 border-b pb-4">
                  {/* Circular image */}
                  <img
                    src={logoWeb}
                    alt={res.property}
                    className="w-16 h-16 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <p className="font-semibold text-lg">{res.property}</p>
                    <p className="text-gray-600 text-sm">
                      {new Date(res.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-gray-700">{res.lessee}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming reservations</p>
          )}
        </div>
      </section>

      {/* Reservation Chart */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="flex items-center text-xl font-semibold mb-4">
            <BarChart3 className="w-5 h-5 text-orange-500 mr-2" />
            Reservations (Last 6 Months)
          </h2>
          {reservationChartData.length ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={reservationChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="reservations"
                  stroke="#f97316"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </section>
    </div>
  );
};

Dashboard.layout = (page: ReactElement) => <LessorLayout>{page}</LessorLayout>;

export default Dashboard;
