import { RentalItem } from "./rental";

export type TCartItem = {
    startDate: string;
    endDate: string;
    item: RentalItem
    quantity: number;
}