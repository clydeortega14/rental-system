import { BillingAddress } from ".";


export interface Region {
    id: number;
    code: string;
    name: string;
    region_id: string;
}

export interface Province {
    id: number;
    code: string;
    name: string;
    region_id: string;
    province_id: string;
}

export interface City {
    id: number;
    code: string;
    name: string;
    province_id: string;
    region_id: string;
    city_id: string;
}

export interface Barangay {
    id: number;
    city_id: string;
    code: string;
    name: string;
    province_id: string;
    region_id: string;
}

export type AddressType = {
    id: number;
    name: string;
}

export type IUserPostalAddress = {
    id: number;
    address_type: AddressType;
    region_id: string;
    province_id: string;
    city_id: string;
    barangay_id: string;
    street: string;

}