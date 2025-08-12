import React, { useEffect, useState } from "react";
import { ShieldCheck, Clock, Wallet, ThumbsUp, Truck } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Wide Selection of Rentals",
    description:
      "From cars and residentials to travel bags and electronics – RentHive lets you rent all you can in one place.",
    icon: <Truck size={28} className="text-white" />,
    colorClass: "bg-amber-500",
  },
  {
    id: 2,
    title: "Affordable Pricing",
    description:
      "Enjoy competitive rates with flexible rental durations that fit your needs and your budget.",
    icon: <Wallet size={28} className="text-white" />,
    colorClass: "bg-green-500",
  },
  {
    id: 3,
    title: "Secure & Reliable",
    description:
      "Your safety is our priority. Verified listings and secure booking system for worry-free rentals.",
    icon: <ShieldCheck size={28} className="text-white" />,
    colorClass: "bg-blue-500",
  },
  {
    id: 4,
    title: "Fast & Easy Booking",
    description:
      "Book any rental in just a few clicks – no complicated steps or long waiting times.",
    icon: <Clock size={28} className="text-white" />,
    colorClass: "bg-purple-500",
  },
  {
    id: 5,
    title: "Trusted by Many",
    description:
      "Our happy customers keep coming back for our quality service and smooth rental experience.",
    icon: <ThumbsUp size={28} className="text-white" />,
    colorClass: "bg-gray-800",
  },
];

  const categoryImages = [
    "img/background/why.png",
    ];

const WhyChooseUs: React.FC = () => {
  const [visible, setVisible] = useState(false);

  
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative py-16 overflow-hidden ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        {/* <div
          className={`text-center mb-12 transition-all duration-700 ease-out transform ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            RentHive provides the easiest and most flexible way to rent cars,
            homes, bags, electronics, and more – all in one place.
          </p>
        </div> */}

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              className={`p-6 rounded-xl bg-gray-50 shadow-md hover:shadow-lg transition-all duration-500 ease-out transform ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full ${feature.colorClass} mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
