import { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, ChevronLeft, CheckCircle, Package, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  onClearCart: () => void;
  setView: (view: string) => void;
  isDarkMode: boolean;
}

export default function Checkout({ cartItems, onClearCart, setView, isDarkMode }: CheckoutProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form States
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'New York, NY',
    address: '',
    zip: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 300 ? 0 : 15;
  const grandTotal = subtotal + shippingFee;

  const validateShipping = () => {
    const errors: Record<string, string> = {};
    if (!shippingInfo.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!shippingInfo.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.email = 'Please enter a valid email address';
    if (!shippingInfo.phone.trim()) errors.phone = 'Please enter a valid phone number';
    if (!shippingInfo.address.trim()) errors.address = 'Please enter your complete delivery street address';
    if (!shippingInfo.zip.trim()) errors.zip = 'Please enter your ZIP code';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = () => {
    const errors: Record<string, string> = {};
    if (!paymentInfo.cardName.trim()) errors.cardName = "Please enter the cardholder's full name";
    if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) errors.cardNumber = 'Please enter a valid 16-digit card number';
    if (!paymentInfo.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) errors.expiry = 'Incorrect format (MM/YY)';
    if (paymentInfo.cvc.length < 3 || paymentInfo.cvc.length > 4) errors.cvc = 'Invalid security CVC/CVV code';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateShipping()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validatePayment()) {
        setStep(3);
        // Clear global cart after placing order
        setTimeout(() => {
          onClearCart();
        }, 100);
      }
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" dir="ltr">
      {/* Checkout Steps Header */}
      <div className="flex justify-center items-center mb-12 space-x-4">
        <div className="flex items-center space-x-2">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            step >= 1 ? 'bg-[#D4AF37] text-black' : 'bg-neutral-800 text-neutral-400'
          }`}>
            1
          </span>
          <span className={`text-sm ${step >= 1 ? 'text-[#D4AF37] font-semibold' : 'text-neutral-500'}`}>Shipping & Address</span>
        </div>
        <span className="w-12 h-[1px] bg-neutral-850" />
        <div className="flex items-center space-x-2">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            step >= 2 ? 'bg-[#D4AF37] text-black' : 'bg-neutral-800 text-neutral-400'
          }`}>
            2
          </span>
          <span className={`text-sm ${step >= 2 ? 'text-[#D4AF37] font-semibold' : 'text-neutral-500'}`}>Secure Payment</span>
        </div>
        <span className="w-12 h-[1px] bg-neutral-850" />
        <div className="flex items-center space-x-2">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            step === 3 ? 'bg-[#D4AF37] text-black' : 'bg-neutral-800 text-neutral-400'
          }`}>
            3
          </span>
          <span className={`text-sm ${step === 3 ? 'text-[#D4AF37] font-semibold' : 'text-neutral-500'}`}>Confirmation</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step < 3 ? (
          <motion.div
            key="checkout-inputs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            {/* Input Forms (Col 1-7) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {step === 1 && (
                <div className={`p-8 border rounded-xl ${isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-white border-neutral-200'}`}>
                  <h3 className="text-xl font-serif italic text-[#D4AF37] mb-6 flex items-center space-x-2">
                    <Truck size={20} />
                    <span>Shipping Details & Home Delivery</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                      <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">Full Name *</label>
                      <input
                        id="shipping-fullname"
                        type="text"
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                          isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                        }`}
                        placeholder="Alexander Wright"
                      />
                      {formErrors.fullName && <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>}
                    </div>

                    <div>
                      <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">Email Address *</label>
                      <input
                        id="shipping-email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                          isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                        }`}
                        placeholder="client@velaro.com"
                      />
                      {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                    </div>

                    <div>
                      <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">Phone Number *</label>
                      <input
                        id="shipping-phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                          isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                        }`}
                        placeholder="+1 (555) 019-2834"
                      />
                      {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                    </div>

                    <div>
                      <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">City *</label>
                      <select
                        id="shipping-city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                          isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                        }`}
                      >
                        <option value="New York, NY">New York, NY</option>
                        <option value="Los Angeles, CA">Los Angeles, CA</option>
                        <option value="Chicago, IL">Chicago, IL</option>
                        <option value="Houston, TX">Houston, TX</option>
                        <option value="Phoenix, AZ">Phoenix, AZ</option>
                        <option value="Miami, FL">Miami, FL</option>
                        <option value="San Francisco, CA">San Francisco, CA</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">ZIP / Postal Code *</label>
                      <input
                        id="shipping-zip"
                        type="text"
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                          isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                        }`}
                        placeholder="10019"
                      />
                      {formErrors.zip && <p className="text-xs text-red-500 mt-1">{formErrors.zip}</p>}
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">Street Address *</label>
                      <textarea
                        id="shipping-address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] h-24 resize-none ${
                          isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                        }`}
                        placeholder="Apartment, Suite, Unit, House No., Street Name"
                      />
                      {formErrors.address && <p className="text-xs text-red-500 mt-1">{formErrors.address}</p>}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className={`p-8 border rounded-xl ${isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-white border-neutral-200'}`}>
                  <h3 className="text-xl font-serif italic text-[#D4AF37] mb-6 flex items-center space-x-2">
                    <CreditCard size={20} />
                    <span>Secure Credit & Debit Card Payment</span>
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">Cardholder Name *</label>
                      <input
                        id="payment-cardname"
                        type="text"
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                          isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                        }`}
                        placeholder="ALEXANDER WRIGHT"
                      />
                      {formErrors.cardName && <p className="text-xs text-red-500 mt-1">{formErrors.cardName}</p>}
                    </div>

                    <div>
                      <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">Card Number (16 Digits) *</label>
                      <input
                        id="payment-cardnumber"
                        type="text"
                        maxLength={19}
                        value={paymentInfo.cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          setPaymentInfo({ ...paymentInfo, cardNumber: val });
                        }}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] font-mono ${
                          isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                        }`}
                        placeholder="4000 1234 5678 9010"
                      />
                      {formErrors.cardNumber && <p className="text-xs text-red-500 mt-1">{formErrors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">Expiry Date (MM/YY) *</label>
                        <input
                          id="payment-cardexpiry"
                          type="text"
                          maxLength={5}
                          value={paymentInfo.expiry}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                          className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] font-mono ${
                            isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                          }`}
                          placeholder="12/28"
                        />
                        {formErrors.expiry && <p className="text-xs text-red-500 mt-1">{formErrors.expiry}</p>}
                      </div>

                      <div>
                        <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">CVC / CVV Security Code *</label>
                        <input
                          id="payment-cardcvc"
                          type="password"
                          maxLength={4}
                          value={paymentInfo.cvc}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cvc: e.target.value })}
                          className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] font-mono ${
                            isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                          }`}
                          placeholder="•••"
                        />
                        {formErrors.cvc && <p className="text-xs text-red-500 mt-1">{formErrors.cvc}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step Control Buttons */}
              <div className="flex justify-between items-center pt-4">
                {step === 2 ? (
                  <button
                    id="checkout-back-step"
                    onClick={() => setStep(1)}
                    className="text-neutral-400 hover:text-white flex items-center space-x-2 text-sm font-semibold"
                  >
                    <ChevronLeft size={16} />
                    <span>Back to Shipping</span>
                  </button>
                ) : (
                  <div />
                )}
                <button
                  id="checkout-next-step"
                  onClick={handleNextStep}
                  className="bg-[#D4AF37] text-black font-semibold text-sm px-10 py-4 hover:bg-white hover:text-black transition-colors shadow-lg flex items-center space-x-2"
                >
                  <span>{step === 1 ? 'Proceed to Payment' : 'Place Secure Order'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Live Order Summary (Col 8-12) */}
            <div className="lg:col-span-5 text-left">
              <div className={`p-6 border rounded-xl sticky top-28 space-y-6 ${
                isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-white border-neutral-200'
              }`}>
                <h3 className="text-lg font-sans font-bold border-b border-neutral-800/10 pb-4">
                  Order Investment Summary
                </h3>

                {/* Items preview list */}
                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
                  {cartItems.map((item, idx) => (
                    <div key={`${item.product.id}-${idx}`} className="flex items-center space-x-3">
                      <img src={item.product.mainImage} alt={item.product.name} className="w-12 h-16 object-cover rounded bg-neutral-900" />
                      <div className="flex-grow min-w-0">
                        <h4 className="text-sm font-semibold truncate">{item.product.name}</h4>
                        <div className="flex space-x-2 text-[10px] text-neutral-400 mt-1">
                          <span>Size: {item.selectedSize}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-mono text-sm text-[#D4AF37] font-semibold flex-shrink-0">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals table */}
                <div className="space-y-3 pt-4 border-t border-neutral-800/20 text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono text-neutral-200">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Air Shipping:</span>
                    <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold pt-3 border-t border-neutral-800/20 text-white">
                    <span className={isDarkMode ? 'text-white' : 'text-neutral-900'}>Total Amount:</span>
                    <span className="font-mono text-[#D4AF37] text-lg font-bold">${grandTotal}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-neutral-500 font-mono pt-2">
                  <ShieldCheck size={14} className="text-neutral-500" />
                  <span>Encrypted with advanced 256-bit SSL protocol</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Order Success screen (Step 3) */
          <motion.div
            key="checkout-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center py-12"
          >
            {/* Visual Confirmed Crown/Check */}
            <div className="relative inline-flex items-center justify-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-24 h-24 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border-2 border-[#D4AF37]"
              >
                <CheckCircle size={48} className="text-[#D4AF37]" />
              </motion.div>
            </div>

            {/* Titles */}
            <h2 className="text-3xl sm:text-4xl font-serif italic text-[#D4AF37] mb-4">
              Your Order Has Been Confirmed
            </h2>
            <p className={`text-sm sm:text-base mb-10 max-w-lg mx-auto font-light leading-relaxed ${
              isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              Welcome to the exclusive world of <span className="font-sans font-bold text-[#D4AF37]">VELARO</span>. We are deeply honored by your selection. A digital receipt and real-time delivery tracker have been sent to your email address.
            </p>

            {/* Simulated Logistics Progress */}
            <div className={`p-6 border rounded-xl text-left grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 ${
              isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <div className="flex items-start space-x-3">
                <Package className="text-[#D4AF37] mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Bespoke Order Number</h4>
                  <p className="font-mono text-xs text-[#D4AF37] font-bold">V-2026-98432</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="text-[#D4AF37] mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Expected Delivery Date</h4>
                  <p className="text-xs text-neutral-400">2-3 Business Days (Express Air Priority)</p>
                </div>
              </div>
            </div>

            {/* Back action */}
            <button
              id="checkout-success-home"
              onClick={() => setView('home')}
              className="bg-black text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold text-sm px-10 py-4 uppercase tracking-widest transition-colors shadow-lg"
            >
              Continue Browsing Collections
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
