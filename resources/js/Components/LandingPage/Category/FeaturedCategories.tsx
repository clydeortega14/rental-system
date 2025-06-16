import { Category } from '@/Interface/CategoryInterface';
import { BiUser } from 'react-icons/bi';
import { ArrowRight } from 'lucide-react';

import phones from '@/../../resources/img/banner/1.png';
import cars from '@/../../resources/img/banner/banner1.png';
import motorcycle from '@/../../resources/img/banner/2.png';
import bags from '@/../../resources/img/banner/bags.png';
import hotels from '@/../../resources/img/banner/hotels.png';

const categoryImages = [cars, phones, motorcycle, bags, hotels];

interface Props {
  categories: Category[];
}

const FeaturedCategories = ({ categories }: Props) => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Daily Discovery</h2>
          <p className="text-gray-500 mt-2">
            Know what you’re looking for? Pick our extensive selection of items rent now.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <a
                key={category.id}
                href={route('rental.browser.index', category.name)}
                className="bg-white border rounded-2xl shadow hover:shadow-lg transition-transform transform hover:scale-105 p-4 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h6 className="text-md font-semibold text-gray-800">
                      {category.detail?.label ?? 'No Label'}
                    </h6>
                    <p className="text-sm text-gray-400">14 Cars</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-orange-500 mt-1" />
                </div>
                <div className="h-24 flex items-center justify-center">
                  <img
                    src={categoryImages[index % categoryImages.length]}
                    alt={category.detail?.label ?? 'Category'}
                    className="object-contain w-full h-full"
                  />
                </div>
              </a>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">No categories found</p>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            <BiUser className="text-lg" />
            Login To See More
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
