import React, { useState } from 'react';
import { Filter as FilterIcon, X } from 'lucide-react';
import Button from './Button';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterProps {
  title: string;
  options: FilterOption[];
  onFilterChange: (selectedOptions: string[]) => void;
  initialSelected?: string[];
}

const Filter: React.FC<FilterProps> = ({ 
  title, 
  options, 
  onFilterChange, 
  initialSelected = [] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelected);

  const toggleOption = (optionId: string) => {
    let newSelected;
    if (selectedOptions.includes(optionId)) {
      newSelected = selectedOptions.filter(id => id !== optionId);
    } else {
      newSelected = [...selectedOptions, optionId];
    }
    setSelectedOptions(newSelected);
  };

  const handleApply = () => {
    onFilterChange(selectedOptions);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedOptions([]);
    onFilterChange([]);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-3 py-2 rounded-lg border ${
          selectedOptions.length > 0 
            ? 'border-blue-600 bg-blue-50 text-blue-600' 
            : 'border-gray-300 text-gray-700'
        } hover:bg-gray-50`}
      >
        <FilterIcon className="h-4 w-4 mr-2" />
        <span>{title}</span>
        {selectedOptions.length > 0 && (
          <span className="ml-2 bg-blue-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {selectedOptions.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">{title}</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="max-h-60 overflow-y-auto mb-4">
            {options.map((option, index) => (
              <div key={index} className="flex items-center py-2">
                <input
                  type="checkbox"
                  id={`filter-${index}`}
                  checked={selectedOptions.includes(index)}
                  onChange={() => toggleOption(index)}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label 
                  htmlFor={`filter-${index}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClear}
              className="flex-1"
            >
              Clear
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleApply}
              className="flex-1"
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;