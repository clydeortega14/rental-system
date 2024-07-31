import PrimaryButton from "@/Components/PrimaryButton";

export default function CheckOut() {
    return (
        <div className="mx-auto py-12 px-12">
            <form>
                <div>
                    <PrimaryButton className="mt-1">Checkout Now</PrimaryButton>
                </div>
            </form>
        </div>
    );
}
