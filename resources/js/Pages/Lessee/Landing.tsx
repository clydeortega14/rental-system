import LesseeProfile from "@/Layouts/LesseeLayout";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import { BiSolidDashboard } from "react-icons/bi";

export default function LandingLessee() {

  const auth = usePage<PageProps>().props.auth;

  return (
    <AuthLayout>

      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="flex items-center text-3xl font-bold mb-6 text-brandYellow">
          <BiSolidDashboard className="w-6 h-6 text-brandYellow mr-2" />
          Dashboard
        </h1>
      </header>
      
    </AuthLayout>
  );
}
