export type Item = {
    uuid: string,
    name: string;
    description: string;
    price: {
        hourly: string,
        daily: string,
        weekly: string
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