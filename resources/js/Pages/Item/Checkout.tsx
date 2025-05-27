

import CheckOut from "@/Components/Forms/CheckOut";
import CheckOutForm from "@/Components/Forms/CheckOut";
import NavbarHeader from "@/Components/Header";
import Button from "@/Components/Renter/ui/Button";
import { CartProvider, useCart } from "@/context/CartContext";
import RenterLayout from "@/Layouts/RenterLayout";
import { User } from "@/types";
import { formatDateDisplay } from "@/utils/dateUtils";
import { Head, Link } from "@inertiajs/react";
import { Calendar, ChevronLeft, CreditCard, X } from "lucide-react";
import { PropsWithChildren, useState } from "react";

export default function Checkout({user, item, rent_detail}:PropsWithChildren<{user: User;}>){
    return (

        <RenterLayout
            user={user}
        >

            <Head title={"Checkout"} />

            <CartProvider>
                <CheckOut />
            </CartProvider>
            
        </RenterLayout>
        
    )
}