import { Head, usePage } from '@inertiajs/react'
import React, { Suspense, PropsWithChildren, useState } from 'react'
import Header from "@/Components/Lessee/Header"
import Profile from '@/Components/Lessee/Profile'
import { PageProps } from '@/types'
import LesseeSidebarContent from '@/Components/Lessee/LesseeSidebarContent'
import SidebarMenu from './Sidebar/SidebarMenu'
import MobileView from './Sidebar/MobileView'
import { sidenavs } from '@/data/sidebarnavs';

const AuthLayout = ({children}:PropsWithChildren) => {
    const [showLessorModal, setShowLessorModal] = useState<boolean>(false);

  return (
    <div className="relative">
        <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
            <Head title="Reservations" />

            <Header />

            
            <div className="flex flex-1 flex-col md:flex-row mt-16">
                {/* Sidebar */}
                <aside className="hidden md:flex flex-col w-80 bg-gray-50 border-r border-gray-200 p-6 space-y-6">
                    <Suspense>
                        <Profile />
                    </Suspense>

                    {/* Sidebar menu */}
                    <SidebarMenu />
                </aside>

                <section className=" max-w-7xl mx-auto py-4 px-2 md:px-6 md:py-8">
                    {/* Mobile View */}
                    <MobileView onShowLessorModal={ () => setShowLessorModal(true) } />

                    {/* Main Content */}
                    <Suspense fallback={<div className="text-center text-orange-600 py-10">Loading...</div>}>
                        {children}
                    </Suspense>
                    
                </section>
            </div>
        </div>
    </div>
  )
}

export default AuthLayout