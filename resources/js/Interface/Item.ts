import { Category } from "./CategoryInterface";

export type Item = {
    uuid: string,
    name: string;
    description: string;
    default_duration: 'weekly' | 'daily' | 'hourly';
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
    category: Category;
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