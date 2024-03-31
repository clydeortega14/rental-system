import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { AiOutlineLeftCircle } from "react-icons/ai";
import { AiOutlineBars } from "react-icons/ai";
import { useState } from 'react';
import { AiOutlineDown } from "react-icons/ai";

function Sidebar() {

	const menu_items = [

		{
			name: "Dashboard",

		},
		{
			name: "Rental Listings",

		},
		{
			name: "item reservation",
			submenu: true,
			submenuItems: [
				{
					name: "submenuone",
				},
				{
					name: "submenutwo"
				},
				{
					name: "submenuthree"
				}
			]

		}
	]

	const [open, setOpen] = useState(true)
	const [submenuOpen, setSubmenuOpen] = useState(false);

	return (
		<>
		
		<div className={`p-5 pt-8 bg-light-green h-100 relative  ${open ? 'w-72' : 'w-20'} duration-300`}>

			<AiOutlineLeftCircle 
				className={`bg-white text-light-green text-3xl rounded-full absolute -right-3 top-12 cursor-point ${ !open && "rotate-180"}`} 
				onClick={() => setOpen(!open)}
				/>

			 
            <div className="flex items-center">
                <Link href="/" className="inline-flex item-center">
                    <ApplicationLogo className={`block h-9 fill-current text-white rounded cursor-pointer mr-2 duration-500 ${open && "rotate-[360deg]"}`}/>
                    <h1 className={`text-white origin-left duration-300 font-medium text-2xl ${!open && "scale-0"}`}>RentMe</h1>
                </Link>
            </div>

            <ul className="pt-7">
            	{menu_items.map((menu, index) => 
            		<>
	            		<li key={index} 
	            			className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"
	            		>
	            			<span className="text-2xl block float-left"><AiOutlineBars /></span>
	            			<span className={`text-base font-small flext-1 ${!open && "hidden"}`}>{menu.name}</span>
	            			{menu.submenu && <AiOutlineDown onClick={() => setSubmenuOpen(!submenuOpen) } className={`${submenuOpen && "rotate-180"} duration-500`} />}
	            		</li>

	            		{menu.submenu && submenuOpen && open &&
	            			<ul>
	            				{menu.submenuItems.map((submenuItem, index) => 
	            					<li 
	            						className="text-white text-sm flex items-center duration-500 gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 px-5">
	            						{submenuItem.name}
	            					</li>
	            				)}
	            			</ul>
	            		}
            		</>
            	)}
            </ul>
           
        </div>
		</>

	);

}


export default Sidebar