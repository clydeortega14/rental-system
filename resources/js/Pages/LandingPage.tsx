import { Category } from "@/Interface/CategoryInterface";
import LandingPageLayout from "@/Layouts/LandingPageLayout";
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface LandingPageProps {
    categories: Category[];
}

export default function LandingPage({ categories }: LandingPageProps) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Welcome" />
            <LandingPageLayout auth={auth} categories={categories}>
                {/* Add children content here if needed */}
            </LandingPageLayout>
        </>
    );
}
