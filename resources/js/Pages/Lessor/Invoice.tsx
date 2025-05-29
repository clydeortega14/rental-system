import React from "react";
import LessorLayout from "@/Layouts/LessorLayout";
import { Card, CardContent } from "@/Components/Lessor/ui/card";
import { Button } from "@/Components/Lessor/ui/button";

// Wallet icon SVG (Heroicons - Wallet)
const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-green-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 9V7a4 4 0 00-8 0v2m8 0a2 2 0 002 2h2a2 2 0 012 2v5a2 2 0 01-2 2h-2a2 2 0 01-2-2m0-7H7m10 0v7m-4-3v.01"
    />
  </svg>
);

const invoiceData = {
  invoiceNumber: "APP-INV-20250529-001",
  invoiceDate: "2025-05-29",
  lessorName: "John Doe",
  lessorEmail: "john@example.com",
  platformName: "Rentify Enterprise Inc.",
  platformEmail: "support@rentify.com",
  items: [
    { description: "Monthly Subscription Fee", period: "May 2025", amount: 50.0 },
    { description: "Commission on Bookings", period: "May 2025", amount: 125.75 },
    { description: "Service Charges", period: "May 2025", amount: 15.0 },
  ],
  totalAmount: 190.75,
  status: "Due",
};

// Example wallet data
const walletData = {
  balance: 250.0,
  autoDeduct: true,
  lastDeposit: {
    date: "2025-05-20",
    amount: 300.0,
    from: "Lessee John Smith",
  },
};

const invoiceHistory = [
  {
    invoiceNumber: "APP-INV-20250429-001",
    date: "2025-04-29",
    amount: 180.0,
    status: "Paid",
  },
  {
    invoiceNumber: "APP-INV-20250329-001",
    date: "2025-03-29",
    amount: 165.5,
    status: "Paid",
  },
];

export default function Invoice() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-orange-600">Billing Statement</h1>

      {/* Wallet Summary Section */}
      <Card className="shadow-md">
        <CardContent className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <WalletIcon />
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Wallet Balance</h2>
              <p className="text-2xl font-bold text-green-600">${walletData.balance.toFixed(2)}</p>
              {walletData.autoDeduct && (
                <p className="text-sm text-gray-500 mt-1">
                  Invoice total of <strong>${invoiceData.totalAmount.toFixed(2)}</strong> will be
                  automatically deducted from your wallet.
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1 italic">
                Last deposit: ${walletData.lastDeposit.amount.toFixed(2)} from {walletData.lastDeposit.from} on {walletData.lastDeposit.date}
              </p>
            </div>
          </div>

          <Button className="bg-orange-600 hover:bg-orange-500 text-white whitespace-nowrap">
            Top Up Wallet
          </Button>
        </CardContent>
      </Card>

      {/* Current Invoice Section */}
      <Card className="shadow-md">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-6">
            <div>
              <h2 className="font-semibold text-lg">Invoice To:</h2>
              <p>{invoiceData.lessorName}</p>
              <p className="text-sm text-gray-600">{invoiceData.lessorEmail}</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg">From:</h2>
              <p>{invoiceData.platformName}</p>
              <p className="text-sm text-gray-600">{invoiceData.platformEmail}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
            <p><strong>Date:</strong> {invoiceData.invoiceDate}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${
                  invoiceData.status === "Paid"
                    ? "bg-green-100 text-green-800"
                    : invoiceData.status === "Due"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {invoiceData.status}
              </span>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Description</th>
                  <th className="border px-4 py-2 text-left">Period</th>
                  <th className="border px-4 py-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">{item.period}</td>
                    <td className="border px-4 py-2">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="text-right px-4 py-3 font-semibold border">Total</td>
                  <td className="px-4 py-3 font-semibold border">${invoiceData.totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <Button
          className={`text-white ${
            walletData.balance >= invoiceData.totalAmount
              ? "bg-green-600 hover:bg-green-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={walletData.balance < invoiceData.totalAmount}
        >
          Pay Now
        </Button>
        <Button className="bg-gray-300 hover:bg-gray-400 text-gray-800">Download PDF</Button>
      </div>

      {/* Billing History Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Billing History</h2>
        <Card className="shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Invoice #</th>
                    <th className="border px-4 py-2 text-left">Date</th>
                    <th className="border px-4 py-2 text-left">Amount</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceHistory.map((inv, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{inv.invoiceNumber}</td>
                      <td className="border px-4 py-2">{inv.date}</td>
                      <td className="border px-4 py-2">${inv.amount.toFixed(2)}</td>
                      <td className="border px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            inv.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : inv.status === "Due"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
