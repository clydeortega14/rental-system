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
                                {/* LOGIN FORM */}
                                <form onSubmit={submit} className="space-y-4">
                                    <div>
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="block w-full border px-4 py-2 rounded"
                                            autoComplete="username"
                                            placeholder="Phone number / Username / Email"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            className="block w-full border px-4 py-2 rounded pr-10"
                                            autoComplete="current-password"
                                            placeholder="Password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {/* Remember Me */}
                                    <div className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                    </div>

                                    {/* Submit Button */}
                                    <PrimaryButton className="w-full bg-[#f53d2d] hover:bg-[#e03728] text-white py-2 rounded" disabled={processing}>
                                        LOG IN
                                    </PrimaryButton>
                                    {/* <button
                                        type='button'
                                        onClick={() => setIsOpen(true)}
                                        className="bg-red-500 text-white px-4 py-2 rounded mb-2"

                                    >
                                        Social Login
                                    </button> */}

                                    <div className="flex justify-center gap-4 mt-4">
                                        {/* Facebook Icon Button */}
                                        <button
                                            type="button"
                                            onClick={() => handleSocialLogin("facebook")}
                                            className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            <BiLogoFacebook size={20} />
                                        </button>

                                        {/* GitHub Icon Button */}
                                        <button
                                            type="button"
                                            onClick={() => handleSocialLogin("github")}
                                            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-900"
                                        >
                                            <BiLogoGithub size={20} />
                                        </button>
                                    </div>
                                    {/* {isOpen && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                            <div className="bg-white p-6 rounded-2xl shadow-xl w-80 relative">
                                              
                                                <button
                                                    onClick={() => setIsOpen(false)}
                                                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                                                >
                                                    ✕
                                                </button>

                                                <h2 className="text-xl font-semibold text-center mb-4">
                                                    Continue with
                                                </h2>

                                                <div className="space-y-3">
                                                    <button
                                                        type='button'
                                                        onClick={() => handleSocialLogin("google")}
                                                        className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                                    >
                                                        Google
                                                    </button>

                                                    <button
                                                        type='button'
                                                        disabled
                                                        onClick={() => handleSocialLogin("facebook")}
                                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                                    >
                                                        Facebook
                                                    </button>

                                                    <button
                                                        type='button'
                                                        disabled
                                                        onClick={() => handleSocialLogin("github")}
                                                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
                                                    >
                                                        GitHub
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )} */}
                                    {/* Forgot Password */}
                                    {canResetPassword && (
                                        <div className="text-sm text-right mt-2">
                                            <Link
                                                href={route('password.request')}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                    )}

                                    {/* Divider */}
                                    <div className="flex items-center my-4">
                                        <hr className="flex-grow border-t" />
                                        <span className="mx-2 text-sm text-gray-500">OR</span>
                                        <hr className="flex-grow border-t" />
                                    </div>

                                    {/* Google Button */}
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            onClick={() => handleSocialLogin("google")}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm transition duration-150"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="white" d="M488 261.8c0-17.8-1.5-35.1-4.3-51.8H249v98h134.3c-5.8 31.3-23.2 57.9-49.6 75.7v62h80.3c46.9-43.3 74-107.2 74-183.9z" />
                                                <path fill="white" d="M249 512c67.3 0 123.9-22.4 165.2-60.8l-80.3-62c-22.3 15-50.8 23.8-84.9 23.8-65 0-120-43.8-139.7-102.7H25.1v64.4C65.6 466.6 150.2 512 249 512z" />
                                                <path fill="white" d="M109.3 310.3c-9.7-28.9-9.7-60.4 0-89.3v-64.4H25.1c-38.5 76.8-38.5 167.1 0 243.9l84.2-64.4z" />
                                                <path fill="white" d="M249 100.2c35.5 0 67.3 12.2 92.5 36.3l69.4-69.4C372.9 24.5 318.1 0 249 0 150.2 0 65.6 45.4 25.1 118.9l84.2 64.4C129 144 184 100.2 249 100.2z" />
                                            </svg>
                                            Continue with Google
                                        </button>
                                    </div>

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
