import CartMainContent from '@/Components/Cart/CartMainContent'
import { CartProvider } from '@/context/CartContext'
import RenterLayout from '@/Layouts/RenterLayout'
import { User } from '@/types'
import { BookingSession } from '@/types/rental'
import { Head } from '@inertiajs/react'
import { PropsWithChildren } from 'react'


interface ICart {

    booking_data: BookingSession

}
const Cart = ({booking_data}: ICart) => {

  return (
    <>
        <RenterLayout>
            <Head title={"Cart"}/>

            <CartProvider>
                <CartMainContent bookingData={booking_data}/>
            </CartProvider>
        </RenterLayout>
    </>
    
  )
}

export default Cart