import { ReactNode } from "react";
import { IUserPostalAddress } from "../types/postalAddress";

export interface User {
    submitForm: any;
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    avatar: string;
    contact: Contact;
    company: {
        id: number,
        uuid: string,
        name: string,
        tin: string,
        email: string;
        street: string;
        barangay: string;
        city: string;
        postal_code: string;
        
    };
    kyc?: {
      full_name: string;
      document_type: string;
      document_number: string;
      selfie_path: string | null;
      document_path: string | null;
      kyc_status: "Pending" | "Approved" | "Rejected" | null;
      kyc_verified: boolean;
      created_at: string; 
    }
    postal_addresses?: IUserPostalAddress[];
    billing_address?: BillingAddress;
    delivery_address?: BillingAddress;
    card_detail?: CardDetail;
    created_at: string;
}

export type BillingAddress = {
  street: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  country?: string;
  zipcode?: string;
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

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User
    };
    flash: {
        error_message: string
    }
};

export type PageWithAdminLayout<P = {}> = React.FC<P> & {
    layout?: (page: ReactNode) => ReactNode;
};


export type IconProps = {
  className?: string;
};

export type NavItem = {
  icon: React.ReactNode;
  text: string;
  path?: string;
  active?: boolean;
  subItems?: NavItem[];
  
};

export type NavItemProps = {
  item: NavItem;
  sidebarOpen: boolean;
  level?: number;
  onClick?: () => void;
};
export type AdminLayoutProps = {
    children: React.ReactNode;
    active_keys?: string[];
    active_selected_keys?: string[];
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

