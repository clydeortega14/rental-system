import { useEffect, FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import banner1 from '@/../../resources/img/logo-web.png';
import banner2 from '@/../../resources/img/banner/ll.png';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />
            {/* Outer container */}
            <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
                {/* Left side: Form */}
                <div className="md:w-1/2 w-full flex items-center justify-center p-8 ">
                    <div className="w-full max-w-md">
                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                        <img src={banner1} alt="Login illustration" className="mx-auto w-full max-w-xs" />
                        <br />
                        <br />
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Remember me</span>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between">
                                <PrimaryButton
                                    className="w-full md:w-auto mb-2 md:mb-0 text-center"
                                    disabled={processing}
                                >
                                    Log in
                                </PrimaryButton>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right side: Image, hidden on small screens */}
                <div className="md:w-1/2 w-full hidden md:flex items-center justify-center">
                    <img
                        src={banner2}
                        alt="Login illustration"
                        className="max-w-full max-h-full object-contain mr-20 animate-float"
                    />
                </div>
            </div>
        </>
    );
}
