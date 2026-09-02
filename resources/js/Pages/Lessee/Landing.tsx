import LesseeProfile from "@/Layouts/LesseeLayout";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function LandingLessee() {

  const auth = usePage<PageProps>().props.auth;

  return (
    <AuthLayout>
      <div className="max-w-7xl mx-auto">
          <h1 className="flex items-center text-3xl font-bold mb-6 text-brandYellow">Dashboard</h1>
      </div>
    </AuthLayout>
  );
}
