export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;

  // Contact Info
  contact?: {
    mobile?: string;
    telephone?: string;
  };

  // Company Info
  company?: {
    name?: string;
  };

  // Billing Address
  billingAddress?: {
    street?: string;
    postal_code?: string;
    region?: string;
    province?: string;
    city?: string;
    barangay?: string;
    country?: string;
  };

  // Security
  twoFactorEnabled?: boolean;

  // KYC Verification Info
  kyc?: {
    kyc_verified?: boolean;
    kyc_status?: "Pending" | "Verified" | "Rejected" | "Incomplete" | string;
    kyc_verified_at?: string | null;
    full_name?: string | null;
    document_number?: string | null;
    document_type?: string | null;
    document_path?: string | null;
    selfie_path?: string | null;
  }
  
}