import { Head } from "@inertiajs/react";

import Header from '@/Components/Header'
import LoginWithSocial from "@/Components/Guest/LoginWithSocial";

export default function SignInSignUpWithSocial()
{
    return (
        <div>
            <Head title="Sing In or Sign Up" />
            <div className="flex flex-col min-h-screen">
               <Header />

               {/* Sign In or Sign Up AUTH FORM */}

               <LoginWithSocial />
            </div>
        </div>
    )
}