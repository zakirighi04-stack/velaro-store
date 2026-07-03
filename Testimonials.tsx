import { Star, Quote, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface TestimonialsProps {
  isDarkMode: boolean;
}

const REVIEWS = [
  {
    id: 'r1',
    author: 'Alexander Wright',
    role: 'Managing Director, Bespoke Capital',
    rating: 5,
    comment: 'The Italian Cashmere Wool Overcoat is a absolute masterpiece. The drape, the shoulder silhouette, and the sublime warmth are incomparable. VELARO represents the summit of contemporary sartorial excellence.',
    date: '1 month ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'r2',
    author: 'Charles Montgomery',
    role: 'Architect & Fine Art Collector',
    rating: 5,
    comment: 'I ordered the Giza Egyptian Cotton Shirts. The high-density double-ply weave, premium mother-of-pearl buttons, and customized fit make this my absolute favorite everyday wardrobe staple.',
    date: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'r3',
    author: 'Julien Mercer',
    role: 'Executive Creative Director',
    rating: 5,
    comment: 'The Italian Suede Chelsea Boots are flawless. Extremely versatile, beautifully crafted in Tuscany, and remarkably comfortable from day one. Perfect with both formal tailoring and premium denim.',
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop'
  }
];

export default function Testimonials({ isDarkMode }: TestimonialsProps) {
  return (
    <section id="testimonials-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800/10 text-left" dir="ltr">
      {/* Editorial Header */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono mb-2 flex items-center justify-center space-x-2">
          <Sparkles size={12} className="text-[#D4AF37]" />
          <span>Vouched Royal Experiences</span>
        </span>
        <h2 className={`text-2xl sm:text-4xl font-sans font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
          What Our <span className="font-serif italic text-[#D4AF37]">Esteemed Clientele</span> Say
        </h2>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((review, index) => (
          <motion.div
            key={review.id}
            id={`testimonial-card-${review.id}`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className={`p-8 border rounded-xl flex flex-col justify-between h-full relative transition-all hover:border-[#D4AF37]/30 ${
              isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-white border-neutral-200'
            }`}
          >
            {/* Decorative Quote Icon */}
            <div className="absolute top-6 right-6 text-neutral-800/10 pointer-events-none">
              <Quote size={56} className="rotate-180" />
            </div>

            <div className="space-y-4">
              {/* Stars */}
              <div className="flex items-center text-amber-500 space-x-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    fill={idx < Math.floor(review.rating) ? 'currentColor' : 'none'}
                    className={idx < Math.floor(review.rating) ? 'text-[#D4AF37]' : 'text-neutral-600'}
                  />
                ))}
              </div>

              {/* Review Comment */}
              <p className={`text-xs sm:text-sm leading-relaxed font-light ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
              }`}>
                "{review.comment}"
              </p>
            </div>

            {/* Profile detail bottom */}
            <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-neutral-800/10">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-10 h-10 object-cover rounded-full border border-[#D4AF37]/40 flex-shrink-0"
              />
              <div>
                <h4 className="font-semibold text-sm">{review.author}</h4>
                <div className="flex items-center space-x-2 text-[10px] text-neutral-500 mt-0.5">
                  <span className="text-[#D4AF37]">{review.role}</span>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
