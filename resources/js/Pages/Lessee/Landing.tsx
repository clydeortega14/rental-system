import LesseeProfile from "@/Layouts/LesseeLayout";
import { PageProps } from "@/types";

export default function LandingLessee({ auth }: PageProps) {

  return (
    <main>
      <LesseeProfile auth={auth} />
    </main>
  );
}
