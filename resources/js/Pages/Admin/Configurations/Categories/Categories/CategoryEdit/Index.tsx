import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Modal from '@/Components/Admin/Categories/Modal';  // Import the modal component

// Define the Category type to match your server-side data structure
type TemplateCategory = {
  service_fee: number;
  mode_of_payment: string[];
  pricing_duration: string[];
};

type CustomField = {
  label: string;
  type: string;
  options: string[];
};

type Category = {
  id: number;
  name: string;
  description: string;
  templateCategory: TemplateCategory;
  customFields: CustomField[];
  detail: any; // Refine based on your `Detailable` model
  filters: any[]; // Adjust based on the `Filter` model
  rentalItems: any[]; // Adjust based on the `RentalAddItem` model
};

type PageProps = {
  category: Category;
  errors: any;
};

const CategoryEdit = () => {
  const { category }: PageProps = usePage().props;  // Destructure category from props

  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal open/close state
  const [selectedCategory, setSelectedCategory] = useState<Category>(category);  // State to store selected category

  // Function to handle saving the category (You can send a PUT request to update it)
  const handleSave = (updatedCategory: Category) => {
    // Here you can send the updated category data to the backend
    console.log('Updated Category:', updatedCategory);
    // After saving, close the modal
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

      {/* Modal to edit category details */}
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
