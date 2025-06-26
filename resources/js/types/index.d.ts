export interface User {
    submitForm: any;
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
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
};
export type AdminLayoutProps = {
    children: React.ReactNode;
    activemenu: string;
    activesubmenu: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

