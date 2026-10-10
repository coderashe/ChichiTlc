import React, { useState } from 'react';
import { Building2, Home, CalendarCheck, Zap, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { FacilityType } from '../types/staffing';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string, defaultFacilityType: FacilityType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      icon: Building2,
      title: 'Care Home Staffing',
      subtitle: 'Residential & Nursing Homes',
      description: 'Skilled and compassionate carers for residential and nursing homes.',
      details: [
        'Experienced Healthcare Assistants (HCA) and Registered Nurses (RGN)',
        'Dementia-trained, manual handling certified, and medication competent',
        'Support for elderly residential, nursing, and end-of-life care environments',
        'Available for single shifts, block bookings, or weekend cover',
      ],
      facilityType: 'Care Home' as FacilityType,
    },
    {
      id: 2,
      icon: Home,
      title: 'Supported Living',
      subtitle: 'Independence & Community Care',
      description: 'Experienced staff for independent living and community-based support.',
      details: [
        'Dedicated Support Workers for learning disabilities, autism & mental health',
        'Promotion of independence, life skills, and active community participation',
        'Trained in Positive Behaviour Support (PBS) and PMVA de-escalation',
        'Sleep-in, waking night, and 24/7 supported living rotational packages',
      ],
      facilityType: 'Supported Living' as FacilityType,
    },
    {
      id: 3,
      icon: CalendarCheck,
      title: 'Respite & Planned Cover',
      subtitle: 'Advance Rota Management',
      description: 'Cover for annual leave, sickness and other planned absences.',
      details: [
        'Prevent burnout and maintain safe staffing ratios ahead of time',
        'Seamless rota integration with dedicated regular agency personnel',
        'Advance booking discounts for monthly and seasonal cover plans',
        'Consistent carers who familiarise themselves with resident care plans',
      ],
      facilityType: 'Nursing Home' as FacilityType,
    },
    {
      id: 4,
      icon: Zap,
      title: 'Short Notice Staffing',
      subtitle: 'Rapid Emergency Cover',
      description: 'Fast, efficient response when you’re short-staffed or face unexpected gaps.',
      details: [
        'Rapid deployment within 45 to 90 minutes across West Midlands',
        '24/7 dedicated out-of-hours booking coordinator hotline',
        'Pre-vetted, compliant carers on active standby roster',
        'Real-time SMS/email ETA updates with worker profile and DBS number',
      ],
      facilityType: 'Hospital' as FacilityType,
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching mockup */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
            OUR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0e223d] tracking-tight">
            Care Staffing Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We provide flexible, dependable and professional care staff to suit your needs.
          </p>
        </div>

        {/* 4 Cards Grid matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-13 h-13 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-600 mb-5 group-hover:scale-105 group-hover:bg-amber-100 transition-transform">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <h3 className="font-extrabold text-lg text-[#0e223d] mb-2 tracking-tight group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs font-semibold text-amber-700/80 mb-2">
                    {service.subtitle}
                  </p>

                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModal(index)}
                    className="text-xs font-bold text-slate-600 hover:text-amber-600 transition cursor-pointer"
                  >
                    View Details
                  </button>

                  {/* Circular Gold Button with arrow matching mockup */}
                  <button 
                    onClick={() => onSelectService(service.title, service.facilityType)}
                    className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white flex items-center justify-center shadow-md shadow-amber-500/25 transition-all transform hover:scale-105 cursor-pointer"
                    title={`Request ${service.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Detailed Service Specification */}
        {activeModal !== null && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  {React.createElement(services[activeModal].icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0e223d]">{services[activeModal].title}</h3>
                  <p className="text-xs text-amber-600 font-semibold">{services[activeModal].subtitle}</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                {services[activeModal].description}
              </p>

              <div className="space-y-2.5 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">What We Provide:</h4>
                {services[activeModal].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const svc = services[activeModal];
                    setActiveModal(null);
                    onSelectService(svc.title, svc.facilityType);
                  }}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow cursor-pointer flex items-center gap-2"
                >
                  <span>Request This Staff</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
