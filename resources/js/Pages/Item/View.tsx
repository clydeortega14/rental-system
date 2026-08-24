import { FormEventHandler, useEffect, useState } from "react";
import { PageProps } from "@/types";
import { Item } from "@/Interface/Item";
import RenterLayout from "@/Layouts/RenterLayout";
import ImageGallery from "../../Components/Renter/ImageGallery";
import { MapPin, Star } from 'lucide-react';
import PricingOptions from "../../Components/Renter/PricingOptions";
import { BookingDetails, RentalDuration, TimeSlot } from "@/types/rental";
import { availabilityData } from "@/data/mockData";
import TimeSlots from "../../Components/Renter/TimeSlots";
import BookingSummary from "../../Components/Renter/BookingSummary";
import ItemSpecification from "../../Components/Renter/ItemSpecification";
import ReviewsSection from "./ReviewsSection";
import SimilarItems from "./SimilarItems";
import { similarItems } from "@/data/similarItems";
import { Head, useForm, usePage } from "@inertiajs/react";
import { computeDateBetweenTwoDates, formatPrice } from "@/utils/dateUtils";
import RentalCalendar from "../../Components/Renter/RentalCalendar";
import { startOfToday } from "date-fns";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { formatTo24Hour, timeInUTCFormat } from "@/utils/timeUtils";



