import Footer from '@/Components/LandingPage/Utility/footer'
import Header from '@/Components/LandingPage/Utility/header'
import { PropsWithChildren } from "react";

export default function LandingUtilityPage({ children }: PropsWithChildren) {
    return (
      <div className="flex flex-col min-h-screen ">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    )
}
