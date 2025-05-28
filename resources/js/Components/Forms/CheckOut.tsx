import PrimaryButton from "@/Components/PrimaryButton";
import { Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { useCart } from "@/context/CartContext";
import { Calendar, ChevronLeft, CreditCard, X } from "lucide-react";
import Button from "../Renter/ui/Button";
import { formatDateDisplay } from "@/utils/dateUtils";

export default function CheckOut() {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, post, processing, errors } = useForm({
        booked_by: user.id,
    });

    const checkOutNow = (e) => {
        e.preventDefault();

        post(route("checkout.booking"));
    };

    const { cart, removeFromCart, clearCart, totalPrice } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    const [formData, setFormData] = useState({
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            zipCode: '',
            cardNumber: '',
            cardExpiry: '',
            cardCvv: ''
        });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simulate payment processing
        setTimeout(() => {
        setIsProcessing(false);
        setIsComplete(true);
        clearCart();
        }, 2000);
    };
    return (
        <>
            <div className="bg-gray-100 container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Cart
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                        <div className="p-6 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
                        </div>

                        <form onSubmit={handleSubmit}>
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                                </label>
                                <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                                </label>
                                <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                                </label>
                                <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            </div>
                        </div>

                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Billing Address</h2>
                            <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Street Address
                                </label>
                                <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                                </div>
                                <div>
                                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                                    ZIP / Postal Code
                                </label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h2>
                            <div className="mb-4">
                            <div className="flex space-x-4 mb-6">
                                <button
                                type="button"
                                onClick={() => setPaymentMethod('card')}
                                className={`flex-1 flex items-center justify-center px-4 py-3 border rounded-lg ${
                                    paymentMethod === 'card'
                                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                                    : 'border-gray-300 text-gray-700'
                                }`}
                                >
                                <CreditCard className="h-5 w-5 mr-2" />
                                Credit Card
                                </button>
                                <button
                                type="button"
                                onClick={() => setPaymentMethod('paypal')}
                                className={`flex-1 flex items-center justify-center px-4 py-3 border rounded-lg ${
                                    paymentMethod === 'paypal'
                                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                                    : 'border-gray-300 text-gray-700'
                                }`}
                                >
                                <span className="font-bold mr-2">P</span>
                                PayPal
                                </button>
                            </div>
                            </div>

                            {paymentMethod === 'card' && (
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                                    Expiration Date
                                    </label>
                                    <input
                                    type="text"
                                    id="cardExpiry"
                                    name="cardExpiry"
                                    value={formData.cardExpiry}
                                    onChange={handleInputChange}
                                    placeholder="MM/YY"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                                    CVV
                                    </label>
                                    <input
                                    type="text"
                                    id="cardCvv"
                                    name="cardCvv"
                                    value={formData.cardCvv}
                                    onChange={handleInputChange}
                                    placeholder="123"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                </div>
                            </div>
                            )}

                            {paymentMethod === 'paypal' && (
                            <div className="text-center py-6">
                                <p className="text-gray-600 mb-4">
                                You will be redirected to PayPal to complete your payment.
                                </p>
                            </div>
                            )}

                            <div className="mt-6">
                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : `Complete Booking • $${(totalPrice + 10).toFixed(2)}`}
                            </Button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>

                    <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                        
                        <div className="mb-6 divide-y divide-gray-200">
                        {cart.map((cartItem) => {
                            const start = new Date(cartItem.startDate);
                            const end = new Date(cartItem.endDate);
                            const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                            
                            return (
                            <div key={cartItem.item.id} className="py-4 flex">
                                <img
                                src={cartItem.item.imageUrl}
                                alt={cartItem.item.name}
                                className="w-16 h-16 object-cover rounded mr-4"
                                />
                                <div className="flex-grow">
                                <div className="flex justify-between">
                                    <h3 className="text-sm font-medium text-gray-800">{cartItem.item.name}</h3>
                                    <button
                                    onClick={() => removeFromCart(cartItem.item.id)}
                                    className="text-gray-400 hover:text-gray-600"
                                    >
                                    <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="flex items-center text-xs text-gray-600 mt-1">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span>
                                    {formatDateDisplay(cartItem.startDate)} - {formatDateDisplay(cartItem.endDate)}
                                    </span>
                                </div>
                                <div className="mt-1 flex justify-between">
                                    <span className="text-xs text-gray-600">
                                    ${cartItem.item.price} x {days} {cartItem.item.priceUnit}s
                                    </span>
                                    <span className="text-sm font-medium">
                                    ${(cartItem.item.price * days).toFixed(2)}
                                    </span>
                                </div>
                                </div>
                            </div>
                            );
                        })}
                        </div>
                        
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
                        
                        <div className="flex justify-between mb-4">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-semibold text-gray-900">${(totalPrice + 10).toFixed(2)}</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>



            <div className="bg-gray-100"></div>
        </>
    );
}
