import ItemFilter from '../../Components/Renter/RentalBrowser/ItemFilter';
import Button from '../../Components/Renter/ui/Button';
import Card from '../../Components/Renter/ui/Card';
import { RentalItem } from '@/Interface/RentalItems';
import RenterLayout from '@/Layouts/RenterLayout';
import { PageProps } from '@/types';
import { PriceRange } from '@/types/priceRange';
import { CategoryCustomField } from '@/types/rentalCategory';
import { ICategory, Category, CategoryFilterType } from '@/types/rentalCategory';
import { Head, usePage } from '@inertiajs/react';
import bb from '@/../../public/img/banner/bb.jpg';
            
import { Search, MapPin, Store,SlidersHorizontal } from 'lucide-react';
import React, { useState } from 'react';

interface RentalBrowserProps {
    categories: Category[],
    priceRanges: PriceRange[],
    rentalItems: RentalItem[],
    category_filters: CategoryFilterType[];
    category: Category;
    category_custom_fields: CategoryCustomField[];
}



const RentalItemBrowser = ({
    rentalItems, 
    categories, 
    priceRanges, 
    category_filters, 
    category,
    category_custom_fields
}: RentalBrowserProps) => {

    const error_message = usePage<PageProps>().props.flash.error_message;

    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string | ''>('');
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>([]);

    const filteredItems = rentalItems.filter((item) => {
        
        const matchesSearch = !searchQuery || 
                                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.description !== null && item.description.toLowerCase().includes(searchQuery.toLowerCase());

        const default_price:number = item.price['daily'];

        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    
        let matchesPriceRange = true;

        return matchesSearch && matchesCategory && matchesPriceRange;
    });

    const clearAllFilters = () => {
        setSelectedCategories('');
        setSelectedPriceRanges([]);
    }

return (
    <RenterLayout>

        <Head title={category.name} />
        {/* <div className="px-4 py-8"> */}
         <section
        className="relative bg-cover bg-center bg-no-repeat py-20 md:py-28 text-white"
        style={{
          backgroundImage: `url(${bb})`,
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Find the Perfect Rental</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200">
            Browse our selection of high-quality rental items
          </p>
        </div>
      </section>    
        <div className="max-w-screen-xl mx-auto px-4 pb-8">
            <div>
                { error_message && <p className="text-2xl text-red-500 pt-4">{error_message }</p> }
            </div>      
            <div className="rounded-xl p-4 mb-8">
                <form className="relative flex flex-col sm:flex-row w-full max-w-8xl mx-auto shadow-md rounded overflow-hidden border border-gray-300 bg-white -mt-10">
                    {/* Search Input */}
                    <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input        
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for rental items..."
                        className="pl-10 pr-4 py-5 w-full focus:outline-none border-none bg-transparent text-sm sm:text-base"
                    />
                    </div>

                    <div className="flex rounded overflow-hidden">
                        {/* Location */}
                        <div className="flex items-center px-4 py-3 whitespace-nowrap ">
                            <MapPin className="text-gray-400 h-5 w-5 mr-2 flex-shrink-0" />
                            <span className="text-gray-700 text-sm sm:text-base">Manila, Philippines</span>
                        </div>

                        {/* Store Filter */}
                        <div className="flex items-center px-4 py-3 whitespace-nowrap">
                            <Store className="text-gray-400 h-5 w-5 mr-2 flex-shrink-0" />
                            <select
                            className="bg-transparent focus:outline-none text-gray-700 border-none text-sm sm:text-base"
                            defaultValue=""
                            aria-label="Select Store"
                            >
                            <option value="">All Stores</option>
                            <option value="store1">Store 1</option>
                            <option value="store2">Store 2</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition-colors whitespace-nowrap text-sm sm:text-base"
                    >
                    Search
                    </button>
                    <Button 
                        type="button" 
                        variant="outline" 
                        icon={<SlidersHorizontal className="h-5 w-5" />}
                        className="md:hidden"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        Filters
                    </Button>
                </form>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                
                <ItemFilter 
                    showFilters={showFilters}
                    clearAllFilters={clearAllFilters}
                    categoryCustomFields={category_custom_fields}
                />

                <div className="flex-1">
                    {/* <div className="flex flex-wrap items-center justify-between mb-4">
                        <p className="text-gray-700">
                            Showing <span className="font-semibold">{filteredItems.length}</span> results
                        </p>

                        <div className="hidden md:flex space-x-2">
                            <Filter 
                                title="Category" 
                                options={categories} 
                                onFilterChange={handleCategoryChange}
                                initialSelected={selectedCategories}
                            />
                            <Filter
                                title="Price" 
                                options={priceRanges} 
                                onFilterChange={handlePriceRangeChange}
                                initialSelected={selectedPriceRanges}
                            />
                        </div>
                    </div> */}

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredItems.map(item => (
                            <Card 
                                key={item.id} 
                                item={item}
                                link={route("itemDetails", item.uuid)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            
        </div>
    </RenterLayout>
)
}

export default RentalItemBrowser