import React from 'react'

interface ItemSpecificationProps {
    specifications: {
        [key:string]:string
    }
}

const ItemSpecification = ({specifications}:ItemSpecificationProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(specifications).map(([key, value]) => (
          <div key={key} className="flex">
            <span className="text-gray-600 font-medium min-w-32">{key}:</span>
            <span className="text-gray-900 ml-2">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemSpecification