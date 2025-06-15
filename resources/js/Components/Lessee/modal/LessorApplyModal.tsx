import { useState, useEffect } from "react";
import logoMobile from '@/../../resources/img/logo.png';

interface LessorApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  submitForm: number; // passed from parent
}

const benefits = [
  {
    title: "Zero Registration Fees",
    desc: "Start your rental business with Rentify absolutely free. No hidden charges or upfront costs—just sign up and list your property.",
    icon: "/images/lessor/zero-fees.png",
  },
  {
    title: "Powerful Marketing Tools",
    desc: "Rentify promotes your listings through built-in marketing tools, SEO optimization, featured placements, and social media integration to attract more renters.",
    icon: "/images/lessor/marketing-tools.png",
  },
  {
    title: "Streamlined Booking System",
    desc: "Say goodbye to manual coordination. Our automated system handles availability checks, booking requests, and client notifications for you.",
    icon: "/images/lessor/hassle-free.png",
  },
  {
    title: "Join Our Monthly Campaigns",
    desc: "Get featured in high-traffic seasonal campaigns. Whether it’s holiday getaways or summer specials, Rentify pushes your listings to the spotlight.",
    icon: "/images/lessor/campaigns.png",
  },
  {
    title: "Full Dashboard Control",
    desc: "Manage your listings, update pricing, respond to inquiries, and track bookings—all in one user-friendly dashboard designed for lessors.",
    icon: "/images/lessor/support-dashboard.png",
  },
  {
    title: "Lessor Community & Support",
    desc: "Connect with fellow property owners through webinars, tips, and live support. Learn, grow, and succeed with the Rentify community.",
    icon: "/images/lessor/community.png",
  },
];

export default function LessorApplyModal({
  isOpen,
  onClose,
  onProceed,
  submitForm,
}: LessorApplyModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 md:px-8 bg-transparent transition-opacity transition-opacity duration-300">
      <div
        className={`bg-white w-full max-w-4xl rounded-lg shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
        {/* Reminder Banner */}
        {submitForm === 1 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
            <h2 className="text-sm font-medium">Request Pending</h2>
            <p className="text-sm">
              Thank you for submitting your application. Our team is currently reviewing your request. We’ll notify you as soon as it has been verified by the administrator. We appreciate your patience!
            </p>
          </div>
        )}

        <div>
         <h2 className="text-2xl font-bold mb-2 text-center text-orange-600">Why List on Rentify?</h2>
          <p className="text-sm text-gray-600 text-center mb-6 max-w-2xl mx-auto">
            Rentify gives you the tools, exposure, and support to succeed as a lessor. Whether you own a single unit or manage multiple properties, we help you grow your rental business with ease.
          </p>

          {/* Features Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-orange-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
               <img
                  src={logoMobile}
                  className="w-20 h-25 object-contain"
                />
                <h4 className="text-base font-semibold text-orange-700 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </section>
         
            {submitForm !== 1 && (
            <button
              onClick={onProceed}
              className="w-full bg-orange-600 text-white font-semibold py-2 rounded-md hover:bg-orange-700 transition-colors duration-200"
            >
              Proceed to Signup Form
            </button>
          )}
   
        </div>
      </div>
    </div>
  );
}
