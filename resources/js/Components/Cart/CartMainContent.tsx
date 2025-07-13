import { useCart } from '@/context/CartContext'
import RenterLayout from '@/Layouts/RenterLayout'
import { Link } from '@inertiajs/react'
import { ChevronLeft, ShoppingCart as CartIcon, Calendar, Trash2 } from 'lucide-react'
import Button from '../Renter/ui/Button'
import { formatDateDisplay } from '@/utils/dateUtils'

const CartMainContent = () => {
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
                            <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
                            <span className="text-gray-600">{cart.length} item(s)</span>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {cart.map((cartItem) => {
                        const start = new Date(cartItem.startDate);
                        const end = new Date(cartItem.endDate);
                        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                        const itemTotal = cartItem.item.price['daily'] * days * cartItem.quantity;
                        
                        return (
                            <div key={cartItem.item.id} className="p-6">
                            <div className="flex flex-col md:flex-row">
                                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                                <img
                                    src={cartItem.item.imageUrl}
                                    alt={cartItem.item.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                </div>
                                <div className="flex-grow">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                                    <Link href={`/items/${cartItem.item.id}`}>
                                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                                        {cartItem.item.name}
                                    </h3>
                                    </Link>
                                    <div className="mt-2 md:mt-0">
                                    <span className="font-semibold text-gray-900">${itemTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex items-center text-gray-600 mb-2">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>
                                        {formatDateDisplay(cartItem.startDate)} - {formatDateDisplay(cartItem.endDate)}
                                    </span>
                                    <span className="ml-2 text-sm text-gray-500">
                                        ({days} {cartItem.item.priceUnit}{days > 1 ? 's' : ''})
                                    </span>
                                    </div>
                                    <div className="text-gray-600 text-sm">
                                    <span>${cartItem.item.price['daily']} per {cartItem.item.priceUnit}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                    <button 
                                        className="px-2 py-1 border border-gray-300 rounded-l-md bg-gray-50"
                                        onClick={() => {
                                        // Decrease quantity logic would go here
                                        }}
                                        disabled={cartItem.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 border-t border-b border-gray-300 bg-white">
                                        {cartItem.quantity}
                                    </span>
                                    <button 
                                        className="px-2 py-1 border border-gray-300 rounded-r-md bg-gray-50"
                                        onClick={() => {
                                        // Increase quantity logic would go here
                                        }}
                                    >
                                        +
                                    </button>
                                    </div>
                                    <button
                                    onClick={() => console.log('remove cart')}
                                    className="text-red-600 hover:text-red-800 flex items-center"
                                    >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    <span>Remove</span>
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                        );
                        })}
                    </div>

                    <div className="p-6 border-t border-gray-200 flex justify-between">
                        <button
                            onClick={clearCart}
                            className="text-red-600 hover:text-red-800"
                        >
                            Clear Cart
                        </button>
                        <Link href={route('landing.page.index')}>
                            <Button variant="outline">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Service fee</span>
                <span className="text-gray-900">$10.00</span>
              </div>
            </div>
            
            <div className="flex justify-between mb-6">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-semibold text-gray-900">${(totalPrice + 10).toFixed(2)}</span>
            </div>
            
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
          </div>
        </div>
        </div>
    </div>
        
    </>
    
  )
}

export default CartMainContent