export interface KycModalProps {
  user_id: number | string;
  userKyc?: {
    full_name: string;
    document_type: string;
    document_number: string;
    selfie_path: string | null;
    document_path: string | null;
    kyc_status: "Pending" | "Approved" | "Rejected" | null;
    kyc_verified: boolean;
    created_at: string | Date;
  } | null;
  isReadOnly?: boolean;
  onClose: () => void;
}