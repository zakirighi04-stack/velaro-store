import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  setView: (view: string) => void;
  isDarkMode: boolean;
}

export default function Hero({ setView, isDarkMode }: HeroProps) {
  return (
    <div className={`relative min-h-[90vh] flex overflow-hidden border-b ${
      isDarkMode ? 'border-white/10' : 'border-neutral-200'
    }`} dir="ltr">
      {/* Side Info Rail */}
      <div className={`hidden md:flex w-16 border-r flex-col items-center justify-center gap-24 py-10 z-10 relative ${
        isDarkMode ? 'border-white/10' : 'border-neutral-100'
      }`}>
        <div className={`-rotate-90 origin-center whitespace-nowrap text-[9px] font-mono tracking-[0.35em] ${
          isDarkMode ? 'text-white/30' : 'text-neutral-400'
        }`}>
          PARIS • LONDON • MILAN • NEW YORK
        </div>
        <div className="flex flex-col gap-3 items-center">
          <div className={`w-4 h-px ${isDarkMode ? 'bg-white/20' : 'bg-neutral-300'}`}></div>
          <div className="w-6 h-px bg-[#D4AF37]"></div>
          <div className={`w-4 h-px ${isDarkMode ? 'bg-white/20' : 'bg-neutral-300'}`}></div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-grow flex items-center relative">
        {/* Background Image overlay with premium grading */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Men's Wear Banner"
            className="w-full h-full object-cover object-top filter brightness-[0.4] transition-transform duration-[2000ms] hover:scale-105"
          />
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-[#000000]/95 via-transparent to-black/85' 
              : 'bg-gradient-to-r from-white/90 via-transparent to-white/70'
          }`} />
        </div>

        {/* Decorative subtle gold line */}
        <div className="absolute top-20 left-10 w-40 h-40 border border-[#D4AF37]/10 rounded-full pointer-events-none animate-spin-slow hidden md:block" />

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full relative z-10 py-24">
          <div className="max-w-2xl text-left">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-3 mb-6"
            >
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono font-bold">
                Limited & Exclusive Edition
              </span>
            </motion.div>

            {/* Main Display Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-4xl sm:text-6xl lg:text-7xl font-sans tracking-tight mb-8 leading-[1.1] font-light ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}
            >
              Modern Elegance <br />
              <span className="font-serif italic font-thin text-[#D4AF37]">With Classic Scale</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-xs sm:text-sm lg:text-base leading-relaxed font-light mb-12 max-w-lg italic ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              A bespoke collection tailored from the finest Italian virgin wool and grade-A cashmere. Immaculate attention to detail, precision hand-tailoring, and an authoritative fit for the modern gentleman.
            </motion.p>

            {/* Dual Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-row space-x-6 items-center"
            >
              {/* Primary Action Button - High Contrast block */}
              <button
                id="hero-shop-now"
                onClick={() => setView('shop')}
                className={`px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center shadow-sm ${
                  isDarkMode 
                    ? 'bg-white text-black hover:bg-[#D4AF37] hover:text-black' 
                    : 'bg-black text-white hover:bg-[#D4AF37] hover:text-black'
                }`}
              >
                <span>Shop Collection</span>
                <ArrowRight className="ml-2" size={14} />
              </button>

              {/* Secondary Action Button - Delicate underline */}
              <button
                id="hero-view-heritage"
                onClick={() => setView('about')}
                className={`text-[11px] uppercase tracking-widest border-b pb-1 font-semibold transition-colors duration-300 bg-transparent ${
                  isDarkMode 
                    ? 'border-white/30 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]' 
                    : 'border-black/30 text-neutral-800 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
              >
                Our Italian Heritage
              </button>
            </motion.div>
          </div>
        </div>

        {/* Fine-art Details along margins */}
        <div className={`absolute bottom-6 left-6 hidden lg:flex items-center space-x-4 font-mono text-[9px] tracking-widest ${
          isDarkMode ? 'text-white/40' : 'text-neutral-500'
        }`}>
          <span>VELARO COUTURE</span>
          <span className={`w-6 h-px ${isDarkMode ? 'bg-white/20' : 'bg-neutral-300'}`} />
          <span>100% HAND TAILORED</span>
        </div>

        <div className={`absolute bottom-6 right-6 hidden lg:flex items-center space-x-4 font-mono text-[9px] tracking-widest ${
          isDarkMode ? 'text-white/40' : 'text-neutral-500'
        }`}>
          <span>MILANO — FIRENZE — NEW YORK</span>
        </div>
      </div>
    </div>
  );
}
