import React from "react";

import RenterLayout from "@/Layouts/RenterLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import BookingInfo from "@/Components/Booking/BookingInfo";
import SecondaryButton from "@/Components/SecondaryButton";
import { StepBack } from "lucide-react";
import { BookingDetails } from "@/types/rental";


interface BookingViewProps {
  booking: BookingDetails
  serviceFee: number;
}

const BookingView: React.FC<BookingViewProps> = ({booking, serviceFee}) => {

  return (
    
    <RenterLayout>
      <Head title={"Booking Detail"}/>


      <div className="py-12">
        <div className="w-full max-w-3xl mx-auto my-6">
          <Link href={route('reservations.index')}>
              <SecondaryButton> 
                <StepBack />
                Back to browser
              </SecondaryButton>
          </Link>
        </div>
        <BookingInfo booking={booking} serviceFee={serviceFee}/>
      </div>
    </RenterLayout>
  );
};

export default BookingView;