import React from 'react';
import { Check, ArrowRight, Award, ShieldCheck, HeartPulse } from 'lucide-react';

interface AboutSectionProps {
  onRequestStaff: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onRequestStaff }) => {
  const checklist = [
    'Experienced & trained carers',
    'DBS checked and reference verified',
    'Flexible and responsive service',
    'Local and national coverage',
    'A partner you can rely on',
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Authentic Photography matching mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-200/40 to-slate-200/50 rounded-3xl blur-xs -z-10"></div>

              {/* Main Photo: Carer hands gently holding senior hands */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50 aspect-[4/3] sm:aspect-[4/3] bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80" 
                  alt="Carer hands holding elderly person's hands with compassion and dignity"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e223d]/40 via-transparent to-transparent pointer-events-none"></div>

                {/* Floating badge bottom right */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                  <HeartPulse className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-xs font-bold text-[#0e223d]">Person-Centred Care</p>
                    <p className="text-[10px] text-slate-500">Dignity, Respect & Compassion</p>
                  </div>
                </div>
              </div>

              {/* Top Left Experience Badge */}
              <div className="absolute -top-4 -left-4 bg-[#0e223d] text-white p-3 sm:p-4 rounded-2xl shadow-xl border-2 border-amber-400 hidden sm:flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="text-lg font-black leading-none text-white">100%</p>
                  <p className="text-[10px] text-slate-300 font-medium">Compliance Pass Rate</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Content matching mockup */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header */}
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
                ABOUT CHICHITLC LTD
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0e223d] tracking-tight mt-2 leading-tight">
                Your Trusted Care Staffing Partner
              </h2>
            </div>

            {/* Paragraph matching mockup */}
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              At ChichiTlc Ltd, we understand the pressures care providers face. That’s why we’re committed to supplying reliable, skilled and caring professionals who make a real difference. Our focus is on quality, consistency and building long-term partnerships based on trust.
            </p>

            {/* Checklist with golden check circles matching mockup */}
            <div className="pt-2">
              <ul className="space-y-3.5">
                {checklist.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-700 font-semibold text-sm sm:text-base">
                    <span className="w-6 h-6 rounded-full bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center text-xs shrink-0 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button matching mockup: "More About Us ->" */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button 
                onClick={onRequestStaff}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold rounded-full shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base"
              >
                <span>More About Us</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500 pl-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Audited annually to NHS Employers and CQC frameworks</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
