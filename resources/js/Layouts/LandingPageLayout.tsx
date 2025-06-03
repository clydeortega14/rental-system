import Footer from '@/Components/LandingPage/Utility/footer'
import Header from '@/Components/LandingPage/Utility/header'
import Slider from '@/Components/Slider'
import { Category } from '@/Interface/CategoryInterface'

import { PropsWithChildren } from 'react'



const LandingPageLayout = ({ categories, children }: PropsWithChildren<{categories: Category[]}>) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header categories={categories} />
      <main className="flex-grow">
        {children}
        <Slider categories={categories} />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPageLayout
