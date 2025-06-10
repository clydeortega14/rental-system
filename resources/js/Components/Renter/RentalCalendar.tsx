import React, {useState} from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

interface Availability {
  [date: string]: boolean; // true means available, false means unavailable
  
}

interface RentalCalendarProps {
    onSelectDate: (date: string) => void;
    selectedDate: string;
}
const RentalCalendar = ({onSelectDate, selectedDate}: RentalCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [availability, setAvailability] = useState<Availability>({
        // Example unavailable dates
        "2025-06-10": false,
        "2025-06-12": false,
        "2025-06-15": false,
    });

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const handlePrevMonth = () => {
        const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        setCurrentMonth(prev);
    };

    const handleNextMonth = () => {
        const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
        setCurrentMonth(next);
    };

    const isAvailable = (date: Date) => {
        const key = format(date, "yyyy-MM-dd");
        return availability[key] !== false;
    };

    const dateHasPass = (date: string) => {
      let current_date = format(new Date, "yyyy-MM-dd");
      if(current_date >=  date){
        return true;
      }

      return false;
    }


  return (
    <div className="mx-auto p-4">
        <h3 className="text-lg font-semibold mb-3">Select Rental Date</h3>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-blue-500">Prev</button>
        <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={handleNextMonth} className="text-blue-500">Next</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((day: Date) => (
          <div
            onClick={ () => {
              onSelectDate(format(day, "yyyy-MM-dd"))
            }}
            key={day.toString()}
            className={cn(
              "rounded-lg p-2 text-sm hover:cursor-pointer hover:border hover:border-green-500",
              isAvailable(day) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700 hover:cursor-not-allowed",
              dateHasPass(format(day, "yyyy-MM-dd")) ? 'opacity-25 hover:cursor-not-allowed' : ''
            )}
          >
            {format(day, "d")}
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default RentalCalendar