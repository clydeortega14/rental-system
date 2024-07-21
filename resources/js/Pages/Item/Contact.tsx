import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

function Contact() {
    return (
        <div className="p-4 ml-4 shadow-lg bg-white rounded-lg mb-4">
            <h1 className="font-bold text-base text-lg mb-4">
                Contact Information
            </h1>

            <div className="mb-4">
                <InputLabel htmlFor="email" value="Email Address" />

                <TextInput
                    id="email"
                    className="mt-1 block w-full"
                    required
                    isFocused
                    autoComplete="email"
                />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="mobile" value="Mobile Number" />

                <TextInput
                    id="mobile"
                    className="mt-1 block w-full"
                    required
                    isFocused
                    autoComplete="mobile"
                />
            </div>
        </div>
    );
}

export default Contact;
