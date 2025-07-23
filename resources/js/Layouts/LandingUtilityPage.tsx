import Footer from '@/Components/LandingPage/Utility/footer'
import Header from '@/Components/LandingPage/Utility/header'
import FeedbackModal from '@/Components/FeedbackModal'; 
import CookieConsent from '@/Components/CookieConsent';
import { PropsWithChildren } from "react";

export default function LandingUtilityPage({ children }: PropsWithChildren) {
    return (
      <div className="flex flex-col min-h-screen ">
        <Header />
        <main className="flex-grow">
          {/* Cookie Consent Banner */}
          <CookieConsent />
          {children}
        </main>
        <Footer />
      </div>
    )
}
