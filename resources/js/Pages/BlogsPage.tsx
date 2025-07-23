import { Category } from "@/Interface/CategoryInterface";
import LandingUtilityPage from "@/Layouts/LandingUtilityPage"
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types'
import bb from '@/../../public/img/banner/bb.jpg';
import ourlogo from '@/../../public/img/mobilelogo.png';
import logoAbout from '@/../../public/img/logoAbout.jpg';


export default function BlogsPage() {

    return (
        <LandingUtilityPage >
            <Head title="About Us" />
             <div className="flex flex-col min-h-screen ">
                <main className="flex-grow">
                <div className="bg-white text-gray-800">
                    {/* Header Section */}
                    <section
                    className="relative bg-cover bg-center bg-no-repeat py-20 md:py-28 text-white"
                    style={{
                        backgroundImage: `url(${bb})`,
                    }}
                    >
                        <div className="relative max-w-7xl mx-auto px-4 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blogs</h1>
                            <p className="text-lg md:text-xl text-gray-200">
                            Discover who we are, what we stand for, and how we aim to serve you.
                            </p>
                        </div>
                    </section>

                    <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col lg:flex-row items-center gap-12">
                                {/* Left Image Column */}
                                <div
                                    className="w-full lg:w-1/2 relative"
                                    data-aos="fade-down"
                                >
                                    <div className="relative">
                                    <div className="absolute top-0 left-0 bg-blue-800 text-white px-4 py-2 rounded-md shadow-md z-10">
                                        <span className="text-sm font-semibold">Securities and Exchange Commission (SEC)</span>
                                    </div>
                                    <div className="mt-12">
                                        <img
                                        src={logoAbout}
                                        alt="About us"
                                        className="rounded-xl shadow-lg"
                                        />
                                    </div>
                                    </div>
                                </div>

                                {/* Right Text Column */}
                                <div
                                    className="w-full lg:w-1/2 space-y-6"
                                    data-aos="fade-down"
                                >
                                    <div className="text-sm uppercase text-blue-700 font-semibold">
                                    ABOUT OUR COMPANY
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                                    Smarter, simpler way, to manage and grow rental businesses.
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                    At Renthive, we believe in creating a smarter way to connect people with spaces. 
                                    Whether you're a lessor looking to earn from your idle property, or a lessee searching for the perfect place to stay, work, or store — Renthive 
                                    provides the modern solution for easy, efficient, and secure rentals.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                    We are committed to revolutionizing the rental experience in the Philippines by building a trusted digital 
                                    ecosystem where lessors and lessees can meet, transact, and thrive — all in one platform.
                                    </p>

                                    {/* Features List */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                                        <li> We prioritize honesty, accuracy, and clarity in every listing.</li>
                                        <li> Our platform is built for your convenience, anytime, anywhere.</li>
                                    </ul>
                                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                                        <li>We value professionalism and long-term partnerships.</li>
                                        <li> Renthive adapts to your needs, whether you're renting daily, weekly, or long-term.</li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                </main>
            </div>
            {/* <LandingUtilityPage/> */}
        </LandingUtilityPage>
    );
}
