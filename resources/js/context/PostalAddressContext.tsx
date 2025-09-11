import { City } from "@/types/postalAddress";
import { Barangay } from "@/types/postalAddress";
import { Region, Province } from "@/types/postalAddress";
import axios from "axios";
import { createContext, useContext, useState } from "react";

interface IPostalAddress {
    // Regions
    regions: Region[];
    setRegions: (regions: Region[]) => void;
    selectedRegion: string;
    setSelectedRegion: (region:string) => void;
    handleSelectedRegion: (region_id: string) => void;
    getRegions: () => void;

    // Provinces
    provinces: Province[];
    setProvinces: (provinces: Province[]) => void;
    selectedProvince: string;
    setSelectedProvince: (province_id: string) => void;
    handleSelectedProvince: (province_id: string) => void;

    // Cities
    cities: City[];
    setCities: (cities: City[]) => void;
    selectedCity: string;
    setSelectedCity: (city: string) => void;
    handleSelectedCity: (city_id: string) => void;

    // Barangays
    barangays: Barangay[];
    setBarangays: (barangays: Barangay[]) => void;
    selectedBarangay: string;
    setSelectedBarangay: (brgy_id: string) => void;
    handleSelectedBarangay: (barangay_id: string) => void;
}

const PostalAddressContext = createContext<IPostalAddress | undefined>(undefined);

export const PostalAddressProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    
    const [regions, setRegions ] = useState<Region[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<string>('');

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>('');

    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');

    

    const getRegions = async () => {
        const response = await axios.get(`/api/address/regions`);

        let response_data = response.data;

        setRegions(response_data);
    }

    const handleSelectedRegion = async (region_id: string) => {

        const response = await axios.get(`/api/address/provinces/${region_id}`);
        setProvinces(response.data);
        setSelectedRegion(region_id);
    }

    const handleSelectedProvince = async (province_id: string) => {
        const response = await axios.get(`/api/address/cities/${province_id}`);
        setSelectedProvince(province_id)
        setCities(response.data);
    }

    const handleSelectedCity = async (city_id: string) => {
        const response = await axios.get(`/api/address/barangays/${city_id}`);
        setSelectedCity(city_id)
        setBarangays(response.data)
        
    }

    const [barangays, setBarangays] = useState<Barangay[]>([]);
    const [selectedBarangay, setSelectedBarangay] = useState<string>('');
    const handleSelectedBarangay = async (barangay_id: string) => {
        setSelectedBarangay(barangay_id);
    }

    return (

        <PostalAddressContext.Provider
            value={{ 
                regions,
                setRegions,
                selectedRegion,
                setSelectedRegion,
                handleSelectedRegion,
                getRegions,

                provinces,
                setProvinces,
                selectedProvince,
                setSelectedProvince,
                handleSelectedProvince,
                
                cities,
                setCities,
                selectedCity,
                setSelectedCity,
                handleSelectedCity,
                barangays,
                setBarangays,
                selectedBarangay,
                setSelectedBarangay,
                handleSelectedBarangay,
             }}
        >
            {children}
        </PostalAddressContext.Provider>
    )
}

export const usePostalAddress = ():IPostalAddress => {
    const context = useContext(PostalAddressContext);
    if (context === undefined) {
        throw new Error('usePostalAddress must be used within a Postal Address Provider');
    }
    return context;
}