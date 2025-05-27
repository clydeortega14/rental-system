import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import banner1 from '@/../../resources/img/banner/1.png'
import banner2 from '@/../../resources/img/banner/banner1.png'
import banner3 from '@/../../resources/img/banner/2.png'
import banner4 from '@/../../resources/img/banner/3.png'
import banner5 from '@/../../resources/img/banner/4.png'
import banner6 from '@/../../resources/img/banner/5.png'

const slides = [
  {
    image: banner1,
    title: (
      <>
        Rent the latest gadgets <span className="text-orange-500">phones, laptops, cameras </span> & more!
      </>
    ),
    description: 'Making equipment rental simple, reliable, and accessible for everyone.',
    buttons: [
      { label: 'Rent a Gadget', href: '/gadgets' },
      { label: 'Add Your Gadget', href: '/add-gadget' }
    ]
  },
  {
    image: banner2,
    title: (
      <>
        Reliable car rentals for city <span className="text-orange-500"> trips & long drives!</span>
      </>
    ),
    description: 'Making equipment rental simple, reliable, and accessible for everyone.',
    buttons: [
      { label: 'Rent a Car', href: '/listing-grid' },
      { label: 'Add Your Car', href: '/add-listing' }
    ]
  },
  {
    image: banner3,
    title: (
      <>
        Affordable motorcycle <span className="text-orange-500"> rentals perfect for city </span> rides & island adventures!
      </>
    ),
    description: 'Making equipment rental simple, reliable, and accessible for everyone.',
    buttons: [
      { label: 'Rent a Motorcycle', href: '/motorcycles' },
      { label: 'Add Your Motorcycle', href: '/add-motorcycle' }
    ]
  },
  {
    image: banner4,
    title: (
      <>
        Your ideal space awaits <span className="text-orange-500">affordable rentals </span> available!
      </>
    ),
    description: 'Making equipment rental simple, reliable, and accessible for everyone.',
    buttons: [
      { label: 'Rent a Property', href: '/real-estate' },
      { label: 'List Your Space', href: '/add-property' }
    ]
  },
  {
    image: banner5,
    title: (
      <>
        Power up your projects <span className="text-orange-500">affordable tool rentals!</span>
      </>
    ),
    description: 'Making equipment rental simple, reliable, and accessible for everyone.',
    buttons: [
      { label: 'Rent Tools', href: '/tools' },
      { label: 'Add Your Tools', href: '/add-tool' }
    ]
  },
  {
    image: banner6,
    title: (
      <>
        Tough jobs need tough <span className="text-orange-500"> gear rent heavy </span> equipment today!
      </>
    ),
    description: 'Making equipment rental simple, reliable, and accessible for everyone.',
    buttons: [
      { label: 'Rent Heavy Equipment', href: '/equipment' },
      { label: 'List Your Equipment', href: '/add-equipment' }
    ]
  }
]

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [textVisible, setTextVisible] = useState(true)

  return (
    <section className="bg-black text-white py-10 sm:py-14 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="w-full lg:w-5/12" data-aos="fade-down">
            <div
              key={activeIndex}
              className={`transition-opacity duration-500 ease-in-out ${
                textVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
                {slides[activeIndex].title}
              </h1>
              <p className="mt-4 text-gray-400 text-base sm:text-lg">
                {slides[activeIndex].description}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                {slides[activeIndex].buttons.map((btn, idx) => (
                  <a
                    key={idx}
                    href={btn.href}
                    className={`${
                      idx === 0
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'bg-gray-800 hover:bg-gray-700'
                    } text-white px-5 py-2 rounded-md transition text-center`}
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="w-full lg:w-7/12" data-aos="fade-down">
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              loop={true}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              onSlideChangeTransitionStart={() => setTextVisible(false)}
              onSlideChangeTransitionEnd={(swiper) => {
                setActiveIndex(swiper.realIndex)
                setTextVisible(true)
              }}
              className="rounded-xl"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-cover rounded-xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Search Form */}
        <div className="mt-12 bg-[#111] p-6 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <select className="p-3 rounded bg-black text-white border border-gray-700 w-full">
            <option>Pickup Location</option>
            <option>New York</option>
            <option>Dallas</option>
            <option>Chicago</option>
          </select>
          <select className="p-3 rounded bg-black text-white border border-gray-700 w-full">
            <option>Drop Location</option>
            <option>San Francisco</option>
            <option>Austin</option>
            <option>Boston</option>
          </select>
          <input
            type="text"
            readOnly
            defaultValue="2025-03-14 12:00"
            className="p-3 rounded bg-black text-white border border-gray-700 w-full"
          />
          <input
            type="text"
            readOnly
            defaultValue="2025-03-15 12:00"
            className="p-3 rounded bg-black text-white border border-gray-700 w-full"
          />
          <button className="bg-orange-500 hover:bg-orange-600 p-3 rounded-md text-white w-full">
            <i className="bx bx-search-alt" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Slider
