import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function CheckOut() {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, post, processing, errors } = useForm({
        booked_by: user.id,
    });

    const checkOutNow = (e) => {
        e.preventDefault();

        post(route("checkout.booking"));
    };
    return (
        
            <form>
                <div>
                    <PrimaryButton
                        className="mt-1"
                        onClick={(e) => checkOutNow(e)}
                        disabled={processing}
                    >
                        Checkout Now
                    </PrimaryButton>
                </div>
            </form>
        
    );
}
