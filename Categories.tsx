import { motion } from 'motion/react';
import { CATEGORIES } from '../data';

interface CategoriesProps {
  onSelectCategory: (catId: string) => void;
  isDarkMode: boolean;
}

const CATEGORY_IMAGES: Record<string, string> = {
  jackets: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop',
  shirts: 'https://images.unsplash.com/photo-1620012253295-c05518e99309?q=80&w=600&auto=format&fit=crop',
  trousers: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop',
  shoes: 'https://images.unsplash.com/photo-1638247025967-b4e38f6893b4?q=80&w=600&auto=format&fit=crop',
  accessories: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop'
};

export default function Categories({ onSelectCategory, isDarkMode }: CategoriesProps) {
  // Filter out 'all' from categories display list
  const displayCats = CATEGORIES.filter((cat) => cat.id !== 'all');

  return (
    <section id="categories-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" dir="ltr">
      {/* Editorial Header */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono block mb-2">Exclusive Categories</span>
        <h2 className={`text-2xl sm:text-4xl font-sans font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
          Browse Our <span className="font-serif italic text-[#D4AF37]">Curated Collections</span>
        </h2>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {displayCats.map((cat, index) => (
          <motion.button
            key={cat.id}
            id={`category-card-${cat.id}`}
            onClick={() => onSelectCategory(cat.id)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-[380px] w-full overflow-hidden focus:outline-none flex flex-col justify-end p-6 border border-neutral-800/10"
          >
            {/* Visual background wrapper */}
            <div className="absolute inset-0 z-0 bg-neutral-900">
              <img
                src={CATEGORY_IMAGES[cat.id]}
                alt={cat.name}
                className="w-full h-full object-cover filter brightness-[0.55] transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 opacity-90" />
            </div>

            {/* Inner Gold Borders that draw on hover */}
            <div className="absolute inset-4 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/30 transition-all duration-500 pointer-events-none z-10" />

            {/* Content info */}
            <div className="relative z-20 text-left">
              <span className="text-[10px] tracking-widest text-[#D4AF37]/80 uppercase font-mono mb-1 block">
                Explore Now
              </span>
              <h3 className="text-xl font-sans font-medium text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                {cat.name}
              </h3>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
