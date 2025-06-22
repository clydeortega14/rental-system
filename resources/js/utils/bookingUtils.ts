import { CheckCircle } from "lucide-react";

export const getStatusIcon = (status: string) => {
    switch (status) {
        case 'confirmed': return 'h-5 w-5 text-green-600';
        case 'pending': return "h-5 w-5 text-yellow-600";
        case 'canceled': return "h-5 w-5 text-red-600";
        case 'completed': return "h-5 w-5 text-blue-600";
        default: return null;
    }
};