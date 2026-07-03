import React, { useState } from 'react';
import { Mail, Instagram, Facebook, Twitter, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  setView: (view: string) => void;
  isDarkMode: boolean;
}

export default function Footer({ setView, isDarkMode }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Please enter a valid email address to subscribe.');
      return;
    }

    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 1000);
  };

  return (
    <footer
      className={`border-t ${
        isDarkMode
          ? 'bg-[#0B0B0B] text-white border-neutral-800'
          : 'bg-neutral-50 text-neutral-900 border-neutral-200'
      }`}
      dir="ltr"
    >
      {/* Pre-footer Quick Bar */}
      <div className={`grid grid-cols-1 md:grid-cols-4 border-b text-[10px] uppercase tracking-[0.2em] font-medium ${
        isDarkMode 
          ? 'border-white/10 text-white/60 bg-black/40' 
          : 'border-neutral-200 text-neutral-600 bg-neutral-100/50'
      }`}>
        <div className={`border-r p-6 transition-all duration-300 text-center flex flex-col items-center justify-center space-y-1 ${
          isDarkMode ? 'border-white/10 hover:bg-white hover:text-black' : 'border-neutral-200 hover:bg-neutral-900 hover:text-white'
        }`}>
          <span className="text-[#D4AF37] font-bold block text-xs">01</span>
          <span>Bespoke Sizing & Custom Tailoring</span>
          <span className="text-[8px] opacity-75 font-mono">TAILORING SERVICES</span>
        </div>
        <div className={`border-r p-6 transition-all duration-300 text-center flex flex-col items-center justify-center space-y-1 ${
          isDarkMode ? 'border-white/10 hover:bg-white hover:text-black' : 'border-neutral-200 hover:bg-neutral-900 hover:text-white'
        }`}>
          <span className="text-[#D4AF37] font-bold block text-xs">02</span>
          <span>Private Sartorial Consultation</span>
          <span className="text-[8px] opacity-75 font-mono">PRIVATE CONSULTATION</span>
        </div>
        <div className={`border-r p-6 transition-all duration-300 text-center flex flex-col items-center justify-center space-y-1 ${
          isDarkMode ? 'border-white/10 hover:bg-white hover:text-black' : 'border-neutral-200 hover:bg-neutral-900 hover:text-white'
        }`}>
          <span className="text-[#D4AF37] font-bold block text-xs">03</span>
          <span>Secured Worldwide Express Delivery</span>
          <span className="text-[8px] opacity-75 font-mono">WORLDWIDE LOGISTICS</span>
        </div>
        <div className={`p-6 transition-all duration-300 text-center flex flex-col items-center justify-center space-y-1 ${
          isDarkMode 
            ? 'bg-white text-black font-bold hover:bg-[#D4AF37]' 
            : 'bg-neutral-900 text-white font-bold hover:bg-[#D4AF37] hover:text-black'
        }`}>
          <span className="text-xs tracking-[0.2em] font-black uppercase flex items-center gap-1 animate-pulse justify-center">
            ★ JOIN THE INNER CIRCLE
          </span>
          <span className="text-[8px] opacity-90 font-mono">THE INNER CIRCLE</span>
        </div>
      </div>

      {/* Newsletter premium block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-neutral-800/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-mono flex items-center space-x-2">
              <Sparkles size={12} />
              <span>JOIN OUR EXCLUSIVE ELITE</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-serif italic text-[#D4AF37] mt-2 mb-3">
              Subscribe to the VELARO Journal
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Be the first to receive releases of our limited edition seasonal collections, private showroom invitations, and bespoke style curations directly in your inbox.
            </p>
          </div>

          <div className="lg:col-span-5 text-left">
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="subscribe-form"
                  onSubmit={handleSubscribe}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex items-center"
                >
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-4 pr-32 rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] border text-sm ${
                      isDarkMode
                        ? 'bg-neutral-900 border-neutral-800 text-white'
                        : 'bg-white border-neutral-200 text-neutral-900'
                    }`}
                  />
                  <button
                    type="submit"
                    className="absolute right-4 text-[#D4AF37] font-semibold hover:underline text-xs"
                  >
                    Join Circle
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-500/10 border border-green-500/30 p-4 rounded text-center flex items-center justify-center space-x-2"
                >
                  <Check size={16} className="text-green-500" />
                  <span className="text-xs text-green-500 font-semibold">
                    Welcome to the Inner Circle! Check your inbox for exclusive updates.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            {error && <p className="text-xs text-red-500 mt-2 text-left">{error}</p>}
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap & info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
        {/* Brand details */}
        <div className="space-y-4">
          <span className="font-sans text-2xl font-bold tracking-[0.25em] text-[#D4AF37]">VELARO</span>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            At VELARO, we redefine luxury menswear through a meticulous marriage of ancestral Italian tailoring techniques and the finest organic fabrics.
          </p>
          <div className="flex space-x-3">
            <a href="#" className="p-2 bg-neutral-900 rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors">
              <Instagram size={14} />
            </a>
            <a href="#" className="p-2 bg-neutral-900 rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors">
              <Facebook size={14} />
            </a>
            <a href="#" className="p-2 bg-neutral-900 rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors">
              <Twitter size={14} />
            </a>
          </div>
        </div>

        {/* Sitemap */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold mb-4">Bespoke Navigation</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
            <li>
              <button onClick={() => setView('home')} className="hover:text-[#D4AF37] transition-colors">Home Front</button>
            </li>
            <li>
              <button onClick={() => setView('shop')} className="hover:text-[#D4AF37] transition-colors">Shop All</button>
            </li>
            <li>
              <button onClick={() => setView('about')} className="hover:text-[#D4AF37] transition-colors">Bespoke Story</button>
            </li>
            <li>
              <button onClick={() => setView('faq')} className="hover:text-[#D4AF37] transition-colors">F.A.Q</button>
            </li>
            <li>
              <button onClick={() => setView('contact')} className="hover:text-[#D4AF37] transition-colors">Contact Concierge</button>
            </li>
          </ul>
        </div>

        {/* Legal links */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold mb-4">Legal & Policies</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
            <li>
              <button onClick={() => setView('privacy')} className="hover:text-[#D4AF37] transition-colors">Privacy Policy</button>
            </li>
            <li>
              <button onClick={() => setView('terms')} className="hover:text-[#D4AF37] transition-colors">Terms of Use</button>
            </li>
            <li>
              <button onClick={() => setView('faq')} className="hover:text-[#D4AF37] transition-colors">Sartorial Size Guide</button>
            </li>
            <li>
              <button onClick={() => setView('faq')} className="hover:text-[#D4AF37] transition-colors">Shipping & Air Freight</button>
            </li>
          </ul>
        </div>

        {/* Support coordinates */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold mb-4">Flagship Atelier</h4>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Fifth Avenue Suite 410, King Street, Midtown Manhattan, New York, NY 10019
          </p>
          <p className="font-mono text-xs text-neutral-400 block">Concierge: +1 (800) 555-8832</p>
          <p className="font-mono text-xs text-neutral-400 block">Email: concierge@velaro-luxury.com</p>
        </div>
      </div>

      {/* Under footer */}
      <div className="border-t border-neutral-800/10 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
        <p className="mb-4 md:mb-0">
          © {new Date().getFullYear()} VELARO Inc. All rights reserved. Registered trademark of Luxury Menswear & Bespoke Atelier.
        </p>

        {/* Payment badges */}
        <div className="flex space-x-3 items-center">
          <span className="text-[10px] uppercase font-mono tracking-wider">Secured via:</span>
          <span className="bg-neutral-800 text-white px-2 py-1 rounded font-bold text-[10px]">AMEX</span>
          <span className="bg-neutral-800 text-white px-2 py-1 rounded font-bold text-[10px]">VISA</span>
          <span className="bg-neutral-800 text-white px-2 py-1 rounded font-bold text-[10px]">MC</span>
          <span className="bg-neutral-800 text-white px-2 py-1 rounded font-bold text-[10px]">ApplePay</span>
        </div>
      </div>
    </footer>
  );
}
