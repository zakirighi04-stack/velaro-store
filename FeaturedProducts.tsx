import { useState } from 'react';
import { Star, Eye, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface FeaturedProductsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  isDarkMode: boolean;
}

export default function FeaturedProducts({ products, onSelectProduct, isDarkMode }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'newarrivals'>('bestsellers');

  const filteredProducts = products.filter((prod) => {
    if (activeTab === 'bestsellers') return prod.isBestSeller;
    return prod.isNewArrival;
  });

  return (
    <section id="featured-products-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800/10" dir="ltr">
      {/* Tab Selectors */}
      <div className="flex flex-col items-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono mb-2 flex items-center space-x-2">
          <Sparkles size={12} className="text-[#D4AF37]" />
          <span>Hand-Curated Selections</span>
        </span>
        
        <div className="flex space-x-8 mt-2 relative">
          <button
            id="tab-bestsellers"
            onClick={() => setActiveTab('bestsellers')}
            className={`text-xl sm:text-2xl font-sans tracking-tight pb-3 border-b-2 font-medium transition-all ${
              activeTab === 'bestsellers'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-[#D4AF37]'
            }`}
          >
            Bestsellers
          </button>
          
          <button
            id="tab-newarrivals"
            onClick={() => setActiveTab('newarrivals')}
            className={`text-xl sm:text-2xl font-sans tracking-tight pb-3 border-b-2 font-medium transition-all ${
              activeTab === 'newarrivals'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-[#D4AF37]'
            }`}
          >
            New Arrivals
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              id={`featured-product-card-${prod.id}`}
              className="group flex flex-col justify-between h-full cursor-pointer"
              onClick={() => onSelectProduct(prod)}
            >
              {/* Product Visual wrapper */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-neutral-800/10 mb-4">
                <img
                  src={prod.mainImage}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Visual Gold Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#0B0B0B] text-white hover:text-[#D4AF37] border border-[#D4AF37]/40 px-5 py-3 font-semibold text-xs tracking-widest flex items-center space-x-2"
                  >
                    <Eye size={14} />
                    <span>Quick View</span>
                  </motion.button>
                </div>

                {/* Badge (New or Best Seller) */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {prod.isBestSeller && (
                    <span className="bg-[#D4AF37] text-black font-semibold font-mono text-[9px] tracking-widest px-3 py-1 uppercase shadow-md">
                      BEST SELLER
                    </span>
                  )}
                  {prod.isNewArrival && (
                    <span className="bg-black text-white border border-[#D4AF37]/50 font-semibold font-mono text-[9px] tracking-widest px-3 py-1 uppercase shadow-md">
                      NEW
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="text-left flex flex-col justify-between flex-grow">
                <div>
                  {/* Category and Rating */}
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="text-neutral-500">{prod.categoryName}</span>
                    <div className="flex items-center text-amber-500 space-x-1">
                      <Star size={12} fill="currentColor" />
                      <span className="font-mono text-xs">{prod.rating}</span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className={`text-base font-semibold mb-2 line-clamp-1 transition-colors group-hover:text-[#D4AF37] ${
                    isDarkMode ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {prod.name}
                  </h3>
                </div>

                {/* Pricing block */}
                <div className="flex justify-between items-center mt-2 border-t border-neutral-800/10 pt-3">
                  <span className="text-xs text-neutral-500">Investment</span>
                  <span className="text-[#D4AF37] font-mono font-bold text-lg">${prod.price}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
