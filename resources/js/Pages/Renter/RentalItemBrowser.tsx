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
import { Search, SlidersHorizontal } from 'lucide-react';
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
        <div className="max-w-screen-xl mx-auto px-4 pt-6 pb-8">
            <div>
                { error_message && <p className="text-2xl text-red-500 pt-4">{error_message }</p> }
            </div>
            <div className="mb-8 py-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Find the Perfect Rental</h1>
                <p className="text-gray-600">Browse our selection of high-quality rental items</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
                <form className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for rental items..."
                            className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <Button type="submit" variant="primary" className="md:w-auto">
                        Search
                    </Button>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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