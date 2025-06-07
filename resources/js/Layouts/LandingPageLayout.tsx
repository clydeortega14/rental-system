import Footer from '@/Components/LandingPage/Utility/footer'
import Header from '@/Components/LandingPage/Utility/header'
import Slider from '@/Components/Slider'
import { Category } from '@/Interface/CategoryInterface'
import { PageProps } from '@/types'

import { PropsWithChildren } from 'react'



const LandingPageLayout = ({ categories, auth, children }: PropsWithChildren<{categories: Category[], auth: PageProps}>) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header auth={auth} categories={categories} />
      <main className="flex-grow">
        {children}
        <Slider categories={categories} />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPageLayout
