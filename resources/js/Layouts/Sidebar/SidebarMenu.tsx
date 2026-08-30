import { sidenavs } from '@/data/sidebarnavs'
import { NavbarItem } from '@/types/navs'
import { Link } from '@inertiajs/react'
import React from 'react'
import { BiSolidDashboard, BiSolidStore } from 'react-icons/bi'

const SidebarMenu = () => {
  return (
    <div className="mt-6 space-y-6 text-sm text-gray-700">
        <div className="mb-4 flex justify-center">
            <div className="w-full max-w-xs">
            <Link
                href="/"
                className="relative w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-[#081328] hover:bg-[#0d1f4a] text-white rounded-lg font-semibold transition shadow overflow-hidden"
            >
                {/* Shine effect */}
                <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.6)_30%,rgba(255,255,255,0.8)_50%,rgba(255,255,255,0.6)_70%,transparent)] blur-[4px] animate-shine pointer-events-none" />

                {/* Content with shrink effect */}
                <span className="relative z-10 inline-flex items-center gap-2 animate-shrink-during-shine">
                    <BiSolidStore size={18} />
                    <span>Hot Rentals — Book Now!</span>
                </span>
            </Link>
            </div>
        </div>


        <div className="flex flex-col space-y-6 items-start">
            {
                sidenavs.map((nav: NavbarItem) => (
                    <div className="w-full space-y-1">
                
                    <Link href={nav.link} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors bg-jaba-yellow text-slate-100  hover:bg-jaba-hover">
                        <span className="relative z-10 inline-flex items-center gap-2 animate-shrink-during-shine">
                            {nav.icon}
                            <span className="truncate">{nav.label}</span>
                        </span>
                    </Link>
                </div>
                ))
            }
            
        </div>
    </div>
  )
}

export default SidebarMenu