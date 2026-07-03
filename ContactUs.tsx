import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactUsProps {
  isDarkMode: boolean;
}

export default function ContactUs({ isDarkMode }: ContactUsProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Sizing Consultations',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Please enter your full name';
    if (!form.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) errs.email = 'Please enter a valid email address';
    if (!form.message.trim()) errs.message = 'Please type your message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSent(true);
      setTimeout(() => {
        setForm({ name: '', email: '', subject: 'General Sizing Consultations', message: '' });
      }, 500);
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" dir="ltr">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono block mb-2">Contact Us</span>
        <h1 className={`text-3xl sm:text-5xl font-sans font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
          Service Befitting <span className="font-serif italic text-[#D4AF37]">The Elite of VELARO</span>
        </h1>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Coordinates (Col 1-5) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <h2 className="text-2xl font-serif italic text-[#D4AF37] mb-6">Direct Channels</h2>
          
          <div className={`p-6 border rounded-xl flex items-start space-x-4 transition-all hover:border-[#D4AF37]/40 ${
            isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <div className="p-3 bg-[#D4AF37]/5 rounded-full border border-[#D4AF37]/20 text-[#D4AF37] flex-shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">United Concierge Service</h3>
              <p className="font-mono text-sm text-neutral-400">+1 (800) 555-8832</p>
              <p className="text-xs text-neutral-500 mt-1">Monday to Sunday, 9:00 AM – 10:00 PM EST</p>
            </div>
          </div>

          <div className={`p-6 border rounded-xl flex items-start space-x-4 transition-all hover:border-[#D4AF37]/40 ${
            isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <div className="p-3 bg-[#D4AF37]/5 rounded-full border border-[#D4AF37]/20 text-[#D4AF37] flex-shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Client Relations & Solutions</h3>
              <p className="font-mono text-sm text-neutral-400">concierge@velaro-luxury.com</p>
              <p className="text-xs text-neutral-500 mt-1">We respond to all inquiries within 2 hours.</p>
            </div>
          </div>

          <div className={`p-6 border rounded-xl flex items-start space-x-4 transition-all hover:border-[#D4AF37]/40 ${
            isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <div className="p-3 bg-[#D4AF37]/5 rounded-full border border-[#D4AF37]/20 text-[#D4AF37] flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Flagship Atelier & Showroom</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">Fifth Avenue Suite 410, King Street, Midtown Manhattan, New York, NY 10019</p>
            </div>
          </div>

          {/* Majestic Mock Map */}
          <div className="border border-neutral-800/10 rounded-xl overflow-hidden aspect-[16/9] relative bg-neutral-950">
            <div className="absolute inset-0 bg-neutral-900 opacity-60">
              {/* Elegant mockup grids representing streets */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-neutral-800" />
              <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-neutral-800" />
              <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-neutral-800" />
              <div className="absolute top-0 bottom-0 left-2/3 w-[2px] bg-neutral-800" />
            </div>
            {/* Crown point pin */}
            <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-4 h-4 bg-[#D4AF37] rounded-full animate-ping absolute" />
              <div className="w-4 h-4 bg-[#D4AF37] rounded-full relative border-2 border-[#0B0B0B]" />
              <span className="text-[9px] tracking-widest text-white bg-black border border-[#D4AF37] px-2 py-0.5 mt-1 font-sans rounded">VELARO Flagship</span>
            </div>
          </div>
        </div>

        {/* Support Ticketing Form (Col 6-12) */}
        <div className="lg:col-span-7 text-left">
          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`p-8 border rounded-xl space-y-6 ${
                  isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-white border-neutral-200'
                }`}
              >
                <h3 className="text-xl font-serif italic text-[#D4AF37] mb-2">Submit a Bespoke Wardrobe Inquiry</h3>
                <p className="text-xs text-neutral-500 mb-6">Fill out the details to open a direct channel with our head couturiers and personal styling advisors.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                        isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                      }`}
                      placeholder="Alexander Wright"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                        isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                      }`}
                      placeholder="client@velaro.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">Inquiry Subject *</label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                    }`}
                  >
                    <option value="General Sizing Consultations">General Sizing & Italian Cut Consultations</option>
                    <option value="Track or Modify Order">Track or Modify an Existing Active Order</option>
                    <option value="Bespoke Wardrobe Requests">Bespoke Wardrobe & Tailored Suits Appointments</option>
                    <option value="Commercial Partnerships">Commercial Partnerships & Wholesale Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase text-neutral-400 font-bold block mb-2">Your Message *</label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] h-32 resize-none ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                    }`}
                    placeholder="Please write down your detailed questions here..."
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  className="w-full bg-[#D4AF37] text-black font-semibold text-sm py-4 hover:bg-white hover:text-black transition-colors flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send size={16} />
                  <span>Submit Inquiry Ticket</span>
                </button>
              </motion.form>
            ) : (
              /* Success form confirmation state */
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-8 border rounded-xl text-center space-y-6 ${
                  isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-white border-neutral-200'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-serif italic text-[#D4AF37]">Inquiry Ticket Logged</h3>
                <p className="text-sm text-neutral-400 leading-relaxed max-w-md mx-auto">
                  Thank you for contacting us. Your inquiry has been successfully registered under ticket ID <strong className="text-white font-mono text-sm tracking-wider font-bold">#V-TCK-9874</strong>. Our personal styling advisors are reviewing your request and will follow up with you via email within 2 hours.
                </p>
                <button
                  id="contact-success-reset"
                  onClick={() => setIsSent(false)}
                  className="bg-neutral-900 border border-neutral-800 text-xs font-semibold tracking-widest text-white px-8 py-3 hover:border-[#D4AF37] transition-all"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
