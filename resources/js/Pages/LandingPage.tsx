import { Category } from "@/Interface/CategoryInterface";
import LandingPageLayout from "@/Layouts/LandingPageLayout"
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types'

interface LandingPageProps {
    categories: Category[];
}

export default function LandingPage({ auth, categories }: PageProps) {

    console.log(categories)
    return (
        <>
            <Head title="Welcome" />
            <LandingPageLayout auth={auth} categories={categories} />
        </>
    );
}
