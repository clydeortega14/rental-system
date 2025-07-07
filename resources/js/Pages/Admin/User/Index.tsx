import React from 'react';
import AdminLayoutAntD from '../../../../js/Layouts/AdminLayoutAntD';
import { PageWithAdminLayout } from '@/types';


const DashboardAntD: PageWithAdminLayout = () => {
    return (
        <div>
            <h1>Users</h1>
            <p>Welcome to the admin users page!</p>
        </div>
    );
}

DashboardAntD.layout = (page: React.ReactNode) => (
    <AdminLayoutAntD
        active_keys={['/admin/users/index']}
        active_selected_keys={['/admin/users']}
    >
        {page}
    </AdminLayoutAntD>
);
export default DashboardAntD;
