import { DateAvailability } from '@/types/rental';
import { formatDateDisplay, getDayName, isToday } from '@/utils/dateUtils';
import React from 'react'


interface DatePickerProps {
  availabilityData: DateAvailability[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}
const DatePicker: React.FC<DatePickerProps> = ({
    availabilityData,selectedDate,onSelectDate
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Select Date</h3>
      <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
        {availabilityData.map((dateInfo) => (
          <button
            key={dateInfo.date}
            onClick={() => dateInfo.available && onSelectDate(dateInfo.date)}
            disabled={!dateInfo.available}
            className={`
              flex flex-col items-center min-w-[70px] p-3 rounded-lg border-2 transition-all duration-300
              ${
                selectedDate === dateInfo.date
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : dateInfo.available
                  ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <span className="text-xs font-medium">
              {getDayName(dateInfo.date)}
            </span>
            <span className={`text-sm mt-1 font-semibold ${isToday(dateInfo.date) ? 'text-blue-600' : ''}`}>
              {formatDateDisplay(dateInfo.date)}
            </span>
            {isToday(dateInfo.date) && (
              <span className="text-[10px] mt-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                Today
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DatePicker