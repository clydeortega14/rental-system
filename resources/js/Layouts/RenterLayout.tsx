import Footer from '@/Components/Renter/Footer'
import Header from '@/Components/LandingPage/Utility/header'
import TopNavigation from '@/Components/Renter/TopNavigation'
import { CartProvider } from '@/context/CartContext'
import { User } from '@/types'
import { PropsWithChildren } from 'react'

const RenterLayout = ({children}:PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <CartProvider>
          <Header />

           <main className="flex-grow pt-20 mb-20">
              {children}
          </main>
        </CartProvider>

        <Footer />
    </div>
  )
}

export default RenterLayout