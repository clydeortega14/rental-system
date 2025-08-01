import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AdminLayout from '../../../../../js/Layouts/AdminLayout';
import { PageWithAdminLayout, PageProps } from '@/types';




interface Lessor {
  id: number;
  approved_at: string;
  user: {
    name: string;
    photo?: string;
    contact?: {
      mobile?: string;
      telephone?: string;
    };
    company?: {
      name?: string;
      email?: string;
      business_address?: string;
    };
  };
}

type Props = PageProps & {
  lessors: {
    data: Lessor[];
    meta: {
      total: number;
      current_page: number;
      per_page: number;
      last_page: number;
    };
    links: any;
  };
  filters?: {
    search?: string;
  };
};



const LessorList: PageWithAdminLayout = () => {
  const { lessors, filters } = usePage<Props>().props;
  const [search, setSearch] = useState(filters?.search ?? '');

  const currentPage = lessors?.meta?.current_page ?? 1;
  const lastPage = lessors?.meta?.last_page ?? 1;
  const total = lessors?.meta?.total ?? 0;

  const handleSearch = () => {
    router.get(route('admin.lessors.index'), { search, page: 1 }, { preserveState: true, replace: true });
  };

  const handlePageChange = (page: number) => {
    router.get(route('admin.lessors.index'), { page, search }, { preserveState: true, replace: true });
  };

  return (
    <div className="space-y-6 p-4 max-w-8xl mx-auto">
      <h1 className="text-2xl font-bold">Lessor List</h1>

      {/* Search Card */}
      <div className="p-4 rounded  max-w-md">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by name or company"
            value={search}
            onChange={e => setSearch(e.target.value)}
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
      </div>

      {/* Table Card */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-brandYellow text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Lessor Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Company Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {lessors.data.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No lessors found.
                </td>
              </tr>
            ) : (
              lessors.data.map(lessor => (
                <tr key={lessor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <img
                      src={lessor.user.photo ? `/storage/${lessor.user.photo}` : '/img/defaultImage.png'}
                      alt={lessor.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-3">{lessor.user.name}</td>
                  <td className="px-6 py-3">{lessor.user.company?.name ?? 'N/A'}</td>
                  <td className="px-6 py-3">
                    <div>
                      <p><strong>Mobile:</strong> {lessor.user.contact?.mobile ?? 'N/A'}</p>
                      <p><strong>Telephone:</strong> {lessor.user.contact?.telephone ?? 'N/A'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => alert(`View lessor ${lessor.user.name}`)} // Replace with real action
                      className="text-indigo-600 hover:text-indigo-900 font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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

        {/* Show simple page numbers */}
        {[...Array(lastPage).keys()].map(i => {
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
          disabled={currentPage >= lastPage}
          className={`px-3 py-1 rounded border ${
            currentPage >= lastPage
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

LessorList.layout = (page: React.ReactNode) => (
  <AdminLayout active_keys={['/admin/lessors/index']} active_selected_keys={['/admin/lessors']}>
    {page}
  </AdminLayout>
);

export default LessorList;
