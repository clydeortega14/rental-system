import { RentalDuration } from '@/types/rental';
import { formatPrice } from '@/utils/dateUtils';
import React from 'react'

interface Props {
  prices: number;
}

const PricingOptions = ({
    prices
}: Props) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Select Rental Duration</h3>
      <div className="grid grid-cols-3 gap-3">
        <button className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 border-blue-600 bg-blue-50 text-blue-700`}>
          <div className="font-medium">Daily</div>
          <div className="text-lg font-semibold mt-1">{formatPrice(prices)}</div>
        </button>
      </div>
    </div>
  )
}

export default PricingOptions