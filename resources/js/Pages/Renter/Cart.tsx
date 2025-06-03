import CartMainContent from '@/Components/Cart/CartMainContent'
import { CartProvider } from '@/context/CartContext'
import RenterLayout from '@/Layouts/RenterLayout'
import { User } from '@/types'
import { Head } from '@inertiajs/react'
import { PropsWithChildren } from 'react'

const Cart = ({user}:PropsWithChildren<{user:User}>) => {

  return (
    <>
        <RenterLayout
            user={user}
        >
            <Head title={"Cart"}/>

            <CartProvider>
                <CartMainContent />
            </CartProvider>
        </RenterLayout>
    </>
    
  )
}

export default Cart