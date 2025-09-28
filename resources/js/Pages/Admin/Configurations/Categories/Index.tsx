import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../../../js/Layouts/AdminLayout';
import { PageWithAdminLayout } from '@/types';

import EditCategoryModal from '@/Components/Admin/Categories/Modal';
import { Category as BaseCategory } from '@/types/category'; // ✅ import shared Category type

// Extend the base Category for index view
interface CategoryWithRelations extends Omit<BaseCategory, 'tags' | 'image'> {
  tags: { id: number; name: string }[]; // relation objects from backend
  image?: string | null;                // path string for displaying
}

type PageProps = {
  categories: CategoryWithRelations[];
};

const AdminConfigurationCategoryIndex: PageWithAdminLayout = () => {
  const { categories } = usePage<PageProps>().props;
  const [searchText, setSearchText] = useState('');
  const [tagFilter, setTagFilter] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithRelations | null>(null);

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

  // Open modal and set selected category
  const handleEditClick = (category: CategoryWithRelations) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // Save edited category (you’ll connect Inertia PUT later)
  const handleSave = (updatedCategory: BaseCategory) => {
    setIsModalOpen(false);
    // TODO: Inertia PUT request here
  };

  return (
    <div className="space-y-6 p-4 max-w-8xl mx-auto">
      <Head title="Categories" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <Link
          href="/admin/configurations/categories/create"
          className="bg-brandYellow hover:bg-yellow-500 text-white px-4 py-2 rounded"
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
        <thead className="bg-brandYellow text-white">
          <tr>
            <th className="text-left py-3 px-6">Image</th>
            <th className="text-left py-3 px-6">Name</th>
            <th className="text-left py-3 px-6">Description</th>
            <th className="text-left py-3 px-6">Tags</th>
            <th className="text-center py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
          {filteredCategories.map((category) => (
            <tr key={category.id} className="border-b last:border-b-0 hover:bg-gray-50">
              <td className="py-3 px-6">
                {category.image_path || category.image ? (
                  <img
                    src={`/storage/${category.image_path || category.image}`}
                    alt={category.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400 italic">No Image</span>
                )}
              </td>
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
                <button
                  onClick={() => handleEditClick(category)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing category */}
      {selectedCategory && (
        <EditCategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={selectedCategory as unknown as BaseCategory} // cast to base for modal
          onSave={handleSave}
        />
      )}
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
