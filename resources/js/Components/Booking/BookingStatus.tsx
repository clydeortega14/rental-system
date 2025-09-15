
import { BookingDetails } from "@/types/rental";
import { getStatusColor } from "@/utils/statusHelper";
import { AlertCircle, CalendarClock, CheckCircle, Undo2Icon, X } from "lucide-react";

interface Props {
    booking: BookingDetails
}

export default function BookingStatus({ booking }: Props) {

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed': return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'reserved': return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'pending': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
            case 'cancelled': return <X className="h-5 w-5 text-red-600" />;
            case 'completed': return <CheckCircle className="h-5 w-5 text-blue-600" />;
            case 'returning': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
            case 'returned': return <Undo2Icon className="h-5 w-5 text-neutral-600" />;
            case 'in use': return <CalendarClock className="h-5 w-5 text-teal-600" />;
            default: return null;
        }
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
            {getStatusIcon(booking.status)}
            <span className="ml-1 capitalize">{booking.status}</span>
        </span>
    );
}
