import { TextareaHTMLAttributes } from "react";

export default function TextArea({
    type = "text",
    className = "",
    rows = "5",
    cols = "5",
    children,
    ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            type={type}
            className={
                `border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm` +
                className
            }
            rows={rows}
            cols={cols}
        >
            {children}
        </textarea>
    );
}
