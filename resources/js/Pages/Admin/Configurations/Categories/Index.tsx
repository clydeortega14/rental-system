import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../../../js/Layouts/AdminLayout';
import { PageWithAdminLayout } from '@/types';
import EditCategoryModal from '@/Components/Admin/Categories/Modal';  // Import the modal component

interface Category {
  id: number;
  name: string;
  description?: string;
  image_path?: string | null; // Add image field
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
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal open/close state
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);  // Selected category for editing

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

  // Function to open the modal and set selected category
  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // Function to save the edited category (you can send a PUT request to update it)
  const handleSave = (updatedCategory: Category) => {
    console.log('Updated Category:', updatedCategory);
    setIsModalOpen(false);  // Close the modal after saving
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
              <td colSpan={4} className="text-center py-4 text-gray-500">
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
                  onClick={() => handleEditClick(category)}  // Open modal to edit this category
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
          category={selectedCategory}
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
