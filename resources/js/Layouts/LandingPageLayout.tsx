import Footer from '@/Components/LandingPage/Utility/footer'
import Header from '@/Components/LandingPage/Utility/header'
import Slider from '@/Components/Slider'
// import HeroSearch from '@/Components/HeroSearch'; 
// import HowItWorks from '@/Components/HowItWorks';
// import WhyChooseUs from '@/Components/WhyChooseUs';
import FeaturedCategory from '@/Components/LandingPage/Category/FeaturedCategories'
import ClientsFeedBack from '@/Components/ClientsFeedBack'
import PromoModal from '@/Components/PromoModal'; // new
import SupportSlider from '@/Components/SupportSlider'
import { Category } from '@/Interface/CategoryInterface'
import { PageProps } from '@/types'
import FeedbackModal from '@/Components/FeedbackModal'; 
import CookieConsent from '@/Components/CookieConsent';
import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { usePage } from '@inertiajs/react'

  interface LandingPageLayoutuProps {
    categories: Category[];
    children?: React.ReactNode

  }


const LandingPageLayout = ({ categories, children }: LandingPageLayoutuProps) => {
  const auth = usePage<PageProps>().props.auth;
  const [showFeedback, setShowFeedback] = useState(false); // <- start hidden
  const [cookieVisible, setCookieVisible] = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  const promoImages = [
    'img/promo/1.png',
    'img/promo/2.png',
    'img/promo/3.png',
    'img/promo/4.png',
    'img/promo/5.png',
    'img/promo/6.png',
    'img/promo/7.png',
    'img/promo/8.png',
  ];

// disable background scroll when promo is visible
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (showPromo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showPromo]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <main className="flex-grow">
        <Header />

        {children}
        <Slider categories={categories} />
        <SupportSlider />
        <FeaturedCategory auth={auth} categories={categories} />
        <CookieConsent onVisibleChange={setCookieVisible} />
      </main>
      <Footer />

      {/* Promo Modal (shows first) */}
      <PromoModal
        images={promoImages}
        show={showPromo}
        onClose={() => setShowPromo(false)}
      />

      {/* Feedback Modal */}
      <FeedbackModal show={showFeedback} onClose={() => setShowFeedback(false)} />

      {/* Feedback Toggle Button */}
      {!showFeedback && !showPromo && (
        <button
          onClick={() => setShowFeedback(true)}
          className={`fixed ${
            cookieVisible ? 'bottom-[100px]' : 'bottom-[88px] sm:bottom-6'
          } right-6 z-40 bg-brandYellow hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition`}
          aria-label="Feedback"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};


export default LandingPageLayout;
