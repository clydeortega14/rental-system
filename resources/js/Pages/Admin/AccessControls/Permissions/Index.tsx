import React from 'react';
import AdminLayout from '../../../../../js/Layouts/AdminLayout';
import { PageWithAdminLayout } from '@/types';


const Permissions: PageWithAdminLayout = () => {
    return (
        <div>
            <h1>Permissions</h1>
            <p>Welcome to the access controls Permissions!</p>
        </div>
    );
}

Permissions.layout = (page) => (
    <AdminLayout
        active_keys={['/admin/access-controls/permissions']}
        active_selected_keys={['/admin/access-controls']}
    >
        {page}
    </AdminLayout>
);

export default Permissions;
