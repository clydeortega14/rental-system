// src/components/Login.tsx
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import InputError from "./InputError";
import { PageProps } from "@/types";

const LoginWithGoogle: React.FC = () => {

    const user = usePage<PageProps>().props.auth.user;

  const handleGoogleSignup = () => {
    // You can integrate Google OAuth here
    console.log("Google Sign Up clicked");
  };

  const {data, setData, post, processing, errors } = useForm({
    email: '',
    password: ''
  });

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('login', {
        checkout: true
    }), {

        preserveScroll: true,
        preserveState: true
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

        <form onSubmit={handleSubmitLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name={data.email}
              onChange={ (e) => setData("email", e.target.value) }
              value={data.email}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="you@example.com"
              required
            />

            <InputError message={errors.email } className="mt-1" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={ (e) => setData("password", e.target.value) }
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="••••••••"
              required
            />
            <InputError message={errors.password } className="mt-1" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            { processing ? 'Processing...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500">or</div>

        <button
          onClick={handleGoogleSignup}
          className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-xl hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700 font-medium">Sign up with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginWithGoogle;