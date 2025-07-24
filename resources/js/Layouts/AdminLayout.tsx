import { useState } from 'react';
import {
    MenuIcon,
    NotificationIcon,
    ProfileIcon
} from '../../js/Components/Icons';
import { AdminLayoutProps } from '../types';
import AdminSidebar from './AdminSidebar';
import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';


const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
    const { props } = usePage<PageProps>();
    const admin = props.auth?.user;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                mobileSidebarOpen={mobileSidebarOpen} // ✅ Add this
                setMobileSidebarOpen={setMobileSidebarOpen}
            />
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center px-6 py-4">
                      
                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="md:hidden text-gray-500 hover:text-gray-600"
                        >
                            <MenuIcon className="w-6 h-6" />
                        </button>

                        
                        <div className="flex items-center space-x-4 ml-auto">
                            <button className="relative text-gray-500 hover:text-gray-600">
                                <NotificationIcon className="w-6 h-6" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <ProfileIcon className="w-5 h-5 text-indigo-600" />
                                </div>
                                <span className="text-sm font-medium"> {admin?.name ? admin.name : 'Administrator'}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