interface IUnavailableDates {
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
    unavailable_dates: {
        [date: string]: boolean
    };
}>) {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [duration, setDuration] = useState<RentalDuration>(item.default_duration);
    const [quantity, setQuantity] = useState(1);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    const [pickUpTime, setPickUpTime] = useState<string>(formatTo24Hour(new Date()));
    const [returnTime, setReturnTime] = useState<string>(formatTo24Hour(new Date()));

    const [hasOverlap, setHasOverlap] = useState<boolean>(false);

    const session_error_message = usePage<PageProps>().props.flash.error_message;
    const [calculatedTotal, setCalculatedTotal] = useState<number>(item.price[item.default_duration]);
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
        startDate: null,
        endDate: null,
        startTime: formatTo24Hour(new Date()),
        endTime: formatTo24Hour(new Date()),
        returnTime: null,
        duration: 0,
        quantity: 1,
        status: 'pending',
        totalPrice: item.price[item.default_duration],
        rentalItem: {
            name: item.name,
            description: item.description,
            price: {
                hourly: 0,
                daily: item.price['daily'],
                weekly: 0
            },
            category: {
                label: item.category.label,
                id: 0,
                name: '',
                image_path: ''
            },
            rating: 4.7,
            reviewCount: 255,
            location: ''
        }
    });

    const { data, setData, post, errors, processing } = useForm({});

    const selectedDateData = availabilityData.find(d => d.date === selectedDate);
    const timeSlots = selectedDateData?.timeSlots || [];

    // const handleDurationChange = (newDuration: RentalDuration) => {

    //     setBookingDetails({ ...bookingDetails, duration: newDuration });
    //     setDuration(newDuration);
    // };

    const handleDateSelect = (date: string) => {

        // let formatDate = new Date(date);

        if (bookingDetails.startDate === null) {
            setBookingDetails({ ...bookingDetails, startDate: date })
            setSelectedDate(date);
            setSelectedTimeSlot(null); // Reset time slot when date changes
            setSelectedEndDate(null)
        } else {
            setBookingDetails({ ...bookingDetails, endDate: date });
            setSelectedEndDate(date);
        }

    };

    const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
        setBookingDetails({ ...bookingDetails, startTime: timeSlot.startTime, endTime: timeSlot.endTime });
        setSelectedTimeSlot(timeSlot);
    };

    useEffect(() => {

        // calculate total
        const basePrice = item.price[item.default_duration];

        let calculate_total: number = Number(basePrice) * quantity;
        setCalculatedTotal(calculate_total);

    }, [duration, quantity]);


    // side effects on booking details
    useEffect(() => {

        if (bookingDetails.endDate && bookingDetails.startDate) {
            if (bookingDetails.endDate < bookingDetails.startDate) {
                setSelectedEndDate(null)
                setBookingDetails({ ...bookingDetails, endDate: null })
            }

            if (bookingDetails.startDate === null) {
                setSelectedEndDate(null);
            }
        }

    }, [bookingDetails]);


    // Booking Summary State
    const [showBookingSummaryComponent, setShowBookingSummaryComponent] = useState<boolean>(false);


    // side effects for selected start date and selected end date
    useEffect(() => {

        // const durationText = computeDateBetweenTwoDates(selectedDate, selectedEndDate)s

        if (selectedDate === null) {
            setBookingDetails({ ...bookingDetails, startDate: selectedDate });
            // setBookingDetails({...bookingDetails, endDate: null})
            setSelectedEndDate(null);
        }

        if (selectedEndDate !== null && selectedDate !== null) {
            let startOfDate = new Date(selectedDate);
            let endOfDate = new Date(selectedEndDate);

            // handle the formatting of unavailble dates
            const formattedUnavailableDates = Object.keys(unavailable_dates).map(date => new Date(date).getDate());

            // prevent overlapping
            const checkOverlap = formattedUnavailableDates.some(day => day >= startOfDate.getDate() && day <= endOfDate.getDate());

            setHasOverlap(checkOverlap ? true : false);
            
            setPickUpTime(formatTo24Hour(new Date()));
            setReturnTime(formatTo24Hour(new Date()));

            const { totalDays } = computeDateBetweenTwoDates(startOfDate, endOfDate);

            console.log(totalDays)

            setQuantity(totalDays);

            bookingDetails.totalPrice && setBookingDetails({ ...bookingDetails, quantity: totalDays, totalPrice: item.price[item.default_duration] * totalDays });
            // bookingDetails.totalPrice && setBookingDetails({...bookingDetails, totalPrice: bookingDetails.totalPrice * totalDays});

            // show or hide booking summary content
            // when the selectedDate and SelectedEndDate is null or empty, then hide the booking summary component
            setShowBookingSummaryComponent(true);
                

        } else {
            setShowBookingSummaryComponent(false);
        }

    }, [selectedDate, selectedEndDate]);

    const handleBookNow = () => {

        post(route('booking.store', {

            item_uuid: item.uuid,
            startDate: selectedDate,
            endDate: selectedEndDate,
            startTime: pickUpTime,
            returnTime: returnTime,
            pickUpTime: pickUpTime,
            duration: duration,
            duration_quantity: bookingDetails.quantity,
            partial_total: item.price[item.default_duration] * quantity,

        }), {
            preserveScroll: true,
            preserveState: true
        });
    };

    return (
        <RenterLayout>

            <Head title={"Item Detail"} />

            <p>{session_error_message}</p>
            

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <ImageGallery images={item.src} />
                    </div>
                    <div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{item.location}</span>
                            <span className="mx-2">•</span>
                            <span>{item.category.label}</span>
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
                        />

                        { hasOverlap && (
                            <p className="text-rose-500 text-lg">Booking has overlap, Please select another date</p>
                        )}

                        <RentalCalendar
                            selectedDate={selectedDate}
                            selectedEndDate={selectedEndDate}
                            onSelectDate={handleDateSelect}
                            setSelectedEndDate={setSelectedDate}
                            unavailableDates={unavailable_dates}
                            onClickReset={() => {
                                setSelectedDate(null);
                                setSelectedEndDate(null);
                                setPickUpTime('');
                                setReturnTime('');
                            }}
                        />



                        {selectedDate && selectedEndDate && !hasOverlap && (
                            <>
                                <TimeSlots
                                    pickUpTime={pickUpTime}
                                    setPickUpTime={setPickUpTime}
                                    returnTime={returnTime}
                                    setReturnTime={setReturnTime}
                                />

                                <BookingSummary
                                    bookingDetails={bookingDetails}
                                    itemPrice={item.price}
                                    onBookNow={handleBookNow}
                                    calculatedTotal={calculatedTotal}
                                    processing={processing}
                                    pickUpTime={pickUpTime}
                                    returnTime={returnTime}
                                />
                            </>
                        )}
                       



                    </div>
                </div>

                <ItemSpecification specifications={item.specifications} />

                <ReviewsSection rating={4.8} reviewCount={255} />

                <SimilarItems items={similarItems} />
            </div>
        </RenterLayout>
    );
}
