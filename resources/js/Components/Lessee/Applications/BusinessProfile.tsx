interface Props {
  data: any;
  updateForm: (fields: Partial<any>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const businessTypes = [
  "Individual",
  "Company",
  "Agency",
  "Property Manager",
  "Equipment Owner",
];

export default function BusinessProfile({ data, updateForm, onBack, onSubmit }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Business Profile</h2>

      <div className="mb-4">
        <label className="font-medium">Business Type</label>
        <div className="flex flex-wrap gap-3 mt-2">
          {businessTypes.map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.businessType === type}
                onChange={() => updateForm({ businessType: type })}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Business Registration Number"
          value={data.registrationNumber}
          onChange={(e) => updateForm({ registrationNumber: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Business Address"
          value={data.address}
          onChange={(e) => updateForm({ address: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Street"
          value={data.street}
          onChange={(e) => updateForm({ street: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="City"
          value={data.city}
          onChange={(e) => updateForm({ city: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="State/Province"
          value={data.state}
          onChange={(e) => updateForm({ state: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Country"
          value={data.country}
          onChange={(e) => updateForm({ country: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={data.postalCode}
          onChange={(e) => updateForm({ postalCode: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Tax Identification Number (TIN)"
          value={data.tin}
          onChange={(e) => updateForm({ tin: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Preferred Payout Method"
          value={data.payoutMethod}
          onChange={(e) => updateForm({ payoutMethod: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
