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
import { BiCalendarCheck } from "react-icons/bi";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/Lessor/ui/dropdown-menu";
import { CheckCircle, Clock, XCircle, MoreHorizontal } from "lucide-react";
import { Reservation } from "@/Pages/Lessor/types/ReservationProps";

type ReservationsProps = {
  lessorReservations: Reservation[];
};

// Utility: status badge UI
const statusBadge = (status: string) => {
  const base =
    "inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full";
  const badges: Record<
    string,
    { className: string; icon: React.ReactNode; label: string }
  > = {
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

  const badge =
    badges[status] || {
      className: "bg-gray-100 text-gray-600",
      icon: null,
      label: status,
    };
  return (
    <span className={`${base} ${badge.className}`}>
      {badge.icon} {badge.label}
    </span>
  );
};

// Utility: convert media_paths into an array
const getImageArray = (paths: string | string[] | undefined): string[] => {
  if (Array.isArray(paths)) return paths;
  if (typeof paths === "string") return [paths];
  return [];
};

function Reservations({ lessorReservations }: ReservationsProps) {
  const reservations = lessorReservations;
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
  const [actionType, setActionType] = useState<"confirm" | "reject" | null>(
    null
  );
  const [viewingRes, setViewingRes] = useState<Reservation | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const { toast } = useToast();

  // Dialog close
  const closeDialog = () => {
    setSelectedRes(null);
    setActionType(null);
  };

  // Confirm/Reject action
  const handleAction = (res: Reservation, actionType: "confirm" | "reject") => {
    const status = actionType === "confirm" ? "RESERVED" : "CANCELLED";
    router.put(
      `/lessor/property-reserve/${res.id}/status`,
      { status },
      {
        onSuccess: () => {
          toast({
            title: `Reservation ${
              status === "RESERVED" ? "confirmed" : "rejected"
            }`,
            description: `Booking for ${res.guestName} is now ${status}.`,
          });
        },
        onError: () => {
          toast({
            title: "Failed to update",
            description: "Something went wrong.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const reservationsWithConflicts = reservations.map((res) => {
    const overlap = reservations.some(
      (other) =>
        other.id !== res.id &&
        other.property === res.property &&
        // check if date ranges overlap
        new Date(res.acquire) < new Date(other.return) &&
        new Date(res.return) > new Date(other.acquire)
    );

    return { ...res, hasConflict: overlap };
  });

  // Filter reservations
  const filteredReservations = filterStatus
    ? reservationsWithConflicts.filter((res) => res.status === filterStatus)
    : reservationsWithConflicts;

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-6">
      {/* Header & Filter */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="flex items-center text-3xl font-bold mb-6 text-brandYellow">
          <BiCalendarCheck className="w-6 h-6 text-brandYellow mr-2" /> Reservation
          Bookings
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

      {/* Reservation Cards */}
      {filteredReservations.length === 0 ? (
        <p className="text-center py-10 text-gray-500 italic">
          No reservations found.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredReservations.map((res) => (
            <Card
              key={res.id}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 rounded-xl hover:shadow-lg"
            >
              {/* Static image */}
              <img
                onClick={() => setViewingRes(res)}
                src={
                  getImageArray(res.media_paths).length > 0
                    ? `/storage/${getImageArray(res.media_paths)[0]}`
                    : ""
                }
                alt={res.property}
                className="w-full sm:w-32 h-40 sm:h-24 rounded-md object-cover cursor-pointer hover:opacity-90"
              />

              <div className="flex-1 space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {res.property}
                </h2>
                <p className="text-gray-700">Lessee: {res.guestName}</p>
                <p className="text-gray-600 text-sm">
                  Acquire Date: {new Date(res.acquire).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-sm">
                  Return Date: {new Date(res.return).toLocaleDateString()}
                </p>
                {res.hasConflict && (
                  <div className="mt-1 text-sm text-red-600 font-semibold">
                    ⚠ Double Booking Detected
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
                        <DropdownMenuItem
                          onClick={() => handleAction(res, "reject")}
                        >
                          Reject
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          disabled={res.hasConflict} // disable if there's a double booking
                          onClick={() => {
                            if (res.hasConflict) {
                              toast({
                                title: "Conflict Detected",
                                description: "This reservation overlaps with another booking.",
                                variant: "destructive",
                              });
                              return;
                            }
                            handleAction(res, "confirm");
                          }}
                        >
                          Confirm
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

      {/* Details Modal without slider */}
      <Dialog open={!!viewingRes} onOpenChange={(isOpen) => !isOpen && setViewingRes(null)}>
        <DialogContent className="w-full max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewingRes?.property}</DialogTitle>
            <DialogDescription>
              Booking details for {viewingRes?.guestName}
            </DialogDescription>
          </DialogHeader>

          {viewingRes && (
            <div className="bg-black rounded-md w-full h-64 flex items-center justify-center overflow-hidden mb-4">
              <img
                src={
                  getImageArray(viewingRes.media_paths).length > 0
                    ? `/storage/${getImageArray(viewingRes.media_paths)[0]}`
                    : ""
                }
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Details */}
          <div className="space-y-4">
            <p>
              <strong>Lessee:</strong> {viewingRes?.guestName}
            </p>
            <p>
              <strong>Acquire Date:</strong>
              {viewingRes?.acquire
                ? new Date(viewingRes.acquire).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Return Date:</strong>
              {viewingRes?.return
                ? new Date(viewingRes.return).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {statusBadge(viewingRes?.status || "")}
            </p>
            <hr />
            <p>
              <strong>Location:</strong> {viewingRes?.location}
            </p>
            <p>
              <strong>Reservation Fee:</strong> ₱{viewingRes?.pricePerNight}
            </p>
            <p>
              <strong>Description:</strong> {viewingRes?.description}
            </p>
            <p>
              <strong>Contact Info:</strong> {viewingRes?.contactInfo}
            </p>
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

Reservations.layout = (page: ReactElement) => <LessorLayout>{page}</LessorLayout>;

export default Reservations;
