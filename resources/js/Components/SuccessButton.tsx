export default function SuccessButton({
    type = "button",
    className = "",
    children,
    disabled,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={`inline-flex items-center px-4 py-2 bg-emerald-500 border border-emerald-100 rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
