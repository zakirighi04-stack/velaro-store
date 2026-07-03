import { useState, useEffect } from 'react';
import { X, Star, Heart, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Color } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size: string, color: Color) => void;
  allProducts: Product[];
  setSelectedProduct: (product: Product) => void;
  isDarkMode: boolean;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  allProducts,
  setSelectedProduct,
  isDarkMode,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<Color>(product.colors[0] || { name: 'أسود', hex: '#000' });
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Keep image and choices synced when product changes
  useEffect(() => {
    setSelectedImage(product.mainImage);
    setSelectedSize(product.sizes[0] || 'M');
    setSelectedColor(product.colors[0] || { name: 'أسود', hex: '#000' });
    setQuantity(1);
    setIsAdded(false);
  }, [product]);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // Curate Related products in same category
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10" dir="ltr">
      {/* Dark overlay backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className={`relative w-full max-w-6xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-xl overflow-y-auto shadow-2xl flex flex-col justify-between ${
          isDarkMode ? 'bg-[#0a0a0a] border border-white/10 text-white' : 'bg-white border border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Close Button */}
        <button
          id="close-product-modal"
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full z-10 transition-colors ${
            isDarkMode ? 'hover:bg-neutral-800 text-neutral-400 hover:text-white' : 'hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <X size={20} />
        </button>

        {/* Content Section */}
        <div className="p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left: Images Panel */}
            <div className="flex flex-col space-y-4">
              {/* Main Image Stage */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 rounded-lg">
                <img src={selectedImage} alt={product.name} className="w-full h-full object-cover transition-all duration-500" />
              </div>
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      id={`product-thumb-${idx}`}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border ${
                        selectedImage === img ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-neutral-800/20'
                      }`}
                    >
                      <img src={img} alt="Product detail thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Information & Customizers */}
            <div className="flex flex-col justify-between text-left space-y-6">
              <div>
                {/* Meta details */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                    {product.categoryName}
                  </span>
                  <div className="flex items-center text-amber-500 space-x-1">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                    <span className={`text-xs ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      ({product.reviewsCount} verified reviews)
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight mb-4">
                  {product.name}
                </h2>

                {/* Price tag */}
                <div className="mb-6">
                  <span className="text-neutral-400 text-xs block mb-1">Investment Value</span>
                  <span className="text-2xl sm:text-3xl font-mono text-[#D4AF37] font-extrabold">
                    ${product.price}
                  </span>
                </div>

                {/* Editorial Description */}
                <p className={`text-sm sm:text-base leading-relaxed mb-6 font-light ${
                  isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  {product.description}
                </p>

                {/* Color Chooser */}
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-3 font-semibold">
                    Select Premium Color: <span className={isDarkMode ? 'text-white' : 'text-neutral-950'}>{selectedColor.name}</span>
                  </span>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        id={`color-select-${color.name}`}
                        onClick={() => setSelectedColor(color)}
                        className={`w-9 h-9 rounded-full border-2 transition-transform ${
                          selectedColor.name === color.name ? 'border-[#D4AF37] scale-110' : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor.name === color.name && (
                          <Check
                            size={14}
                            className={`mx-auto ${
                              color.hex === '#FFFFFF' ? 'text-black' : 'text-white'
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Chooser */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                      Bespoke Size:
                    </span>
                    <button className="text-xs text-[#D4AF37] hover:underline">Italian Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        id={`size-select-${size}`}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] h-12 border px-4 flex items-center justify-center text-sm font-semibold transition-all ${
                          selectedSize === size
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                            : isDarkMode
                            ? 'border-neutral-800 text-white hover:border-[#D4AF37]'
                            : 'border-neutral-200 text-neutral-800 hover:border-[#D4AF37]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Checkout action */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                  {/* Quantity selector */}
                  <div className={`flex items-center border rounded-md h-12 w-32 justify-between px-3 ${
                    isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
                  }`}>
                    <button
                      id="qty-decrement"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-neutral-400 hover:text-[#D4AF37] font-bold text-lg px-2"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm font-semibold">{quantity}</span>
                    <button
                      id="qty-increment"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="text-neutral-400 hover:text-[#D4AF37] font-bold text-lg px-2"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to cart trigger */}
                  <button
                    id="add-to-cart-button"
                    onClick={handleAdd}
                    className="flex-1 bg-black text-white hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/50 font-semibold text-sm tracking-widest uppercase transition-colors h-12 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    {isAdded ? (
                      <>
                        <Check size={16} />
                        <span>Added to your luxury bag!</span>
                      </>
                    ) : (
                      <span>Add to shopping bag</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Material Specs */}
              <div className={`border-t pt-6 ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">
                  Garment Specifications & Composition:
                </h4>
                <ul className="space-y-2 text-xs font-light text-neutral-400">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#D4AF37] mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className={`p-6 sm:p-8 md:p-10 border-t ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
            <h3 className="text-lg font-serif italic text-[#D4AF37] mb-8 text-left">Curated Items for You</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <button
                  key={rel.id}
                  id={`related-product-${rel.id}`}
                  onClick={() => {
                    setSelectedProduct(rel);
                  }}
                  className={`group text-left focus:outline-none flex flex-col justify-between h-full border p-3 rounded-lg ${
                    isDarkMode ? 'border-neutral-800/50 hover:border-[#D4AF37]/40' : 'border-neutral-200 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-md bg-neutral-900 mb-3">
                    <img src={rel.mainImage} alt={rel.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                  </div>
                  <h4 className={`text-sm font-semibold mb-1 truncate ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{rel.name}</h4>
                  <span className="text-[#D4AF37] font-mono text-sm font-bold">${rel.price}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
