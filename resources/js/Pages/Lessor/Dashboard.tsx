import React, { ReactElement } from "react";
import LessorLayout from "@/Layouts/LessorLayout";
import logoWeb from '@/../../resources/img/logo-web.png';
import { CalendarDays, BarChart3, Wallet } from "lucide-react";
import {
  BiSolidDashboard,
} from "react-icons/bi";
import { Card, CardContent } from "@/Components/Lessee/ui/card";


import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
  } = dashboardData || {};


  const kpiSummaryData = [
    {
      title: "Revenue",
      value: "₱19,000",
    },
    {
      title: "Active Rentals",
      value: "18",
    },
    {
      title: "Pending",
      value: "6",
    },
    {
      title: "Available",
      value: "24",
    },
  ];

  const revenueData = [
  { date: "Apr 1", revenue: 4000 },
  { date: "Apr 2", revenue: 3000 },
  { date: "Apr 3", revenue: 5000 },
  { date: "Apr 4", revenue: 7000 },
];

const statusData = [
  { name: "Active", value: 18 },
  { name: "Available", value: 24 },
  { name: "Maintenance", value: 4 },
  { name: "Reserved", value: 6 },
];

const rentalMonitoringData = [
  { name: "Toyota Vios", status: "Active", next: "Apr 5" },
  { name: "Ford Ranger", status: "Available", next: "—" },
]

  return (
    <div className="max-w-8xl mx-auto p-6">
      {/* <h1 className="text-3xl font-bold mb-6 text-orange-600">Dashboard</h1> */}
      <h1 className="flex items-center text-3xl font-bold mb-6 text-brandYellow">
        <BiSolidDashboard className="w-6 h-6 text-brandYellow mr-2" />
        Dashboard
      </h1>
      

      {/* Income Summary & Upcoming Reservations */}
      <section className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {
          kpiSummaryData.map((d_dash: {title: string, value: string}, index: number) => (
              <div key={index} className="bg-white p-6 rounded shadow">
                <h2 className="flex items-center text-xl font-semibold mb-3">
                  {d_dash.title}
                </h2>
                <p className="text-4xl font-bold text-green-600">
                  {d_dash.value}
                </p>
              </div>
          ))
        }

      </section>

      <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
              <h3 className="mb-4 font-semibold">Revenue Trend</h3>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
              <h3 className="mb-4 font-semibold">Rental Status</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey={"value"}
                    outerRadius={80}>
                      {
                        statusData.map((_, i) => (
                          <Cell key={i} />
                        ))
                      }
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="mb-10 grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="p-4">
                <h3 className="mb-4 font-semibold">Rental Monitoring</h3>
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th>Vehicle</th>
                      <th>Status</th>
                      <th>Next Booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentalMonitoringData.map((item, idx) => (
                      <tr key={idx} className="border-t">
                        <td>{item.name}</td>
                        <td>{item.status}</td>
                        <td>{item.next}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </CardContent>
          </Card>
      </section>
    </div>
  );
};

Dashboard.layout = (page: ReactElement) => <LessorLayout>{page}</LessorLayout>;

export default Dashboard;
