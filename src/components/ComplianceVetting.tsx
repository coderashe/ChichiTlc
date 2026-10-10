import React from 'react';
import { ShieldCheck, UserCheck, FileCheck, Award, Zap, Phone, ArrowRight } from 'lucide-react';

interface ComplianceVettingProps {
  onEmergencyRequest: () => void;
}

export const ComplianceVetting: React.FC<ComplianceVettingProps> = ({ onEmergencyRequest }) => {
  const steps = [
    {
      icon: ShieldCheck,
      title: 'Enhanced DBS with Barred Lists',
      desc: 'Live online update service validation before every shift assignment.',
    },
    {
      icon: FileCheck,
      title: 'CSTF Mandatory Training',
      desc: 'Annual practical certificates for moving & handling, BLS, and infection control.',
    },
    {
      icon: UserCheck,
      title: '5-Year Reference Verification',
      desc: 'Clinical competency references obtained directly from previous nurse managers.',
    },
    {
      icon: Award,
      title: 'Right to Work & Identity Vetting',
      desc: 'Strict biometric identity verification conforming with UK Home Office standards.',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Clinical Governance & Safety First</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#0e223d]">
            Our 21-Point Vetting & DBS Standard
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            We understand that care quality depends entirely on the integrity and skill of the carers entering your facility. Every ChichiTlc worker passes our comprehensive vetting pipeline.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="font-extrabold text-base text-[#0e223d]">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Fast Emergency Callout Banner */}
        <div className="bg-gradient-to-r from-[#0e223d] via-[#16365c] to-[#0e223d] text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 border-2 border-amber-400/40">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>Short Notice Sickness Cover Needed?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need Cover in Under 2 Hours?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Our on-call rapid dispatch team is operational 24/7. Call our emergency hotline or submit an urgent short-notice request online.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <a
              href="tel:+441234567890"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-[#0e223d] font-bold rounded-full text-sm shadow transition"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Call +44 123 456 7890</span>
            </a>

            <button
              onClick={onEmergencyRequest}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full text-sm shadow-lg shadow-amber-500/30 transition cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Request Urgent Staff &rarr;</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
