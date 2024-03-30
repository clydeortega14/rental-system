import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { AiOutlineLeftCircle } from "react-icons/ai";
import { useState } from 'react';

function Sidebar() {

	const [open, setOpen] = useState(true)

	return (
		<>
		<div className={`p-5 pt-8 bg-light-green h-100 relative  ${open ? 'w-72' : 'w-20'} duration-300`}>
			<AiOutlineLeftCircle 
				className={`bg-white text-light-green text-3xl rounded-full absolute -right-3 top-12 cursor-point ${ !open && "rotate-180"}`} 
				onClick={() => setOpen(!open)}
				/>
            <div className="shrink-0 flex items-center">
                <Link href="/" className="inline-flex item-center">
                    <ApplicationLogo className={`block h-9 fill-current text-white rounded cursor-pointer mr-2 duration-500 ${open && "rotate-[360deg]"}`}/>
                    <h1 className={`text-white origin-left duration-300 font-medium text-2xl ${!open && "scale-0"}`}>RentMe</h1>
                </Link>
            </div>
        </div>
		</>

	);

}


export default Sidebar