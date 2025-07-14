  import Footer from '@/Components/LandingPage/Utility/footer'
  import Header from '@/Components/LandingPage/Utility/header'
  import Slider from '@/Components/Slider'
  import FeaturedCategory from '@/Components/LandingPage/Category/FeaturedCategories'
  import ClientsFeedBack from '@/Components/ClientsFeedBack'
  import SupportSlider from '@/Components/SupportSlider'
  import { Category } from '@/Interface/CategoryInterface'
  import { PageProps } from '@/types'
  import BeePulseLoader from "@/Components/Loader/BeePulseLoader";
  import { useEffect, useState ,PropsWithChildren} from "react";


const LandingPageLayout = ({
  auth,
  categories,
  children,
}: PropsWithChildren<{ auth: any; categories: Category[] }>) => {
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <BeePulseLoader />;
  }
    return (
      <div className="flex flex-col min-h-screen ">
        <Header categories={categories} />
        <main className="flex-grow">
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
