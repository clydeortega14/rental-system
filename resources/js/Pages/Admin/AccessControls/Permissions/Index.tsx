import React from 'react';
import AdminLayoutAntD from '../../../../../js/Layouts/AdminLayoutAntD';
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
    <AdminLayoutAntD
        active_keys={['/admin/access-controls/permissions']}
        active_selected_keys={['/admin/access-controls']}
    >
        {page}
    </AdminLayoutAntD>
);

export default Permissions;
