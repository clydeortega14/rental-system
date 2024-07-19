import { Category } from "@/Interface/CategoryInterface";

export default function CategoryItems({ category }: Category) {
    return (
        <>
            <li key={category} className={`cursor-pointer }`}>
                {category.label}
            </li>
        </>
    );
}
