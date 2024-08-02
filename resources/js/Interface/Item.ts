export type Item = {
    uuid: string,
    name: string;
    description: string;
    price: number;
    src: {
        name: string;
        link: string;
    }[];
};

export interface Iitem {
    item: Item
}