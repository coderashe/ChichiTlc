import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, Calendar, Linkedin, Facebook, Instagram, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onRequestStaff: () => void;
  onNavigate: (view: 'home' | 'request' | 'code', hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestStaff, onNavigate }) => {
  return (
    <footer id="contact" className="bg-[#09172a] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Logo (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div onClick={() => onNavigate('home')} className="cursor-pointer inline-block">
              <Logo variant="dark" size="md" />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm pt-2">
              We supply qualified, experienced and compassionate carers to support care homes, supported living services, and acute hospital wards across Birmingham, the West Midlands, and UK nationwide.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                DBS & CQC Vetting Standards
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">24/7 On-Call Support</span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home', '#about')} className="hover:text-amber-400 transition cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home', '#services')} className="hover:text-amber-400 transition cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home', '#why-choose-us')} className="hover:text-amber-400 transition cursor-pointer">
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home', '#contact')} className="hover:text-amber-400 transition cursor-pointer">
                  Contact
                </button>
              </li>
              {/*}
              <li>
                <button onClick={() => onNavigate('code')} className="text-rose-400 hover:text-rose-300 transition cursor-pointer">
                  Angular 17 Code
                </button>
              </li>
              */}
            </ul>
          </div>

          {/* Col 3: Contact Us (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+441234567890" className="hover:text-white font-semibold transition">
                  +44 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@chichitlc.co.uk" className="hover:text-white font-semibold transition">
                  info@chichitlc.co.uk
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Birmingham, West Midlands, UK</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Action & Socials (2 cols) */}
          <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
            <div>
              <button
                onClick={onRequestStaff}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs rounded-full shadow-lg shadow-amber-500/25 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Request Staff</span>
              </button>
            </div>

            {/* Social icons matching mockup */}
            <div className="space-y-2">
              <p className="text-[11px] text-slate-500 font-semibold">Connect With Us</p>
              <div className="flex items-center gap-2.5">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-white text-slate-300 flex items-center justify-center transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-white text-slate-300 flex items-center justify-center transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-white text-slate-300 flex items-center justify-center transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip matching mockup */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 powered by iStartK. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <span>Care</span>
            <span>•</span>
            <span>Support</span>
            <span>•</span>
            <span>Solutions</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
