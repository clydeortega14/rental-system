import { useForm } from "@inertiajs/react";
import { FormEvent, useEffect } from "react";
import { useState } from "react";
import InputError from "../InputError";


export default function LoginWithSocial()
{
    const [isSignup, setIsSignup] = useState<boolean>(false);

    const toggleAuthMode = () => setIsSignup( (prev) => !prev);

    const {data, setData, post, reset, errors} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    useEffect( () => {

        return () => {
            reset('password', 'password_confirmation');
        }
    }, [])

    const login = () => {
        post(route('login'))
    }

    const register = () => {
        post(route('register'), {
            preserveState: true,
            preserveScroll: false
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isSignup){
            register();
        }else{
            login();
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">
                {isSignup ? 'Create an Account' : 'Sign In to Your Account'}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
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
                <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={ data.email || ''}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                    onChange={ (e) => setData("email", e.target.value)}
                />
                <InputError message={errors.name} className="mt-1" />
                </div>

                <div>
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                    onChange={ (e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-1" />
                </div>

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
                
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </button>
                </form>

                <div className="my-6 flex items-center gap-2">
                <hr className="flex-1" />
                <span className="text-sm text-gray-400">or continue with</span>
                <hr className="flex-1" />
                </div>

                <div className="flex flex-col gap-3">
                <button className="flex items-center justify-center gap-3 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    Continue with Google
                </button>
                <button className="flex items-center justify-center gap-3 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    <img src="https://www.svgrepo.com/show/475654/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
                    Continue with Facebook
                </button>
                </div>

                <p className="text-center text-sm mt-6">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="ml-1 text-blue-600 hover:underline"
                >
                    {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
                </p>
            </div>
        </div>
    );
}