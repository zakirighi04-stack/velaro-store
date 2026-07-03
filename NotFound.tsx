import { ArrowRight } from 'lucide-react';

interface NotFoundProps {
  setView: (view: string) => void;
  isDarkMode: boolean;
}

export default function NotFound({ setView, isDarkMode }: NotFoundProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center" dir="ltr">
      <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono font-bold mb-4">ERROR 404</span>
      
      <h1 className="text-4xl sm:text-6xl font-serif italic text-neutral-400 mb-6">
        Bespoke Page <span className="text-[#D4AF37]">Not Found</span>
      </h1>
      
      <p className={`text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-10 font-light ${
        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
      }`}>
        The page you are looking for may have been moved or is temporarily unavailable. Let us guide you back to our curated collections.
      </p>

      <button
        id="not-found-back-home"
        onClick={() => setView('home')}
        className="bg-black text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold text-xs tracking-widest uppercase px-8 py-4 transition-all flex items-center justify-center space-x-2"
      >
        <span>Return to Main Collection</span>
        <ArrowRight size={14} className="ml-2" />
      </button>
    </div>
  );
}
