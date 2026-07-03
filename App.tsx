import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import ProductDetailModal from './components/ProductDetailModal';
import CartSidebar from './components/CartSidebar';
import Checkout from './components/Checkout';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PrivacyAndTerms from './components/PrivacyAndTerms';
import NotFound from './components/NotFound';
import ShopAll from './components/ShopAll';
import Testimonials from './components/Testimonials';
import { PRODUCTS } from './data';
import { CartItem, Product, Color } from './types';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Load cart items from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('velaro_cart_items');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to parse saved cart items', err);
      }
    }
  }, []);

  // Save cart items to localStorage on modification
  useEffect(() => {
    localStorage.setItem('velaro_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle HTML document body theme class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#000000';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#FFFFFF';
    }
  }, [isDarkMode]);

  const handleAddToCart = (product: Product, quantity: number, size: string, color: Color) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingIdx > -1) {
        const nextItems = [...prevItems];
        nextItems[existingIdx].quantity += quantity;
        return nextItems;
      } else {
        return [...prevItems, { product, quantity, selectedSize: size, selectedColor: color }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number, size: string, colorName: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.name === colorName
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, size: string, colorName: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          )
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Simple Router Switcher
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero setView={setView} isDarkMode={isDarkMode} />
            <Categories onSelectCategory={handleSelectCategory} isDarkMode={isDarkMode} />
            <FeaturedProducts
              products={PRODUCTS}
              onSelectProduct={setSelectedProduct}
              isDarkMode={isDarkMode}
            />
            <Testimonials isDarkMode={isDarkMode} />
          </>
        );
      case 'shop':
        return (
          <ShopAll
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={setSelectedProduct}
            isDarkMode={isDarkMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      case 'about':
        return <AboutUs isDarkMode={isDarkMode} />;
      case 'faq':
        return <FAQ isDarkMode={isDarkMode} />;
      case 'contact':
        return <ContactUs isDarkMode={isDarkMode} />;
      case 'privacy':
        return <PrivacyAndTerms viewType="privacy" isDarkMode={isDarkMode} />;
      case 'terms':
        return <PrivacyAndTerms viewType="terms" isDarkMode={isDarkMode} />;
      case 'checkout':
        return (
          <Checkout
            cartItems={cartItems}
            onClearCart={handleClearCart}
            setView={setView}
            isDarkMode={isDarkMode}
          />
        );
      default:
        return <NotFound setView={setView} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div
      className={`min-h-screen font-sans flex flex-col justify-between transition-colors duration-300 ${
        isDarkMode ? 'bg-[#000000] text-white' : 'bg-white text-neutral-900'
      }`}
    >
      {/* Dynamic Header & Navigation */}
      <Navbar
        currentView={currentView}
        setView={(v) => {
          setView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onSearch={handleSearch}
        allProducts={PRODUCTS}
        setSelectedProduct={(prod) => {
          setSelectedProduct(prod);
        }}
      />

      {/* Main Rendered Workspace View */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Interactive Elements: Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={() => {
              setView('checkout');
              setIsCartOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>

      {/* Global Interactive Elements: Product Quickview Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            allProducts={PRODUCTS}
            setSelectedProduct={setSelectedProduct}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>

      {/* Premium Footer layout */}
      <Footer setView={setView} isDarkMode={isDarkMode} />
    </div>
  );
}
