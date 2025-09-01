import React from 'react'

interface AddressProps {
    title: string;
    value: string;
    label: string;
    type?: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    idFor: string;
    name: string;

}

const Address = ({title, value, label, type = 'text', handleInputChange, idFor, name}:AddressProps) => {
  return (
    <>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 py-4 px-2">{title}</h2>
        <div className="grid grid-cols-1 gap-4 my-7">
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
                <input
                    type={type}
                    id="address"
                    name="address"
                    value={value}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor={idFor} className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                    <input
                        type={type}
                        id={idFor}
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                
                <div>
                <label htmlFor={idFor} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
                <input
                    type={type}
                    id={idFor}
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                </div>
            </div>
            </div>
            <hr />
    </>
  )
}

export default Address