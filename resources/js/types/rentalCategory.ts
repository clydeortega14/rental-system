export type Category = {
    category_id?: number;
    label: string;
    name: string
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

export type CategoryCustomField = {
    id: number,
    name: string,
    label: string,
    order: number,
    type: string,
    placeholder: string | null,
    options: string[],
    defaultAnswer: any,
    modelable: any | null,
    is_required: boolean,
}