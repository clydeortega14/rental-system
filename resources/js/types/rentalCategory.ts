export type Category = {
    category_id: number;
    label: string;
}

export interface ICategory {
    categories: Category[];
    category_filters: CategoryFilterType[]
}

export type CategoryFilterType = {
    id: number,
    name: string,
    choices: ChoiceType[]
}

export type ChoiceType = {
    id: number;
    filter_id: number;
    name: string;
}