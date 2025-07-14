import { RentalDuration } from '@/types/rental';
import { formatPrice } from '@/utils/dateUtils';
import React from 'react'

interface Props {
  prices: {
    daily: number;
  };
  selectedDuration?: string;
}

const PricingOptions = ({
    prices,
    selectedDuration
}: Props) => {

    const options: { value: RentalDuration; label: string; price: number }[] = [
        // { value: 'hourly', label: 'Hour', price: prices.hourly },
        { value: 'daily', label: 'Day', price: prices.daily },
        // { value: 'weekly', label: 'Week', price: prices.weekly }
    ];
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Select Rental Duration</h3>
      <div className="grid grid-cols-3 gap-3">
        {options.map(option => (
          <button
            key={option.value}
            className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
              selectedDuration === option.value
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="font-medium">{option.label}</div>
            <div className="text-lg font-semibold mt-1">{formatPrice(option.price)}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PricingOptions