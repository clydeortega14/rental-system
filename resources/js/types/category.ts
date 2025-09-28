export type CustomField = {
  id: number | null;
  label: string;
  type: string;
  options?: string[];
  defaultAnswer?: string | null;
  _delete?: boolean; // 👈 mark optional delete flag
};

export type Category = {
  id: number;
  name: string;
  description?: string;
  service_fee_value?: string | number;
  service_fee_type: string;
  mode_of_payment: string[];
  pricing_duration: string[];
  custom_fields: CustomField[];
  template_category: {
    service_fee: number;
    mode_of_payment: string[];
    pricing_duration: string[];
  } | null;
  image?: File | null;
  image_path?: string | null;
  tags: string[]; // ✅ include this if your backend/index requires it
};
