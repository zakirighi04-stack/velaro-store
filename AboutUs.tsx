import { motion } from 'motion/react';
import { Award, Compass, Heart } from 'lucide-react';

interface AboutUsProps {
  isDarkMode: boolean;
}

export default function AboutUs({ isDarkMode }: AboutUsProps) {
  const values = [
    {
      icon: <Award className="text-[#D4AF37]" size={28} />,
      title: 'Uncompromising Craftsmanship',
      desc: 'Exquisite Italian stitching and ultra-dense fibers ensure that each piece retains its structured form and elegant drape for decades.'
    },
    {
      icon: <Compass className="text-[#D4AF37]" size={28} />,
      title: 'Modern Italian Tailoring',
      desc: 'Structured cuts crafted in Milan ateliers, blending historic tailoring techniques with modern, elegant contours.'
    },
    {
      icon: <Heart className="text-[#D4AF37]" size={28} />,
      title: 'Ethical Natural Fibers',
      desc: 'Committed to organic sustainability, sourcing only virgin cashmere, Grade-A merino wool, and 100% Giza Egyptian cotton.'
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" dir="ltr">
      {/* Intro Editorial Banner */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono block mb-2">About Us</span>
        <h1 className={`text-3xl sm:text-5xl font-sans font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
          The Legend of <span className="font-serif italic text-[#D4AF37]">VELARO</span> • Elite Presence
        </h1>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
      </div>

      {/* Grid of details: Text + Image layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        {/* Description */}
        <div className="text-left space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif italic text-[#D4AF37]">The Vision & Craft Behind the Brand</h2>
          <p className={`text-sm sm:text-base leading-relaxed font-light ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
            The vision of <strong className="text-[#D4AF37] font-semibold">VELARO</strong> was born in the historic ateliers of Milan, Italy — the global capital of luxury menswear. We set out to create a new paradigm of tailoring that addresses the modern gentleman who values premium heritage, confidence, and impeccable aesthetics.
          </p>
          <p className={`text-sm sm:text-base leading-relaxed font-light ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
            Each piece in our collections is crafted with over 30 years of artisanal expertise. We meticulously select and refine biological, extra-long natural fibers to express structured geometric silhouettes and clean classic tones like Camel Gold, Charcoal Slate, and Royal Obsidian.
          </p>
          <p className={`text-sm sm:text-base leading-relaxed font-light ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
            At VELARO, we do not simply design apparel; we offer an enduring investment in personal style, custom-built for high-profile business meetings, formal events, and unforgettable life moments.
          </p>
        </div>

        {/* Image with design borders */}
        <div className="relative">
          <div className="absolute inset-4 border border-[#D4AF37]/30 -m-4 pointer-events-none rounded-lg" />
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
            alt="Tailoring craftsmanship"
            className="w-full aspect-[4/3] object-cover shadow-2xl rounded-lg filter brightness-90 hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>

      {/* Three Pillars (Core Values) */}
      <div className={`p-10 border rounded-2xl ${isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
        <h3 className="text-xl sm:text-2xl font-serif italic text-[#D4AF37] text-center mb-10">The Core Pillars of Our Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => (
            <div key={idx} className="text-center flex flex-col items-center space-y-4">
              <div className="p-4 bg-[#D4AF37]/5 rounded-full border border-[#D4AF37]/20">
                {v.icon}
              </div>
              <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{v.title}</h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xs">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
