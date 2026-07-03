interface PrivacyAndTermsProps {
  viewType: 'privacy' | 'terms';
  isDarkMode: boolean;
}

export default function PrivacyAndTerms({ viewType, isDarkMode }: PrivacyAndTermsProps) {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-left" dir="ltr">
      {viewType === 'privacy' ? (
        <article className="space-y-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono block mb-2">Legal Documents</span>
            <h1 className={`text-3xl sm:text-5xl font-sans font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              Privacy Policy <span className="font-serif italic text-[#D4AF37]">& Data Security</span>
            </h1>
            <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
          </div>

          <p className={`text-sm sm:text-base leading-relaxed font-light ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
            Welcome to <strong>VELARO</strong>. We hold the privacy of our distinguished clientele in the highest regard. This document details the nature of the data we collect and how we ensure its absolute protection.
          </p>

          <section className="space-y-4">
            <h3 className="text-xl font-serif italic text-[#D4AF37]">1. Personal Data Collection & Processing</h3>
            <p className={`text-sm leading-relaxed font-light ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              We collect only the personal information necessary to deliver your bespoke wardrobe safely, including name, email, phone number, and street address. Your private details are never shared with unauthorized third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif italic text-[#D4AF37]">2. Secure SSL Payment Gateways</h3>
            <p className={`text-sm leading-relaxed font-light ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              All transactional and credit card information is processed securely over advanced Secure Sockets Layer (SSL) encryption. We do not store financial credentials or payment numbers on our private servers.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif italic text-[#D4AF37]">3. Cookies & User Preferences</h3>
            <p className={`text-sm leading-relaxed font-light ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Our boutique portal utilizes cookies to offer a seamless shopping session, maintaining your curated bag across pages and customizing the layout settings according to your viewing style.
            </p>
          </section>
        </article>
      ) : (
        <article className="space-y-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono block mb-2">Regulatory Documents</span>
            <h1 className={`text-3xl sm:text-5xl font-sans font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              Terms of Use <span className="font-serif italic text-[#D4AF37]">& Service Guidelines</span>
            </h1>
            <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
          </div>

          <p className={`text-sm sm:text-base leading-relaxed font-light ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
            By browsing or placing an order through the <strong>VELARO</strong> boutique, you unconditionally agree to abide by our established terms, policies, and luxury purchase protocols.
          </p>

          <section className="space-y-4">
            <h3 className="text-xl font-serif italic text-[#D4AF37]">1. Eligibility & Bespoke Orders</h3>
            <p className={`text-sm leading-relaxed font-light ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              The atelier reserves the right to decline, halt, or cancel orders that represent potential security concerns or display inaccurate billing or delivery information.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif italic text-[#D4AF37]">2. Currencies & Product Representation</h3>
            <p className={`text-sm leading-relaxed font-light ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              All prices are listed in US Dollars ($/USD). We guarantee that the garments shipped to your destination correspond precisely to the high-definition product photographs and descriptions displayed on our collections.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif italic text-[#D4AF37]">3. Trademark & Intellectual Property</h3>
            <p className={`text-sm leading-relaxed font-light ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              The brand VELARO, our visual identities, logo marks, photographic catalogs, layout designs, and custom copy represent the exclusive intellectual property of the brand. Any replication is strictly forbidden without our formal written approval.
            </p>
          </section>
        </article>
      )}
    </div>
  );
}
