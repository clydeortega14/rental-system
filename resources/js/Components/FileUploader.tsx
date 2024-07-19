import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";

export default function FileUploader() {
    const { data, setData, post, processing, errors } = useForm({
        filename: [],
    });

    const upload: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("upload.valid-id"));
    };

    return (
        <>
            <div className="pl-3 pt-3 pb-3">
                <form
                    onSubmit={upload}
                    className="mt-6 space-y-6"
                    encType="multipart/form-data"
                >
                    <InputLabel htmlFor="file" name="file" />

                    <TextInput
                        type="file"
                        id="file"
                        onChange={(e) => setData("filename", e.target.files[0])}
                    />

                    <InputError className="mt-2" message={errors.filename} />

                    <PrimaryButton>Upload</PrimaryButton>
                </form>
            </div>
        </>
    );
}
