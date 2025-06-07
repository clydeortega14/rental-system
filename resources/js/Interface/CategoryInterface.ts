export type Category = {
    label: string;
    category_id: number;
    id: number;
    name: string;
    detail: {
        id: number;
        label: string;
    }
}

export interface ICategory {
    categories: Category[]
}