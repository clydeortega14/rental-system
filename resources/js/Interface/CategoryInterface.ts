export type Category = {
    label: string;
    category_id?: number;
    id: number;
    name: string;
    image_path: string;
    detail?: {
        id: number;
        label: string;
        detailable_id: number;
        active: boolean
    }
    rental_items_count?: number;
}

export interface ICategory {
    categories: Category[]
}