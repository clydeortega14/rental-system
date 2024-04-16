import { SetStateAction, useState } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { Bars3Icon } from '@heroicons/react/24/outline'
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Dialog } from '@mui/material';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';







function className(...classNames: string[]) {
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
      className="w-2 h-4 text-yellow-300 ms-1"
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

// Define your modal component
function CustomModal({ item, closeModal }) {
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);

  const handleCheckInDateChange = (date: Dayjs | null) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date: Dayjs | null) => {
    setCheckOutDate(date);
  };

  return (
    <Modal
      open={true} // Set open prop to true to show the modal
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Dialog
        open={true} // Set open prop to true to show the modal
        onClose={closeModal}
        maxWidth="lg" // Set the maximum width of the modal
        fullWidth // Allow the modal to take the full width of the screen
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, // Stack in column on small screens, row on medium screens and above
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: 4,
            p: 2,
            textAlign: 'center',
          }}
        >
          {/* Left side (Image) */}
          <Box sx={{ flex: 1, mr: { xs: 0, md: 2 }, mb: { xs: 2, md: 0 } }}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={closeModal}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <img src={item.image} alt={item.name} style={{ maxWidth: '100%' }} />
          </Box>

          {/* Right side (Description and fields) */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" component="div" mb={2}>
              {item.name}
            </Typography>
            <Typography variant="body2">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Typography>

            {/* Date picker for Check-in */}
            <Box sx={{ mt: 2 }}>
              
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                  value={[checkInDate, checkOutDate]}
                  onChange={(newValue) => {
                    handleCheckInDateChange(newValue[0]);
                    handleCheckOutDateChange(newValue[1]);
                  }}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField {...startProps} />
                      <TextField {...endProps} />
                    </>
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Modal>
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
  Mobile: "url('https://i.pinimg.com/originals/d0/42/7b/d0427bf0fa38cf5d3151c68825bea9d5.jpg')",
  Car: "url('https://i.pinimg.com/originals/d0/42/7b/d0427bf0fa38cf5d3151c68825bea9d5.jpg')",
  Motorcycle: "url('https://i.pinimg.com/originals/d0/42/7b/d0427bf0fa38cf5d3151c68825bea9d5.jpg')",
  'Tools Set': "url('https://i.pinimg.com/originals/d0/42/7b/d0427bf0fa38cf5d3151c68825bea9d5.jpg')",
  House: "url('https://i.pinimg.com/originals/d0/42/7b/d0427bf0fa38cf5d3151c68825bea9d5.jpg')",
};

