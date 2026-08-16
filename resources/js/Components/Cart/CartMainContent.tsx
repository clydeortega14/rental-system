import { useCart } from '@/context/CartContext'
import RenterLayout from '@/Layouts/RenterLayout'
import { Link, usePage } from '@inertiajs/react'
import { ChevronLeft, ShoppingCart as CartIcon, Calendar, Trash2 } from 'lucide-react'
import Button from '../Renter/ui/Button'
import { formatDateDisplay } from '@/utils/dateUtils'
import { BookingSession } from '@/types/rental'
import { booking } from '@/data/bookingsData'
import LoginWithSocial from '../Guest/LoginWithSocial'
import { toTwelveFormat } from '@/utils/timeUtils'
import { PageProps } from '@/types'

interface ICartMainContent {
    bookingData: BookingSession;
}
const CartMainContent = ({bookingData}: ICartMainContent) => {

  const user = usePage<PageProps>().props.auth.user;
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();

//    if (cart.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <div className="max-w-md mx-auto">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
//             <CartIcon className="h-8 w-8 text-gray-500" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
//           <p className="text-gray-600 mb-8">Looks like you haven't added any rental items to your cart yet.</p>
//           <Link href={ route('landing.page.index') }>
//             <Button variant="primary">Browse Rentals</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }
  return (
    <>
    <div className="container mx-auto px-4 py-8 bg-gray-50">
        <div className="mb-8">
            <Link href={route('landing.page.index')} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Continue Shopping
            </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-800">Review rental item</h1>
                            {/* <span className="text-gray-600">{cart.length} item(s)</span> */}
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200">

                        <div className="p-6">
                            <div className="flex items-center flex-col md:flex-row">
                                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                                <img
                                    src={`https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                    alt={``}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                </div>
                                <div className="flex-grow">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                                    <Link href={``}>
                                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                                        {bookingData.rental_listing.itemName}
                                    </h3>
                                    </Link>
                                    <div className="mt-2 md:mt-0">
                                        <button
                                            onClick={() => console.log('remove item')}
                                            className="text-red-600 hover:text-red-800 flex items-center"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4 space-y-4">
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span>
                                            {formatDateDisplay(String(bookingData.startDate))} - {formatDateDisplay(String(bookingData.endDate))}
                                        </span>
                                        
                                    </div>
                                    <div className="text-gray-600 text-sm space-x-2">
                                        <span >
                                            <strong>Duration Period:</strong>{` ${bookingData.duration_quantity} ${bookingData.duration}`}
                                        </span>
                                    </div>
                                    <div className="text-gray-600 text-sm space-x-2">
                                        <span><strong>{`Price per ${bookingData.duration}: `}</strong>{bookingData.rental_listing.price}</span>
                                    </div>
                                    <div className="text-gray-600 text-sm space-x-2">
                                        <span><strong>{`Pick up time: `}</strong>{toTwelveFormat(String(bookingData.startTime)) }</span>
                                    </div>
                                    <div className="text-gray-600 text-sm space-x-2">
                                        <span><strong>{`Return time: `}</strong>{toTwelveFormat(bookingData.returnTime)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* <div className="flex items-center">
                                        <button 
                                            className="px-2 py-1 border border-gray-300 rounded-l-md bg-gray-50"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 border-t border-b border-gray-300 bg-white"></span>
                                        <button 
                                            className="px-2 py-1 border border-gray-300 rounded-r-md bg-gray-50"
                                        >
                                            +
                                        </button>
                                    </div> */}
                                    
                                </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>

                    <div className="p-6 border-t border-gray-200 flex justify-between">
                        <button
                            onClick={clearCart}
                            className="text-red-600 hover:text-red-800"
                        >
                            Clear
                        </button>
                        <Link href={route('landing.page.index')}>
                            <Button variant="outline">
                                Continue Browsing rentals
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                    

                    {
                        !user ? (

                            <>
                            <div className="flex items-center gap-2">
                                <hr className="flex-1" />
                                    <span className="text-sm text-gray-400">you can continue with your social account</span>
                                <hr className="flex-1" />
                            </div>
                            <LoginWithSocial />
                            </>
                        ) :
                        <>
                            <Link href={route('checkout.item')}>
                                <Button variant="primary" fullWidth>
                                    Proceed to Checkout
                                </Button>
                            </Link>

                            <div className="mt-4 text-xs text-gray-500 text-center">
                                <p>By proceeding, you agree to our</p>
                                <div className="flex justify-center space-x-1">
                                    <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                                    <span>and</span>
                                    <a href="#" className="text-blue-600 hover:underline">Rental Policy</a>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    </div>
        
    </>
    
  )
}

export default CartMainContent