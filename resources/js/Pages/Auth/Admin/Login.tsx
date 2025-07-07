import { useEffect, FormEventHandler,useState } from 'react';
import Checkbox from '../../../Components/Checkbox';
import InputError from '../../../Components/InputError';
import InputLabel from '../../../Components/InputLabel';
import PrimaryButton from '../../../Components/PrimaryButton';
import GoogleButton from '../../../Components/OAuth/GoogleLoginButton';
import TextInput from '../../../Components/TextInput';
import banner1 from '../../../../../resources/img/logo-web.png';
import banner2 from '../../../../../resources/img/banner/login1.png';
import { Head, Link, useForm,usePage } from '@inertiajs/react';
import Footer from '../../../Components/LandingPage/Utility/footer'
import Header from '../../../Components/Header'
import AdminAuthLayout from '@/Layouts/AdminLogin';
import SharedLoader from '@/Components/Shared/HiveLoader'
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {

    const [isLoading, setIsLoading] = useState(true)
    const [showPassword, setShowPassword] = useState(false);
    const { flash } = usePage().props as any;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

   
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    // Show sweet alerts based on flash messages
useEffect(() => {
    // Flash messages
    if (flash.success) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: flash.success,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    }

    if (flash.error) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: flash.error,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    }

    if (errors && Object.keys(errors).length > 0) {
        Object.values(errors).forEach((message: string) => {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: message,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        });
    }
}, [flash, errors]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.store'));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white">
                <SharedLoader />
            </div>
        );
    }

    return (
        <>
            <Head title="Admin Login" />
            {/* LOGIN FORM */}
            <AdminAuthLayout>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full border px-4 py-2 rounded"
                            placeholder="Email"
                            autoComplete="off"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>

                   <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <TextInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                className="block w-full border px-4 py-2 rounded pr-12" // more right padding for the icon
                                autoComplete="current-password"
                                placeholder="Password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            {/* Optional separator */}
                            <div className="absolute right-10 top-1/2 transform -translate-y-1/2 h-5 border-l border-gray-300" />

                            {/* Eye Icon */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
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
                </form>
            </AdminAuthLayout>
        </>
    );
}
