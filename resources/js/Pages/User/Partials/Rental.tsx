import { Head, Link, useForm } from "@inertiajs/react";
import { useState, FormEventHandler,useEffect  } from "react"; // Import useState hook to manage state

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    Select,
    MenuItem,
    IconButton,
    Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { FaShoppingCart, FaPlus, FaEye,FaTimes,FaEdit  } from "react-icons/fa";
import { MdAttachment } from "react-icons/md";

export default function RentalList({ auth, rentalItems }: PageProps & { rentalItems: any[] }) {
    const [setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showFileInput, setShowFileInput] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [initialData, setInitialData] = useState({});

    // Sample data with category information

    const items = rentalItems;
    // State variables for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // State variable to store the selected category
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Function to filter items based on category and pagination
    const filterItemsByCategoryAndPagination = () => {
        let filteredItems = items;

        // Filter by category
        if (selectedCategory !== "All") {
            filteredItems = filteredItems.filter(
                (item) => item.category === selectedCategory,
            );
        }

        // Pagination
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    };

    // State variables for adding item modal
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, setData, post,put, processing, errors, reset } = useForm({
        filename: "",
        itemName: "",
        price: "",
        quantity: "",
        quality: "",
        remarks: "",
        category: "",
        // image: null,
    });
    const handleFileChange = (event: {
        target: { files: { name: any }[] };
    }) => {
        const file = event.target.files[0];
        setData({ ...data, itemImage: file });
    };
    // Function to handle form submission
    const handleSubmit: FormEventHandler = (e) => {
        try {
           
            e.preventDefault();
            const newErrors = {};
            let hasError = false;
            for (const fieldName in data) {
                if (!data[fieldName]) {
                    newErrors[fieldName] = true;
                    hasError = true;
                } else {
                    newErrors[fieldName] = false;
                }
            }

            if (hasError) {
                setSubmitted(true);
                setErrors(newErrors);
                return; // Exit the function
            }


            post(route("store.rentalListing.add.item"));
            reset();
            setIsAddItemModalOpen(false);
            toast.success("Successfully Created.");
        } catch (error) {
            toast.error("Please check the fields!");
            throw error;
        }
    };

    const handleView = (itemId) => {
        const item = rentalItems.find((item) => item.id === itemId);
        console.log(item)
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
      
       
    };
    const handleEditClose = () => {
        
        setIsEditMode(false);
       
    };

    const handleEdit = (itemId) => {
        const item = rentalItems.find((item) => item.id === itemId);
        console.log(item);
        setSelectedItem(item);
        setData({
            itemName: item.itemName,
            price: item.price,
            quantity: item.quantity,
            quality: item.quality,
            description: item.description,
            category: item.category,
        });
        setIsEditMode(true);

    };

    useEffect(() => {
        if (selectedItem) {
            const itemData = {
                id: selectedItem.id || '',
                category: selectedItem.category || '',
                itemName: selectedItem.itemName || '',
                price: selectedItem.price || '',
                quantity: selectedItem.quantity || '',
                quality: selectedItem.quality || '',
                description: selectedItem.description || '',
                filename: null
            };
            setData(itemData);
            setInitialData(itemData);
        }
    }, [selectedItem]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedData = {};

        Object.keys(data).forEach(key => {
            if (data[key] !== initialData[key]) {
                updatedData[key] = data[key];
            }
        });

        // Add more validations if needed
        if (!updatedData.category && data.category === '') {
            console.log('Category is required.');
            return;
        }
        updatedData.id = data.id;
        // Form submission logic here
        console.log('Updated data:', updatedData);
        // put(route('rental.update', { id: updatedData.id }), {
        //     data: updatedData,
        //     onSuccess: () => reset(),
        // });
        // setIsEditMode(false);
        // toast.success("Item updated successfully.");
    };
    // const handleUpdate = () => {
       
       
        // const newErrors = {};
        // let hasError = false;
        // for (const fieldName in data) {
        //     if (!data[fieldName]) {
        //         newErrors[fieldName] = true;
        //         hasError = true;
        //     } else {
        //         newErrors[fieldName] = false;
        //     }
        // }


        // const formData = new FormData();
        // formData.append('itemName', data.itemName);
        // formData.append('price', data.price);
        // formData.append('quantity', data.quantity);
        // formData.append('quality', data.quality);
        // formData.append('description', data.description);
        // formData.append('category', data.category);

        // if (data.image) {
        //     formData.append('image', data.images);
        // }

     
    
        // put(route('rental.update', { id: selectedItem.id }), {
        //     data: formData,
        //     onSuccess: () => reset(),
        // });
        // setIsEditMode(false);
        // toast.success("Item updated successfully.");
    // };
    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleUpdateImageButtonClick = () => {
        setShowButton(false); // Hide the button
        setShowFileInput(true); // Show the file input
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Rental Listings
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* Add Item Modal */}
            <Dialog
                open={isAddItemModalOpen}
                onClose={() => setIsAddItemModalOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Add Items
                    <Typography
                        id="spring-modal-description"
                        style={{ color: "red" }}
                        sx={{ mt: 2 }}
                    >
                        Reminders Uplouding Item Image you need atleast 2mb
                        size....
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <Typography
                                id="spring-modal-description"
                                sx={{ mt: 2 }}
                            >
                               Upload Image
                            </Typography>
                            <TextField
                                type="file"
                                id="file"
                                name="filename"
                                onChange={e => setData('filename', e.target.files[0])}
                                fullWidth
                            />
                            {submitted && !data.itemImage && (
                                <Typography
                                    variant="caption"
                                    className="text-red-500"
                                >
                                    Item Image is required.
                                </Typography>
                            )}
                        </div>
                        <div className="mb-4">
                            <Typography
                                id="spring-modal-description"
                                sx={{ mt: 2 }}
                            >
                                Choose Catergories
                            </Typography>
                            <Select
                                label="Category"
                                id="category"
                                name="category"
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                                fullWidth
                            >
                                <MenuItem value="Select Category" disabled>
                                    Select Category
                                </MenuItem>
                                <MenuItem value="Bags">Bags</MenuItem>
                                <MenuItem value="Motorcycles">
                                    Motorcycles
                                </MenuItem>
                                <MenuItem value="Cars">Cars</MenuItem>
                                {/* Add more categories as needed */}
                            </Select>
                            {submitted && !data.category && (
                                <Typography
                                    variant="caption"
                                    className="text-red-500"
                                >
                                    Category is required.
                                </Typography>
                            )}
                        </div>
                        <div className="mb-4">
                            <Typography
                                id="spring-modal-description"
                                sx={{ mt: 2 }}
                            >
                                Condition
                            </Typography>
                            <Select
                                label="Quality"
                                id="quality"
                                name="quality"
                                value={data.quality}
                                onChange={(e) =>
                                    setData("quality", e.target.value)
                                }
                                fullWidth
                            >
                                <MenuItem value="quality" disabled>
                                    ...
                                </MenuItem>
                                <MenuItem value="Brand New">Brand New</MenuItem>
                                <MenuItem value="Used - Like New" >
                                    Used - Like New
                                </MenuItem>
                                <MenuItem value="Used - Good">Used - Good</MenuItem>
                                <MenuItem value="Used - Fair">Used - Fair</MenuItem>
                                {/* Add more categories as needed */}
                            </Select>
                            {submitted && !data.quality && (
                                <Typography
                                    variant="caption"
                                    className="text-red-500"
                                >
                                    Quality is required.
                                </Typography>
                            )}
                        </div>

                        
                        <div className="mb-4">
                            <Typography
                                id="spring-modal-description"
                                sx={{ mt: 2 }}
                            >
                                Item Name
                            </Typography>
                            <TextField
                                id="itemName"
                                name="itemName"
                                value={data.itemName}
                                onChange={(e) =>
                                    setData("itemName", e.target.value)
                                }
                                fullWidth
                            />
                            {submitted && !data.itemName && (
                                <Typography
                                    variant="caption"
                                    className="text-red-500"
                                >
                                    Item Name is required.
                                </Typography>
                            )}
                        </div>
                        <div className="mb-4">
                            <Typography
                                id="spring-modal-description"
                                sx={{ mt: 2 }}
                            >
                                Price
                            </Typography>
                            <TextField
                                id="price"
                                name="price"
                                type="number"
                                value={data.price}
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                                fullWidth
                            />
                            {submitted && !data.price && (
                                <Typography
                                    variant="caption"
                                    className="text-red-500"
                                >
                                    Item Price is required.
                                </Typography>
                            )}
                        </div>
                        <div className="mb-4">
                            <Typography
                                id="spring-modal-description"
                                sx={{ mt: 2 }}
                            >
                                Quantity
                            </Typography>
                            <TextField
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={data.quantity}
                                onChange={(e) =>
                                    setData("quantity", e.target.value)
                                }
                                fullWidth
                            />
                            {submitted && !data.quantity && (
                                <Typography
                                    variant="caption"
                                    className="text-red-500"
                                >
                                    Item Quantity is required.
                                </Typography>
                            )}
                        </div>
                        <div className="mb-4">
                            <Typography
                                id="spring-modal-description"
                                sx={{ mt: 2 }}
                            >
                                Description
                            </Typography>
                            <textarea
                                className="w-full h-20 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                value={data.remarks}
                                onChange={(e) =>
                                    setData("remarks", e.target.value)
                                }
                                name="remarks"
                            ></textarea>
                            {submitted && !data.remarks && (
                                <Typography
                                    variant="caption"
                                    className="text-red-500"
                                >
                                    Item Remarks is required.
                                </Typography>
                            )}
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setIsAddItemModalOpen(false)}
                        color="primary"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        color="primary"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        Add Item
                    </button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
             {/* Modal for displaying item details */}
            {/* Modal for displaying item details */}
            <Dialog
                open={isModalOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle className="flex justify-between items-center">
                    <div>{selectedItem ? selectedItem.itemName : ''}</div>
                    <IconButton onClick={handleClose} >
                        <FaTimes />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {selectedItem && (
                        <div className="flex flex-col items-center">
                            <img
                  
                                src={`/storage/${selectedItem.images}`}
                                
                                alt={selectedItem.itemName}
                                className="w-full h-auto object-cover mb-4"
                            />
                           
                            <div className="w-full space-y-2">
                             
                                <div className="space-y-1">
                                <Typography variant="body1" className="text-lg" style={{ whiteSpace: 'pre-line' }}>
                                    {selectedItem.description}
                                </Typography>
                                   
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>

            </Dialog>
            {/* Modal for edit item details */}
            <Dialog open={isEditMode} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle className="flex justify-between items-center">
                    <div>{isEditMode ? 'Edit Item' : 'Item Details'}</div>
                    <IconButton onClick={handleEditClose} >
                        <FaTimes />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                <form onSubmit={handleUpdate} encType="multipart/form-data">
                    {selectedItem && (
                            <div className="flex flex-col items-center">
                                {selectedItem.images && showButton && (
                            <div>
                                <img
                                    src={`/storage/${selectedItem.images}`}
                                    alt={selectedItem.itemName}
                                    className="w-full h-50 object-cover mb-4"
                                />
                                
                                <button
                                    onClick={handleUpdateImageButtonClick}
                                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded inline-flex items-center mr-4"
                                    disabled={processing}
                                >
                                    Update Image
                                </button>
                                
                            </div>
                            )}
                            {showFileInput && (
                               
                                <TextField
                                type="file"
                                id="file"
                                name="filename"
                                onChange={e => setData('filename', e.target.files[0])}
                                fullWidth
                            />
                            )}
                            
                            <div className="w-full space-y-2 mt-4">
                                <div className="mb-4">
                                    <Typography
                                        id="spring-modal-description"
                                        sx={{ mt: 2 }}
                                    >
                                        Choose Catergories
                                    </Typography>
                                    <Select
                                        label="Category"
                                        id="category"
                                        name="category"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                        fullWidth
                                    >
                                        <MenuItem value="Select Category" disabled>
                                            Select Category
                                        </MenuItem>
                                        <MenuItem value="Bags">Bags</MenuItem>
                                        <MenuItem value="Motorcycles">
                                            Motorcycles
                                        </MenuItem>
                                        <MenuItem value="Cars">Cars</MenuItem>
                                        {/* Add more categories as needed */}
                                    </Select>
                                    {submitted && !data.category && (
                                        <Typography
                                            variant="caption"
                                            className="text-red-500"
                                        >
                                            Category is required.
                                        </Typography>
                                    )}
                                </div>
                                <TextField
                                    fullWidth
                                    label="Item Name"
                                    value={data.itemName}
                                    onChange={(e) => setData('itemName', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Price"
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Quantity"
                                    type="number"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Quality"
                                    value={data.quality}
                                    onChange={(e) => setData('quality', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    multiline
                                    rows={4}
                                />
                                
                                
                            </div>
                        </div>
                    )}
                 </form>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={handleUpdate}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-5 rounded inline-flex items-center mr-4"
                        disabled={processing}
                    >
                        Save
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
                                                <button
                                                    onClick={() =>
                                                        setIsAddItemModalOpen(
                                                            true,
                                                        )
                                                    }
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                                                >
                                                    <FaPlus className="mr-2" />
                                                    Add Item
                                                </button>
                                            </div>
                                        </div>
                                        <div className="block w-full overflow-x-auto  text-black">
                                            {/* Filter dropdown for category */}
                                            <select
                                                className="mb-4 rounded border-black border px-8 py-2 focus:outline-none focus:border-indigo-500"
                                                value={selectedCategory}
                                                onChange={(e) =>
                                                    setSelectedCategory(
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option value="All">
                                                    All Categories
                                                </option>
                                                <option value="Bags">
                                                    Bag
                                                </option>
                                                <option value="Motorcycles">
                                                    Motorcycle
                                                </option>
                                                <option value="Cars">
                                                    Cars
                                                </option>
                                                {/* Add more categories as needed */}
                                            </select>
                                            <table className="items-center w-full bg-transparent border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">
                                                            Item
                                                        </th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">
                                                            Name
                                                        </th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">
                                                            Price
                                                        </th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">
                                                            Quantity
                                                        </th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">
                                                            Quality
                                                        </th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">
                                                            Remarks
                                                        </th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">
                                                            Category
                                                        </th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-black border-green-700">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {filterItemsByCategoryAndPagination().map(
                                                        (item) => (
                                                            <tr
                                                                key={item.id}
                                                                className="text-black font-bold"
                                                            >
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                   
                                                                   
                                                                        <img 
                                                                          
                                                                          src={`/storage/${item.images}`}
                                                                            alt={item.images} 
                                                                            className="h-20 w-20 flex-shrink-0 overflow-hidden border border-green-700 rounded-full "
                                                                            
                                                                        />
                                                                   
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    {
                                                                        item.itemName
                                                                    }
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    {item.price}
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <div className="flex items-center">
                                                                        <span className="mr-2">
                                                                            {
                                                                                item.quality
                                                                            }
                                                                        </span>
                                                                        <div className="relative w-full">
                                                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
                                                                                <div className=" width: 100% shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <textarea
                                                                        className="w-full h-20 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                                        defaultValue={
                                                                            item.description
                                                                        }
                                                                    ></textarea>
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                                    {
                                                                        item.category
                                                                    }
                                                                </td>
                                                                <td className="border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <button
                                                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-1"
                                                                        onClick={() => handleView(item.id)}
                                                                    >
                                                                        <FaEye className="mr-1" />
                                                                        View
                                                                    </button>
                                                                    <button
                                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                                                                        onClick={() => handleEdit(item.id)}
                                                                    >
                                                                        <FaEdit className="mr-1" />
                                                                        Edit
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )}
                                                </tbody>

                                            </table>
                                            {/* Pagination */}
                                            <div className="flex justify-center mt-4">
                                                <nav className="inline-flex">
                                                    <button
                                                        onClick={() =>
                                                            paginate(
                                                                currentPage - 1,
                                                            )
                                                        }
                                                        disabled={
                                                            currentPage === 1
                                                        }
                                                        className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                    >
                                                        Previous
                                                    </button>
                                                    {Array.from(
                                                        {
                                                            length: Math.ceil(
                                                                items.filter(
                                                                    (item) =>
                                                                        selectedCategory ===
                                                                            "All" ||
                                                                        item.category ===
                                                                            selectedCategory,
                                                                ).length /
                                                                    itemsPerPage,
                                                            ),
                                                        },
                                                        (_, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() =>
                                                                    paginate(
                                                                        index +
                                                                            1,
                                                                    )
                                                                }
                                                                className={`px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === index + 1 ? "bg-gray-200" : ""}`}
                                                            >
                                                                {index + 1}
                                                            </button>
                                                        ),
                                                    )}
                                                    <button
                                                        onClick={() =>
                                                            paginate(
                                                                currentPage + 1,
                                                            )
                                                        }
                                                        disabled={
                                                            currentPage ===
                                                            Math.ceil(
                                                                items.filter(
                                                                    (item) =>
                                                                        selectedCategory ===
                                                                            "All" ||
                                                                        item.category ===
                                                                            selectedCategory,
                                                                ).length /
                                                                    itemsPerPage,
                                                            )
                                                        }
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