export default function LandingItemPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (itemId) => {
   
    // Navigate to the itemDetails route with the item ID as a route parameter
    window.location.href = `/itemDetails/${itemId.id}`;
};

      // setSelectedItem(item);
    // setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };
  
  const data = [
    { id: 1, name: "Samsung AA", role: "View More Details", category: "Mobile", image: "https://images.samsung.com/is/image/samsung/ph-galaxy-a6plus-sm-a605-sm-a605gzbgxtc-frontblue-101632983?$650_519_PNG$" },
    { id: 2, name: "Samsung BB", role: "View More Details", category: "Mobile", image: "https://images.samsung.com/is/image/samsung/ph-galaxy-a6plus-sm-a605-sm-a605gzbgxtc-frontblue-101632983?$650_519_PNG$" },
    { id: 3, name: "Samsung CC", role: "View More Details", category: "Mobile", image: "https://images.samsung.com/is/image/samsung/ph-galaxy-a6plus-sm-a605-sm-a605gzbgxtc-frontblue-101632983?$650_519_PNG$" },
    { id: 4, name: "Honda Civic 2001", role: "View More Details", category: "Car", image: "https://freepngimg.com/save/32430-honda-civic-transparent/1000x1000" },
    { id: 5, name: "Kia 2001", role: "View More Details", category: "Car", image: "https://freepngimg.com/save/32430-honda-civic-transparent/1000x1000" },
    { id: 6, name: "Suzuki 2002", role: "View More Details", category: "Car", image: "https://freepngimg.com/save/32430-honda-civic-transparent/1000x1000" },
    { id: 7, name: "Raider Carb 150", role: "View More Details", category: "Motorcycle", image: "https://mc.suzuki.com.ph/app/uploads/2023/08/03-Celebration-Red.png" },
    { id: 8, name: "Raider Fi 150", role: "View More Details", category: "Motorcycle", image: "https://mc.suzuki.com.ph/app/uploads/2023/10/01-4.png" },
    { id: 9, name: "Ninja 400cc", role: "View More Details", category: "Motorcycle", image: "https://content2.kawasaki.com/ContentStorage/KMC/Products/8797/b1200891-3315-46af-9575-185aed6b2892.png?w=675" },
    { id: 10, name: "Tools Set AA", role: "View More Details", category: "Tools Set", image: "https://data.kleintools.com/sites/all/product_assets/png/klein/33525.png" },
    { id: 11, name: "Tools Set BB", role: "View More Details", category: "Tools Set", image: "https://www.proxxon.com/en/images/produkte/23660.png" },
    { id: 12, name: "Tools Set CC", role: "View More Details", category: "Tools Set", image: "https://static.vecteezy.com/system/resources/previews/024/189/096/original/tools-box-in-png.png" },
    { id: 13, name: "Camela Homes Lot 11", role: "View More Details", category: "House", image: "https://e7.pngegg.com/pngimages/462/450/png-clipart-minecraft-house-building-house-building-interior-design-services-modern-house-furniture-building-thumbnail.png" },
    { id: 14, name: "Camela Homes Lot 1", role: "View More Details", category: "House", image: "https://p1.hiclipart.com/preview/760/785/113/real-estate-villa-house-3d-computer-graphics-3d-modeling-renting-building-architecture-png-clipart-thumbnail.jpg" },
    { id: 15, name: "Camela Homes Lot 111", role: "View More Details", category: "House", image: "https://img.freepik.com/premium-psd/modern-house-isolated-transparent-background_879541-1561.jpg" },
    { id: 16, name: "Camela Homes Lot 1111", role: "View More Details", category: "House", image: "https://image.pngaaa.com/44/2064044-middle.png" },
    // Add more data for each card with category information
  ];

  // Filter data based on the selected category
  const filteredData = selectedCategory === "All" ? data : data.filter(item => item.category === selectedCategory);

  // Sorting functionality
  const sortItems = (sortBy: string) => {
    switch (sortBy) {
      case 'Popular':
        // Implement sorting by popularity
        break;
      case 'Latest':
        // Implement sorting by latest
        break;
      case 'Price':
        // Implement sorting by price
        break;
      default:
        break;
    }
  };

  // Calculate pagination
  const cardsPerPage = 12;
  const totalCards = filteredData.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

  const handleVisitStore = (store: { id: any; name?: string; role?: string; category?: string; }) => {
    const { id } = store;
    const url = `/renteeStore/${id}`;
    window.location.href = url;
  };

  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-col md:flex-row"> {/* Flex container */}
  
      {/* Sidebar for categories */}
      <div className="md:w-1/4 bg-gray-100 p-4"> {/* Sidebar */}
        <div className="flex items-center mb-7">
          <Bars3Icon className="h-6 w-6 mr-2" aria-hidden="true" />
          <h1 className="text-3sm font-extrabold tracking-tight text-slate-900">All Categories</h1>
        </div>
        <ul className="space-y-2">
          <li
            className={`cursor-pointer ${selectedCategory === "All" ? "font-bold" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer ${selectedCategory === category ? "font-bold" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Content section for cards */}
      <div className="md:w-3/4 p-4">
        {/* Sort by Button */}
        {/* Pagination */}
        <div className="flex justify-center mt-4 mb-4 md:justify-end md:mt-0">
          <span className="mx-3 text-gray-700">{currentPage} of {totalPages}</span>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 mr-1 bg-gray-200 rounded-md text-sm"
          >
            Previous
          </button>
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 ml-2 bg-gray-200 rounded-md text-sm"
          >
            Next
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Contact Cards */}
          {currentCards.map((item, index) => (
            <div key={index}  onClick={() => handleCardClick(item)} className="relative rounded-lg shadow-md cursor-pointer">
              {/* Image */}
              
              <div className="relative" style={{ width: '100%', paddingTop: '75%' }}>
                <img
                  className="absolute inset-0 w-full h-full rounded-lg object-cover"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              {/* Details */}
              <div className="flex flex-col justify-between bg-white bg-opacity-5 rounded-b-lg">
                <div className="p-4">
                  <div className="flex items-center">
                    <div>
                      <h5 className="text-lg font-medium text-gray-900">{item.name}</h5>
                      <p className="text-sm text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-b-lg">
                  <div>
                    {/* Category Tag */}
                    <span
                      className="px-1 py-1 bg-gray-200 text-gray-800 text-xs uppercase font-semibold rounded"
                      style={{ fontSize: '10px' }}
                    >
                      {item.category}
                    </span>
                  </div>
                  {/* Star Rating (hidden on small screens) */}
                  <StarRating rating={4.5} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
