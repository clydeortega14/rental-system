import LandingPageLayout from "@/Layouts/LandingPageLayout"
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types'

interface Category {
    id: number;
    name: string;
    // Add other category fields as needed
}

interface LandingPageProps {
    categories: Category[];
}

export default function LandingPage({ auth, categories }: PageProps) {
    return (
        <>
            <Head title="Welcome" />
            <LandingPageLayout auth={auth} categories={categories} />
        </>
    );
}
