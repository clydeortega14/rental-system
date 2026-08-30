import { Head, usePage } from '@inertiajs/react'
import React, { Suspense, PropsWithChildren, useState } from 'react'
import Header from "@/Components/Lessee/Header"
import Profile from '@/Components/Lessee/Profile'
import { PageProps } from '@/types'
import LesseeSidebarContent from '@/Components/Lessee/LesseeSidebarContent'
import SidebarMenu from './Sidebar/SidebarMenu'
import MobileView from './Sidebar/MobileView'

const AuthLayout = ({children}:PropsWithChildren) => {

    const [showLessorModal, setShowLessorModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
        <Head title="Reservations" />
        <Header />

        {/* Sidebar */}
        <div className="flex flex-1 flex-col md:flex-row mt-16">
            <aside className="hidden md:flex flex-col w-80 bg-gray-50 border-r border-gray-200 p-6 space-y-6">
                <Suspense>
                    <Profile />
                </Suspense>

                {/* Sidebar menu */}
                <SidebarMenu />
            </aside>

            <section>
                {/* Mobile View */}
                <MobileView onShowLessorModal={ () => setShowLessorModal(true) } />

                {/* Main Content */}
                <Suspense fallback={<div className="text-center text-orange-600 py-10">Loading...</div>}>
                    <div className="max-w-5xl py-8 sm:py-6">
                        {children}
                    </div>
                </Suspense>
                
            </section>
        </div>

        
    </div>
  )
}

export default AuthLayout