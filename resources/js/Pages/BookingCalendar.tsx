import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types";
import { useState } from "react";
import {Link} from "@inertiajs/react";

export default function BookingCalendar({ auth, events }:PageProps)
{
    const [header] = useState({
        left: "prev,next",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridDay"
    })


    const handleEventClick = (e) => {
        console.log(e)
    }
    return (

        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-base text-gray-800 leading-tight">
                    {`Calendar View`}
                </h2>
            }
        >
            <div className="py-12">


                <div className="sm:px-6 lg:px-8 max-w-1xl">

                    <Link
                        href={route('reservations.index')}
                        className="text-gray-500"
                    >
                    
                        List View
                    </Link>

                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                        headerToolbar={header}
                        events={events}
                        eventClick={ (e) => handleEventClick(e)}
                        
                    />
                </div>
            </div>
            

        </AuthenticatedLayout>
        
      )
}