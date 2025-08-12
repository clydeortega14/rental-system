import { CategoryCustomField } from '@/types/rentalCategory';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Tag, Layers, Folder } from "lucide-react";

interface ItemFilterProps {
  showFilters: boolean;
  clearAllFilters: () => void;
  categoryCustomFields: CategoryCustomField[];
}

const ItemFilter = ({
  showFilters,
  clearAllFilters,
  categoryCustomFields
}: ItemFilterProps) => {
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const handleSelectedCategories = (choice: string) => {
    // Selection logic here
  };

  return (
    <aside
      className={`w-full md:w-64 bg-white border-r border-gray-200 h-full ${
        showFilters ? 'block' : 'hidden'
      } md:block`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <h2 className="font-bold text-gray-800">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear all
        </button>
      </div>

      {/* Nav List */}
      <nav className="px-2 py-4 space-y-1">
        {categoryCustomFields.map((category_filter, index) => (
          <div key={category_filter.id}>
            {/* Category Title */}
            <button
              onClick={() => toggleCategory(index)}
              className="flex justify-between items-center w-full px-3 py-2 rounded-md text-left text-gray-700 hover:bg-gray-100 transition"
            >
              <span className="font-medium">{category_filter.label}</span>
              {openCategory === index ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>

            {/* Submenu Items */}
            <div
              className={`ml-3 border-l border-gray-200 pl-3 transition-all duration-300 overflow-hidden ${
                openCategory === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              {category_filter.options.map((choice, idx) => (
                <label
                  key={idx}
                  htmlFor={`category-${index}-${idx}`}
                  className="flex items-center py-1.5 text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={`category-${index}-${idx}`}
                    onChange={() => handleSelectedCategories(choice)}
                    className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  {choice}
                </label>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default ItemFilter;
