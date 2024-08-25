import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types";
import listPlugin from '@fullcalendar/list';

export default function BookingCalendar({ auth }:PageProps)
{
    return (

        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Booking Calendar
                </h2>
            }
        >
            <div className="py-12">
                <div className="p-2">
                <FullCalendar
                    plugins={[ listPlugin ]}
                    initialView="listWeek"
                    events={[
                        { title: 'Toyota Vios', date: '2024-08-26T21:00' },
                        { title: 'Hyundai', date: '2024-08-27T21:39' },
                        { title: 'Mini Van', date: '2024-08-27T10:00' },
                        { title: 'Toyota Innova', date: '2024-08-27T21:39' },
                        { title: 'Expander', date: '2024-08-28T10:00' },
                        { title: 'Almera', date: '2024-08-28T14:00' },
                        { title: 'Honda Civic', date: '2024-08-29T15:30' }
                    ]}
                />
                </div>
            </div>
            

        </AuthenticatedLayout>
        
      )
}