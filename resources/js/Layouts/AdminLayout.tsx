import { useState } from 'react';
import NotificationPanel from '../../js/Components/NotificationPanel';
import { Notification } from '../types';
import {
    DashboardIcon,
    UsersIcon,
    ProductsIcon,
    OrdersIcon,
    SettingsIcon,
    LogoutIcon,
    MenuIcon,
    CloseIcon,
    NotificationIcon,
    ProfileIcon
} from '../../js/Components/Icons';
import { AdminLayoutProps, NavItemProps } from '../types';
import NavItem from '../../js/Components/NavItem';

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

    const navItems: NavItem[] = [
        {
            icon: <DashboardIcon />,
            text: 'Dashboard',
            path: '/admin/dashboard',
            active: true
        },
        {
            icon: <UsersIcon />,
            text: 'Users',
            subItems: [
                {
                    icon: <UsersIcon />,
                    text: 'All Users',
                    path: '/users'
                },
                {
                    icon: <SettingsIcon />,
                    text: 'Roles & Permissions',
                    path: '/users/roles'
                },
                {
                    icon: <ProfileIcon />,
                    text: 'User Groups',
                    path: '/users/groups'
                }
            ]
        },
        {
            icon: <ProductsIcon />,
            text: 'Products',
            subItems: [
                {
                    icon: <ProductsIcon />,
                    text: 'Inventory',
                    path: '/products'
                },
                {
                    icon: <OrdersIcon />,
                    text: 'Categories',
                    path: '/products/categories'
                }
            ]
        },
        {
            icon: <OrdersIcon />,
            text: 'Orders',
            path: '/orders'
        },
        {
            icon: <SettingsIcon />,
            text: 'Settings',
            path: '/settings'
        }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-800 text-white transition-all duration-300 fixed md:relative z-20 h-full ${mobileSidebarOpen ? 'block' : 'hidden md:block'}`}>
                <div className="p-4 flex items-center justify-between">
                    {sidebarOpen ? (
                        <h1 className="text-2xl font-bold">AdminPanel</h1>
                    ) : (
                        <h1 className="text-2xl font-bold">AP</h1>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="hidden md:block text-white hover:text-gray-300"
                    >
                        {sidebarOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                    </button>
                    <button
                        onClick={() => setMobileSidebarOpen(false)}
                        className="block md:hidden text-white hover:text-gray-300"
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <nav className="mt-8">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.text}
                            item={item}
                            sidebarOpen={sidebarOpen}
                        />
                    ))}
                    <div className="border-t border-indigo-700 mt-4 pt-4">
                        <NavItem
                            item={{
                                icon:<LogoutIcon />,
                                text: "Logout",
                                active:false
                            }}
                            key={"logout"}
                            sidebarOpen={sidebarOpen}
                        />
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between px-6 py-4">
                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="md:hidden text-gray-500 hover:text-gray-600"
                        >
                            <MenuIcon className="w-6 h-6" />
                        </button>

                        <div className="flex items-center space-x-4">
                            <button className="relative text-gray-500 hover:text-gray-600">
                                <NotificationIcon className="w-6 h-6" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                            </button>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <ProfileIcon className="w-5 h-5 text-indigo-600" />
                                </div>
                                <span className="text-sm font-medium">Admin User</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
};

/* const NavItem: React.FC<NavItemProps> = ({ icon, text, active = false, sidebarOpen }) => {
    return (
        <a
            href="#"
            className={`flex items-center px-6 py-3 ${active ? 'bg-indigo-700' : 'hover:bg-indigo-700'} transition-colors duration-200`}
        >
            <span className="flex-shrink-0">
                {icon}
            </span>
            {sidebarOpen && (
                <span className="ml-4 font-medium">{text}</span>
            )}
        </a>
    );
}; */

export default AdminLayout;
