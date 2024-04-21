import { useState } from 'react'; // Import useState hook to manage state
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField,Typography,Select, MenuItem  } from '@mui/material';

import { FaShoppingCart, FaPlus, FaEye } from 'react-icons/fa'; 

export default function Dashboard({ auth }: PageProps) {
    // Sample data with category information
    const items = [
        { id: 1, image:"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" , project: 'Chanel ', price: '₱ 2,500,000.00 ', quantity: 10, quality: 'Brand New', remarks: 'Introducing our latest addition - a brand new item! 🎉', category: 'Bags' },
        { id: 2, image:"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" , project: 'Chanel ', price: '₱ 2,500,000.00 ', quantity: 10, quality: 'Brand New', remarks: 'Introducing our latest addition - a brand new item! 🎉', category: 'Bags' },
        { id: 3, image:"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" , project: 'Chanel ', price: '₱ 2,500,000.00 ', quantity: 10, quality: 'Brand New', remarks: 'Introducing our latest addition - a brand new item! 🎉', category: 'Bags' },
        { id: 4, image:"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" , project: 'Chanel ', price: '₱ 2,500,000.00 ', quantity: 10, quality: 'Brand New', remarks: 'Introducing our latest addition - a brand new item! 🎉', category: 'Bags' },
        { id: 5, image:"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" , project: 'Chanel ', price: '₱ 2,500,000.00 ', quantity: 10, quality: 'Brand New', remarks: 'Introducing our latest addition - a brand new item! 🎉', category: 'Bags' },
        { id: 6, image:"https://imgcdn.zigwheels.ph/large/gallery/exterior/83/1069/suzuki-raider-r150-slant-rear-view-full-image-832720.jpg" ,  project: 'Raider 150 Carb Type', price: '₱ 115,500.00', quantity: 5, quality: 'Goods as New', remarks: 'Discover our latest addition – a brand new item that promises both quality and freshness!', category: 'Motorcycles' },
        { id: 7, image:"https://imgcdn.zigwheels.ph/large/gallery/exterior/83/1069/suzuki-raider-r150-slant-rear-view-full-image-832720.jpg" ,  project: 'Raider 150 Carb Type', price: '₱ 115,500.00', quantity: 5, quality: 'Goods as New', remarks: 'Discover our latest addition – a brand new item that promises both quality and freshness!', category: 'Motorcycles' },
        { id: 8, image:"https://imgcdn.zigwheels.ph/large/gallery/exterior/83/1069/suzuki-raider-r150-slant-rear-view-full-image-832720.jpg" ,  project: 'Raider 150 Carb Type', price: '₱ 115,500.00', quantity: 5, quality: 'Goods as New', remarks: 'Discover our latest addition – a brand new item that promises both quality and freshness!', category: 'Motorcycles' },
        { id: 9, image:"https://imgcdn.zigwheels.ph/large/gallery/exterior/83/1069/suzuki-raider-r150-slant-rear-view-full-image-832720.jpg" ,  project: 'Raider 150 Carb Type', price: '₱ 115,500.00', quantity: 5, quality: 'Goods as New', remarks: 'Discover our latest addition – a brand new item that promises both quality and freshness!', category: 'Motorcycles' },
        { id: 10, image:"https://imgcdn.zigwheels.ph/large/gallery/exterior/83/1069/suzuki-raider-r150-slant-rear-view-full-image-832720.jpg" ,  project: 'Raider 150 Carb Type', price: '₱ 115,500.00', quantity: 5, quality: 'Goods as New', remarks: 'Discover our latest addition – a brand new item that promises both quality and freshness!', category: 'Motorcycles' },
        { id: 11, image:"https://imgcdn.zigwheels.ph/large/gallery/exterior/83/1069/suzuki-raider-r150-slant-rear-view-full-image-832720.jpg" ,  project: 'Raider 150 Carb Type', price: '₱ 115,500.00', quantity: 5, quality: 'Goods as New', remarks: 'Discover our latest addition – a brand new item that promises both quality and freshness!', category: 'Motorcycles' },
        { id: 12, image:"https://hondaphil.com/app/default/files-module/local/images/news-inner-main-image-1650x750-type-r-launch-23.jpg" ,  project: 'Honda Civic 2018', price: '₱ 2,500,800.00 ', quantity: 5, quality: 'Goods as New', remarks: 'Discover our latest addition – a brand new item that promises both quality and freshness!', category: 'Cars' },
        { id: 13, image:"https://hondaphil.com/app/default/files-module/local/images/news-inner-main-image-1650x750-type-r-launch-23.jpg" ,  project: 'Honda Civic 2018', price: '₱ 2,500,800.00 ', quantity: 5, quality: 'Goods as New', remarks: 'Discover our latest addition – a brand new item that promises both quality and freshness!', category: 'Cars' },
        { id: 14, image:"https://hondaphil.com/app/default/files-module/local/images/news-inner-main-image-1650x750-type-r-launch-23.jpg" ,  project: 'Honda Civic 2018', price: '₱ 2,500,800.00 ', quantity: 5, quality: 'Goods as New', remarks: 'Discover our latest addition – a brand new item that promises both quality and freshness!', category: 'Cars' },
        { id: 15, image:"https://hondaphil.com/app/default/files-module/local/images/news-inner-main-image-1650x750-type-r-launch-23.jpg" ,  project: 'Honda Civic 2018', price: '₱ 2,500,800.00 ', quantity: 5, quality: 'Goods as New', remarks: 'Discover our latest addition – a brand new item that promises both quality and freshness!', category: 'Cars' },
    ];

    // State variables for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // State variable to store the selected category
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Function to filter items based on category and pagination
    const filterItemsByCategoryAndPagination = () => {
        let filteredItems = items;

        // Filter by category
        if (selectedCategory !== 'All') {
            filteredItems = filteredItems.filter(item => item.category === selectedCategory);
        }

        // Pagination
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    };

     // State variables for adding item modal
     const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
     const [newItemData, setNewItemData] = useState({
        itemImage: '',
        itemName: '',
        price: '',
        quantity: '',
        quality: '',
        remarks: '',
        category: '',
     });

      // Function to handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItemData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add logic to save new item data to backend or update state
        // Reset form data and close modal
        setNewItemData({
            itemImage:'',
            itemName: '',
            price: '',
            quantity: '',
            quality: '',
            remarks: '',
            category: '',
        });
        setIsAddItemModalOpen(false);
    };

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Rental Listings</h2>}
        >
            <Head title="Dashboard" />

            {/* Add Item Modal */}
            <Dialog
                open={isAddItemModalOpen}
                onClose={() => setIsAddItemModalOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Add Items
                    <Typography id="spring-modal-description" style={{color:'red'}} sx={{ mt: 2 }}>
                        Reminders Uplouding Item Image you need atleast 2mb size....
                    </Typography>
                </DialogTitle>
                
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        
                        
                        <div className="mb-4">
                          
                            <TextField
                               
                                id="itemImage"
                                name="itemImage"
                                type='file'
                                value={newItemData.itemImage}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </div>
                        <div className="mb-4">
                            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                            Choose Catergories
                            </Typography>
                            <Select
                                label="Category"
                                id="category"
                                name="category"
                            
                                value={newItemData.category}
                                onChange={handleInputChange}
                                fullWidth
                            >
                                <MenuItem value="Select Category" disabled>
                                    Select Category
                                </MenuItem>
                                <MenuItem value="Bags">Bags</MenuItem>
                                <MenuItem value="Motorcycles">Motorcycles</MenuItem>
                                <MenuItem value="Cars">Cars</MenuItem>
                                {/* Add more categories as needed */}
                            </Select>
                        </div>
                        <div className="mb-4">
                            <TextField
                                label="Item Name"
                                id="itemName"
                                name="itemName"
                                value={newItemData.itemName}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                label="Price"
                                id="price"
                                name="price"
                                value={newItemData.price}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                label="Quantity"
                                id="quantity"
                                name="quantity"
                                type='number'
                                value={newItemData.quantity}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                label="Quality"
                                id="quality"
                                name="quality"
                                type='text'
                                value={newItemData.quality}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </div>
                        <div className="mb-4">
                            
                            <textarea className="w-full h-20 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" placeholder='Add remarks' defaultValue={newItemData.remarks}></textarea>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <button onClick={() => setIsAddItemModalOpen(false)} color="primary" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} color="primary" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                        Add Item
                    </button>
                </DialogActions>
            </Dialog>

            

            <div className="py-7">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="relative py-6 ">
                            <div className="w-full mb-12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded text-white">
                                    <div className="rounded-t mb-0 px-1 py-1 border-0">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <h2 className="font-semibold text-xl text-gray-800 leading-tight"></h2>
                                            </div>
                                            <div>
                                                <button onClick={() => setIsAddItemModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                                                    <FaPlus className="mr-2" />Add Item
                                                </button>
                                            </div>
                                        </div>
                                        <div className="block w-full overflow-x-auto  text-black">
                                            {/* Filter dropdown for category */}
                                            <select
                                                className="mb-4 rounded border-black border px-8 py-2 focus:outline-none focus:border-indigo-500"
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                            >
                                                <option value="All">All Categories</option>
                                                <option value="Bags">Bag</option>
                                                <option value="Motorcycles">Motorcycle</option>
                                                <option value="Cars">Cars</option>
                                                {/* Add more categories as needed */}
                                            </select>
                                            <table className="items-center w-full bg-transparent border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">Item</th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">Name</th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">Price</th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">Quantity</th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">Quality</th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">Remarks</th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">Category</th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filterItemsByCategoryAndPagination().map(item => (
                                                        <tr key={item.id} className='text-black font-bold'>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                <img src={item.image} className="h-20 w-20 flex-shrink-0 overflow-hidden border border-green-700 rounded-full " alt="..." />
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.project}</td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.price}</td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.quantity}</td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                <div className="flex items-center">
                                                                    <span className="mr-2">{item.quality}</span>
                                                                    <div className="relative w-full">
                                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
                                                                            <div className=" width: 100% shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                <textarea className="w-full h-20 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" defaultValue={item.remarks}></textarea>
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">{item.category}</td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                                                                    <FaEye className="mr-2" />View
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {/* Pagination */}
                                            <div className="flex justify-center mt-4">
                                                <nav className="inline-flex">
                                                    <button
                                                        onClick={() => paginate(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                        className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                    >
                                                        Previous
                                                    </button>
                                                    {Array.from({ length: Math.ceil(items.filter(item => selectedCategory === 'All' || item.category === selectedCategory).length / itemsPerPage) }, (_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => paginate(index + 1)}
                                                            className={`px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}
                                                        >
                                                            {index + 1}
                                                        </button>
                                                    ))}
                                                    <button
                                                        onClick={() => paginate(currentPage + 1)}
                                                        disabled={currentPage === Math.ceil(items.filter(item => selectedCategory === 'All' || item.category === selectedCategory).length / itemsPerPage)}
                                                        className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                    >
                                                        Next
                                                    </button>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
