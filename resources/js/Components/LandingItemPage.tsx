import CategoryComponent from "../Components/LandingPage/Category/Main";
import RentalItemComponent from "../Components/LandingPage/RentalItems/RentalItemComponent";
import { ICategory } from "../Interface/CategoryInterface";
import { RentalItem } from "@/types/rental";


interface LandingItemPageProps {
    categories: ICategory;
    items: RentalItem[]
}

export default function LandingItemPage({
    categories,
    items,
}: LandingItemPageProps) {
    

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar for categories */}
            <CategoryComponent />
            {/* Content section for cards */}
            <RentalItemComponent items={items} />
        </div>
    );
}
