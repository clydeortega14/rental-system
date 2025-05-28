import React from 'react';
import AdminLayoutAntD from '../../../../js/Layouts/AdminLayoutAntD';


const DashboardAntD: React.FC = () => {
    return (
        <AdminLayoutAntD
            activemenu='admin/users'
            activesubmenu='admin/users/index'>
            <div>
                <h1>Users</h1>
                <p>Welcome to the admin users page!</p>
            </div>
        </AdminLayoutAntD>
    );
}
export default DashboardAntD;
