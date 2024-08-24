

import CheckOutForm from "@/Components/Forms/CheckOut";
import NavbarHeader from "@/Components/Header";

export default function Checkout({item, rent_detail}){

    return (

        <>
            <div className="bg-gray-100">
                <NavbarHeader />
                
                <div className="py-12">
                    
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                        {/* Rent Item Detail */}
                        <div className="flex p-4 justify-center border-2 border-gray-300 rounded-lg">
                            <div className="w-1/2">
                            <h2>Pick up</h2>
                                <div>
                                    <h3 className="text-base font-semibold text-slate-600">{rent_detail.pick_up_location}</h3>
                                </div>
                                <div>
                                    <p className="text-sm pl-2">{`${rent_detail.pick_up_date}, ${rent_detail.pick_up_time}`}</p>
                                </div>
                            </div>

                            <div className="w-1/2">
                                <h2>Drop off</h2>
                                <div>
                                    <h3 className="text-base font-semibold text-slate-600">{rent_detail.drop_location}</h3>
                                </div>
                                <div>
                                    <p className="text-sm pl-2">{`${rent_detail.drop_off_date}, ${rent_detail.drop_off_time}`}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="w-2/3 mr-2">
                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                    <div className="flex">
                                        <div className="w-1/3">
                                            <img src={rent_detail.rent_item.image} className="object-cover" />
                                        </div>
                                        <div className="w-2/3">
                                            <h3 className="text-2xl font-bold">{rent_detail.rent_item.itemName}</h3>
                                            <p className="text-sm">{rent_detail.rent_item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3">
                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                    <h2 className="font-bold text-xl">Price breakdown</h2>
                                    <div className="flex justify-between mt-4 border-b">
                                        <div className="w-2/3">
                                            <p className="text-sm">Price for ({rent_detail.duration}) day/s </p>
                                        </div>

                                        <div className="w-1/3">
                                            <p className="text-sm float-end">{rent_detail.partial_total}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-4 border-b">
                                        <div className="w-2/3">
                                            <p className="text-sm">Service fee</p>
                                        </div>

                                        <div className="w-1/3">
                                            <p className="text-sm float-end">{rent_detail.service_fee}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-4 border-b">
                                        <div className="w-2/3">
                                            <p className="text-sm">Total Cost</p>
                                        </div>

                                        <div className="w-1/3">
                                            <p className="text-sm float-end">{rent_detail.total_cost}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CheckOutForm />
                    </div>
                </div>

                
            </div>
        </>
        
    )
}