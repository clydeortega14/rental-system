export type Item = {
    uuid: string,
    name: string;
    description: string;
    price: {
        hourly: number,
        daily: number,
        weekly: number
    };
    specifications: {
        Brand: string;
        Model: string;
        Sensor: string;
        Resolution: string
    };
    category: string;
    rating: number;
    reviewCount: number;
    location: string;
    src: {
        name: string;
        link: string;
    }[];
};

export interface Iitem {
    item: Item
}