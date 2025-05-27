import Footer from '@/Components/Renter/Footer'
import TopNavigation from '@/Components/Renter/TopNavigation'
import { CartProvider } from '@/context/CartContext'
import { User } from '@/types'
import { PropsWithChildren } from 'react'

const RenterLayout = ({user, children}:PropsWithChildren<{ user?: User}>) => {
  return (
    <div className="flex flex-col min-h-screen">
        <CartProvider>
          <TopNavigation user={user}/>

          <main className="flex-grow pt-16">
              {children}
          </main>
        </CartProvider>

        <Footer />
    </div>
  )
}

export default RenterLayout