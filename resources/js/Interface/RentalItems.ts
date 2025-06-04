export type RentalItem = {
    id: number,
    uuid: string,
    description: string | null
    name: string,
    role?: string | null,
    category: string,
    images: string[],
    price: {
        hourly: number;
        daily: number;
        weekly: number
    }
    specifications: {
        [key:string]: string
    }
    rating: number;
    reviewCount: number;
    location: string;
}

export interface IRentalItems {
    items: RentalItem[];
}