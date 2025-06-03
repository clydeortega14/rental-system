import { Category } from "@/Interface/CategoryInterface";
import LandingPageLayout from "@/Layouts/LandingPageLayout"
import { Head } from '@inertiajs/react';

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
