import React from 'react';
import { Users, ArrowRight, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onRequestStaff: () => void;
  onLearnMore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestStaff, onLearnMore }) => {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-200/70 overflow-hidden">
      
      {/* Subtle decorative background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#0e223d]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-800 uppercase tracking-widest shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>WELCOME TO</span>
            </div>

            {/* Headline matching image */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0e223d] tracking-tight leading-[1.1]">
                Chichi<span className="text-amber-500">Tlc</span> Ltd
              </h1>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0e223d] leading-snug">
                Reliable Care Staff, When You Need Them
              </p>
            </div>

            {/* Paragraph copy matching image */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              We supply qualified, experienced and compassionate carers to support care homes, supported living services and other care providers — especially when you are short-staffed or need additional cover.
            </p>

            {/* CTAs matching image */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={onRequestStaff}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold rounded-full shadow-lg shadow-amber-500/30 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer text-base"
              >
                <Users className="w-5 h-5" />
                <span>Request Staff</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button 
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-[#0e223d] font-bold rounded-full border-2 border-slate-300 shadow-sm transition-all duration-200 cursor-pointer text-base"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-3 text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs font-semibold">Fast <span className="text-slate-900">15m</span> Response</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold">100% Vetted Carers</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs font-semibold">24/7 Dedicated Cover</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-200/50 via-slate-200 to-amber-100/50 rounded-[2.5rem] blur-xs -z-10"></div>

              {/* Main Photo: Compassionate nurse and elderly resident */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/3] sm:aspect-[16/11]">
                <img 
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80" 
                  alt="ChichiTlc Ltd nurse in uniform caring warmly for a senior resident"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e223d]/30 via-transparent to-transparent pointer-events-none"></div>

                {/* Bottom Left live badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                  <div>
                    <p className="text-[11px] font-bold text-[#0e223d]">Available Now</p>
                    <p className="text-[10px] text-slate-500">28 Carers on standby in West Midlands</p>
                  </div>
                </div>
              </div>

              {/* Top Right Floating Script Sticker matching mockup: "Flexible staffing for better care 💛" */}
              <div className="absolute -top-5 right-2 sm:-top-6 sm:right-6 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl border-2 border-amber-200 rotate-2 sm:rotate-3 flex items-center gap-2 transform hover:rotate-0 transition-transform">
                <span className="font-handwriting text-2xl sm:text-3xl font-bold text-[#0e223d] tracking-wide">
                  Flexible staffing for better care
                </span>
                <span className="text-amber-500 text-xl animate-bounce">💛</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
