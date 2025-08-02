import { Category } from '@/Interface/CategoryInterface';
import { ArrowRight,Heart } from 'lucide-react';

const categoryImageMap: Record<string, string> = {
  vehicle: '/img/banner/2.png',
  residential: '/img/banner/3.png',
  events: '/img/banner/events.png',
  'digital devices': '/img/banner/1.png',
  Others: '/img/banner/default.png',
};

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  categories: Category[];
  auth: {
    user: User | null;
  };
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const FeaturedCategories = ({ categories }: Props) => {
  const filtered = categories.filter(c => (c.rental_items_count ?? 0) > 0);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Categories</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Know what you’re looking for? Pick from our extensive selection of items and rent now.
          </p>
        </div>

        {/* Categories Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {filtered.map(category => {
              const label = category.detail?.label ?? 'No Label';
              const imageKey = category.detail?.label?.toLowerCase() ?? '';
              const imageSrc = categoryImageMap[imageKey] ?? categoryImageMap['Others'];

              return (
                <div
                  key={category.id}
                  className="relative bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col"
                  aria-label={`Category ${label}`}
                >
                  {/* Full image, not cropped */}
                    <div className="absolute top-0 left-0 z-10">
                    <div className="bg-gray-800 text-white text-xs font-semibold px-3 py-1 origin-top-left absolute top-4 left-[-0px] w-[100px] text-center">
                      HOT! Deals
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={imageSrc}
                      alt={label}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                      style={{ maxHeight: '180px' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900">
                          {capitalize(label)}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {category.rental_items_count ?? 0} item
                          {(category.rental_items_count ?? 0) === 1 ? '' : 's'} available
                        </p>
                      </div>
                      <Heart className="w-6 h-6 text-orange-500 mt-1" />
                    </div>

                    <p className="text-gray-600 flex-grow">
                      Rent quality items from this category quickly and securely.
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-2">
                      <a
                        href={route('rental.browser.index', category.name)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brandYellow text-white font-medium hover:bg-orange-600 transition"
                        aria-label={`Browse ${label}`}
                      >
                        View Category
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      {/* <a
                        href={route('rental.browser.index', category.name)}
                        className="flex-none text-sm font-semibold px-4 py-2 rounded-full border border-orange-500 hover:bg-orange-50 transition"
                        aria-label={`Rent now from ${label}`}
                      >
                        Rent Now
                      </a> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 w-full text-center">No categories with items found</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedCategories;