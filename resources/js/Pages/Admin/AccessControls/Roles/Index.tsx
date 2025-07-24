import React from 'react';
import AdminLayout from '../../../../../js/Layouts/AdminLayout';
import { PageWithAdminLayout } from '@/types';


const Roles: PageWithAdminLayout = () => {
    return (
        <div>
            <h1>Roles</h1>
            <p>Welcome to the access controls Poles!</p>
        </div>
    );
}

Roles.layout = (page) => (
    <AdminLayout
        active_keys={['/admin/access-controls/roles']}
        active_selected_keys={['/admin/access-controls']}
    >
        {page}
    </AdminLayout>
);
export default Roles;
