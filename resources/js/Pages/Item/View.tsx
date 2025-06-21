import { FormEventHandler, useEffect, useState } from "react";
import { PageProps } from "@/types";
import { Item } from "@/Interface/Item";
import RenterLayout from "@/Layouts/RenterLayout";
import ImageGallery from "@/Components/Renter/ImageGallery";
import { MapPin, Star } from 'lucide-react';
import PricingOptions from "@/Components/Renter/PricingOptions";
import { BookingDetails, RentalDuration,TimeSlot } from "@/types/rental";
import DatePicker from "@/Components/Renter/DatePicker";
import { availabilityData } from "@/data/mockData";
import TimeSlots from "@/Components/Renter/TimeSlots";
import BookingSummary from "@/Components/Renter/BookingSummary";
import ItemSpecification from "@/Components/Renter/ItemSpecification";
import ReviewsSection from "./ReviewsSection";
import SimilarItems from "./SimilarItems";
import { similarItems } from "@/data/similarItems";
import { Head, useForm, usePage } from "@inertiajs/react";
import { computeDateBetweenTwoDates, formatPrice } from "@/utils/dateUtils";
import RentalCalendar from "@/Components/Renter/RentalCalendar";


interface IUnavailableDates  {
    dates: string[]
}

const navigation = {
    categories: [],
};

export default function View({
    item,
    unavailable_dates,
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ 
    laravelVersion: string; 
    phpVersion: string; 
    item: Item,
    unavailable_dates: IUnavailableDates
}>) {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [duration, setDuration] = useState<RentalDuration>('daily');
    const [quantity, setQuantity] = useState(1);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    
    const session_error_message = usePage<PageProps>().props.flash.error_message;
    const [calculatedTotal, setCalculatedTotal] = useState<number>(item.price[duration]);
    
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        duration: 'daily',
        quantity: 1,
        status: 'pending',
        totalPrice: item.price[duration]
    });

    

    const {post, errors, processing } = useForm({});

    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11),
    });

    const selectedDateData = availabilityData.find(d => d.date === selectedDate);
    const timeSlots = selectedDateData?.timeSlots || [];

    const handleDurationChange = (newDuration: RentalDuration) => {

        setBookingDetails({...bookingDetails, duration: newDuration});
        setDuration(newDuration);
    };

    const handleDateSelect = (date: string) => {

        let formatDate = new Date(date);

        if(bookingDetails.startDate === null){
            setBookingDetails({...bookingDetails, startDate: formatDate})
            setSelectedDate(date);
            setSelectedTimeSlot(null); // Reset time slot when date changes
            setSelectedEndDate(null)
        }else{
            setBookingDetails({...bookingDetails, endDate: formatDate});
            setSelectedEndDate(date);
        }
        
    };

    const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
        setBookingDetails({...bookingDetails, startTime: timeSlot.startTime})
        setSelectedTimeSlot(timeSlot);
    };

    useEffect( () => {

        // calculate total
        const basePrice = item.price[duration];

        let calculate_total: number = Number(basePrice) * quantity;
        setCalculatedTotal(calculate_total);

    }, [duration, quantity]);
    

    // side effects on booking details
    useEffect( () => {

        if(bookingDetails.endDate && bookingDetails.startDate){
            if(bookingDetails.endDate < bookingDetails.startDate) {
                setSelectedEndDate(null)
                setBookingDetails({...bookingDetails, endDate: null})
            }

            if(bookingDetails.startDate === null)
            {
                setSelectedEndDate(null);
            }
        }
        
    }, [bookingDetails]);


    // side effects for selected start date and selected end date
    useEffect( () => {

            // const durationText = computeDateBetweenTwoDates(selectedDate, selectedEndDate)s

            if(selectedDate === null){
                setBookingDetails({...bookingDetails, startDate: selectedDate});
                // setBookingDetails({...bookingDetails, endDate: null})
                setSelectedEndDate(null);
            }

            if(selectedEndDate !== null && selectedDate !== null)
            {
                let startOfDate = new Date(selectedDate);
                let endOfDate = new Date(selectedEndDate);

                const { totalDays } = computeDateBetweenTwoDates(startOfDate, endOfDate);

                bookingDetails.totalPrice && setBookingDetails({...bookingDetails, quantity: totalDays, totalPrice: item.price[duration] * totalDays});
                // bookingDetails.totalPrice && setBookingDetails({...bookingDetails, totalPrice: bookingDetails.totalPrice * totalDays});

            }

    }, [selectedDate, selectedEndDate])

    const handleBookNow: FormEventHandler = (e) => {
        post(route('booking.store', {
            item_uuid: item.uuid,
            startDate: bookingDetails.startDate,
            endDate: bookingDetails.endDate,
            startTime: bookingDetails.startTime,
            duration: bookingDetails.duration,
            duration_quantity: 1,
            partial_total: calculatedTotal
        }), {
            preserveScroll: true,
            preserveState: true
        })
    };

