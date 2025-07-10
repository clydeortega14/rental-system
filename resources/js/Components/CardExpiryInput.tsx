import React, { useState } from 'react'

interface Props {
    name: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}
const CardExpiryInput = ({name, onChange, value}:Props) => {
    const [expiry, setExpiry] = useState<string>('');
  const [error, setError] = useState<string>('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let value = e.target.value;

//     // Auto-format to MM/YY
//     if (/^\d{2}$/.test(value)) {
//       value += '/';
//     }
//     setExpiry(value);
//   };

  const validateExpiry = () => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const match = expiry.match(regex);
    if (!match) {
      setError('Invalid format. Use MM/YY.');
      return false;
    }

    const [_, monthStr, yearStr] = match;
    const month = parseInt(monthStr, 10);
    const year = parseInt(`20${yearStr}`, 10);

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      setError('Card is expired.');
      return false;
    }

    setError('');
    return true;
  };

  return (
    <>
      <label className="block mb-1 font-medium text-sm text-gray-700">
        Card Expiry (MM/YY)
      </label>
      <input
        type="text"
        name={name}
        maxLength={5}
        value={value}
        onChange={onChange}
        onBlur={validateExpiry}
        placeholder="MM/YY"
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </>
  )
}

export default CardExpiryInput