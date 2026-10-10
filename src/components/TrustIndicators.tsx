import React from 'react';
import { ShieldCheck, Clock, Users2, Handshake, Heart } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: ShieldCheck,
      title: 'Qualified & Vetted Staff',
      description: 'All carers are fully trained, DBS checked and reference verified.',
    },
    {
      icon: Clock,
      title: 'Short Notice & Planned Cover',
      description: 'We can provide staff at short notice or for planned absences.',
    },
    {
      icon: Users2,
      title: 'Support for Care Providers',
      description: 'Care homes, supported living and other care settings.',
    },
    {
      icon: Handshake,
      title: 'Reliable & Professional',
      description: 'Committed to delivering consistent, high-quality care staffing solutions.',
    },
    {
      icon: Heart,
      title: 'Better Outcomes',
      description: 'Ensuring continuity of care for the people who matter.',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {indicators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="group p-5 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-amber-200 hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center justify-between"
              >
                <div className="w-14 h-14 rounded-full border-2 border-amber-400 bg-amber-50/80 flex items-center justify-center text-amber-600 mb-4 shadow-xs group-hover:scale-110 group-hover:bg-amber-100 transition-all">
                  <Icon className="w-7 h-7 stroke-[2.2]" />
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-sm text-[#0e223d] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
