import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { AiOutlineLeftCircle } from "react-icons/ai";
import { AiOutlineBars } from "react-icons/ai";
import { AiOutlineUser,AiOutlineOrderedList   } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { useState } from 'react';
import { AiOutlineDown } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import NavLink from '@/Components/NavLink';
import initialLogo from '@/../../resources/img/initialLogo.png';
import { Fragment } from 'react';

interface SidebarProps {
	open: boolean
}

function Sidebar({open} : SidebarProps) {

	const menu_items = [

		{
			id: 1,
			name: "Dashboard",
			link: route('dashboard'),
			status: route().current('dashboard'),
			icon: <MdDashboard />

		},
		{
			id: 2,
			name: "Reservation Items",
			link: route('reservations.index'),
			status: route().current('reservations.index'),
			icon: <MdEventNote />

		},
		{
			id: 3,
			name: "Rental Listings",
			link: "/rentalListing",
			icon: <GiNotebook />

		},
		// {
		// 	id: 4,
		// 	name: "item reservation",
		// 	link: '',
		// 	status: '',
		// 	submenu: true,
		// 	submenuItems: [
		// 		{
		// 			id: 31,
		// 			name: "submenuone",
		// 			link: '',
		// 			status: ''
		// 		},
		// 		{
		// 			id: 32,
		// 			name: "submenutwo",
		// 			link: '',
		// 			status: ''
		// 		},
		// 		{
		// 			id: 33,
		// 			name: "submenuthree",
		// 			link: '',
		// 			status: ''
		// 		}
		// 	]

		// }
	]
	const [submenuOpen, setSubmenuOpen] = useState(false);

	const menuLists = menu_items.map((menu, index) =>

		<Fragment key={index}>
		
		<li key={index} className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 ${menu.status && "bg-light-white"}`}>
			<span className="text-2xl block float-left">{menu.icon}</span>
			<NavLink href={menu.link} active={menu.status} className={`text-sm font-small flex-1 ${!open && "hidden"} ${menu.status && "font-bold text-lg" } hover:text-base hover:font-bold`}>
         		{menu.name}
			</NavLink>

			{menu.submenu && <AiOutlineDown onClick={() => setSubmenuOpen(!submenuOpen) } className={`${submenuOpen && "rotate-180"} duration-500`} />}
		</li>

		{menu.submenu && submenuOpen && open &&
			<ul key={menu.id}>
				{menu.submenuItems.map((submenuItem, submenuIndex) => 
					<li key={submenuIndex}
						className={`text-white text-sm flex items-center duration-500 gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 px-5 ${submenuItem.status && "bg-light-white"}`}>
						
						<NavLink className={`${submenuItem.status && "font-bold text-lg"}`}>
							{submenuItem.name}
						</NavLink>
					</li>
				)}
			</ul>
		}

		</Fragment>
	)


	return (
		<>
		
		
		<div className={`py-0 px-2 bg-light-green h-100 relative  ${open ? 'w-72' : 'w-20'} duration-300`}>

			
			 
            <div className="flex items-center">
                
					
                    {/* <h1 className={`text-white origin-left duration-300 font-medium text-2xl ${!open && "scale-0"}`}>RentMe</h1> */}
            </div>

            <ul className="pt-7">{menuLists}</ul>
           
        </div>
		</>

	);

}


export default Sidebar