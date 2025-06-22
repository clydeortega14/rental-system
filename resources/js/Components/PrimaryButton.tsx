import { ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex justify-center items-center px-4 py-2 bg-orange-500 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-orange-600 focus:bg-orange-700 active:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled ? "opacity-25 cursor-not-allowed" : ""
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
