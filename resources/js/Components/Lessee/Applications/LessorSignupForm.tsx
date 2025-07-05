import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import AccountInformation from "./AccountInformation";
import BusinessProfile from "./BusinessProfile";


interface User {
  id: number;
  name: string;
  email: string;
  middle_name?: string;
  last_name?: string;
  phone?: string;
}

interface Company {
  business_name?: string;
  registration_number?: string;
  address?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  tin?: string;
  payout_method?: string;
  business_type?: string;
}

export default function LessorSignupForm() {
 const user = usePage<PageProps>().props.auth.user;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Account Information
    firstName: user.user.name || "",
    middleName: user.user.middle_name || "",
    lastName: user.user.last_name || "",
    email: user.user.email || "",
    phone: user.user.phone || "",

    // // Business Profile
    // businessName: company?.business_name || "",
    // businessType: company?.business_type || "",
    // registrationNumber: company?.registration_number || "",
    // address: company?.address || "",
    // street: company?.street || "",
    // city: company?.city || "",
    // state: company?.state || "",
    // country: company?.country || "",
    // postalCode: company?.postal_code || "",
    // tin: company?.tin || "",
    // payoutMethod: company?.payout_method || "",
  });

  const updateForm = (fields: Partial<typeof formData>) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
      {step === 1 && (
        <AccountInformation
          data={formData}
          updateForm={updateForm}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <BusinessProfile
          data={formData}
          updateForm={updateForm}
          onBack={() => setStep(1)}
          onSubmit={() => {
            console.log("Submitting data:", formData);
          }}
        />
      )}
    </div>
  );
}
