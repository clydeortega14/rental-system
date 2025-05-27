import ItemFilter from '@/Components/Renter/RentalBrowser/ItemFilter';
import Button from '@/Components/Renter/ui/Button';
import Card from '@/Components/Renter/ui/Card';
import Filter from '@/Components/Renter/ui/Filter';
import { rentalItems } from '@/data/rentalItemsData';
import RenterLayout from '@/Layouts/RenterLayout';
import { IPriceRange } from '@/types/priceRange';
import { ICategory, Category } from '@/types/rentalCategory';
import { Head } from '@inertiajs/react';
import { Search, SlidersHorizontal } from 'lucide-react';
import React, { useState } from 'react';

interface RentalBrowserProps {
    categories: ICategory,
    priceRanges: IPriceRange
}

const RentalItemBrowser = ({categories, priceRanges}: ICategory) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<ICategory>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<IPriceRange>([]);
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would trigger a search API call
        console.log('Searching for:', searchQuery);
    };

    const handleCategoryChange = (selected: Category[]) => {
        setSelectedCategories(selected);
    };

    const handlePriceRangeChange = (selected: Category[]) => {
        setSelectedPriceRanges(selected);
    };

    const filteredItems = rentalItems.filter((item, index) => {
        const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(item.category);
    
        let matchesPriceRange = true;
        if (selectedPriceRanges.length > 0) {
        matchesPriceRange = selectedPriceRanges.some(range => {
            if (range === '0-50') return item.price <= 50;
            if (range === '50-100') return item.price > 50 && item.price <= 100;
            if (range === '100-200') return item.price > 100 && item.price <= 200;
            if (range === '200-500') return item.price > 200 && item.price <= 500;
            if (range === '500+') return item.price > 500;
            return true;
        });
        }
        
        return matchesSearch && matchesCategory && matchesPriceRange;
    })

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedPriceRanges([]);
    }

  return (
    <RenterLayout>

        <Head title="Reservations" />
        <div className="px-4 py-8">
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
                    categories={categories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    priceRanges={priceRanges}
                    selectedPriceRanges={selectedPriceRanges}
                    setSelectedPriceRanges={setSelectedPriceRanges}
                />

                <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between mb-4">
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map(item => (
                            <Card 
                                key={item.id} 
                                item={item}
                                link={route("itemDetails", '86ea132f-ef77-4dbb-8c3e-806ce7662b8c')}
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