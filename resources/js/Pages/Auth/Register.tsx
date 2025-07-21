import { useEffect, FormEventHandler ,useState} from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import GoogleButton from '@/Components/OAuth/GoogleLoginButton';
import TextInput from '@/Components/TextInput';
import banner2 from '@/../../resources/img/banner/signup.png';
import { Head, Link, useForm } from '@inertiajs/react';
import Footer from '@/Components/LandingPage/Utility/footer'
import Header from '@/Components/Header'
import { Eye, EyeOff } from 'lucide-react';

 export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const categoryImages = [
     "img/banner/bb.jpg",
    ];

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

        return (
            <>
                <Head title="Log in" />
                <div className="flex flex-col min-h-screen ">
                <Header />
                <section className="relative text-white py-10 sm:py-14 lg:py-16 flex-grow bg-cover bg-center bg-no-repeat"  style={{backgroundImage: `url(${categoryImages})`}}>
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col-reverse lg:flex-row items-center justify-center rounded-xl shadow-lg overflow-hidden">
                            {/* RIGHT LOGIN FORM */}
                            <div className="w-full lg:w-1/3 p-10 text-black shadow-lg rounded-xl bg-white">
                                <h2 className="text-xl font-bold mb-4  ">Sign up</h2>
                                {/* LOGIN FORM */}
                                <form onSubmit={submit}>
                                    <div>
                                        <InputLabel htmlFor="name" value="Name" />

                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="email" value="Email" />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="password" value="Password" />

                                        <TextInput
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                                        <TextInput
                                            id="password_confirmation"
                                            type={showPassword ? "text" : "password"}
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>
                                    <div className="mt-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={showPassword}
                                                onChange={() => setShowPassword(!showPassword)}
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Show Password</span>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        <Link
                                            href={route('login')}
                                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Already registered?
                                        </Link>

                                        <PrimaryButton className="ms-4" disabled={processing}>
                                            Register
                                        </PrimaryButton>
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
                </div>
            </>
        );
    }
