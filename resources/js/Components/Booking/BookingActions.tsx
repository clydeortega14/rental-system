import { useForm, router } from "@inertiajs/react";
import { Reservation } from "@/Interface/Reservation";
import PrimaryButton from "../PrimaryButton";
import React from "react";
import { confirmDialog, isConfirmedAlert } from "@/utils/alert";
import { BookingDetails } from "@/types/rental";
import Button from "../Renter/ui/Button";

interface Props {
  booking: BookingDetails;
  onSwitchTab?: (tab: string) => void;
}



export default function BookingActions({ booking, onSwitchTab }: Props) {
  const { post, processing } = useForm({});
  const handleClickCancel = (booking_id: string | undefined) => {
    confirmDialog(
      'Are you sure, you want to cancel this booking?',
      'Yes, cancel it',
      'No'
    ).then((result) => {
      if (result.isConfirmed) {
        post(route('booking.update.status', {
          booking_id,
          action: 'cancelled'
        }), {
          preserveScroll: true,
          onSuccess: () => {
            isConfirmedAlert('Booking has been cancelled', 'warning')
          }
        });
      }
    })
  }

  const handleClickConfirm = (booking_id: string) => {

    post(route('booking.update.status', {
      booking_id,
      action: 'accept'
    }), {
      preserveScroll: true,
      onSuccess: () => {
        isConfirmedAlert('Reservation of rental items has been confirmed!', "success");
      }
    })
  }


  const handleClickReturned = (booking_id: string) => {
    post(route('booking.update.status', {
      booking_id,
      action: 'returned'
    }), {
      preserveScroll: true,
      onSuccess: () => {
        isConfirmedAlert('Item has been returned!', "success");
      }
    })
  }

  const handleClickReturn = (booking_id: string) => {
    confirmDialog(
      'Do you wish to return this already?',
      'Yes i will return it now',
      'Cancel'
    ).then((result) => {
      if (result.isConfirmed) {
        post(route('booking.update.status', {
          booking_id: booking_id,
          action: 'returning'
        }), {
          preserveScroll: true,
          onSuccess: () => {
            isConfirmedAlert('the item you were rented was about to be return to the owner.', "success");
          }
        })
      }
    });
  }


  const handleClickInUse = (booking_id: string) => {

    post(route('booking.update.status', {
      booking_id: booking_id,
      action: 'in use'
    }), {
      preserveScroll: true,
      onSuccess: () => {
        isConfirmedAlert('Item is now being used!', "success");
      }
    });
  }



  const handleInquiries = (booking: BookingDetails) => {
    router.post(
      route("conversations.store"),
      {
        id: booking.id,
        uuid: booking.uuid,
        rentalItem: {
          id: booking.rentalItem?.id,
          imageUrl: booking.rentalItem?.imageUrl,
          name: booking.rentalItem?.name,
          description: booking.rentalItem?.description,
          shopId: booking.rentalItem?.shopId,
          shopName: booking.rentalItem?.shopName,
          shopLocation: booking.rentalItem?.shopLocation,
        },
        itemId: booking.itemId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        status: booking.status,
        totalPrice: booking.totalPrice,
        action: "inquiries",
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          isConfirmedAlert("Inquiry has been sent!. Check your Inquiries tab for updates.", "info");
          onSwitchTab?.("lessorInquiries");
        },
      }
    );
  };
  // ...existing code...

  return (
    <div className="space-x-2">
      {
        (
          booking.status === 'reserved' || booking.status === 'pending') && (
          <Button variant="danger" size="sm" className="gap-1" onClick={() => handleClickCancel(booking.id)} disabled={processing}>
            Cancel
          </Button>
        )
      }

      {
        booking.status === 'pending' && (
          <>
            <Button variant="secondary" size="sm" className="gap-1" onClick={() => handleClickConfirm(booking.id ?? '')} disabled={processing}>
              Confirm
            </Button>
            <Button variant="primary" size="sm" className="gap-1" onClick={() => handleInquiries(booking)} disabled={processing}>
              Inquire
            </Button>
          </>
        )
      }

      {
        booking.status === 'returning' && (
          <Button variant="returning" size="sm" className="gap-1" onClick={() => handleClickReturned(booking.id ?? '')} disabled={processing}>
            Returned
          </Button>
        )
      }

      {
        booking.status === 'in use' && (
          <Button variant="return" size="sm" className="gap-1" onClick={() => handleClickReturn(booking.id ?? '')} disabled={processing}>
            Return Now
          </Button>
        )
      }

      {
        booking.status === 'reserved' && (
          <Button variant="in_use" size="sm" className="gap-1" onClick={() => handleClickInUse(booking.id ?? '')} disabled={processing}>
            In Use
          </Button>
        )
      }

    </div>
  );
}
