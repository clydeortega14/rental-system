import { useForm } from '@inertiajs/react';
import NavItem from '../../js/Components/NavItem';

import {
    DashboardIcon,
    UsersIcon,
    SettingsIcon,
    LogoutIcon,
    MenuIcon,
    CloseIcon,
} from '../../js/Components/Icons';

interface AdminSidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    setMobileSidebarOpen: (open: boolean) => void;
    mobileSidebarOpen: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ sidebarOpen, setSidebarOpen, mobileSidebarOpen, setMobileSidebarOpen }) => {
    const { post } = useForm();

    const navItems = [
        {
            icon: <DashboardIcon />,
            text: 'Dashboard',
            path: '/admin/dashboard',
        },
        {
            icon: <UsersIcon />,
            text: 'Lessors',
            subItems: [
                {
                    icon: <UsersIcon />,
                    text: 'Lists',
                    path: '/admin/lessors',
                },
                {
                    icon: <UsersIcon />,
                    text: 'Applications',
                    path: '/admin/lessors/applications',
                },
            ],
        },
        {
            icon: <UsersIcon />,
            text: 'Users',
            subItems: [
                {
                    icon: <UsersIcon />,
                    text: 'Lists',
                    path: '/admin/users',
                },
                {
                    icon: <UsersIcon />,
                    text: 'Identity Verification',
                    path: '/admin/users/kyc/list',
                },
            ],
        },
        {
            icon: <SettingsIcon />,
            text: 'Access Controls',
            subItems: [
                {
                    icon: <SettingsIcon />,
                    text: 'Roles',
                    path: '/admin/access-controls/roles',
                },
                {
                    icon: <SettingsIcon />,
                    text: 'Permissions',
                    path: '/admin/access-controls/permissions',
                },
            ],
        },
        {
            icon: <SettingsIcon />,
            text: 'Configurations',
            subItems: [
                {
                    icon: <SettingsIcon />,
                    text: 'Forms',
                    subItems: [
                        {
                            icon: <SettingsIcon />,
                            text: 'Forms',
                            path: '/admin/configurations/forms/index',
                        },
                        {
                            icon: <SettingsIcon />,
                            text: 'Fields',
                            path: '/admin/configurations/forms/fields',
                        },
                        {
                            icon: <SettingsIcon />,
                            text: 'Field Groups',
                            path: '/admin/configurations/forms/fields/groups',
                        },
                        {
                            icon: <SettingsIcon />,
                            text: 'Field Types',
                            path: '/admin/configurations/forms/fields/types',
                        },
                        {
                            icon: <SettingsIcon />,
                            text: 'Data Types',
                            path: '/admin/configurations/forms/fields/data-types',
                        },
                    ],
                },
                {
                    icon: <SettingsIcon />,
                    text: 'Categories',
                    subItems: [
                        {
                            icon: <SettingsIcon />,
                            text: 'Categories',
                            path: '/admin/configurations/categories/index',
                        },
                        {
                            icon: <SettingsIcon />,
                            text: 'Tags',
                            path: '/admin/configurations/categories/tags',
                        },
                    ],
                },
            ],
        },
        {
            icon: <LogoutIcon />,
            text: 'Logout',
            path: '/admin/logout',
        },
    ];

    return (
        <div
            className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-800 text-white transition-all duration-300 fixed md:relative z-20 h-full ${
                mobileSidebarOpen ? 'block' : 'hidden md:block'
            }`}
        >
            <div className="p-4 flex items-center justify-between">
                {sidebarOpen ? (
                    <h1 className="text-2xl font-bold">ADMINISTRATOR</h1>
                ) : (
                    <h1 className="text-2xl font-bold">A</h1>
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
                    X
                </button>
            </div>

            <nav className="mt-8">
                {navItems.map((item) =>
                    item.text === 'Logout' ? (
                        <NavItem
                            key={item.text}
                            item={item}
                            sidebarOpen={sidebarOpen}
                            onClick={() => post(route('admin.logout'))}
                        />
                    ) : (
                        <NavItem key={item.text} item={item} sidebarOpen={sidebarOpen} />
                    )
                )}
            </nav>
        </div>
    );
};

export default AdminSidebar;
