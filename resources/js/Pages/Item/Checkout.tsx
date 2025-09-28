

import CheckOut from "@/Components/Forms/CheckOut";
import CheckOutForm from "@/Components/Forms/CheckOut";
import NavbarHeader from "@/Components/Header";
import Button from "@/Components/Renter/ui/Button";
import { CartProvider, useCart } from "@/context/CartContext";
import { KycProvider } from "@/context/KycContext";
import { PostalAddressProvider } from "@/context/PostalAddressContext";
import RenterLayout from "@/Layouts/RenterLayout";
import { User } from "@/types";
import { BookingSession } from "@/types/rental";
import { formatDateDisplay } from "@/utils/dateUtils";
import { Head, Link } from "@inertiajs/react";
import { Calendar, ChevronLeft, CreditCard, X } from "lucide-react";
import { PropsWithChildren, useState } from "react";

interface CheckOutProps {
    booking_data: BookingSession;
    serviceFee: number;
    user: User;
}

export default function Checkout({booking_data, user, serviceFee}: CheckOutProps){
    return (

        <RenterLayout>

            <Head title={"Checkout"} />

            <CartProvider>
                <KycProvider>
                    <PostalAddressProvider>
                        <CheckOut 
                            bookingData={booking_data}
                            categoryServiceFee={serviceFee}
                        />
                    </PostalAddressProvider>
                </KycProvider>
            </CartProvider>
            
        </RenterLayout>
        
    )
}