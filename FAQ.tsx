import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, Truck, HelpCircle as HelpIcon, RotateCcw } from 'lucide-react';

interface FAQProps {
  isDarkMode: boolean;
}

const FAQS = [
  {
    category: 'shipping',
    question: 'What are your shipping rates and delivery timelines?',
    answer: 'We provide complimentary Express Shipping on all domestic US orders. Deliveries are handled by DHL Express or FedEx, taking 2-3 business days. A signature is required upon delivery for security.'
  },
  {
    category: 'shipping',
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship globally to over 80 countries. International shipping fees and duties are calculated at checkout, taking 3-5 business days.'
  },
  {
    category: 'returns',
    question: 'What is your return or exchange policy?',
    answer: 'We accept returns and exchanges on unworn, unaltered items in original packaging with security tags attached within 14 days of delivery. Return shipping is free for domestic orders.'
  },
  {
    category: 'sizing',
    question: 'How do I determine the perfect size for myself?',
    answer: 'Each product detail page features an accurate sizing guide. We offer bespoke sizing advice via our styling advisors who are available via our contact channels.'
  },
  {
    category: 'care',
    question: 'How should I care for my cashmere and wool garments?',
    answer: 'Our bespoke coats and luxury trousers should be dry cleaned only at professional facilities. Store in the breathable linen suit bags provided to preserve structural integrity.'
  }
];

export default function FAQ({ isDarkMode }: FAQProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'shipping' | 'returns' | 'sizing' | 'care'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Questions', icon: <HelpIcon size={14} /> },
    { id: 'shipping', label: 'Shipping & Delivery', icon: <Truck size={14} /> },
    { id: 'returns', label: 'Returns & Exchanges', icon: <RotateCcw size={14} /> },
    { id: 'sizing', label: 'Sizing & Fitting', icon: <HelpCircle size={14} /> },
    { id: 'care', label: 'Garment Care', icon: <HelpCircle size={14} /> }
  ];

  const filteredFaqs = FAQS.filter((f) => {
    if (activeCategory === 'all') return true;
    return f.category === activeCategory;
  });

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-left" dir="ltr">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono block mb-2">Customer Care Center</span>
        <h1 className={`text-3xl sm:text-5xl font-sans font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
          Frequently Asked <span className="font-serif italic text-[#D4AF37]">Questions</span>
        </h1>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
      </div>

      {/* Category Tabs selectors */}
      <div className="flex flex-wrap gap-2 justify-center mb-10 border-b border-neutral-800/10 pb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`faq-tab-${cat.id}`}
            onClick={() => {
              setActiveCategory(cat.id as any);
              setOpenIndex(null);
            }}
            className={`px-5 py-3 text-xs font-semibold rounded-full border flex items-center space-x-2 transition-all ${
              activeCategory === cat.id
                ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg'
                : isDarkMode
                ? 'border-neutral-800 text-neutral-300 hover:border-[#D4AF37]'
                : 'border-neutral-200 text-neutral-700 hover:border-[#D4AF37]'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* FAQs List Accordion */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <p className="text-center text-sm text-neutral-400">No questions under this category currently.</p>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                id={`faq-row-${index}`}
                className={`border rounded-xl transition-all overflow-hidden ${
                  isOpen
                    ? 'border-[#D4AF37]'
                    : isDarkMode
                    ? 'border-neutral-800 bg-[#121212]'
                    : 'border-neutral-200 bg-white'
                }`}
              >
                {/* Header Row clickable */}
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left text-sm sm:text-base font-semibold focus:outline-none"
                >
                  <span className={isOpen ? 'text-[#D4AF37]' : isDarkMode ? 'text-white' : 'text-neutral-900'}>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-[#D4AF37] flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown size={18} className="text-neutral-500 flex-shrink-0 ml-4" />
                  )}
                </button>

                {/* Answer block */}
                {isOpen && (
                  <div className={`px-6 pb-5 text-xs sm:text-sm leading-relaxed border-t pt-4 ${
                    isDarkMode ? 'text-neutral-400 border-neutral-800' : 'text-neutral-600 border-neutral-200'
                  }`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Additional assistance card */}
      <div className={`mt-16 p-8 border rounded-xl text-center space-y-4 ${
        isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
      }`}>
        <div className="p-3 bg-[#D4AF37]/5 rounded-full border border-[#D4AF37]/20 text-[#D4AF37] w-12 h-12 flex items-center justify-center mx-auto">
          <MessageSquare size={20} />
        </div>
        <h3 className="font-semibold text-base">Have a custom inquiry that is not answered here?</h3>
        <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
          Our personal styling advisors are available 24/7 to guide you through your wardrobe choices.
        </p>
        <button
          id="faq-contact-cta"
          className="bg-black text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold text-xs px-8 py-3 transition-colors shadow"
          onClick={() => {
            const mainNavbar = document.getElementById('main-navbar');
            if (mainNavbar) {
              const navContact = document.getElementById('nav-link-contact');
              if (navContact) navContact.click();
            }
          }}
        >
          Connect With An Advisor
        </button>
      </div>
    </div>
  );
}
