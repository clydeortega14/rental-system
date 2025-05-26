import Button from '@/Components/Renter/ui/Button';
import RenterLayout from '@/Layouts/RenterLayout';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const RentalItemBrowser = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

  return (
    <RenterLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
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
        </div>
    </RenterLayout>
  )
}

export default RentalItemBrowser