import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../../../js/Layouts/AdminLayout';
import { PageWithAdminLayout } from '@/types';

interface Category {
  id: number;
  name: string;
  description?: string;
  tags: {
    id: number;
    name: string;
  }[];
}

type PageProps = {
  categories: Category[];
};

const AdminConfigurationCategoryIndex: PageWithAdminLayout = () => {
  const { categories } = usePage<PageProps>().props;
  const [searchText, setSearchText] = useState('');
  const [tagFilter, setTagFilter] = useState<number[]>([]);

  // Filter categories based on search text and tags
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchText.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchText.toLowerCase());

    const matchesTags =
      tagFilter.length > 0
        ? category.tags.some((tag) => tagFilter.includes(tag.id))
        : true;

      
    return matchesSearch && matchesTags;
  });

  return (
    <div className="space-y-6 p-4 max-w-8xl mx-auto">
      <Head title="Categories" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <Link
          href="/admin/configurations/categories/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Add Category
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
        />
      </div>

      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="text-left py-3 px-6">Name</th>
            <th className="text-left py-3 px-6">Description</th>
            <th className="text-left py-3 px-6">Tags</th>
            <th className="text-center py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
          {filteredCategories.map((category) => (
            <tr key={category.id} className="border-b last:border-b-0 hover:bg-gray-50">
              <td className="py-3 px-6 font-semibold">{category.name}</td>
              <td className="py-3 px-6">{category.description || '-'}</td>
                <td className="py-3 px-6">
                {!Array.isArray(category.tags) || category.tags.length === 0
                    ? '-'
                    : category.tags.map((tag) => (
                        <span
                        key={tag.id}
                        className="inline-block bg-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded mr-1"
                        >
                        {tag.name}
                        </span>
                    ))}
                </td>
              <td className="py-3 px-6 text-center space-x-2">
                <Link
                  href={`/admin/configurations/categories/${category.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Edit
                </Link>
                {/* Uncomment if you want delete functionality */}
                {/* <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

AdminConfigurationCategoryIndex.layout = (page) => (
  <AdminLayout
    active_keys={['/admin/configurations/categories', '/admin/configurations/categories/index']}
    active_selected_keys={['/admin/configurations']}
  >
    {page}
  </AdminLayout>
);

export default AdminConfigurationCategoryIndex;
