import { Bars3Icon } from "@heroicons/react/24/outline";
import CategoryItem from "@/Components/LandingPage/Category/CategoryItems";
import { ICategory } from "@/Interface/CategoryInterface";
import Checkbox from "@/Components/Checkbox";
import { useState, Fragment } from "react";

type CarFilter = {
    header: {
        title: string;
    };
    body: {
        name: string;
        price: string;
        sub_title: string;
        is_checked: boolean | false;
    }[];
};

function CategoryComponent({ categories }: ICategory) {
    const [carfilters, setCarfilters] = useState<CarFilter[]>([
        {
            header: {
                title: "Car Type",
            },
            body: [
                {
                    name: "All car types",
                    price: "",
                    sub_title: "",
                    is_checked: true,
                },
                {
                    name: "Mini Car",
                    price: "3, 402.00",
                    sub_title: "Up to 4 people",
                    is_checked: false,
                },
                {
                    name: "Economy",
                    price: "6,010.00",
                    sub_title: "Up to 4 people",
                    is_checked: false,
                },
                {
                    name: "Compact",
                    price: "3,015.00",
                    sub_title: "Up to 4 people",
                    is_checked: false,
                },
            ],
        },
        {
            header: {
                title: "Transmission",
            },
            body: [
                {
                    name: "all transmission",
                    price: "",
                    sub_title: "",
                    is_checked: true,
                },
                {
                    name: "Manual",
                    price: "3, 017.00",
                    sub_title: "",
                    is_checked: false,
                },
                {
                    name: "Automatic",
                    price: "3, 400.00",
                    sub_title: "",
                    is_checked: false,
                },
            ],
        },
    ]);

    const displayCarFilter = carfilters.map((car_filter, index) => (
        <Fragment key={index}>
            <div className="py-7">
                <h1 className="text-base text-xl font-bold border-gray-300 border-b pb-3">
                    {car_filter.header.title}
                </h1>
                <ul className="space-y-2">
                    {car_filter.body.map((filter_body, body_index) => (
                        <li key={body_index} className="flex justify-between">
                            <div className="mt-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={filter_body.is_checked}
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        {filter_body.name}
                                        <div>
                                            <small>
                                                {filter_body.sub_title}
                                            </small>
                                        </div>
                                    </span>
                                </label>
                            </div>
                            <p className="text-sm py-4">{filter_body.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Fragment>
    ));

    return (
        <div className="md:w-1/4 bg-gray-100 gap-x-4 px-12 py-7">
            {displayCarFilter}
        </div>
    );
}

export default CategoryComponent;
