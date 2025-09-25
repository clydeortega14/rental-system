import { useState, useEffect } from "react";
import { Search, MapPin, Store } from "lucide-react";
import axios from "axios";

interface SearchBarProps {
  categoryId: number;
  onSearch: (params: {
    query: string;
    store: string;
    location: string;
    category_id: number;
  }) => void;
}

interface Shop {
  id: number;
  name: string;
}

export default function SearchBar({ categoryId, onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [selectedStore, setSelectedStore] = useState("");

  const [locations, setLocations] = useState<string[]>(["All Locations"]);
  const [stores, setStores] = useState<Shop[]>([]);

  // Fetch available locations whenever the query changes
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        if (!searchQuery.trim()) {
          // Reset to defaults
          setLocations(["All Locations"]);
          setStores([]);
          setLocation("All Locations");
          setSelectedStore("");
          return;
        }

        const res = await axios.get("/shop/search", {
          params: { category_id: categoryId, query: searchQuery },
        });

        setLocations(["All Locations", ...(res.data.locations || [])]);
        setLocation("All Locations");
        setStores([]);
        setSelectedStore("");
      } catch (err) {
        console.error("Failed to fetch locations:", err);
        setLocations(["All Locations"]);
        setStores([]);
      }
    };

    fetchLocations();
  }, [searchQuery, categoryId]);

  // Fetch stores whenever location or query changes
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("/shop/search", {
          params: {
            category_id: categoryId,
            query: searchQuery,
            ...(location !== "All Locations" && { location }),
          },
        });

        setStores(res.data.shops || []);
        setSelectedStore("");
      } catch (err) {
        console.error("Failed to fetch stores:", err);
        setStores([]);
        setSelectedStore("");
      }
    };

    fetchStores();
  }, [location, searchQuery, categoryId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch({
      query: searchQuery.trim(),
      store: selectedStore,
      location,
      category_id: categoryId,
    });
  };

  return (
    <div className="rounded-xl p-4 mb-8">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col sm:flex-row w-full max-w-8xl mx-auto shadow-md rounded overflow-hidden border border-gray-300 bg-white -mt-10"
      >
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

        {/* Location Dropdown */}
        <div className="flex items-center px-4 py-3 whitespace-nowrap border-l border-gray-200">
          <MapPin className="text-gray-400 h-5 w-5 mr-2 flex-shrink-0" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent focus:outline-none text-gray-700 border-none text-sm sm:text-base"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Store/Shop Dropdown */}
        <div className="flex items-center px-4 py-3 whitespace-nowrap border-l border-gray-200">
          <Store className="text-gray-400 h-5 w-5 mr-2 flex-shrink-0" />
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="bg-transparent focus:outline-none text-gray-700 border-none text-sm sm:text-base"
            disabled={stores.length === 0}
          >
            <option value="">All Stores</option>
            {stores.map((shop) => (
              <option key={shop.id} value={shop.id.toString()}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition-colors whitespace-nowrap text-sm sm:text-base"
        >
          Search
        </button>
      </form>
    </div>
  );
}
