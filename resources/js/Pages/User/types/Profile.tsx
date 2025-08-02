export interface User {
    submitForm: any;
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    avatar: string;
    contact: Contact;
    company: Company;
    kyc?: KYC;
    billing_address?: BillingAddress;
    card_detail?: CardDetail;
    created_at: string;
}

export type Company = {
  id: number,
  uuid: string,
  name: string,
  tin: string,
  email: string;
  street: string;
  barangay: string;
  city: string;
  postal_code: string;
}

export type BillingAddress = {
  street: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  country: string;
  postal_code: number;

}

export type CardDetail = {
    card_number: number;
    card_expiry: string;
    cvv: number;
}

export type Contact = {
  id: number;
  mobile: string;
}

export type KYC = {
  full_name: string;
  document_type: string;
  document_number: string;
  selfie_path: string | null;
  document_path: string | null;
  kyc_status: "Pending" | "Approved" | "Rejected" | null;
  kyc_verified: boolean;
}