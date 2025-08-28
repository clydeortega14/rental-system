// resources/js/types/chat.ts

export interface Attachment {
    id: number;
    attachable_id: number;
    attachable_type: string;
    filename: string;
    display_name: string;
    path: string;
    type: string;
}

export interface Message {
    id: number;
    sender_id: number;
    sender_role: "lessee" | "lessor";
    message: string;
    is_read: number;
    created_at: string;
    type: "text" | "image" | "pdf";
    attachments?: Attachment[];
    sending?: boolean;
    delivered?: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Conversation {
    id: number;
    uuid: string;
    shop: string;
    shopLocation: string;
    shopId: number;
    lessor_id: number;
    lessee?: User;
    last_message_at: string;
    latest_message: string | null;
    latest_sender?: string | null;
    messages: Message[];
    is_owned_by_user: boolean;
}

export interface TempMessage extends Message {
    sending?: boolean; // tracks loading
    delivered?: boolean; // tracks if saved
}

// props for inquiries page
import { BookingDetails } from "@/types/rental"; // adjust path if needed
export interface LessorInquiriesProps {
    conversations?: Conversation[];
    currentUserId?: number;
    currentUserName?: string;
    bookings: BookingDetails[];

}
