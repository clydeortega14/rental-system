import { useState } from 'react'
//@ts-ignore
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper';
//@ts-ignore
import { Pagination, Autoplay, EffectFade,Navigation } from 'swiper/modules'

import 'swiper/css/navigation';

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import phones from '@/../../resources/img/banner/1.png'
import cars from '@/../../resources/img/banner/banner1.png'
import motorcycle from '@/../../resources/img/banner/2.png'
import bags from '@/../../resources/img/banner/bags.png'
import hotels from '@/../../resources/img/banner/hotels.png'
import { Category } from '@/Interface/CategoryInterface';


interface SliderProps {
  categories: Category[];
}

  const categoryImages = [
    "img/banner/bb.jpg",
    ];

const slides = [
  {
    image: phones,
    label: 'Phones and Bags',
    title: (
      <>
        Rent the latest gadgets <span className="text-brandYellow">phones, laptops, cameras </span> & more!
      </>
    )
  },
  {
    image: cars,
    label: 'cars',
    title: (
      <>
        Reliable car rentals for city <span className="text-brandYellow"> trips & long drives!</span>
      </>
    )
  },
  {
    image: motorcycle,
    label: 'motorcycles',
    title: (
      <>
        Affordable motorcycle <span className="text-brandYellow"> rentals perfect for city </span> rides & island adventures!
      </>
    )
  },
  {
    image: bags,
    label: 'Phones and Bags',
    title: (
      <>
        Style meets function from <span className="text-brandYellow"> sleek totes to rugged backpacks, find the </span> perfect bag for every adventure!
      </>
    )
  },
  {
    image: hotels,
    label: 'hotels',
    title: (
      <>
        Find cozy stays, luxurious <span className="text-brandYellow"> getaways,  and everything in between  book your </span> perfect hotel now!!
      </>
    )
  }
]

const Slider = ({ categories }: SliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [textVisible, setTextVisible] = useState(true)

  return (
    <section
      className="relative text-white py-8 sm:py-14 lg:py-16 flex-grow bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${categoryImages})` }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-10">
          
          {/* Text Content */}
          <div className="w-full lg:w-5/12 text-center lg:text-left" data-aos="fade-down">
            <div
              key={activeIndex}
              className={`transition-opacity duration-500 ease-in-out ${
                textVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-snug sm:leading-tight">
                {slides[activeIndex].title}
              </h1>
            </div>
          </div>
          {/* Image Carousel */}
          <div className="w-full lg:w-7/12" data-aos="fade-up">
            <Swiper
              modules={[ Autoplay, EffectFade]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              loop={true}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              onSlideChangeTransitionStart={() => setTextVisible(false)}
              onSlideChangeTransitionEnd={(swiper: SwiperType) => {
                setActiveIndex(swiper.realIndex);
                setTextVisible(true);
              }}
              className="rounded-xl"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto max-h-[250px] sm:max-h-[400px] lg:max-h-[500px] object-cover rounded-xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Slider
