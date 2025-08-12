import { Category } from "@/Interface/CategoryInterface";
import LandingUtilityPage from "@/Layouts/LandingUtilityPage"
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types'
import bb from '@/../../public/img/banner/bb.jpg';
import ourlogo from '@/../../public/img/mobilelogo.png';
import logoAbout from '@/../../public/img/logoAbout.jpg';
import WhyChooseUsTemp from '@/Components/WhyChooseUs';


export default function WhyChooseUs() {

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
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">WhyChooseUs</h1>
                                <p className="text-lg md:text-xl text-gray-200">
                                  RentHive provides the easiest and most flexible way to rent cars,
                                <br />homes, bags, electronics, and more – all in one place.
                                </p>
                            </div>
                            </section>

                            <section className="py-20 bg-white">
                            <div className="container mx-auto px-4">
                              <WhyChooseUsTemp />
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
