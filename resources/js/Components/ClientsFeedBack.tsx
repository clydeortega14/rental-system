

const testimonials = [
  {
    name: 'Kyle Roberts DVM',
    location: 'Newyork, USA',
    text: 'Renting a car from Dreams rent made my vacation so much smoother! The process was quick',
    image: "img/profiles/avatar-15.jpg",
  },
  {
    name: 'Hardley Vanessa',
    location: 'Newyork, USA',
    text: 'Their wide selection of vehicles, convenient locations, and competitive prices',
    image: "img/profiles/avatar-15.jpg",
  },
  {
    name: 'Wilson',
    location: 'Nevada, USA',
    text: 'The spacious SUV we rented comfortably fit our family and all our luggage',
    image: "img/profiles/avatar-15.jpg",
  },
];

const ClientsFeedback = () => {
  return (
    <section className="bg-gray-50 py-16" style={{ backgroundImage: `url(img/background/feature-bg-01.png)` }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-black mb-2 flex justify-center items-center gap-2">
          Our Clients Feedback
        </h2>
        <p className="text-gray-500 mb-12">
          Provided by customers about their experience with a product or service.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Background Quote Icon */}
              <img
                src={"img/background/testimonial-icon.svg"}
                alt="quote"
                className="absolute top-0 right-0 w-58  pointer-events-none"
              />

              {/* Main Content */}
              <div className="relative z-10 text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600 mb-4">{item.text}</p>
                <div className="flex justify-center mb-2 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star" />
                  ))}
                </div>
                <h6 className="font-bold text-black">{item.name}</h6>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsFeedback;
