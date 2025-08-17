import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import Footer from '@/Components/LandingPage/Utility/footer'
import Header from '@/Components/Header'
import banner2 from '@/../../resources/img/banner/login1.png';
export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

        const categoryImages = [
        "img/banner/bb.jpg",
        ];


    return (
         <>
            <Header />
            <Head title="Email Verification" />
            <section className="relative text-white py-10 sm:py-14 lg:py-16 flex-grow bg-cover bg-center bg-no-repeat"  style={{backgroundImage: `url(${categoryImages})`}}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-center rounded-xl  overflow-hidden">
                        {/* RIGHT LOGIN FORM */}
                        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-xl px-8 py-10 space-y-6">
                            {/* Title & Message */}
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verify Your Email</h2>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    Thanks for signing up! Before getting started, please verify your email address by clicking the link we just sent you.
                                    If you didn’t receive the email, we’ll gladly send you another.
                                </p>
                            </div>

                            {/* Status Message */}
                            {status === 'verification-link-sent' && (
                                <div className="p-4 bg-green-100 text-green-700 text-sm rounded-md border border-green-300">
                                    A new verification link has been sent to the email address you provided during registration.
                                </div>
                            )}

                            {/* Form Buttons */}
                            <form onSubmit={submit}>
                                <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                                    <PrimaryButton disabled={processing} className="w-full sm:w-auto">
                                        Resend Verification Email
                                    </PrimaryButton>

                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="inline-flex items-center justify-center px-5 py-2 bg-gray-100 text-sm font-medium text-gray-700 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            </form>
                        </div>
                        
                        {/* LEFT BANNER */}
                        <div className="hidden lg:block w-full lg:w-1/2 lg:ml-20 h-72 sm:h-96 md:h-[500px] lg:h-[680px] animate-float">
                        <img
                            src={banner2}
                            alt="Promo Banner"
                            className="w-full h-full object-cover"
                        />
                        </div>
                        
                    </div>
                </div>
            </section>
        
            <Footer />
        </>
    );
}
