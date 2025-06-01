export interface Lessor {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth?: string | null;
  gender?: string | null;
  nationality?: string | null;

  // KYC related fields
  kycStatus: "Pending" | "Verified" | "Rejected" | "Incomplete" | string; 
  fullName?: string | null;
  documentNumber?: string | null;
  kycVerifiedAt?: string | null;

  // Security
  twoFactorEnabled?: boolean;

  // Extended profile fields
  role?: string | null;
  location?: string | null;
  company?: string | null;
  joinedAt?: string | null;
  linkedin?: string | null;
  website?: string | null;
}
