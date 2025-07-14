import { Category } from "@/Interface/CategoryInterface";

interface Props {
    category: Category;
}

export default function CategoryItems({ category }: Props) {
    return (
        <>
            <li className={`cursor-pointer }`}>
                {category.label}
            </li>
        </>
    );
}
