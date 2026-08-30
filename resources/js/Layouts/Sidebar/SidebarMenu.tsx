import { sidebarTabs, sidenavs } from '@/data/sidebarnavs'
import { INavbar, NavbarItem } from '@/types/navs'
import { Link } from '@inertiajs/react'
import React from 'react'
import { BiLockOpen, BiSolidDashboard, BiSolidStore } from 'react-icons/bi'

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


        <div className="flex flex-col items-start">
            {
                sidebarTabs.map((sideTabs: INavbar, index: number) => (
                    <div className="w-full space-y-1" key={index}>
                    <p className="text-xs font-semibold text-gray-500 uppercase">{sideTabs.section}</p>
                    {
                        sideTabs.items.map((nav: NavbarItem) => (
                            <Link href={nav.link} key={nav.key}>
                                <div className={`relative w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors overflow-hidden 
                                    ${nav.active ? 
                                        'bg-brandYellow text-white hover:bg-jaba-hover data-[state=active]:bg-brandYellow data-[state=active]:text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-jaba-hover data-[state=active]:bg-brandYellow data-[state=active]:text-white'
                                    }
                                    `}
                                >
                                    <span className="relative z-10 inline-flex items-center gap-2 animate-shrink-during-shine">
                                        {nav.icon}
                                        <span className="truncate">{nav.label}</span>
                                    </span>
                                 </div>
                            </Link>
                        ))
                    }
                    
                </div>
                ))
            }

            
            
        </div>

        {/* Logout / Account Setting */}
        {
            <Link
                href={route('logout')}
                method="post"
                as="button"
                className="space-y-6 w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors bg-jaba-yellow text-white hover:bg-jaba-hover"
            >
                <BiLockOpen size={18} />
                Logout
            </Link>
        }
    </div>
  )
}

export default SidebarMenu