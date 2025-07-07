import { useEffect, FormEventHandler } from 'react';
import Checkbox from '../../../Components/Checkbox';
import InputError from '../../../Components/InputError';
import InputLabel from '../../../Components/InputLabel';
import PrimaryButton from '../../../Components/PrimaryButton';
import GoogleButton from '../../../Components/OAuth/GoogleLoginButton';
import TextInput from '../../../Components/TextInput';
import banner1 from '../../../../../resources/img/logo-web.png';
import banner2 from '../../../../../resources/img/banner/login1.png';
import { Head, Link, useForm } from '@inertiajs/react';
import Footer from '../../../Components/LandingPage/Utility/footer'
import Header from '../../../Components/Header'
import AdminAuthLayout from '@/Layouts/AdminLogin';

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
        post(route('admin.store'));
    };

    return (
        <>
            {/* LOGIN FORM */}
            <AdminAuthLayout>
                <form onSubmit={submit} className="space-y-4">
                    <div>
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
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full border px-4 py-2 rounded"
                            autoComplete="current-password"
                            placeholder="Password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
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
