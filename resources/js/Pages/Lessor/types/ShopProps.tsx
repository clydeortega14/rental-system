export interface ShopProps {
  shops?: Shop[];
  flash?: {
    success?: string;
  };
  errors?: Record<string, string>;
  [key: string]: any;
}
export interface Shop {
  id: number;
  name: string;
  description?: string;
  location?: string;
  created_at?: string;
}

export interface FormData {
  name: string;
  description: string;
  location: string;
}