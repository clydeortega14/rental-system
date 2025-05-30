import React, { useState } from "react";
import LessorLayout from "@/Layouts/LessorLayout";
import { Card } from "@/Components/Lessor/ui/card";
import { Button } from "@/Components/Lessor/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/Components/Lessor/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/Lessor/ui/dropdown-menu";
import { CheckCircle, Clock, XCircle, MoreHorizontal } from "lucide-react";

const reservationsData = [
  {
    id: 1,
    guestName: "Johnny Wood",
    property: "Cozy Apartment Downtown",
    imageUrl: "/images/lease/cozy_condo.jpg",
    acquire: "2025-06-01",
    return: "2025-06-05",
    status: "Confirmed",
    location: "Downtown City, 123 Main St",
    pricePerNight: 120,
    description:
      "A cozy, modern apartment in the heart of downtown, close to all amenities and public transport.",
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "Parking"],
    contactInfo: "contact@propertyowner.com",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    property: "Beachfront Villa",
    imageUrl: "/images/lease/seaside.jpeg",
    acquire: "2025-06-10",
    return: "2025-06-15",
    status: "Pending",
    location: "Ocean Drive, Malibu",
    pricePerNight: 350,
    description:
      "Luxurious villa with private beach access and stunning ocean views.",
    amenities: ["Pool", "WiFi", "Breakfast", "Parking", "Air Conditioning"],
    contactInfo: "info@beachvilla.com",
  },
  {
    id: 3,
    guestName: "Mike Johnson",
    property: "Harley Davidson Motorcycle",
    imageUrl: "/images/lease/harley.jpg",
    acquire: "2025-07-01",
    return: "2025-07-07",
    status: "Cancelled",
    location: "Bike Rental Center, 45 Motorway",
    pricePerNight: 80,
    description:
      "Experience the thrill of riding a Harley Davidson through the countryside.",
    amenities: ["Helmet", "GPS", "Insurance"],
    contactInfo: "rentals@harleymoto.com",
  },
];

const statusBadge = (status: string) => {
  const base =
    "inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full";
  const badges = {
    Confirmed: {
      className: "bg-green-100 text-green-700",
      icon: <CheckCircle className="w-4 h-4" />,
      label: "Confirmed",
    },
    Pending: {
      className: "bg-yellow-100 text-yellow-800",
      icon: <Clock className="w-4 h-4" />,
      label: "Pending",
    },
    Cancelled: {
      className: "bg-red-100 text-red-700",
      icon: <XCircle className="w-4 h-4" />,
      label: "Rejected",
    },
  };

  const badge = badges[status] || { className: "", icon: null, label: status };
  return (
    <span className={`${base} ${badge.className}`}>
      {badge.icon} {badge.label}
    </span>
  );
};

export default function Reservations() {
  const [selectedRes, setSelectedRes] = useState<typeof reservationsData[0] | null>(null);
  const [actionType, setActionType] = useState<"confirm" | "reject" | null>(null);
  const [viewingRes, setViewingRes] = useState<typeof reservationsData[0] | null>(null);
  const { toast } = useToast();

  const closeDialog = () => {
    setSelectedRes(null);
    setActionType(null);
  };

  const handleAction = () => {
    if (!selectedRes || !actionType) return;

    toast({
      title: `Reservation ${actionType === "confirm" ? "confirmed" : "rejected"}`,
      description: `You have ${actionType}ed the booking for ${selectedRes.guestName}.`,
    });
    closeDialog();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-orange-600">Bookings</h1>
        <Button className="bg-orange-600 text-white hover:bg-orange-500">Export CSV</Button>
      </header>

      {reservationsData.length === 0 ? (
        <p className="text-center py-10 text-gray-500 italic">No reservations found.</p>
      ) : (
        <div className="space-y-4">
          {reservationsData.map((res) => (
            <Card
              key={res.id}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 rounded-xl hover:shadow-lg transition-shadow"
            >
              <img
                src={res.imageUrl}
                alt={res.property}
                className="w-full sm:w-32 h-40 sm:h-24 rounded-md object-cover"
                loading="lazy"
              />

              <div className="flex-1 space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">{res.property}</h2>
                <p className="text-gray-700">Guest: {res.guestName}</p>
                <p className="text-gray-600 text-sm">
                  Acquire:{" "}
                  <time dateTime={res.acquire}>{new Date(res.acquire).toLocaleDateString()}</time>
                </p>
                <p className="text-gray-600 text-sm">
                  Return:{" "}
                  <time dateTime={res.return}>{new Date(res.return).toLocaleDateString()}</time>
                </p>
              </div>

              <div className="flex sm:flex-col sm:items-end justify-between sm:justify-center gap-2 sm:gap-3">
                {statusBadge(res.status)}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Actions">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setViewingRes(res)}>
                      View Details
                    </DropdownMenuItem>
                    {res.status === "Pending" && (
                      <>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedRes(res);
                            setActionType("confirm");
                          }}
                        >
                          Confirm
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedRes(res);
                            setActionType("reject");
                          }}
                        >
                          Reject
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Confirm/Reject Dialog */}
      <Dialog open={!!actionType} onOpenChange={() => setActionType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "confirm" ? "Confirm Reservation" : "Reject Reservation"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to{" "}
              <strong className="capitalize">{actionType}</strong> the booking for{" "}
              <strong>{selectedRes?.guestName}</strong>?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionType(null)}>
              Cancel
            </Button>
            <Button
              className={`${
                actionType === "confirm"
                  ? "bg-green-600 hover:bg-green-500 text-white"
                  : "bg-red-600 hover:bg-red-500 text-white"
              }`}
              onClick={handleAction}
            >
              {actionType === "confirm" ? "Confirm" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={!!viewingRes} onOpenChange={() => setViewingRes(null)}>
        <DialogContent
          className="w-full max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto p-4 sm:p-6"
          style={{ minWidth: "280px" }}
        >
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">{viewingRes?.property}</DialogTitle>
            <DialogDescription>
              Detailed information about the booking and property for {viewingRes?.guestName}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <img
              src={viewingRes?.imageUrl}
              alt={viewingRes?.property}
              className="w-full h-48 rounded-md object-cover"
              loading="lazy"
            />

            <p>
              <strong>Guest:</strong> {viewingRes?.guestName}
            </p>
            <p>
              <strong>Acquire:</strong>{" "}
              <time dateTime={viewingRes?.acquire}>
                {viewingRes ? new Date(viewingRes.acquire).toLocaleDateString() : ""}
              </time>
            </p>
            <p>
              <strong>Return:</strong>{" "}
              <time dateTime={viewingRes?.return}>
                {viewingRes ? new Date(viewingRes.return).toLocaleDateString() : ""}
              </time>
            </p>
            <p>
              <strong>Status:</strong> {viewingRes && statusBadge(viewingRes.status)}
            </p>

            <hr className="my-2" />
            <p>
              <strong>Location:</strong> {viewingRes?.location}
            </p>
            <p>
              <strong>Reservation Fee:</strong> &#8369;{viewingRes?.pricePerNight}
            </p>
            <p>
              <strong>Description:</strong> {viewingRes?.description}
            </p>

            {viewingRes?.amenities?.length ? (
              <div>
                <strong>Amenities:</strong>
                <ul className="list-disc list-inside ml-4">
                  {viewingRes.amenities.map((amenity, i) => (
                    <li key={i}>{amenity}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {viewingRes?.contactInfo && (
              <p>
                <strong>Contact Info:</strong> {viewingRes.contactInfo}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingRes(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
