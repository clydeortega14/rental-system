export type KycModalProps = {
  user_id: number;
  userKyc: {
    full_name: string;
    document_type: string;
    document_number: string;
    selfie_path: string | null;
    document_path: string | null;
    kyc_status: "Pending" | "Approved" | "Rejected" | null;
  } | null;
  isReadOnly: boolean;
  onClose: () => void;
  onUpdate?: () => void;
};
