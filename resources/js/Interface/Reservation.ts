export type Reservation = {
    id: number,
    uuid: string,
    category: {
        id: number,
        name: string,
    },
    rental_item: {
        id: number,
        itemName: string,
        price: number,
        images: {
            src: string
        }[]
    },
    booked_by: {
        id: number,
        name: string
    },
    status: {
        id: number,
        name: string,
        className: string,
    },
    completed_at: string,
    pick_up_date: string,
    pick_up_time?: string | null,
    pick_up_location: string,
    drop_off_date: string,
    drop_off_time?: string | null,
    drop_off_location: string,
    is_rescheduled: boolean
}