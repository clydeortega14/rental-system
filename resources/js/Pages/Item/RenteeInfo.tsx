import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

function RenteeInfo() {
    return (
        <div className="p-4 ml-4 shadow-lg bg-white rounded-lg mb-4">
            <h1 className="font-bold text-base text-lg mb-4">
                Driver Information
            </h1>

            <div className="mb-4">
                <InputLabel htmlFor="firstname" value="Firstname" />

                <TextInput
                    id="firstname"
                    className="mt-1 block w-full"
                    required
                    isFocused
                    autoComplete="firstname"
                />
            </div>

            <div className="mb-4">
                <InputLabel htmlFor="lastname" value="Lastname" />

                <TextInput
                    id="lastname"
                    className="mt-1 block w-full"
                    required
                    isFocused
                    autoComplete="lastname"
                />
            </div>
        </div>
    );
}

export default RenteeInfo;
