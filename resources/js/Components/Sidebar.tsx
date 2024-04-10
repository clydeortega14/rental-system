import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { AiOutlineLeftCircle } from "react-icons/ai";
import { AiOutlineBars } from "react-icons/ai";
import { useState } from 'react';
import { AiOutlineDown } from "react-icons/ai";
import NavLink from '@/Components/NavLink';
import { Fragment } from 'react';

function Sidebar() {

	const menu_items = [

		{
			id: 1,
			name: "Dashboard",
			link: route('dashboard'),
			status: route().current('dashboard')

		},
		{
			id: 2,
			name: "Reservation Items",
			link: route('reservations.index'),
			status: route().current('reservations.index')

		},
		{
			id: 3,
			name: "Rental Listings",
			link: '',
			status: ''

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

	const [open, setOpen] = useState(true)
	const [submenuOpen, setSubmenuOpen] = useState(false);

	const menuLists = menu_items.map((menu, index) =>

		<Fragment key={index}>
		
		<li key={index} className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 ${menu.status && "bg-light-white"}`}>
			<span className="text-2xl block float-left"><AiOutlineBars /></span>
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

		// menu.submenu && submenuOpen && open && <ul><li>submenu</li></ul>
	)


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
            	{menuLists}

            	
            </ul>
           
        </div>
		</>

	);

}


export default Sidebar

// <ul className="pt-7">
//             	{menu_items.map((menu, index) => 
//             		<>
// 	            		<li key={menu.id} 
// 	            			className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 ${menu.status && "bg-light-white"}`}
// 	            		>
// 	            			<span className="text-2xl block float-left"><AiOutlineBars /></span>
// 	            			<NavLink href={menu.link} active={menu.status} className={`text-base font-small flex-1 ${!open && "hidden"} ${menu.status && "font-bold text-lg" } hover:text-lg hover:font-bold`}>
// 	            				{menu.name}
// 	            			</NavLink>
	            			
// 	            			{menu.submenu && <AiOutlineDown onClick={() => setSubmenuOpen(!submenuOpen) } className={`${submenuOpen && "rotate-180"} duration-500`} />}
// 	            		</li>

// 	            		{menu.submenu && submenuOpen && open &&
// 	            			<ul key={menu.id}>
// 	            				{menu.submenuItems.map((submenuItem, submenuIndex) => 
// 	            					<li key={submenuItem.id}
// 	            						className={`text-white text-sm flex items-center duration-500 gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 px-5 ${submenuItem.status && "bg-light-white"}`}>
	            						
// 	            						<NavLink className={`${submenuItem.status && "font-bold text-lg"}`}>
// 	            							{submenuItem.name}
// 	            						</NavLink>
// 	            					</li>
// 	            				)}
// 	            			</ul>
// 	            		}
//             		</>
//             	)}
//             </ul>