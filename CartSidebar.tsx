import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Plus, Minus, Tag, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, size: string, colorName: string) => void;
  onRemoveItem: (productId: string, size: string, colorName: string) => void;
  onCheckout: () => void;
  isDarkMode: boolean;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isDarkMode,
}: CartSidebarProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'VELARO10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Royal Discount applied successfully!');
    } else {
      setPromoError('The promo code is invalid or has expired.');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal > 300 ? 0 : 15;
  const grandTotal = subtotal - discountAmount + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir="ltr">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0B0B0B]"
      />

      {/* Cart Panel Stage */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <motion.div
          id="cart-sidebar"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.35 }}
          className={`w-screen max-w-md flex flex-col justify-between shadow-2xl h-full border-l ${
            isDarkMode ? 'bg-[#0B0B0B] text-white border-neutral-800' : 'bg-white text-neutral-900 border-neutral-200'
          }`}
        >
          {/* Cart Header */}
          <div className="p-6 border-b border-neutral-800/10 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="text-[#D4AF37]" size={20} />
              <span className="font-sans text-lg font-bold tracking-tight">Luxury Shopping Bag</span>
              <span className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded">
                ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              id="close-cart"
              onClick={onClose}
              className={`p-2 rounded-full ${
                isDarkMode ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100'
              }`}
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <ShoppingBag size={48} className="text-neutral-600 stroke-[1]" />
                <h3 className="font-serif italic text-lg text-neutral-400">Your Shopping Bag is Empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                  Explore our curated collections and choose bespoke garments tailored for an immaculate fit.
                </p>
                <button
                  id="cart-empty-shop-now"
                  onClick={() => {
                    onCheckout(); // fallback to trigger view change indirectly
                    onClose();
                  }}
                  className="bg-[#D4AF37] text-black text-xs font-semibold tracking-widest uppercase px-6 py-3 hover:bg-neutral-900 hover:text-[#D4AF37] transition-colors"
                >
                  Shop Collection Now
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                  id={`cart-item-${item.product.id}-${idx}`}
                  className="flex items-center space-x-4 border-b border-neutral-800/10 pb-4 last:border-0"
                >
                  {/* Image */}
                  <img
                    src={item.product.mainImage}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded bg-neutral-900 flex-shrink-0"
                  />

                  {/* Info details */}
                  <div className="flex-grow text-left min-w-0">
                    <h4 className="text-sm font-semibold truncate mb-1">{item.product.name}</h4>
                    
                    {/* Size and Color descriptors */}
                    <div className="flex flex-wrap gap-2 text-[11px] text-neutral-400 mb-2">
                      <span className="bg-neutral-850/50 px-2 py-0.5 rounded">Size: {item.selectedSize}</span>
                      <span className="flex items-center space-x-1 bg-neutral-850/50 px-2 py-0.5 rounded">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.selectedColor.hex }} />
                        <span>{item.selectedColor.name}</span>
                      </span>
                    </div>

                    {/* Counter and pricing */}
                    <div className="flex justify-between items-center">
                      {/* Increment / Decrement Counter */}
                      <div className="flex items-center border border-neutral-800/10 rounded h-7">
                        <button
                          id={`cart-qty-dec-${item.product.id}-${idx}`}
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1),
                              item.selectedSize,
                              item.selectedColor.name
                            )
                          }
                          className="px-2 text-neutral-500 hover:text-red-500"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="px-2 font-mono text-xs font-semibold">{item.quantity}</span>
                        <button
                          id={`cart-qty-inc-${item.product.id}-${idx}`}
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedSize,
                              item.selectedColor.name
                            )
                          }
                          className="px-2 text-neutral-500 hover:text-green-500"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      {/* Price indicator */}
                      <span className="font-mono text-sm text-[#D4AF37] font-semibold">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Trash remove icon */}
                  <button
                    id={`cart-item-remove-${item.product.id}-${idx}`}
                    onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor.name)}
                    className="p-1 rounded text-neutral-400 hover:text-red-500 hover:bg-red-500/5 transition-colors self-start"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Pricing Summary and Promo Application */}
          {cartItems.length > 0 && (
            <div className={`p-6 border-t space-y-4 ${
              isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              {/* Promo code submission */}
              <form onSubmit={handleApplyPromo} className="relative flex items-center mb-2">
                <input
                  id="promo-code-input"
                  type="text"
                  placeholder="Enter Royal Promo Code (e.g. VELARO10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-2 text-xs text-[#D4AF37] font-semibold hover:underline"
                >
                  Apply
                </button>
              </form>
              
              {promoError && <p className="text-[10px] text-red-500 text-left">{promoError}</p>}
              {promoSuccess && <p className="text-[10px] text-green-500 text-left flex items-center space-x-1"><Tag size={10} /><span>{promoSuccess}</span></p>}

              {/* Subtotal blocks */}
              <div className="space-y-2 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-neutral-200 font-semibold">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Royal Promo Discount:</span>
                    <span className="font-mono">- ${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Courier Shipping:</span>
                  <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-center pt-3 border-t border-neutral-800/20">
                <span className="text-sm font-semibold">Total Investment:</span>
                <span className="text-lg font-mono text-[#D4AF37] font-bold">${grandTotal}</span>
              </div>

              {/* Secure labels */}
              <div className="flex items-center justify-center space-x-2 text-[10px] text-neutral-500 font-mono">
                <ShieldCheck size={12} className="text-neutral-500" />
                <span>100% Encrypted & Secure Payment Gateway</span>
              </div>

              {/* Final trigger button */}
              <button
                id="cart-checkout-button"
                onClick={() => {
                  onCheckout();
                  onClose();
                }}
                className="w-full bg-[#D4AF37] text-black font-semibold text-sm py-4 hover:bg-white hover:text-black transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
