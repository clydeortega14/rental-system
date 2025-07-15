import React, { useState, ReactElement } from "react";
import LessorLayout from "@/Layouts/LessorLayout";
import { router } from "@inertiajs/react";
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
import {
  BiCalendarCheck,
} from "react-icons/bi";

import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/Lessor/ui/dropdown-menu";
import { CheckCircle, Clock, XCircle, MoreHorizontal } from "lucide-react";
import { Reservation } from "@/Pages/Lessor/types/ReservationProps";

// ✅ Accept props instead of usePage()
type ReservationsProps = {
  bookings: Reservation[];
};

const statusBadge = (status: string) => {
  const base =
    "inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full";
  const badges: Record<string, { className: string; icon: React.ReactNode; label: string }> = {
    RESERVED: {
      className: "bg-green-100 text-green-700",
      icon: <CheckCircle className="w-4 h-4" />,
      label: "Confirmed",
    },
    PENDING: {
      className: "bg-yellow-100 text-yellow-800",
      icon: <Clock className="w-4 h-4" />,
      label: "Pending",
    },
    CANCELLED: {
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

function Reservations({ bookings }: ReservationsProps) {
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
  const [actionType, setActionType] = useState<"confirm" | "reject" | null>(null);
  const [viewingRes, setViewingRes] = useState<Reservation | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const { toast } = useToast();

  const closeDialog = () => {
    setSelectedRes(null);
    setActionType(null);
  };

  const handleAction = () => {
    if (!selectedRes || !actionType) return;

    const status = actionType === "confirm" ? "RESERVED" : "CANCELLED";

    router.put(`/lessor/property-reserve/${selectedRes.id}/status`, { status }, {
      onSuccess: () => {
        toast({
          title: `Reservation ${status === "RESERVED" ? "confirmed" : "rejected"}`,
          description: `Booking for ${selectedRes.guestName} is now ${status}.`,
        });
        closeDialog();
      },
      onError: () => {
        toast({
          title: "Failed to update",
          description: "Something went wrong.",
          variant: "destructive",
        });
      },
    });
  };

  const filteredReservations = filterStatus
    ? bookings.filter((res) => res.status === filterStatus)
    : bookings;

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="flex items-center text-3xl font-bold mb-6 text-orange-600">
          <BiCalendarCheck className="w-6 h-6 text-orange-500 mr-2" />
          Reservation Bookings
        </h1>

        <select
          value={filterStatus || "ALL"}
          onChange={(e) =>
            setFilterStatus(e.target.value === "ALL" ? null : e.target.value)
          }
          className="border border-gray-300 rounded-md px-8 py-1.5"
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="RESERVED">Reserved</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </header>

      {filteredReservations.length === 0 ? (
        <p className="text-center py-10 text-gray-500 italic">No reservations found.</p>
      ) : (
        <div className="space-y-4">
          {filteredReservations.map((res) => (
            <Card
              key={res.id}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 rounded-xl hover:shadow-lg"
            >
              <img
                src={res.imageUrl}
                alt={res.property}
                className="w-full sm:w-32 h-40 sm:h-24 rounded-md object-cover"
              />
              <div className="flex-1 space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">{res.property}</h2>
                <p className="text-gray-700">Guest: {res.guestName}</p>
                <p className="text-gray-600 text-sm">
                  Acquire: <time dateTime={res.acquire}>{new Date(res.acquire).toLocaleDateString()}</time>
                </p>
                <p className="text-gray-600 text-sm">
                  Return: <time dateTime={res.return}>{new Date(res.return).toLocaleDateString()}</time>
                </p>
                {res.hasConflict && (
                  <div className="mt-1 text-sm text-red-600 font-semibold">
                    ⚠ Double Booking Detected for this property
                  </div>
                )}
              </div>

              <div className="flex sm:flex-col sm:items-end justify-between sm:justify-center gap-2 sm:gap-3">
                {statusBadge(res.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setViewingRes(res)}>
                      View Details
                    </DropdownMenuItem>
                    {res.status === "PENDING" && (
                      <>
                        <DropdownMenuItem onClick={() => { setSelectedRes(res); setActionType("reject"); }}>
                          Reject
                        </DropdownMenuItem>
                        {res.hasConflict ? (
                          <DropdownMenuItem disabled>
                            <span className="text-gray-400">Confirm (conflict)</span>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => { setSelectedRes(res); setActionType("confirm"); }}>
                            Confirm
                          </DropdownMenuItem>
                        )}
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
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button
              className={actionType === "confirm" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
              onClick={handleAction}
            >
              {actionType === "confirm" ? "Confirm" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={!!viewingRes} onOpenChange={() => setViewingRes(null)}>
        <DialogContent className="w-full max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewingRes?.property}</DialogTitle>
            <DialogDescription>
              Detailed information about the booking for {viewingRes?.guestName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <img src={viewingRes?.imageUrl} alt={viewingRes?.property} className="w-full h-48 object-cover rounded-md" />
            <p><strong>Guest:</strong> {viewingRes?.guestName}</p>
            <p><strong>Acquire:</strong> {new Date(viewingRes?.acquire || "").toLocaleDateString()}</p>
            <p><strong>Return:</strong> {new Date(viewingRes?.return || "").toLocaleDateString()}</p>
            <p><strong>Status:</strong> {statusBadge(viewingRes?.status || "")}</p>
            <hr />
            <p><strong>Location:</strong> {viewingRes?.location}</p>
            <p><strong>Reservation Fee:</strong> ₱{viewingRes?.pricePerNight}</p>
            <p><strong>Description:</strong> {viewingRes?.description}</p>
            {viewingRes?.amenities?.length ? (
              <>
                <strong>Amenities:</strong>
                <ul className="list-disc list-inside">
                  {viewingRes.amenities.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </>
            ) : null}
            {viewingRes?.contactInfo && <p><strong>Contact Info:</strong> {viewingRes.contactInfo}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingRes(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ✅ Keep layout for Inertia
Reservations.layout = (page: ReactElement) => <LessorLayout>{page}</LessorLayout>;

export default Reservations;
