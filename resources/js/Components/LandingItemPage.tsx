import { Fragment, useState } from 'react';
import card1 from '@/../../resources/img/c11.png';
import card2 from '@/../../resources/img/c22.png';

function className(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

// StarIcon component representing a single star
function StarIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      className="w-4 h-4 text-yellow-300 ms-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
      />
    </svg>
  );
}

// StarRating component representing the star rating based on a 5-star system
function StarRating({ rating }) {
  const [hoveredRating, setHoveredRating] = useState(null);

  // Generate an array of 5 elements representing each star
  const stars = Array.from({ length: 5 }, (_, index) => {
    // Determine if the star should be filled, half-filled, or empty based on the rating
    let filled = false;
    if (index + 1 <= rating) {
      filled = true;
    } else if (index < rating && rating % 1 !== 0) {
      filled = null; // For half-filled star
    }
    return (
      <span
        key={index}
        onMouseEnter={() => setHoveredRating(index + 1)}
        onMouseLeave={() => setHoveredRating(null)}
      >
        <StarIcon filled={filled === true || (filled === null && hoveredRating !== null && index < hoveredRating)} />
      </span>
    );
  });

  return (
    <div className="flex">
      {stars}
    </div>
  );
}

const categories = ["Mobile", "Car", "Motorcycle", "Tools Set", "House"];

// Background images for each category
const categoryBackgrounds = {
  Mobile: "url('mobile.jpg')",
  Car: "url('car.jpg')",
  Motorcycle: "url('motorcycle.jpg')",
  "Tools Set": "url('tools_set.jpg')",
  House: "url('house.jpg')",
};

export default function LandingItemPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const data = [
    { name: "John Doe", role: "Software Engineer", category: "Mobile" },
    { name: "John Doe", role: "Software Engineer", category: "Mobile" },
    { name: "John Doe", role: "Software Engineer", category: "Mobile" },
    { name: "Jane Doe", role: "Designer", category: "Car" },
    { name: "Jane Doe", role: "Designer", category: "Car" },
    { name: "Jane Doe", role: "Designer", category: "Car" },
    // Add more data for each card with category information
  ];

  const filteredData = selectedCategory === "All" ?
    data :
    data.filter(item => item.category === selectedCategory);

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <label htmlFor="category" className="mr-2">Filter by Category:</label>
        <select
          id="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="px-2 py-1 border rounded"
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Contact Cards */}
        {filteredData.map((item, index) => (
          <div key={index} className="rounded-lg shadow-md relative" style={{ backgroundImage: categoryBackgrounds[item.category] }}>
            <div className="flex flex-col justify-between h-full bg-white bg-opacity-80 rounded-lg">
              <div className="p-4">
                <div className="flex items-center">
                  <img className="w-16 h-16 rounded-full mr-4" src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60`} alt="Profile Picture" />
                  <div>
                    <h5 className="text-lg font-medium text-gray-900">{item.name}</h5>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-b-lg">
                <div>
                  {/* Category Tag */}
                  <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs uppercase font-semibold rounded">{item.category}</span>
                </div>
                {/* Star Rating (hidden on small screens) */}
                <StarRating rating={4.5} className="hidden sm:flex" />
                {/* Show button on small screens */}
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ">Visit Store</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
