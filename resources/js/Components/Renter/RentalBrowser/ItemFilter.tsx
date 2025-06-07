import { IPriceRange } from '@/types/priceRange';
import { Category, CategoryFilterType, ChoiceType } from '@/types/rentalCategory';
import { ICategory } from '@/types/rentalCategory';
import React from 'react'

interface ItemFilterProps {
    showFilters: boolean;
    clearAllFilters: () => void;
    categories: CategoryFilterType[];
    selectedCategories: ICategory;
    setSelectedCategories: () => void;
    priceRanges: IPriceRange;
    selectedPriceRanges: IPriceRange;
    setSelectedPriceRanges: () => void;
}



const ItemFilter = ({
    showFilters, 
    clearAllFilters, 
    categories, 
    selectedCategories, 
    setSelectedCategories,
    priceRanges,
    selectedPriceRanges,
    setSelectedPriceRanges
}: ItemFilterProps
) => {
    const handleSelectedCategories = (choice: ChoiceType) => {
        if (selectedCategories.includes(choice.id)) {
            setSelectedCategories(selectedCategories.filter(id => id !== choice.id));
        } else {
            setSelectedCategories([...selectedCategories, choice.id]);
        }
    }
  return (
    <div className={`md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-800">Filters</h2>
              <button 
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            </div>

            <div className="mb-6">
              {categories.map((category_filter, index) => (
                <div key={category_filter.id}>
                  <h3 className="font-medium text-gray-700 mb-2">{category_filter.name}</h3>
                  {
                    category_filter.choices.map((choice, index) => (
                      <div key={choice.id} className="flex items-center py-2">
                        <input
                          type="checkbox"
                          id={`category-${choice.id}`}
                          checked={selectedCategories.includes(choice.id)}
                          onChange={ () => handleSelectedCategories(choice) }
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label 
                          htmlFor={`category-${choice.id}`}
                          className="ml-2 text-gray-700"
                        >
                          {choice.name}
                        </label>
                      </div>
                    ))
                  }
                </div>
              ))}
              
            </div>

            {/* <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
              {priceRanges.map(range => (
                <div key={range.id} className="flex items-center py-2">
                  <input
                    type="checkbox"
                    id={`price-${range.id}`}
                    checked={selectedPriceRanges.includes(range.id)}
                    onChange={() => {
                      if (selectedPriceRanges.includes(range.id)) {
                        setSelectedPriceRanges(selectedPriceRanges.filter(id => id !== range.id));
                      } else {
                        setSelectedPriceRanges([...selectedPriceRanges, range.id]);
                      }
                    }}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label 
                    htmlFor={`price-${range.id}`}
                    className="ml-2 text-gray-700"
                  >
                    {range.label}
                  </label>
                </div>
              ))}
            </div> */}

            {/* <div className="bg-white rounded-xl mb-2">
                <h3 className="font-medium text-gray-700 mb-2">Availability</h3>
                <div className="flex items-center py-2">
                <input
                    type="checkbox"
                    id="available-only"
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label 
                    htmlFor="available-only"
                    className="ml-2 text-gray-700"
                >
                    Available Now
                </label>
                </div>
            </div> */}

            
        </div>
    </div>
  )
}

export default ItemFilter