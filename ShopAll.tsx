import { useState, useEffect } from 'react';
import { SlidersHorizontal, Grid, List, Search, Star, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { CATEGORIES } from '../data';

interface ShopAllProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  onSelectProduct: (product: Product) => void;
  isDarkMode: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ShopAll({
  products,
  selectedCategory,
  setSelectedCategory,
  onSelectProduct,
  isDarkMode,
  searchQuery,
  setSearchQuery,
}: ShopAllProps) {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filtered and sorted products
  const filteredProducts = products
    .filter((prod) => {
      // Category filter
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
      // Price filter
      if (prod.price > maxPrice) return false;
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          prod.name.toLowerCase().includes(query) ||
          prod.description.toLowerCase().includes(query) ||
          prod.categoryName.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default
    });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left" dir="ltr">
      {/* Editorial Header */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono block mb-2">BESPOKE ARCHIVE</span>
        <h1 className={`text-3xl sm:text-4xl font-sans font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
          Browse <span className="font-serif italic text-[#D4AF37]">Our Signature Collections</span>
        </h1>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-3" />
      </div>

      {/* Category Pills Slider */}
      <div className="flex overflow-x-auto pb-4 mb-10 scrollbar-hide space-x-3 justify-start lg:justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            id={`shop-pill-${cat.id}`}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-3 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/10'
                : isDarkMode
                ? 'border-neutral-800 text-neutral-300 hover:border-[#D4AF37]'
                : 'border-neutral-200 text-neutral-700 hover:border-[#D4AF37]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Top Controls line */}
      <div className={`flex flex-col sm:flex-row justify-between items-center pb-6 mb-8 border-b ${
        isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
      }`}>
        {/* Results Counter */}
        <p className="text-xs sm:text-sm text-neutral-400 mb-4 sm:mb-0">
          Discovered <span className="text-[#D4AF37] font-bold font-mono">{filteredProducts.length}</span> exquisite garments
        </p>

        {/* Filters/Sort control inputs */}
        <div className="flex space-x-4 items-center">
          {/* Mobile Filters trigger */}
          <button
            id="mobile-filters-trigger"
            onClick={() => setShowFiltersMobile(true)}
            className={`lg:hidden px-4 py-2 border rounded text-xs flex items-center space-x-2 ${
              isDarkMode ? 'border-neutral-800 text-white' : 'border-neutral-200 text-neutral-800'
            }`}
          >
            <SlidersHorizontal size={14} />
            <span>Filter</span>
          </button>

          {/* Sorter selection */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-neutral-400">Sort By:</span>
            <select
              id="shop-sorter"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`px-3 py-2 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
              }`}
            >
              <option value="default">Default (Curated)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid View Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Desktop Sidebar Filters (Col 1-3) */}
        <aside className={`hidden lg:block lg:col-span-3 p-6 border rounded-xl space-y-8 sticky top-28 ${
          isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#D4AF37] mb-4">Search Collection</h3>
            <div className="relative flex items-center">
              <input
                id="sidebar-search-input"
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-3 py-2 pr-10 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
                }`}
              />
              <Search size={14} className="absolute right-3 text-[#D4AF37]" />
              {searchQuery && (
                <button
                  id="sidebar-search-clear"
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 text-neutral-500 hover:text-white"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-[#D4AF37]">Max Investment</h3>
              <span className="font-mono text-xs text-[#D4AF37] font-bold">${maxPrice}</span>
            </div>
            <input
              id="sidebar-price-range"
              type="range"
              min={50}
              max={1000}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
              <span>$50</span>
              <span>$1000</span>
            </div>
          </div>

          {/* Quick preset prices */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#D4AF37] mb-3">Quick Price Presets</h3>
            <div className="space-y-2">
              {[
                { label: 'All Values', value: 1000 },
                { label: 'Under $200', value: 200 },
                { label: 'Under $400', value: 400 },
                { label: 'Under $600', value: 600 }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  id={`price-preset-${idx}`}
                  onClick={() => setMaxPrice(preset.value)}
                  className={`w-full text-left text-xs py-1.5 px-3 rounded transition-colors ${
                    maxPrice === preset.value
                      ? 'bg-[#D4AF37]/10 text-[#D4AF37] font-semibold'
                      : 'text-neutral-400 hover:bg-neutral-800/10'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Stage (Col 4-12) */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <SlidersHorizontal size={48} className="text-neutral-600 mx-auto stroke-[1]" />
              <h3 className="font-serif italic text-lg text-neutral-400">No Matching Garments Found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                Adjust your pricing sliders, check your search queries, or clear your categories to discover our exquisite collection.
              </p>
              <button
                id="reset-filters"
                onClick={() => {
                  setSelectedCategory('all');
                  setMaxPrice(1000);
                  setSearchQuery('');
                  setSortBy('default');
                }}
                className="bg-[#D4AF37] text-black text-xs font-semibold px-6 py-3 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  id={`shop-product-card-${prod.id}`}
                  className="group flex flex-col justify-between h-full cursor-pointer border border-neutral-800/5 p-3 rounded-xl transition-all hover:border-[#D4AF37]/20"
                  onClick={() => onSelectProduct(prod)}
                >
                  {/* Product image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 rounded-lg mb-4">
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
                        <span>Quick View Details</span>
                      </motion.button>
                    </div>

                    {/* Badges */}
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

                  {/* Info */}
                  <div className="text-left flex flex-col justify-between flex-grow">
                    <div>
                      {/* Category and ratings */}
                      <div className="flex justify-between items-center mb-1 text-xs">
                        <span className="text-neutral-500">{prod.categoryName}</span>
                        <div className="flex items-center text-amber-500 space-x-1">
                          <Star size={12} fill="currentColor" />
                          <span className="font-mono text-xs">{prod.rating}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-base font-semibold mb-2 line-clamp-1 transition-colors group-hover:text-[#D4AF37] ${
                        isDarkMode ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {prod.name}
                      </h3>
                    </div>

                    {/* Price tag */}
                    <div className="flex justify-between items-center mt-2 border-t border-neutral-800/10 pt-3">
                      <span className="text-xs text-neutral-500">Investment Value</span>
                      <span className="text-[#D4AF37] font-mono font-bold text-lg">${prod.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Slide-Over menu */}
      <AnimatePresence>
        {showFiltersMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFiltersMobile(false)}
              className="fixed inset-0 bg-black z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`fixed top-0 right-0 h-full w-4/5 max-w-sm z-50 p-6 shadow-2xl flex flex-col justify-between ${
                isDarkMode ? 'bg-black text-white border-l border-neutral-800' : 'bg-white text-neutral-900 border-l border-neutral-200'
              }`}
            >
              <div className="space-y-8 text-left">
                <div className="flex justify-between items-center border-b border-neutral-800/10 pb-4">
                  <h3 className="font-semibold text-base">Bespoke Filters</h3>
                  <button
                    id="close-mobile-filters"
                    onClick={() => setShowFiltersMobile(false)}
                    className="p-1 rounded-full hover:bg-neutral-800/25"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Mobile Search */}
                <div>
                  <h4 className="font-semibold text-xs text-[#D4AF37] mb-2 uppercase tracking-wider">Search Text</h4>
                  <div className="relative flex items-center">
                    <input
                      id="mobile-search-input"
                      type="text"
                      placeholder="Search here..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full px-3 py-2 pr-10 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                        isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
                      }`}
                    />
                    <Search size={14} className="absolute right-3 text-[#D4AF37]" />
                  </div>
                </div>

                {/* Mobile Price */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-xs text-[#D4AF37] uppercase tracking-wider">Max Investment</h4>
                    <span className="font-mono text-xs text-[#D4AF37] font-bold">${maxPrice}</span>
                  </div>
                  <input
                    id="mobile-price-range"
                    type="range"
                    min={50}
                    max={1000}
                    step={10}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>
              </div>

              {/* Action buttons inside mobile drawer */}
              <button
                id="mobile-filters-apply"
                onClick={() => setShowFiltersMobile(false)}
                className="w-full bg-[#D4AF37] text-black font-semibold text-sm py-4 hover:bg-white hover:text-black transition-colors flex items-center justify-center shadow-lg"
              >
                Apply Settings
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
