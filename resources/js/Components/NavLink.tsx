import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                '' +
                (active
                    ? ''
                    : 'text-white hover:bg-light rounded focus:text-white  ') +
                className
            }
        >
            {children}
        </Link>
    );
}
