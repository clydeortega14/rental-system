const messages = [
  'Reliable Service',
  '24/7 Customer Support',
  'Affordable Pricing',
  'Fast and Easy Booking',
  'Quality Assured',
  'Wide Vehicle Selection',
  'Flexible Rental Periods',
  'Trusted by Thousands',
  'Instant Confirmation',
  'Safe and Secure Transactions',
];

const SupportSlider = () => {
  return (
    <section className="support-section overflow-hidden bg-white py-4">
      <div className="flex animate-slide-left whitespace-nowrap items-center">
        {[...messages, ...messages].map((text, index) => {
          const isLast = (index + 1) % messages.length === 0; // to avoid star after last message in each loop
          return (
            <div
              className="flex items-center space-x-6 px-6 text-xl font-semibold text-gray-800"
              key={index}
              aria-hidden={index >= messages.length}
            >
              <h2 className="whitespace-nowrap">{text}</h2>
              {!isLast && (
                <img
                  src={"img/background/star-icon.svg"}
                  alt="star icon"
                  className="w-5 h-5 flex-shrink-0"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SupportSlider;
