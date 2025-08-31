import { useForm } from "@inertiajs/react";
import { FormEvent, useEffect } from "react";
import { useState } from "react";
import InputError from "../InputError";
import PrimaryButton from "../PrimaryButton";


export default function LoginWithSocial()
{
    const [isSignup, setIsSignup] = useState<boolean>(false);

    const toggleAuthMode = () => setIsSignup( (prev) => !prev);

    const {data, setData, post, reset, errors, processing} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    useEffect( () => {

        return () => {
            reset('password', 'password_confirmation');
        }
    }, []);

    
    const [showEmailInput, setShowEmailInput] = useState<boolean>(data.email === '' ? true : false);
    const [showPasswordInput, setShowPasswordInput] = useState<boolean>(data.email === '' && data.password === '' ? false: true);

    useEffect( () => {
        if(!processing && data.email !== '') setShowPasswordInput(true)
    }, [processing])

    const login = () => {
        post(route('login'))
    }

    const register = () => {
        post(route('register'), {
            preserveState: true,
            preserveScroll: false
        })
    }

    const emailOnly = () => {
        post(route('register', {
            action: 'emailOnly'
        }), {
            preserveState: true,
            preserveScroll: false,
        });
    }

    const handleNext = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        emailOnly();

        if(data.email !== '' && data.password !== '') login();
    }

    const handleSocialLogin = (social: string) => {
        window.location.href = `/auth/${social}/redirect`;
    }

    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     emailOnly();
    // }

    return (
        <div className="p-4 flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-center mb-6"></h2>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={ () => handleSocialLogin('google')}
                    className="flex items-center justify-center gap-3 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Continue with Google
                    </button>
                    <button onClick={() => handleSocialLogin('facebook')} className="flex items-center justify-center gap-3 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                        <img src="https://www.svgrepo.com/show/138943/facebook.svg" alt="Facebook" className="w-5 h-5" />
                        Continue with Facebook
                    </button>
                </div>

                <div className="my-6 flex items-center gap-2">
                    <hr className="flex-1" />
                        <span className="text-sm text-gray-400">or continue with</span>
                    <hr className="flex-1" />
                </div>

                <form className="space-y-4" onSubmit={handleNext}>

                    

                {isSignup && (

                    <>
                    <input
                        type="text"
                        value={data.name || ''}
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                        onChange={ (e) => setData("name", e.target.value)  }
                    />
                    <InputError message={errors.name} className="mt-1" />
                    </>
                )}

                {
                    showEmailInput && (
                        <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={ data.email || ''}
                            className={`w-full px-4 py-2 border rounded-lg  ${errors.email ? 'border-red-400 focus:ring focus:ring-red-400' : 'focus:outline-none focus:ring focus:rign-blue-400'}`}
                            onChange={ (e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>
                    )
                }
                

                {
                    showPasswordInput && (
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                                onChange={ (e) => setData("password", e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>
                    )
                }
                

                { isSignup && (
                    <>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                            onChange={ (e) => setData("password_confirmation", e.target.value)}
                        />

                        <InputError message={errors.password_confirmation} className="mt-1" />
                    </>
                )}

                
                    <PrimaryButton
                            type="submit"
                            className="mt-2 w-full"
                            disabled={processing}
                        >
                            {isSignup ? 'Sign Up' : 'Next'}
                    </PrimaryButton>
                   
                </form>

                <p className="text-center text-sm mt-6">
                {isSignup ? 'Already have an account?' : "Haven\'t received an email yet?"}
                <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="ml-1 text-blue-600 hover:underline"
                >
                    {isSignup ? 'Sign In' : 'resend email'}
                </button>
                </p>
            </div>
        </div>
    );
}