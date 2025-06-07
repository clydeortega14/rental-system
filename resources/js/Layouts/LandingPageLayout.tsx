import Footer from '@/Components/LandingPage/Utility/footer'
import Header from '@/Components/LandingPage/Utility/header'
import Slider from '@/Components/Slider'

import { PropsWithChildren } from 'react'


interface Category {
  id: number
  name: string
  // add other fields if needed
}

interface LandingPageLayoutProps extends PropsWithChildren {
  categories: Category[]
}

const LandingPageLayout = ({ children, categories, auth }: LandingPageLayoutProps) => {
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
