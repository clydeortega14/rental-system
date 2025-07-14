import React from 'react';
import AdminLayoutAntD from '../../../../../js/Layouts/AdminLayoutAntD';
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
    <AdminLayoutAntD
        active_keys={['/admin/access-controls/roles']}
        active_selected_keys={['/admin/access-controls']}
    >
        {page}
    </AdminLayoutAntD>
);
export default Roles;
