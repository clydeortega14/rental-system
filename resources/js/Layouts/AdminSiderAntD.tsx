import { useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { Link, usePage } from '@inertiajs/react';
import {
    UserOutlined,
    DashboardFilled,
    LockOutlined,
    SettingOutlined,
    UserAddOutlined
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const AdminSiderAntD = ({ collapsible_status, active_keys, active_selected_keys }: {
    collapsible_status: boolean;
    active_keys?: string[];
    active_selected_keys?: string[];
}) => {

    const { url } = usePage();
    const renderMenuLabel = (path: string, label: string) => {
        return url === path ? <span style={{ color: 'white' }}>{label}</span> : <Link href={path}>{label}</Link>;
    };
    const items: MenuItem[] = [
        {
            key: '/admin/dashboard',
            icon: <DashboardFilled />,
            label: renderMenuLabel('/admin/dashboard', 'Dashboard'),
        },
        {
        key: '/admin/lessors-menu',
        icon: <UserAddOutlined />,
        label: 'Lessors',
        children: [
            { key: '/admin/lessors', label: renderMenuLabel('/admin/lessors', 'Lists') },
            { key: '/admin/lessors/applications', label: renderMenuLabel('/admin/lessors/applications', 'Applications') },
        ],
        },
        {
            key: '/admin/users',
            icon: <UserOutlined />,
            label: 'Users',
            children: [
                { key: '/admin/users/index', label: renderMenuLabel('/admin/users', 'Lists') },
                { key: '/admin/users/kyc/list', label: renderMenuLabel('/admin/users/kyc/list', 'Identity Verification') },
            ],
        },
        {
            key: '/admin/access-controls',
            icon: <LockOutlined />,
            label: 'Access Controls',
            children: [
                { key: '/admin/access-controls/roles', label: renderMenuLabel('/admin/access-controls/roles', 'Roles') },
                { key: '/admin/access-controls/permissions', label: renderMenuLabel('/admin/access-controls/permissions', 'Permissions') },
            ],
        },
        {
            key: '/admin/configurations',
            icon: <SettingOutlined />,
            label: 'Configurations',
            children: [
                {
                    key: '/admin/configurations/forms', label: 'Forms',
                    children: [
                        { key: '/admin/configurations/forms/index', label: renderMenuLabel('/admin/configurations/forms/index', 'Forms') },
                        { key: '/admin/configurations/forms/fields', label: renderMenuLabel('/admin/configurations/forms/fields', 'Fields') },
                        { key: '/admin/configurations/forms/field/groups', label: renderMenuLabel('/admin/configurations/forms/fields/groups', 'Field Groups') },
                        { key: '/admin/configurations/forms/field/types', label: renderMenuLabel('/admin/configurations/forms/fields/types', 'Field Types') },
                        { key: '/admin/configurations/forms/fields/data-types', label: renderMenuLabel('/admin/configurations/forms/fields/data-types', 'Data Types') },
                    ],

                },
                {
                    key: '/admin/configurations/categories', label: 'Categories',
                    children: [
                        { key: '/admin/configurations/categories/index', label: renderMenuLabel('/admin/configurations/categories/index', 'Categories') },
                        { key: '/admin/configurations/categories/tags', label: renderMenuLabel('/admin/configurations/categories/tags', 'Tags') },
                    ],

                },
            ],
        },

    ];

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsible_status}
            breakpoint="lg"
            style={
                {
                    overflow: 'auto',
                    height: '100vh',
                    position: 'sticky',
                    insetInlineStart: 0,
                    top: 0,
                    bottom: 0,
                    scrollbarWidth: 'thin',
                    scrollbarGutter: 'stable',
                }
            }
        >
            <div className="admin-logo" style={
                {
                    height: '32px',
                    margin: '16px',
                    background: 'rgba(255, 255, 255, .2)',
                    borderRadius: '6px',
                }
            } />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={active_keys}
                items={items}
                defaultOpenKeys={active_selected_keys}
            />
        </Sider>
    );
}

export default AdminSiderAntD;
