import LandingPageLayout from "@/Layouts/LandingPageLayout"
import { Head } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    // Add other category fields as needed
}

interface LandingPageProps {
    categories: Category[];
}

export default function LandingPage({ categories }: LandingPageProps) {
    return (
        <>
            <Head title="Welcome" />
            <LandingPageLayout categories={categories} />
        </>
    );
}
