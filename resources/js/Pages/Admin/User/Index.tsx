import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { PageWithAdminLayout, PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';

interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
  kyc?: {
    kyc_status?: string;
    kyc_verified?: boolean;
  };
  contact?: {
    mobile?: string;
    telephone?: string;
  };
  company?: {
    name?: string;
    email?: string;
    business_address?: string;
  };
}

type Props = PageProps & {
  users: {
    data: User[];
    meta: {
      total: number;
      current_page: number;
      per_page: number;
    };
    links: any;
  };
  filters?: {
    search?: string;
  };
};



const getKycColorClass = (status: string) => {
  switch (status) {
    case 'Approve': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const UserList: PageWithAdminLayout = () => {
  const { users, filters } = usePage<Props>().props;
  const [search, setSearch] = useState(filters?.search ?? '');

  const totalPages = users?.meta ? Math.ceil(users.meta.total / users.meta.per_page) : 1;
  const currentPage = users?.meta?.current_page ?? 1;
  const perPage = users?.meta?.per_page ?? 10;

  const handleSearch = () => {
    router.get(route('admin.users.index'), { search, page: 1 }, { preserveState: true });
  };

  const handlePageChange = (page: number) => {
    router.get(route('admin.users.index'), { page, search }, { preserveState: true });
  };


  return (
    <div className="space-y-6 p-4 max-w-8xl mx-auto">
      <h1 className="text-2xl font-bold">User List</h1>

      {/* Search */}
      <div className="max-w-md bg-white p-4 rounded shadow flex space-x-2">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button
          onClick={handleSearch}
          className="bg-amber-400 hover:bg-amber-500 text-white px-4 rounded"
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">KYC Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.data.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.data.map(user => {
                const status = user.kyc?.kyc_status ?? 'N/A';
                const kycClass = getKycColorClass(status);

                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <img
                        src={user.photo ? `/storage/${user.photo}` : '/img/defaultImage.png'}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-3">{user.name}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${kycClass}`}>
                        {status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <p><strong>Mobile:</strong> {user.contact?.mobile ?? 'N/A'}</p>
                      <p><strong>Telephone:</strong> {user.contact?.telephone ?? 'N/A'}</p>
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => alert(`View user ${user.name}`)} // Replace with real action
                        className="text-indigo-600 hover:text-indigo-900 font-semibold"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* Pagination */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`px-3 py-1 rounded border ${
            currentPage <= 1
              ? 'text-gray-400 border-gray-300 cursor-not-allowed'
              : 'text-gray-700 border-gray-400 hover:bg-gray-100'
          }`}
        >
          Previous
        </button>

        {[...Array(totalPages).keys()].map(i => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 rounded border ${
                pageNum === currentPage
                  ? 'bg-amber-400 text-white border-amber-400'
                  : 'text-gray-700 border-gray-400 hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage >= totalPages
              ? 'text-gray-400 border-gray-300 cursor-not-allowed'
              : 'text-gray-700 border-gray-400 hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

UserList.layout = (page: React.ReactNode) => (
  <AdminLayout
    active_keys={['/admin/users/index']}
    active_selected_keys={['/admin/users']}
  >
    {page}
  </AdminLayout>
);

export default UserList;
