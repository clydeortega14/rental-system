import { useEffect, FormEventHandler, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import GoogleButton from '@/Components/OAuth/GoogleLoginButton';
import TextInput from '@/Components/TextInput';
import banner2 from '@/../../resources/img/banner/login1.png';
import { Head, Link, useForm } from '@inertiajs/react';
import Footer from '@/Components/LandingPage/Utility/footer'
import Header from '@/Components/Header'
import { Eye, EyeOff } from 'lucide-react';
import { BiLogoFacebook, BiLogoGithub } from "react-icons/bi"
import LoginWithSocial from '@/Components/Guest/LoginWithSocial';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const [showPassword, setShowPassword] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const categoryImages = [
        "img/banner/bb.jpg",
    ];

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const handleSocialLogin = (provider: string) => {
        window.location.href = `/auth/${provider}/redirect`;
    };

    return (
        <>
            <Head title="Log in" />
            <div className="flex flex-col min-h-screen ">
                <Header />

                
                <section className="relative text-white py-10 sm:py-14 lg:py-16 flex-grow bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${categoryImages})` }}>
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col-reverse lg:flex-row items-center justify-center rounded-xl  overflow-hidden">
                            {/* RIGHT LOGIN FORM */}
                            <div className="w-full lg:w-1/3 p-10 text-black shadow-lg rounded-xl bg-white">
                                <h2 className="text-xl font-bold mb-4  ">Login </h2>

                                <LoginWithSocial />
                                {/* LOGIN FORM */}
                                <form onSubmit={submit} className="space-y-4">
                                    
                                    {/* Sign Up */}
                                    <p className="text-sm text-center mt-6">
                                        New to Rent Hive?{' '}
                                        <Link href="/register" className="text-[#f53d2d] hover:underline">
                                            Sign Up
                                        </Link>
                                    </p>
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
            </div>
        </>
    );
}
