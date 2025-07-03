import React, { ReactNode } from 'react';
import AdminLayoutAntD from '../../../js/Layouts/AdminLayoutAntD';
import { PageWithAdminLayout } from '@/types';

const DashboardAntD: PageWithAdminLayout = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>
        </div>
    );
}

DashboardAntD.layout = (page => (
    <AdminLayoutAntD
        active_keys={['/admin/dashboard']}
        active_selected_keys={['/admin/dashboard']}
    >
        {page}
    </AdminLayoutAntD>
));

export default DashboardAntD;
