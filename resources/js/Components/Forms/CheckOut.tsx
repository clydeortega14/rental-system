import { Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import { useCart } from "@/context/CartContext";
import { Calendar, ChevronLeft, CreditCard, X } from "lucide-react";
import Button from "../Renter/ui/Button";
import { formatDateDisplay, formatPrice } from "@/utils/dateUtils";
import LoginWithGoogle from "../LoginWithGoogle";
import { BookingSession } from "@/types/rental";
import CardExpiryInput from "../CardExpiryInput";
import InputError from "../InputError";
import KycModal from "@/Pages/User/modals/KycModal";
import { useKyc } from "@/context/KycContext";

interface CheckOutProps {
    bookingData: BookingSession
}

export default function CheckOut({bookingData}: CheckOutProps) {
    const user = usePage<PageProps>().props.auth.user;
    console.log(user)
    const isVerified = user?.kyc?.kyc_verified === true;
    const [serviceFee, setServiceFee] = useState<number>(0);
    const [allTotal, setAllTotal] = useState<number>(0);
    const error_message = usePage<PageProps>().props.flash.error_message

    const {showKycModal, setShowKycModal } = useKyc();

    useEffect( () => {

        const service_fee = bookingData.partial_total * 0.03;
        setServiceFee(service_fee)
        setData
    }, [bookingData.partial_total]);

    useEffect( () => {

        if(user && user.kyc === null) setShowKycModal(true);

    }, [user]);

    useEffect( () => {

        let calculated_total = Number(bookingData.partial_total) + serviceFee;
        setAllTotal(calculated_total);

    }, [bookingData.partial_total, serviceFee]);
    const [formData, setFormData] = useState({
            rental_listing_id: bookingData.rental_listing_id,
            name: user ? user.name : '',
            email: user ? user.email : '',
            phone: user ? user.contact?.mobile : '',
            address: user && user.company && user.company?.street,
            city: user ? user.company?.city : '',
            zipCode: user ? user.company?.postal_code : '',
            cardNumber: '',
            cardExpiry: '',
            cardCvv: '',
        });

    const { data, setData, post, processing, errors } = useForm(formData);

    const { cart, removeFromCart, clearCart, totalPrice } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(name === 'cardExpiry')
        {
            let exp_value = e.target.value;

            if (/^\d{2}$/.test(exp_value)) {
                exp_value += '/';
            }
            setFormData({...formData, [name]:exp_value})
        }else{
            setFormData({
                ...formData,
                [name]: value
            });
        }
        
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsProcessing(true);

        post(route("checkout.booking", {
            ...formData, 
            service_fee: serviceFee, 
            total_cost: allTotal,
            payment_method: paymentMethod,
            status: 'Pending'
        }), {
            preserveScroll: true,
            onSuccess: () => {
                setTimeout(() => {
                    setIsProcessing(false);
                    setIsComplete(true);
                    clearCart();
                }, 2000);

                // Simulate payment processing
            }
        });
    };


    const handleSubmitLogin = (e: React.FormEvent) => {

        e.preventDefault();

        post(route('login'), {
            preserveScroll: true,
            preserveState: false
        })
    }


    return (
        <>
            <div className="bg-gray-100 container mx-auto px-4 py-8">

                <h1 className="font-semibold text-red-700">{error_message}</h1>
                <div className="mb-6">
                    <Link href={route('cart.index')} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Cart
                    </Link>
                </div>

                

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 px-2">
                        
                        {
                            user.kyc === null && (
                                <div className="text-center py-4 border border-yellow-500 rounded-lg bg-yellow-100 my-3">
                                    <p className="text-red-600 text-lg">Please complete your identity verification to proceed.</p>
                                </div>
                            )
                        }

                        {
                            user.kyc && user.kyc.kyc_status === 'Pending' && !user.kyc.kyc_verified && (
                                <div className="text-center py-4 border border-blue-500 rounded-lg bg-blue-100 my-3">
                                    <p className="text-blue-600 text-lg">Your KYC is now subjected for Verification. We will let you know once verified!</p>
                                </div>
                            )
                        }

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
                                value={user ? user.name : formData.name}
                                onChange={handleInputChange}
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
                                value={user ? user.email : formData.email}
                                onChange={handleInputChange}
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
                                value={ user && user.contact ? user.contact.mobile : formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />

                                <InputError message={errors.phone} />
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
                                value={user &&  user.billing_address ? user.billing_address.street : formData.address}
                                onChange={handleInputChange}
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
                                    value={user &&  user.billing_address ? user.billing_address.city : formData.city}
                                    onChange={handleInputChange}
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
                                    value={user &&  user.billing_address ? user.billing_address.postal_code : formData.zipCode}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="mt-6">

                            { user ? (
                                isVerified ? (
                                    <Button
                                    type="submit"
                                    variant="primary"
                                    fullWidth
                                    disabled={processing}
                                    >
                                    {processing ? 'Processing...' : `Complete Booking • ${formatPrice(allTotal)}`}
                                    </Button>
                                ) : (
                                    <>
                                    <div className="text-center py-4">
                                        {/* <p className="text-red-600 text-sm">Please complete your identity verification to proceed.</p> */}
                                    </div>
                                    
                                    </>
                                )
                            ) : (
                                <LoginWithGoogle />
                            )}
                            
                        </div>

                        {/* <div className="p-6">
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
                                    value={user && user.card_detail ? user.card_detail.card_number : formData.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                <div>
                                    
                                    <CardExpiryInput 
                                        name={"cardExpiry"}
                                        onChange={handleInputChange}
                                        value={user && user.card_detail ? user.card_detail.card_expiry :formData.cardExpiry}
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
                                    value={user && user.card_detail ? user.card_detail.cvv :formData.cardCvv}
                                    onChange={handleInputChange}
                                    placeholder="123"
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

                            
                        </div> */}
                        </form>

                        {/* {
                            !user && <LoginWithGoogle />
                        } */}
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
                                
                                <div className="flex items-center text-xs text-gray-600 mt-1">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span>
                                    {formatDateDisplay(cartItem.startDate)} - {formatDateDisplay(cartItem.endDate)}
                                    </span>
                                </div>
                                <div className="mt-1 flex justify-between">
                                    <span className="text-xs text-gray-600">
                                    ${cartItem.item.price['daily']} x {days} {cartItem.item.priceUnit}s
                                    </span>
                                    <span className="text-sm font-medium">
                                    ${(cartItem.item.price['daily'] * days).toFixed(2)}
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
                            <span className="text-gray-900">{formatPrice(bookingData.partial_total)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Service fee</span>
                            <span className="text-gray-900">{formatPrice(serviceFee)}</span>
                        </div>
                        </div>
                        
                        <div className="flex justify-between mb-4">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-semibold text-gray-900">{formatPrice(allTotal) }</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>


            { showKycModal && (
                <KycModal 
                    user_id={user.id}
                    userKyc={
                        user.kyc
                        ? {
                            full_name: user.kyc.full_name,
                            document_type: user.kyc.document_type,
                            document_number: user.kyc.document_number,
                            selfie_path: user.kyc.selfie_path ?? undefined,
                            document_path: user.kyc.document_path ?? undefined,
                            kyc_status:
                                user.kyc.kyc_status && ["Pending", "Approved", "Rejected"].includes(user.kyc.kyc_status)
                                ? (user.kyc.kyc_status as "Pending" | "Approved" | "Rejected")
                                : undefined,
                            }
                        : undefined
                    }
                    isReadOnly={false}
                    onClose={() => setShowKycModal(false)}
                />
            )}
            <div className="bg-gray-100"></div>
        </>
    );
}
