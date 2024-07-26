export type Item = {
    name: string;
    description: string;
    src: {
        name: string;
        link: string;
    }[];
};

export interface Iitem {
    item: Item
}