import React, {useEffect, useState} from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import PrimaryButton from '../PrimaryButton';

interface Availability {
  [date: string]: boolean; // true means available, false means unavailable
  
}

interface RentalCalendarProps {
    onSelectDate: (date: string) => void;
    selectedDate: string;
    selectedEndDate: string;
    setSelectedEndDate: (d: string | null) => void;
    unavailableDates: string[];
}
const RentalCalendar = ({onSelectDate, selectedDate, selectedEndDate, setSelectedEndDate, unavailableDates}: RentalCalendarProps) => {
  
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [availability, setAvailability] = useState<Availability>({
        // Example unavailable dates
        "2025-06-20": false,
        "2025-06-22": false,
        "2025-06-25": false,
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
        {
          days.map((day: Date, index) => {
            let new_formated_date: string = format(day, "yyyy-MM-dd");
            
            if(dateHasPass(new_formated_date)){
              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-lg p-2 text-sm hover:cursor-not-allowed bg-gray-100 text-slate-700 opacity-25",
                  )}
                >
                  {format(day, "d")}
                </div>
              );
            }else if(!isAvailable(day))
            {
              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-lg p-2 text-sm bg-red-100 text-red-700 hover:cursor-not-allowed opacity-50",
                  )}
              >
                {format(day, "d")}
                
              </div>
              )
            }

            return (
              <div
                onClick={ () => {
                  onSelectDate(format(day, "yyyy-MM-dd"))
                }}
                key={index}
                className={cn(
                  "rounded-lg p-2 text-sm hover:cursor-pointer hover:border hover:border-green-200 bg-green-100 text-green-700",
                  selectedDate === new_formated_date ? "bg-white border border-green-700 text-xl font-bold" : "",
                  selectedEndDate === new_formated_date ? 'bg-white text-blue-700 border border-blue-700 text-xl font-bold': ""
                )}
              >
                {format(day, "d")}
              </div>
            )
          })
        }
      </div>
      <div className="py-4">
        <PrimaryButton onClick={ () => {
          setSelectedEndDate(null)
        }}>
          Reset
        </PrimaryButton>
      </div>
    </div>
  )
}

export default RentalCalendar