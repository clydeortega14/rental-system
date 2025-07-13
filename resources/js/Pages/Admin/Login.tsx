import React, { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/react'
import AdminAuthLayout from '@/Layouts/AdminLogin'
import SharedLoader from '@/Components/Shared/HiveLoader'

const LoginAdmin: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('login'));
  }

  if (isLoading) {
    return <SharedLoader /> // ✅ using the shared loading component
  }

  return (
    <AdminAuthLayout>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder="admin@example.com"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder="••••••••"
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
         <button
            type="submit"
            disabled={processing}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center justify-center"
            >
            {processing ? (
                <div className="flex items-center gap-2">
                <svg
                    className="w-5 h-5 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    ></circle>
                    <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    ></path>
                </svg>
                <span>Logging in...</span>
                </div>
            ) : (
                'Login'
            )}
            </button>
        </div>
      </form>
    </AdminAuthLayout>
  )
}

export default LoginAdmin
