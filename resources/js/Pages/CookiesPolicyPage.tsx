import { Head } from '@inertiajs/react';
import LandingUtilityPage from '@/Layouts/LandingUtilityPage';
import bb from '@/../../public/img/banner/bb.jpg';
import logoAbout from '@/../../public/img/mobilelogo.png';

export default function CookiesPolicyPage() {
    return (
        <LandingUtilityPage>
            <Head>
                <title>Cookies Policy</title>
                <meta name="description" content="Learn how Renthive uses cookies to enhance your experience and how you can manage your preferences." />
            </Head>
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow">
                    <div className="bg-white text-gray-800">
                        {/* Header Section */}
                        <section
                            className="relative bg-cover bg-center bg-no-repeat py-20 md:py-28 text-white"
                            style={{ backgroundImage: `url(${bb})` }}
                        >
                            <div className="relative max-w-7xl mx-auto px-4 text-center">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookies Policy</h1>
                                <p className="text-lg md:text-xl text-gray-200">
                                    Learn how we use cookies to improve your experience.
                                </p>
                            </div>
                        </section>

                        {/* Content Section */}
                        <section className="py-20 bg-white">
                            <div className="container mx-auto px-4 max-w-5xl space-y-8">
                                <div>
                                    <h2 className="text-2xl font-semibold mb-2">What are cookies?</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Cookies are small text files that are stored on your device when you visit a website. 
                                        They help websites function properly, enhance user experiences, and provide data to the site owner.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-semibold mb-2">How we use cookies</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Renthive uses cookies to:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                        <li>Ensure the website works properly</li>
                                        <li>Remember user preferences and sessions</li>
                                        <li>Collect analytics to improve user experience (e.g., page visits, clicks)</li>
                                        <li>Provide relevant marketing and ads (if applicable)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-semibold mb-2">Types of cookies we use</h2>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        <li><strong>Essential Cookies:</strong> Required for core functionality of the site</li>
                                        <li><strong>Performance Cookies:</strong> Help track website performance and usage</li>
                                        <li><strong>Functional Cookies:</strong> Remember settings and user preferences</li>
                                        <li><strong>Marketing Cookies:</strong> Track user behavior for personalized advertising</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-semibold mb-2">Managing cookies</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Most web browsers allow you to control cookies through their settings. 
                                        You can choose to block or delete cookies, but please note this may impact your experience on Renthive.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-semibold mb-2">Your consent</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        By using our website, you consent to the use of cookies as described in this policy. 
                                        When you first visit the site, you’ll be presented with a cookie consent banner.
                                        You can change your preferences at any time by clearing your browser cookies or updating your settings.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-semibold mb-2">Changes to this policy</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        We may update this Cookies Policy to reflect changes in our practices or for legal reasons. 
                                        Updates will be posted on this page with the latest effective date.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-semibold mb-2">Contact us</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        If you have any questions about our use of cookies or this policy, please contact us at: <br />
                                        <a href="mailto:support@renthive.com" className="text-blue-600 underline">support@renthive.com</a>
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </LandingUtilityPage>
    );
}
