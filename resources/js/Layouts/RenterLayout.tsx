import Footer from '@/Components/Renter/Footer'
import TopNavigation from '@/Components/Renter/TopNavigation'
import { PropsWithChildren } from 'react'

const RenterLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
        
        <TopNavigation />

        <main className="flex-grow">
            {children}
        </main>

        <Footer />
    </div>
  )
}

export default RenterLayout