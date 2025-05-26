import Footer from '@/Components/Renter/Footer'
import TopNavigation from '@/Components/Renter/TopNavigation'
import { PropsWithChildren } from 'react'

const RenterLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-white">
        
        <TopNavigation />

        <main className="pb-16">
            {children}
        </main>

        <Footer />
    </div>
  )
}

export default RenterLayout