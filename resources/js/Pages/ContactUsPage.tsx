import { Category } from "@/Interface/CategoryInterface";
import LandingUtilityPage from "@/Layouts/LandingUtilityPage"
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types'
import bb from '@/../../public/img/banner/bb.jpg';
import ourlogo from '@/../../public/img/mobilelogo.png';
import logoAbout from '@/../../public/img/logoAbout.jpg';


export default function ContactUsPage() {

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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
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
                    {/* Mission Section */}
                    {/* <section className="py-16 px-4 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our mission is to bridge the gap between lessors and lessees by providing
                            a seamless, secure, and efficient online rental experience. We believe
                            in empowering both parties through innovative tools and transparent service.
                        </p>
                        </div>
                        <img
                        src={ourlogo}
                        alt="Mission"
                        className="rounded-xl shadow-md w-full h-auto"
                        />
                    </div>
                    </section> */}

                    {/* Team Section */}
                    {/* <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                        <img
                        src="/img/about/team.jpg"
                        alt="Team"
                        className="rounded-xl shadow-md w-full h-auto"
                        />
                        <div>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Team</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We're a group of passionate developers, designers, and real estate
                            enthusiasts committed to changing the way people rent properties.
                            With expertise and a drive to serve, our team works tirelessly to
                            deliver top-notch solutions.
                        </p>
                        </div>
                    </div>
                    </section> */}

                    {/* Why Choose Us Section */}
                    {/* <section className="py-16 px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Why Choose Us?</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                        Our platform is built with trust, speed, and reliability in mind.
                        Whether you're a property owner looking to list your space or someone
                        in search of a reliable rental, we’ve got you covered every step of the way.
                        </p>
                        <button className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition">
                        Contact Us
                        </button>
                    </div>
                    </section> */}
                </div>
                </main>
            </div>
            {/* <LandingUtilityPage/> */}
        </LandingUtilityPage>
    );
}
