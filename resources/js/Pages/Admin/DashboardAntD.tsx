import AdminLayoutAntD from '../../../js/Layouts/AdminLayoutAntD';
import { PageWithAdminLayout } from '@/types';

const DashboardAntD: PageWithAdminLayout = () => {
    return (
        <div className="py-12 min-h-screen">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-start">
                    <h2>hi admin</h2>
                    
                
                </div>
            </div>
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
