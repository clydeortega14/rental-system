import { Link, useForm } from "@inertiajs/react";
import React, {useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { useCart } from "@/context/CartContext";
import { Calendar, ChevronLeft, CreditCard, X } from "lucide-react";
import Button from "../Renter/ui/Button";
import { formatDateDisplay, formatPrice } from "@/utils/dateUtils";
import LoginWithGoogle from "../LoginWithGoogle";
import { BookingSession } from "@/types/rental";
import InputError from "../InputError";
import KycModal from "@/Pages/User/modals/KycModal";
import { useKyc } from "@/context/KycContext";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import Select from "../Select";
import { usePostalAddress } from "@/context/PostalAddressContext";
import { Barangay, City, Region } from "@/types/postalAddress";
import { BillingAddress } from "@/types";
import { PageProps } from "@/types";

interface CheckOutProps {
    bookingData: BookingSession;
    categoryServiceFee: number;
}

interface checkOutForm {
    rental_listing_id: number,
    name: string,
    email: string,
    phone: string,
    billing_address: BillingAddress
}

type ErrorBag = Record<string, string>;

export default function CheckOut({bookingData, categoryServiceFee}: CheckOutProps) {
    const user = usePage<PageProps>().props.auth.user;

    const map_billing_address = user.postal_addresses.find(billing => billing.address_type.name === 'Billing');
    const map_delivery_address = user.postal_addresses.find(delivery => delivery.address_type.name === 'Delivery');

    console.log(map_billing_address)
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
        handleSelectedRegion, 
        getRegions,

        // PROVINCES State
        provinces,
        handleSelectedProvince,

        // Cities state
        cities,
        handleSelectedCity,

        // Barangay state
        barangays,
        handleSelectedBarangay,

        handleBillingZipcode

    } = usePostalAddress();

    const [formData, setFormData] = useState({});

    useEffect( () => {

        getRegions();

        if(map_billing_address)
        {
            handleSelectedRegion(map_billing_address.region_id);
            handleSelectedProvince(map_billing_address.province_id);
            handleSelectedCity(map_billing_address.city_id);
        }
        
    },[])

    const { data, setData, post, processing, errors } = useForm<checkOutForm>({
        rental_listing_id: bookingData.rental_listing.id,
        name: user ? user.name : '',
        email: user ? user.email : '',
        phone: user ? user.contact?.mobile : '',
        billing_address: {
            region: map_billing_address && map_billing_address.region_id,
            province: map_billing_address && map_billing_address.province_id,
            city: map_billing_address && map_billing_address.city_id,
            barangay: map_billing_address && map_billing_address.barangay_id,
            zipcode: map_billing_address && map_billing_address.zipcode,
            street: map_billing_address && map_billing_address.street,
        }
    }) as {
        data: checkOutForm, 
        setData: any, 
        post: any, 
        processing: boolean, 
        errors: ErrorBag
    };

    console.log(errors)

    const { cart, removeFromCart, clearCart, totalPrice } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
        
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsProcessing(true);

        post(route("checkout.booking", {
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

    useEffect( () => {

        if(deliveryAddressIsSameWithBilling) {
            setFormData({
                ...formData,
                delivery_address: {
                    region:'',
                    province: user.billing_address?.province,
                    city: user.billing_address?.city,
                    barangay: user.billing_address?.barangay,
                    zipcode: user.billing_address?.zipcode,
                    street: user.billing_address?.street
                }
            })
        }else{
            setFormData({
                ...formData,
                delivery_address: {
                    region: '',
                    province: '',
                    city: '',
                    barangay: '',
                    zipcode: '',
                    street: ''
                }
            })
        }

    }, [deliveryAddressIsSameWithBilling])

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

                        <h1>{errors.billing_address}</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                        </label>
                                        <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={ (e) => setData('name', e.target.value)}
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
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
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
                                        value={data.phone}
                                        onChange={(e) => setData('phone',  e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        />

                                        <InputError message={errors.phone} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Billing Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
                                    <div>
                                        <InputLabel htmlFor="billing-region" value="Region" />
                                        <Select
                                            id="billing-region"
                                            name="billing_region"
                                            value={data.billing_address.region}
                                            onChange={ (e) => {
                                                setData('billing_address', {...data.billing_address, region: e.target.value})
                                                handleSelectedRegion(e.target.value)
                                            }}
                                        >
                                            {
                                                regions.map((region:Region) => {

                                                    return (
                                                        <option value={region.region_id} key={region.region_id}>{region.name}</option>
                                                    )
                                                })
                                            }
                                        </Select>

                                        {errors["billing_address.region"] && (
                                            <div className="text-red-500">{errors["billing_address.region"]}</div>
                                        )}
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="billing-province" value="Province" />
                                        <Select
                                            id="billing-province"
                                            name="billing_province"
                                            value={data.billing_address.province}
                                            onChange={ (e) => {
                                                handleSelectedProvince(e.target.value);
                                                setData('billing_address', {...data.billing_address, province: e.target.value})
                                            }}
                                        >
                                            {
                                                provinces.length > 0 && provinces.map(province => {
                                                    return (
                                                        <option value={province.province_id} key={province.province_id} >{province.name}</option>
                                                    )
                                                })
                                            }
                                        </Select>
                                        {errors['billing_address.province'] && <InputError className="mt-1" message={errors['billing_address.province']} />}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="billing-city" value="City" />
                                        <Select
                                            id="billing-city"
                                            name="billing_city"
                                            value={data.billing_address.city}
                                            onChange={ (e) => {
                                                setData('billing_address',{...data.billing_address, city: e.target.value})
                                                handleSelectedCity(e.target.value)
                                            }}
                                        >
                                            {cities.map((city: City) => {
                                                return (
                                                    <option value={city.city_id} key={city.city_id}>{city.name}</option>
                                                )
                                            })}
                                        </Select>
                                        {errors['billing_address.city'] && <InputError className="mt-1" message={errors['billing_address.city']} />}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-7">
                                    <div>
                                        <InputLabel htmlFor="billing-barangay" value="Barangay" />
                                        <Select
                                            id="billing-barangay"
                                            name="billing_barangay"
                                            value={data.billing_address.barangay}
                                            onChange={ (e) => {
                                                setData(
                                                    'billing_address',
                                                    {...data.billing_address, barangay: e.target.value}
                                                )
                                                handleSelectedBarangay
                                            }}
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

                                        {errors['billing_address.barangay'] && <InputError className="mt-1" message={errors['billing_address.barangay']} />}
                                    </div>


                                    <div>
                                        <InputLabel htmlFor="billing-zipcode" value="ZipCode" />
                                        <TextInput 
                                            id="billing-zipcode"
                                            name="zipcode"
                                            value={data.billing_address.zipcode}
                                            className="w-full block mt-1"
                                            onChange={ (e) => {
                                                setData(
                                                    'billing_address',
                                                    {...data.billing_address, zipcode: e.target.value}
                                                )
                                                handleBillingZipcode
                                            }}
                                        />
                                        {errors['billing_address.zipcode'] && <InputError className="mt-1" message={errors['billing_address.zipcode']} />}
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="billing-street-address" value="Street/Floor No./House No." />
                                    <TextInput 
                                        id="billing-street-address"
                                        name="billing_street_address"
                                        value={data.billing_address.street}
                                        className="w-full block mt-1"
                                        onChange={ (e) => {
                                            setData(
                                                'billing_address',
                                                {...data.billing_address, street: e.target.value}
                                            );
                                        }}
                                    />
                                    {errors['billing_address.street'] && <InputError className="mt-1" message={errors['billing_address.street']} />}
                                </div>
                            </div>

                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center md:flex-row space-x-4">
                                    <h2 className="text-lg font-bold text-gray-600 mb-4">Delivery Address</h2>

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
                                


                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
                                    <div>
                                        <InputLabel htmlFor="delivery-region" value="Region" />
                                        <Select
                                            id="delivery-region"
                                            name="delivery_region"
                                            value={''}
                                            onChange={ (e) => console.log(e.target.value)}
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
                                        <InputLabel htmlFor="delivery-province" value="Province" />
                                        <Select
                                            id="delivery-province"
                                            name="delivery_province"
                                            value={''}
                                            onChange={ (e) => console.log(e.target.value)}
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
                                        <InputLabel htmlFor="delivery-city" value="City" />
                                        <Select
                                            id="delivery-city"
                                            name="delivery_city"
                                            value={''}
                                            onChange={ (e) => console.log(e.target.value)}
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
                                        <InputLabel htmlFor="delivery-barangay" value="Barangay" />
                                        <Select
                                            id="delivery-barangay"
                                            name="delivery_barangay"
                                            value={''}
                                            onChange={ (e) => console.log(e.target.value) }
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
                                        <InputLabel htmlFor="delivery-zipcode" value="ZipCode" />
                                        <TextInput 
                                            id="delivery-zipcode"
                                            name="delivery_zipcode"
                                            value={''}
                                            className="w-full block mt-1"
                                            onChange={ (e) => console.log(e.target.value)}
                                        />
                                    </div>
                                </div>

                                

                                <div className="mb-6">
                                    <InputLabel htmlFor="delivery-street-address" value="Street/Floor No./House No." />
                                    <TextInput 
                                        id="delivery-street-address"
                                        name="delivery_street_address"
                                        value={''}
                                        className="w-full block mt-1"
                                        onChange={(e) => console.log(e.target.value)}
                                    />
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
