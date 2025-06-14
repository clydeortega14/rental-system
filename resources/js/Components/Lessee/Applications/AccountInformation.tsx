interface Props {
  data: any;
  updateForm: (fields: Partial<any>) => void;
  onNext: () => void;
}

export default function AccountInformation({ data, updateForm, onNext }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Account Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={data.firstName}
          onChange={(e) => updateForm({ firstName: e.target.value })}
          placeholder="First Name"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={data.middleName}
          onChange={(e) => updateForm({ middleName: e.target.value })}
          placeholder="Middle Name"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={data.lastName}
          onChange={(e) => updateForm({ lastName: e.target.value })}
          placeholder="Last Name"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={data.businessName}
          onChange={(e) => updateForm({ businessName: e.target.value })}
          placeholder="Business Name"
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          value={data.email}
          onChange={(e) => updateForm({ email: e.target.value })}
          placeholder="Email"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={data.phone}
          onChange={(e) => updateForm({ phone: e.target.value })}
          placeholder="Phone Number"
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={onNext}
        className="mt-6 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
      >
        Next
      </button>
    </div>
  );
}
