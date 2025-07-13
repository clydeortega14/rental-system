import LesseeProfile from "@/Layouts/LesseeLayout";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

export default function LandingLessee() {

  const auth = usePage<PageProps>().props.auth;

  return (
    <main>
      <LesseeProfile />
    </main>
  );
}
