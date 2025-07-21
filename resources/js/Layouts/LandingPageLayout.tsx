import Footer from '@/Components/LandingPage/Utility/footer'
import Header from '@/Components/LandingPage/Utility/header'
import Slider from '@/Components/Slider'
import FeaturedCategory from '@/Components/LandingPage/Category/FeaturedCategories'
import ClientsFeedBack from '@/Components/ClientsFeedBack'
import SupportSlider from '@/Components/SupportSlider'
import { Category } from '@/Interface/CategoryInterface'
import { PageProps } from '@/types'

import React from 'react'
import { usePage } from '@inertiajs/react'

  interface LandingPageLayoutuProps {
    categories: Category[];
    children?: React.ReactNode

  }


const LandingPageLayout = ({ categories, children
}: LandingPageLayoutuProps) => {
    const auth = usePage<PageProps>().props.auth;

    return (
      <div className="flex flex-col min-h-screen ">
        
        <main className="flex-grow">
          <Header />
          {children}
          <Slider categories={categories} />
          <SupportSlider/>
          <FeaturedCategory auth={auth} categories={categories} />
          {/* <ClientsFeedBack /> */}
        </main>
        <Footer />
        
      </div>
    )
  }

  export default LandingPageLayout
