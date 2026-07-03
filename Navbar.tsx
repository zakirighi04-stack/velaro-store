import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, Sun, Moon, Instagram, Facebook, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  cartCount: number;
  openCart: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onSearch: (query: string) => void;
  allProducts: Product[];
  setSelectedProduct: (product: Product) => void;
}

export default function Navbar({
  currentView,
  setView,
  cartCount,
  openCart,
  isDarkMode,
  toggleDarkMode,
  onSearch,
  allProducts,
  setSelectedProduct,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update suggestions as user types
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchSuggestions([]);
    } else {
      const filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(filtered.slice(0, 5));
    }
  }, [searchQuery, allProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setView('shop');
    setIsSearchOpen(false);
  };

  const selectSuggestion = (product: Product) => {
    setSelectedProduct(product);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop All' },
    { id: 'about', label: 'Our Story' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white py-2 px-4 text-center text-xs tracking-widest font-light border-b border-white/10 z-50 relative">
        <span className="text-[#D4AF37] font-semibold">Complimentary Insured Shipping</span> on orders over $300 • Luxury Gift Wrapping Included
      </div>

      <nav
        id="main-navbar"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? isDarkMode
              ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-white/5 py-3'
              : 'bg-white/95 backdrop-blur-md shadow-md border-b border-black/5 py-3'
            : 'bg-transparent py-5'
        }`}
        dir="ltr"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Right side: Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setView(item.id)}
                  className={`text-sm tracking-wide transition-colors duration-200 relative py-1 font-medium ${
                    currentView === item.id
                      ? 'text-[#D4AF37]'
                      : isDarkMode
                      ? 'text-white hover:text-[#D4AF37]'
                      : 'text-neutral-800 hover:text-[#D4AF37]'
                  }`}
                >
                  {item.label}
                  {currentView === item.id && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Middle: Brand Logo */}
            <div className="flex-1 lg:flex-none flex justify-start lg:justify-center">
              <button
                id="brand-logo"
                onClick={() => setView('home')}
                className="group flex flex-col items-center"
              >
                <span className="font-sans text-2xl sm:text-3xl font-extrabold tracking-[0.25em] text-[#D4AF37] group-hover:text-amber-500 transition-colors">
                  VELARO
                </span>
                <span className={`text-[8px] tracking-[0.4em] uppercase -mt-1 font-mono transition-colors ${
                  isDarkMode ? 'text-neutral-400 group-hover:text-white' : 'text-neutral-500 group-hover:text-neutral-900'
                }`}>
                  LUXURY ATTIRE
                </span>
              </button>
            </div>

            {/* Left Side: Actions (Search, Dark Mode, Cart, Mobile Menu button) */}
            <div className="flex items-center space-x-4">
              {/* Search Toggle */}
              <button
                id="search-toggle"
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode ? 'hover:bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-800'
                }`}
                aria-label="Search"
              >
                <Search size={20} className="stroke-[1.5]" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                id="dark-mode-toggle"
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode ? 'hover:bg-neutral-900 text-yellow-400' : 'hover:bg-neutral-100 text-[#0B0B0B]'
                }`}
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={20} className="stroke-[1.5]" /> : <Moon size={20} className="stroke-[1.5]" />}
              </button>

              {/* Cart Button */}
              <button
                id="cart-toggle"
                onClick={openCart}
                className={`p-2 rounded-full relative transition-colors ${
                  isDarkMode ? 'hover:bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-800'
                }`}
                aria-label="Cart"
              >
                <ShoppingBag size={20} className="stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#0B0B0B] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse border border-[#0B0B0B]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isDarkMode ? 'hover:bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-800'
                }`}
                aria-label="Toggle Mobile Menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            id="search-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-0 left-0 right-0 z-50 shadow-2xl p-6 border-b ${
              isDarkMode ? 'bg-[#0B0B0B] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
            }`}
            dir="ltr"
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif italic text-lg text-[#D4AF37]">What are you looking for today?</span>
                <button
                  id="close-search"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 rounded-full hover:bg-neutral-800/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-4">
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search for overcoats, shirts, trousers, boots, accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-4 pr-12 rounded-lg text-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] border ${
                    isDarkMode
                      ? 'bg-neutral-900 border-neutral-800 text-white'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                  }`}
                  autoFocus
                />
                <button type="submit" className="absolute right-4 text-[#D4AF37]">
                  <Search size={22} />
                </button>
              </form>

              {/* Suggestions */}
              {searchSuggestions.length > 0 && (
                <div className={`rounded-lg overflow-hidden border ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <div className="px-4 py-2 border-b border-neutral-800/20 text-xs text-[#D4AF37] font-mono tracking-wider">
                    Premium Suggestions
                  </div>
                  <ul>
                    {searchSuggestions.map((prod) => (
                      <li key={prod.id}>
                        <button
                          id={`suggestion-item-${prod.id}`}
                          onClick={() => selectSuggestion(prod)}
                          className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                            isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <img src={prod.images[0]} alt={prod.name} className="w-10 h-10 object-cover rounded" />
                            <div>
                              <div className="font-medium text-sm">{prod.name}</div>
                              <div className="text-xs text-neutral-500">{prod.categoryName}</div>
                            </div>
                          </div>
                          <span className="font-mono text-sm text-[#D4AF37]">${prod.price}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-out Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Sidebar menu */}
            <motion.div
              id="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`fixed top-0 right-0 h-full w-4/5 max-w-sm z-50 shadow-2xl flex flex-col justify-between ${
                isDarkMode ? 'bg-black text-white border-l border-neutral-800' : 'bg-white text-neutral-900 border-l border-neutral-200'
              }`}
              dir="ltr"
            >
              <div>
                {/* Header inside drawer */}
                <div className="p-6 flex justify-between items-center border-b border-neutral-800/10">
                  <span className="font-sans text-xl font-bold tracking-[0.2em] text-[#D4AF37]">VELARO</span>
                  <button
                    id="close-mobile-drawer"
                    onClick={() => setIsOpen(false)}
                    className={`p-1 rounded-full ${
                      isDarkMode ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>
 
                {/* Navigation items list */}
                <div className="py-6 px-4 space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      id={`mobile-nav-${item.id}`}
                      onClick={() => {
                        setView(item.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                        currentView === item.id
                          ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                          : isDarkMode
                          ? 'hover:bg-neutral-900 text-neutral-200'
                          : 'hover:bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
 
              {/* Drawer footer */}
              <div className="p-6 border-t border-neutral-800/10">
                <p className="text-xs text-neutral-500 text-center mb-4">
                  © {new Date().getFullYear()} VELARO. All rights reserved.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="p-2 bg-neutral-900 rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors">
                    <Instagram size={16} />
                  </a>
                  <a href="#" className="p-2 bg-neutral-900 rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors">
                    <Facebook size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
