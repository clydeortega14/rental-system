export type RentalItem = {
    id: number,
    name: string,
    role: string,
    category: string,
    image: string
}

export interface IRentalItems {
    items: RentalItem[];
}