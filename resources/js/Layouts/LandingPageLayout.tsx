import Footer from '@/Components/LandingPage/Utility/footer'
import Header from '@/Components/LandingPage/Utility/header'
import Slider from '@/Components/Slider'

import { PropsWithChildren } from 'react'

const RenterLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen ">

        <Header />
        <main className="flex-grow">
            {children}
            <Slider />
        </main>

        <Footer />
    </div>
  )
}

export default RenterLayout