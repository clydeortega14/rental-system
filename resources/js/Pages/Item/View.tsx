import { useState } from "react";
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

const navigation = {
    categories: [],
};

export default function View({
    item,
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ 
    laravelVersion: string; 
    phpVersion: string; 
    item: Item,
    
}>) {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [duration, setDuration] = useState<RentalDuration>('daily');
    const [quantity, setQuantity] = useState(1);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        duration: 'daily',
        quantity: 1
    })

    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11),
    });

    const selectedDateData = availabilityData.find(d => d.date === selectedDate);
    const timeSlots = selectedDateData?.timeSlots || [];

    const handleDurationChange = (newDuration: RentalDuration) => {
        setDuration(newDuration);
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setSelectedTimeSlot(null); // Reset time slot when date changes
    };

    const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };

    const handleBookingConfirm = (details: BookingDetails) => {
        
    setBookingDetails(details);
  };

    const handleBookNow = () => {
    if (selectedDate && selectedTimeSlot) {
      const bookingDetails: BookingDetails = {
        startDate: new Date(selectedDate),
        endDate: null, // For simplicity, we're not calculating the end date
        startTime: selectedTimeSlot.startTime,
        endTime: selectedTimeSlot.endTime,
        duration,
        quantity
      };
      handleBookingConfirm(bookingDetails)
    }
  };

    return (
        <RenterLayout>
            
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
                    
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
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
                        </div>
                    
                        <DatePicker 
                            availabilityData={availabilityData} 
                            selectedDate={selectedDate} 
                            onSelectDate={handleDateSelect} 
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
                        />
                    </div>
                </div>

                <ItemSpecification specifications={item.specifications}/>
            </div>
        </RenterLayout>
    );
}