//   useEffect( () => {

//     // handle calculation in booking summary

//     if (selectedDate && selectedTimeSlot) {

//       setBookingDetails({...bookingDetails, startDate: new Date(selectedDate),
//         endDate: null, // For simplicity, we're not calculating the end date
//         startTime: selectedTimeSlot.startTime,
//         endTime: selectedTimeSlot.endTime,
//         duration,
//         quantity});

//       // calculate total

//       console.log(bookingDetails)

//         const basePrice = item.price[bookingDetails.duration];

//       let calculate_total: number = Number(basePrice) * bookingDetails.quantity;
//       setCalculatedTotal(formatPrice(String(calculate_total)));
//     }
//   }, [selectedDate, selectedTimeSlot, item])

    

    return (
        <RenterLayout>
            
            <Head title={"Item Detail"} />
            {errors.item_uuid && <p>{errors.item_uuid}</p>}
            {errors.startDate && <p>{errors.startDate}</p>}
            {errors.endDate && <p>{errors.endDate}</p>}
            {errors.startTime && <p>{errors.startTime}</p>}
            {errors.duration && <p>{errors.duration}</p>}
            {errors.partial_total && <p>{errors.partial_total}</p>}
            <p>{session_error_message}</p>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <ImageGallery images={item.src}/>
                    </div>
                    <div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{item.location}</span>
                            <span className="mx-2">•</span>
                            <span>{item.category}</span>
                        </div>
                    
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h1>
                    
                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 text-gray-700">{item.rating}</span>
                            </div>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-gray-600">{item.reviewCount} reviews</span>
                        </div>
                    
                        <p className="text-gray-700 mb-6">{item.description}</p>
                    
                        <PricingOptions
                            prices={item.price} 
                            selectedDuration={duration} 
                            onSelectDuration={handleDurationChange} 
                        />
                    
                        {/* <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3">Duration Period</h3>
                            <div className="flex items-center">
                            <button 
                                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="mx-4 font-medium">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                            >
                                +
                            </button>
                            </div>
                        </div> */}
                    
                        {/* <DatePicker 
                            availabilityData={availabilityData} 
                            selectedDate={selectedDate} 
                            onSelectDate={handleDateSelect} 
                        /> */}

                        <RentalCalendar
                            selectedDate={selectedDate}
                            selectedEndDate={selectedEndDate}
                            onSelectDate={handleDateSelect}
                            setSelectedEndDate={setSelectedDate}
                            unavailableDates={unavailable_dates}
                        />
                        
                        {selectedDate && (
                            <TimeSlots
                                timeSlots={timeSlots} 
                                selectedTimeSlot={selectedTimeSlot} 
                                onSelectTimeSlot={handleTimeSlotSelect} 
                            />
                        )}
                        
                        <BookingSummary
                            bookingDetails={bookingDetails} 
                            itemPrice={item.price}
                            onBookNow={handleBookNow}
                            calculatedTotal={calculatedTotal}
                            processing={processing}
                        />
                    </div>
                </div>

                <ItemSpecification specifications={item.specifications}/>

                <ReviewsSection rating={4.8} reviewCount={255}/>

                <SimilarItems items={similarItems}/>
            </div>
        </RenterLayout>
    );
}
