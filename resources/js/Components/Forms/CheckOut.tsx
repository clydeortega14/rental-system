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
import Address from "./Address";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import Select from "../Select";
import axios from "axios";
import { usePostalAddress } from "@/context/PostalAddressContext";
import { Barangay, City, Province, Region } from "@/types/postalAddress";
import { forEach, update } from "lodash";

interface CheckOutProps {
    bookingData: BookingSession;
    categoryServiceFee: number;
}

export default function CheckOut({bookingData, categoryServiceFee}: CheckOutProps) {
    const user = usePage<PageProps>().props.auth.user;

    const isVerified = user?.kyc?.kyc_verified === true;
    const [serviceFee, setServiceFee] = useState<number>(Number(bookingData.partial_total) * categoryServiceFee);
    const [allTotal, setAllTotal] = useState<number>(Number(bookingData.partial_total) + serviceFee);
    const error_message = usePage<PageProps>().props.flash.error_message

    const {showKycModal, setShowKycModal } = useKyc();

    useEffect( () => {

        if(user && user.kyc === null) setShowKycModal(true);

    }, [user]);

    const [deliveryAddressIsSameWithBilling, setDeliveryAddressIsSameWithBilling] = useState<boolean>(false);
    const {
        // Regions state
        regions, 
        selectedRegion,
        handleSelectedRegion, 
        getRegions,

        daRegion,
        setDaRegion,

        // PROVINCES State
        provinces,
        selectedProvince,
        handleSelectedProvince,

        // DA Province
        da_province,
        setDaProvince,

        // Cities state
        cities,
        selectedCity,
        handleSelectedCity,
        daCity,
        setDaCity,

        // Barangay state
        barangays,
        selectedBarangay,
        daBarangay,
        setDaBarangay,

    } = usePostalAddress();

    const [formData, setFormData] = useState({
        rental_listing_id: bookingData.rental_listing.id,
        name: '',
        email: '',
        phone: '',
        street: '',
        region: '',
        province: '',
        city: '',
        barangay: '',
        zipcode: '',
        delivery_address: {
            region: '',
            province: '',
            city: '',
            barangay: '',
            zipcode: '',
            street: ''
        }
    });

    useEffect( () => {

        getRegions();
        
    },[]);

    useEffect( () => {

        if(user){
            setFormData(prevData => {

                return {
                    ...prevData,
                    name: user.name,
                    email: user.email,
                    phone: user.contact?.mobile,
                }
            });
        }

        if(user && user.biling_address && user.billing_address !== null){
            setFormData(prevData => {
                return {
                    ...prevData,
                    street: user.billing_address.street,
                    region: user.billing_address.region,
                    province: user.billing_address.province,
                    city: user.billing_address.city
                }
            })
        }

    }, [user]);

    useEffect( () => {
        
        if(deliveryAddressIsSameWithBilling){
            setFormData(prevData => {

                return {
                    ...prevData,
                    delivery_address: {
                        region: selectedRegion,
                        province: selectedProvince,
                        city: selectedCity,
                        barangay: selectedBarangay,
                        zipcode: formData.zipcode,
                        street: formData.street
                    }
                }
            });

            
        }else{

            setFormData(prevData => {

                return {
                    ...prevData,
                    delivery_address: {
                        region: daRegion,
                        province: da_province,
                        city: daCity,
                        barangay: daBarangay,
                        zipcode: formData.delivery_address.zipcode,
                        street: formData.delivery_address.street
                    }
                }
            }); 
        }

    }, [deliveryAddressIsSameWithBilling, selectedRegion, selectedProvince])

    const { data, setData, post, processing, errors } = useForm(formData);

    const { cart, removeFromCart, clearCart, totalPrice } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const keys = name.split(".");


        setFormData((prev) => {
            const updated = {...prev};
            let current: any = updated;

            keys.forEach((key: number, index: number) => {
                if(index === keys.length -1){
                    current[key] = value;
                }else{
                    current[key] = {...current[key]};
                    current = current[key]
                }
            });

            return updated
        });
        
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

    const handleDeliveryCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setDeliveryAddressIsSameWithBilling(e.target.checked);
    }


    return (
        <>
            <div className="bg-gray-100 container mx-auto sm:px-4 lg:px-8">

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
                            <div className="px-8 py-4 border-b border-slate-300">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>

                                        <TextInput 
                                        
                                            id="name"
                                            name="name"
                                            value={formData.name || ''}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 block"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                        </label>
                                        <TextInput id="email" name="email" value={formData.email || ""} className={`w-full mt-1 block`} onChange={handleInputChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>

                                        <TextInput id="phone" name="phone" value={formData.phone || ""} onChange={handleInputChange}  className="mt-1 w-full block" />

                                        <InputError message={errors.phone} />
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 py-4 border-b border-slate-300">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 py-4 px-2">Billing Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
                                    <div>
                                        <InputLabel htmlFor="billing-region" value="Region" />
                                        <Select
                                            id="billing-region"
                                            name="billing_region"
                                            value={selectedRegion}
                                            onChange={ (e) => handleSelectedRegion(e.target.value)}
                                        >
                                            {
                                                regions.map((region:Region) => {

                                                    return (
                                                        <option value={region.region_id} key={region.region_id}>{region.name}</option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="billing-province" value="Province" />
                                        <Select
                                            id="billing-province"
                                            name="billing_province"
                                            value={selectedProvince}
                                            onChange={ (e) => handleSelectedProvince(e.target.value)}
                                        >
                                            {
                                                provinces.length > 0 && provinces.map(province => {
                                                    return (
                                                        <option value={province.province_id} key={province.province_id} >{province.name}</option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="billing-city" value="City" />
                                        <Select
                                            id="billing-city"
                                            name="billing_city"
                                            value={selectedCity}
                                            onChange={ (e) => handleSelectedCity(e.target.value)}
                                        >
                                            {cities.map((city: City) => {
                                                return (
                                                    <option value={city.city_id} key={city.city_id}>{city.name}</option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-7">
                                    <div>
                                        <InputLabel htmlFor="billing-barangay" value="Barangay" />
                                        <Select
                                            id="billing-barangay"
                                            name="billing_barangay"
                                            value={selectedBarangay}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        >
                                            {
                                                barangays.map((barangay: Barangay) => {
                                                    return (
                                                        <option value={barangay.id} key={barangay.id}>{barangay.name}</option>
                                                    );

                                                })
                                            }
                                        </Select>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="billing-zipcode" value="ZipCode" />
                                        <TextInput 
                                            id="billing-zipcode"
                                            name="zipcode"
                                            value={formData.zipcode || ''}
                                            className="w-full block mt-1"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="billing-street-address" value="Street/Floor No./House No." />
                                    <TextInput 
                                        id="billing-street-address"
                                        name="street"
                                        value={formData.street || ""}
                                        className="w-full block mt-1"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="px-8 py-4 border-b border-slate-300">
                                <div className="flex justify-between items-center md:flex-row space-x-4">
                                    <h2 className="text-lg font-bold text-gray-600 my-7">Delivery Address</h2>

                                    <label className="flex items-center space-x-2 mb-4">
                                        <input 
                                            type="checkbox" 
                                            checked={deliveryAddressIsSameWithBilling} 
                                            className="h-5 w-5 text-indigoo-600 rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                            onChange={handleDeliveryCheckChange}
                                        />
                                        <span className="text-gray-800">Same As Billing Address</span> 
                                    </label>
                                </div>
                                


                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <InputLabel htmlFor="da-region" value="Region" />
                                        <Select
                                            id="da-region"
                                            name="delivery_address.region"
                                            value={formData.delivery_address.region || ""}
                                            onChange={handleInputChange}
                                        >
                                            {
                                                regions.map((region:Region) => {

                                                    return (
                                                        <option value={region.region_id} key={region.region_id}>{region.name}</option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="da-province" value="Province" />
                                        <Select
                                            id="da-province"
                                            name="delivery_address.province"
                                            value={formData.delivery_address.province || ""}
                                            onChange={handleInputChange}
                                        >
                                            {
                                                provinces.map((province:Province) => {

                                                    return (
                                                        <option value={province.province_id} key={province.province_id}>{province.name}</option>
                                                    )
                                                })
                                            }

                                        </Select>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="da-city" value="City" />

                                        <Select
                                            id="da-city"
                                            name="delivery_address.city"
                                            value={formData.delivery_address.city || ''}
                                            onChange={handleInputChange}
                                        >
                                            {
                                                cities.map((city:City) => {

                                                    return (
                                                        <option value={city.city_id} key={city.city_id}>{city.name}</option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                                    <div>
                                        <InputLabel htmlFor="billing-barangay" value="Barangay" />

                                        <Select id="da-barangay" name="delivery_address.barangay" value={formData.delivery_address.barangay} onChange={handleInputChange}>
                                            {
                                                barangays.map((barangay:Barangay) => {

                                                    return (
                                                        <option value={barangay.barangay_id} key={barangay.barangay_id}>{barangay.name}</option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>


                                    <div>
                                        <InputLabel htmlFor="da-zipcode" value="ZipCode" />
                                        <TextInput 
                                            id="da-zipcode"
                                            name="delivery_address.zipcode"
                                            value={formData.delivery_address.zipcode || ""}
                                            className="w-full block mt-1"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                

                                <div className="mb-6">
                                    <InputLabel htmlFor="da-street-address" value="Street/Floor No./House No." />
                                    <TextInput 
                                        id="da-street-address"
                                        name="delivery_address.street"
                                        value={formData.delivery_address.street || ""}
                                        className="w-full block mt-1"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                
                            </div>

                            <div className="mt-6">

                                { user ? (
                                    isVerified && (
                                        <Button
                                        type="submit"
                                        variant="primary"
                                        fullWidth
                                        disabled={processing}
                                        >
                                        {processing ? 'Processing...' : `Complete Booking • ${formatPrice(allTotal)}`}
                                        </Button>
                                    )
                                ) : (
                                    <LoginWithGoogle />
                                )}
                                
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
                            <span className="text-gray-600">Service fee </span>
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
