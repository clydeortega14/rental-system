import { Head, usePage } from '@inertiajs/react'
import React, { Suspense, PropsWithChildren } from 'react'
import Header from "@/Components/Lessee/Header"
import Profile from '@/Components/Lessee/Profile'
import { PageProps } from '@/types'
import LesseeSidebarContent from '@/Components/Lessee/LesseeSidebarContent'
import SidebarMenu from './Sidebar/SidebarMenu'

const AuthLayout = ({children}:PropsWithChildren) => {

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
        <Head title="Admin Dashboard" />
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
        </div>

        <main>
            {children}
        </main>
    </div>
  )
}

export default AuthLayout