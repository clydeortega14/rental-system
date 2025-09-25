import React, { useState } from 'react';
import axios from 'axios';
import { Head, usePage } from '@inertiajs/react';
import RenterLayout from '@/Layouts/RenterLayout';
import SearchBar from '@/Components/Renter/RentalBrowser/SearchBar';
import ItemFilter from '../../Components/Renter/RentalBrowser/ItemFilter';
import Card from '../../Components/Renter/ui/Card';
import { RentalItem } from '@/Interface/RentalItems';
import { Category, CategoryFilterType, CategoryCustomField } from '@/types/rentalCategory';
import { PageProps } from '@/types';
import bb from '@/../../public/img/banner/bb.jpg';

interface RentalBrowserProps {
  categories: Category[];
  rentalItems: RentalItem[];
  category_filters: CategoryFilterType[];
  category: Category;
  category_custom_fields: CategoryCustomField[];
}

interface SearchParams {
  query: string;
  store: string;
  location: string;
  category_id: number;
}

const RentalItemBrowser = ({
  rentalItems,
  categories,
  category_filters,
  category,
  category_custom_fields
}: RentalBrowserProps) => {
  const error_message = usePage<PageProps>().props.flash.error_message;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [filteredItems, setFilteredItems] = useState<RentalItem[]>(rentalItems);

  const handleSearch = async ({ query, store, location, category_id }: SearchParams) => {
    try {
      const params: Record<string, string | number> = {
        category_id,
      };

      if (query.trim() !== '') {
        params.query = query;
      }
      if (store.trim() !== '') {
        params.store = store;
      }
      if (location !== '' && location !== 'All Locations') {
        params.location = location;
      }

      console.log('🔍 sending params:', params);

      const res = await axios.get('/shop/search', { params });
      setFilteredItems(res.data.listings || []);
    } catch (err) {
      console.error('Failed to fetch filtered items:', err);
      setFilteredItems([]);
    }
  };

  // Clear search filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setLocation('All Locations');
    setSelectedStore('');

    handleSearch({
      query: '',
      store: '',
      location: '',
      category_id: category.id,
    });
  };

  return (
    <RenterLayout>
      <Head title={category.name} />

      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20 md:py-28 text-white"
        style={{ backgroundImage: `url(${bb})` }}
      >
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Find the Perfect Rental
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200">
            Browse our selection of high-quality rental items
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 pb-8">
        {error_message && (
          <p className="text-2xl text-red-500 pt-4">{error_message}</p>
        )}

        <SearchBar categoryId={category.id} onSearch={handleSearch} />

        <div className="flex flex-col md:flex-row gap-6">
          <ItemFilter
            showFilters={true}
            clearAllFilters={clearAllFilters}
            categoryCustomFields={category_custom_fields}
          />

          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  link={route('itemDetails', item.uuid)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </RenterLayout>
  );
};

export default RentalItemBrowser;
