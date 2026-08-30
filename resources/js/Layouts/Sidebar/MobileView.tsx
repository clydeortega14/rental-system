import Profile from '@/Components/Lessee/Profile'
import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import React, { Suspense } from 'react'
import { BiLockOpen, BiSolidStore, BiSolidUserCheck } from 'react-icons/bi'

interface Props {
    onShowLessorModal: () => void
}

const MobileView = ({onShowLessorModal}: Props) => {
  const { auth } = usePage<PageProps>().props as any;
  const user = auth.user;


  return (
    <div className="block md:hidden p-4 bg-gray-50 border-b border-gray-200 shadow-sm">
        <Suspense fallback={<div className="text-center p-6">Loading profile...</div>}>
            <Profile layout="header" />
        </Suspense>
        <div className="mt-4 px-2 flex flex-col gap-2">
            <div className="flex gap-2">
                <Link 
                    href="/"
                    className="relative flex-1 flex items-center justify-center bg-brandYellow gap-2 px-4 py-2 text-sm text-white rounded-lg shadow transition overflow-hidden"
                >
                    <span className="relative z-10 inline-flex items-center gap-2 animate-shrink-during-shine">
                        <BiSolidStore size={18} />
                        <span className="hidden md:inline">Rent Now!</span>
                    </span>
                </Link>

                {/* Be a Lessor (only if not yet approved) */}
                {!user.kyc && (
                    <button
                        type="button"
                        onClick={onShowLessorModal}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm text-white bg-brandYellow hover:bg-jaba-hover rounded-lg shadow transition"
                    >
                    <BiSolidUserCheck size={18} />
                    <span className="hidden md:inline">Be a Lessor</span>
                    </button>
                )}

                {/* Logout */}
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm text-white rounded-lg shadow transition"
                    style={{ backgroundColor: "#081328" }}
                >
                    <BiLockOpen size={18} />
                    <span className="hidden md:inline">Logout</span>
                </Link>
                
            </div>
        </div>
    </div>
  )
}

export default MobileView