import { Bars3Icon } from "@heroicons/react/24/outline";
import CategoryItem from "@/Components/LandingPage/Category/CategoryItems";
import { ICategory } from "@/Interface/CategoryInterface";

function CategoryComponent({ categories }: ICategory) {
    return (
        <div className="md:w-1/4 bg-gray-100 p-4">
            {" "}
            {/* Sidebar */}
            <div className="flex items-center mb-7">
                <Bars3Icon className="h-6 w-6 mr-2" aria-hidden="true" />
                <h1 className="text-3sm font-extrabold tracking-tight text-slate-900">
                    All Categories
                </h1>
            </div>
            <ul className="space-y-2">
                <li className={`cursor-pointer`}>All</li>

                {categories.map((category) => (
                    <CategoryItem
                        category={category}
                        key={category.category_id}
                    />
                ))}
            </ul>
        </div>
    );
}

export default CategoryComponent;
