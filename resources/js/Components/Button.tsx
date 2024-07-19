import { ButtonHTMLAttributes } from "react";

export default function Button({
    className = "",
    color = "green",
    disabled,
    children,
    props,
}: ButtonHTMLAttributes) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-${color}-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-${color}-500 active:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
        >
            {children}
        </button>
    );
}
