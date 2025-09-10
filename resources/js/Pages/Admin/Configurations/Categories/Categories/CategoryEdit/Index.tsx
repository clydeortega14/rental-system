import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Modal from '@/Components/Admin/Categories/Modal';  // Import the modal component
import { Category } from '@/types/category'; // Import the correct Category type

type PageProps = {
  category: Category;      // Make sure this matches your backend data
  errors?: any;
};

const CategoryEdit = () => {
  // Cast props to your PageProps type
  const { category } = usePage().props as PageProps;

  // State for modal open/close
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store selected category
  const [selectedCategory, setSelectedCategory] = useState<Category>(category);

  const handleSave = (updatedCategory: Category) => {
    console.log('Updated Category:', updatedCategory);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 p-4 max-w-8xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Edit Category</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-brandYellow text-white px-4 py-2 rounded"
      >
        Edit Category Details
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectedCategory}
        onSave={handleSave}
      />
    </div>
  );
};

export default CategoryEdit;
