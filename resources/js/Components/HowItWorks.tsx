import React, { useEffect, useState } from 'react';
import { ShoppingBag, Car, Home, CalendarCheck, CreditCard } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Browse & Choose Your Item',
    description:
      'Explore RentHive’s wide selection – from cars and residentials to travel bags, electronics, and more. Rent all you can in one place!',
    icon: <ShoppingBag size={28} className="text-white" />,
    colorClass: 'bg-amber-500',
  },
  {
    id: 2,
    title: 'Select Date & Location',
    description:
      'Pick the rental dates and choose your preferred pickup or delivery location. We make renting easy and flexible.',
    icon: <CalendarCheck size={28} className="text-white" />,
    colorClass: 'bg-blue-500',
  },
  {
    id: 3,
    title: 'Book & Confirm Instantly',
    description:
      'Secure your rental with a few clicks. Provide basic info and confirm your booking instantly with our smooth process.',
    icon: <CreditCard size={28} className="text-white" />,
    colorClass: 'bg-green-500',
  },
  {
    id: 4,
    title: 'Pick Up or Get It Delivered',
    description:
      'Collect your rental from the chosen location or enjoy doorstep delivery for select items.',
    icon: <Home size={28} className="text-white" />,
    colorClass: 'bg-purple-500',
  },
  {
    id: 5,
    title: 'Enjoy & Return with Ease',
    description:
      'Enjoy your rented items hassle-free. Once done, return at the agreed location or schedule a pickup!',
    icon: <Car size={28} className="text-white" />,
    colorClass: 'bg-gray-800',
  },
];

const HowItWorksRentHive: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out transform ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-900">How RentHive Works</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            RentHive – Rent All You Can! Cars, residentials, travel bags, electronics, and more.
            Follow these simple steps to rent everything you need.
          </p>
        </div>

        {/* Steps with broken connector line */}
        {/* Steps with full broken connector line */}
<div className="relative">
  {/* full-width dashed line behind (md+), centered vertically relative to icons */}
  <div className="hidden md:block absolute inset-x-0 top-28 pointer-events-none">
    <div className="w-full">
      <div className="w-full border-t-2 border-dashed border-gray-300" />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
    {steps.map((step, idx) => (
      <div
        key={step.id}
        className={`relative flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-500 ease-out transform ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: `${idx * 100}ms` }}
      >
        {/* connector node */}
        <div className="hidden md:block absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-300 shadow" />
        </div>

        <div
          className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full ${step.colorClass} mb-4`}
        >
          {step.icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 relative">
          {`${step.id}. ${step.title}`}
          {/* dashed underline */}
          <span className="block w-16 h-px bg-transparent absolute left-1/2 transform -translate-x-1/2 bottom-0 mt-1">
            <span className="block w-full border-b-2 border-dashed border-teal-500"></span>
          </span>
        </h3>
        <p className="text-sm text-gray-600">{step.description}</p>
      </div>
    ))}
  </div>
</div>
      </div>
    </section>
  );
};

export default HowItWorksRentHive;
