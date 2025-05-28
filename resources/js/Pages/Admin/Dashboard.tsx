import React from 'react';
import AdminLayout from '../../../js/Layouts/AdminLayout';

const App: React.FC = () => {
    return (
        <AdminLayout>
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Stats Cards */}
                    {['Total Users', 'Total Products', 'Total Orders', 'Revenue'].map((stat) => (
                        <div key={stat} className="bg-indigo-50 p-4 rounded-lg">
                            <h3 className="text-gray-500 text-sm font-medium">{stat}</h3>
                            <p className="text-2xl font-bold text-indigo-800 mt-2">1,234</p>
                        </div>
                    ))}
                </div>

                {/* Recent Orders Table */}
                <div className="overflow-x-auto">
                    <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[1, 2, 3, 4, 5].map((order) => (
                                <tr key={order}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#ORD-{1000 + order}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Customer {order}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {order % 2 === 0 ? 'Completed' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(100 + order * 20).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default App;
