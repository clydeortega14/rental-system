import React from 'react';
import AdminLayoutAntD from '../../../js/Layouts/AdminLayoutAntD';


const DashboardAntD: React.FC = () => {
    return (
        <AdminLayoutAntD
            activemenu='admin/dashboard'
            activesubmenu='admin/dashboard'
        >
            <div>
                <h1>Dashboard</h1>
                <p>Welcome to the admin dashboard!</p>
            </div>
        </AdminLayoutAntD>
    );
}
export default DashboardAntD;
