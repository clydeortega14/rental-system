import { TimeSlot } from '@/types/rental';
import { formatTimeLocale } from '@/utils/dateUtils';
import React from 'react'


interface TimeSlotsProps {
  timeSlots: TimeSlot[];
  selectedTimeSlot: TimeSlot | null;
  onSelectTimeSlot: (timeSlot: TimeSlot) => void;
}

const TimeSlots = ({
    timeSlots,
    selectedTimeSlot,
    onSelectTimeSlot
}:TimeSlotsProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Select Time</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            onClick={() => slot.available && onSelectTimeSlot(slot)}
            disabled={!slot.available}
            className={`
              px-3 py-2 rounded-lg border-2 transition-all duration-300 text-center
              ${
                selectedTimeSlot === slot
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : slot.available
                  ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <span className="text-sm">
              {slot.startTime} - {slot.endTime}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TimeSlots