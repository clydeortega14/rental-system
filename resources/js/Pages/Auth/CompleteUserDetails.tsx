import { FormEventHandler, useState } from "react";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/LandingPage/Utility/footer";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import banner2 from "@/../../public/img/banner/info.png";
import { PageProps } from "@/types";

const categoryImages = ["img/banner/bb.jpg"];

export default function CompleteUserDetails() {
  const user = usePage<PageProps>().props.auth.user;

  const { data, setData, post, processing, errors, reset } = useForm({
    id: user.id,
    name: user.name,
    email: user.email,
    company_name: "",
    tin: "",
    years_experience: "",
    valid_id: null as File | null,
    telephone: "",
    mobile: "",
  });

  const [step, setStep] = useState<1 | 2>(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData("valid_id", e.target.files[0]);
    }
  };

  const goNext: FormEventHandler = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    }
  };

  const goBack: FormEventHandler = (e) => {
    e.preventDefault();
    if (step === 2) setStep(1);
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("store.completing.user"));
  };

  return (
    <>
      <Head title="Complete Your Details" />
      <div className="flex flex-col min-h-screen">
        <Header />

        <section
          className="relative text-white py-10 sm:py-14 lg:py-16 flex-grow bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${categoryImages})` }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center rounded-xl overflow-hidden">
              {/* FORM CARD */}
              <div className="w-full lg:w-1/2 p-10 text-black shadow-lg rounded-xl bg-white">
                <div className="flex justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {step === 1 ? "Step 1: Company Info" : "Step 2: Contact Info"}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {step === 1
                        ? "Provide your company details."
                        : "Provide your contact information."}
                    </p>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">{step}</span>/2
                  </div>
                </div>

                {/* persistent user summary */}
                <div className="mb-6 border rounded p-3 bg-gray-50">
                  <div className="text-xs uppercase text-gray-500 mb-1">
                    Account
                  </div>
                  <div className="flex flex-col gap-1">
                    <div>
                      <strong>Name:</strong> {data.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {data.email}
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={step === 1 ? goNext : submit}
                  className="space-y-6"
                  encType="multipart/form-data"
                  noValidate
                >
                  <input type="hidden" value={data.id} name="id" />

                  {step === 1 && (
                    <>
                      {/* Company Name */}
                      <div>
                        <InputLabel
                          htmlFor="company-name"
                          value="Name of your company"
                        />
                        <TextInput
                          id="company-name"
                          className="mt-1 block w-full border px-4 py-2 rounded"
                          value={data.company_name}
                          onChange={(e) =>
                            setData("company_name", e.target.value)
                          }
                          autoComplete="company-name"
                        />
                        <InputError
                          message={errors.company_name}
                          className="mt-2"
                        />
                      </div>

                      {/* TIN */}
                      <div>
                        <InputLabel
                          htmlFor="tin"
                          value="TIN (Tax Identification Number)"
                        />
                        <TextInput
                          id="tin"
                          className="mt-1 block w-full border px-4 py-2 rounded"
                          value={data.tin}
                          onChange={(e) => setData("tin", e.target.value)}
                          autoComplete="tin"
                        />
                        <InputError message={errors.tin} className="mt-2" />
                      </div>

                      {/* Years Experience */}
                      <div>
                        <InputLabel
                          htmlFor="industry-years"
                          value="Years in the industry"
                        />
                        <TextInput
                          id="industry-years"
                          className="mt-1 block w-full border px-4 py-2 rounded"
                          value={data.years_experience}
                          onChange={(e) =>
                            setData("years_experience", e.target.value)
                          }
                          autoComplete="industry-years"
                        />
                        <InputError
                          message={errors.years_experience}
                          className="mt-2"
                        />
                      </div>

                      {/* Valid ID */}
                      <div>
                        <InputLabel
                          htmlFor="valid-id"
                          value="Valid ID (at least 1 valid ID)"
                        />
                        <input
                          id="valid-id"
                          type="file"
                          onChange={handleFileChange}
                          className="mt-1 block w-full"
                          accept="image/*,application/pdf"
                        />
                        <InputError
                          message={errors.valid_id}
                          className="mt-2"
                        />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      {/* Telephone */}
                      <div>
                        <InputLabel
                          htmlFor="tel-contact"
                          value="Telephone (Optional)"
                        />
                        <TextInput
                          id="tel-contact"
                          className="mt-1 block w-full border px-4 py-2 rounded"
                          value={data.telephone}
                          onChange={(e) =>
                            setData("telephone", e.target.value)
                          }
                          autoComplete="tel-contact"
                        />
                        <InputError
                          message={errors.telephone}
                          className="mt-2"
                        />
                      </div>

                      {/* Mobile */}
                      <div>
                        <InputLabel htmlFor="mobile" value="Mobile" />
                        <TextInput
                          id="mobile"
                          className="mt-1 block w-full border px-4 py-2 rounded"
                          value={data.mobile}
                          onChange={(e) => setData("mobile", e.target.value)}
                          autoComplete="mobile"
                        />
                        <InputError message={errors.mobile} className="mt-2" />
                      </div>
                    </>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    {step === 2 && (
                      <button
                        onClick={goBack}
                        type="button"
                        className="w-full sm:w-auto px-4 py-2 border rounded text-sm hover:bg-gray-100 transition"
                      >
                        Back
                      </button>
                    )}
                    <div className="flex flex-col sm:flex-row gap-2 flex-1 justify-end w-full">
                      {step === 1 && (
                        <PrimaryButton
                          className="w-full sm:w-auto px-6 py-2 bg-[#f53d2d] hover:bg-[#e03728] text-white rounded"
                          disabled={processing}
                        >
                          Next
                        </PrimaryButton>
                      )}
                      {step === 2 && (
                        <PrimaryButton
                          className="w-full sm:w-auto px-6 py-2 bg-[#f53d2d] hover:bg-[#e03728] text-white rounded"
                          disabled={processing}
                        >
                          Submit
                        </PrimaryButton>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-center mt-4">
                    Need to go back?{" "}
                    <Link
                      href={route("login")}
                      className="text-[#f53d2d] hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>

              {/* LEFT BANNER/DECOR */}
              <div className="hidden lg:block w-full lg:w-1/2 lg:ml-20 h-72 sm:h-96 md:h-[500px] lg:h-[680px] animate-float">
                <img
                  src={banner2}
                  alt="Banner"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
