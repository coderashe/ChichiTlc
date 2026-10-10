import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "ChichiTlc Ltd has been a fantastic partner for our service. They provide reliable, professional staff at short notice, which gives us real peace of mind.",
      author: "Care Home Manager",
      facility: "Residential & Dementia Care Home, Birmingham",
      rating: 5,
    },
    {
      id: 2,
      quote: "When two night nurses called in sick at 6pm on a Friday, ChichiTlc had two fully compliant, competent RGNs on our ward by 7:30pm. Outstanding emergency responsiveness.",
      author: "Clinical Director",
      facility: "Sub-acute Rehabilitation Hospital, Solihull",
      rating: 5,
    },
    {
      id: 3,
      quote: "Their support workers understand person-centred care instinctively. Our residents with autism and challenging behaviours respond exceptionally well to their consistent team.",
      author: "Registered Manager",
      facility: "Supported Living Community, West Midlands",
      rating: 5,
    },
  ];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeItem = testimonials[currentIdx];

  return (
    <section id="why-choose-us" className="py-16 md:py-20 bg-[#0e223d] text-white relative overflow-hidden scroll-mt-20">
      
      {/* Decorative Golden Heart Outline doodle matching mockup */}
      <div className="absolute right-8 bottom-6 opacity-20 pointer-events-none hidden md:block">
        <svg className="w-32 h-32 text-amber-400 stroke-current fill-none stroke-[1.5]" viewBox="0 0 100 100">
          <path d="M50,85 C25,60 10,45 10,28 C10,15 20,5 34,5 C42,5 48,10 50,15 C52,10 58,5 66,5 C80,5 90,15 90,28 C90,45 75,60 50,85 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading matching mockup */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-700/80 pb-8 lg:pb-0 lg:pr-8 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              WHAT OUR CLIENTS SAY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Trusted by Care Providers
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Discover why NHS trusts, independent care homes, and supported living providers rely on ChichiTlc Ltd every single day.
            </p>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 text-amber-400 pt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="text-xs text-slate-300 ml-2 font-medium">4.9 / 5 Client Satisfaction</span>
            </div>
          </div>

          {/* Right Column: Quote matching mockup */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="relative pl-2 sm:pl-4">
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Quote className="w-6 h-6 stroke-[2]" />
              </div>

              {/* Main Quote text */}
              <blockquote className="text-xl sm:text-2xl lg:text-2xl font-medium text-slate-100 leading-relaxed italic">
                "{activeItem.quote}"
              </blockquote>

              {/* Author & Facility */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-base font-bold text-amber-400">
                    — {activeItem.author}
                  </p>
                  <p className="text-xs text-slate-300">
                    {activeItem.facility}
                  </p>
                </div>

                {/* Navigation Dots and Arrows */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 mr-2">
                    {testimonials.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setCurrentIdx(dotIdx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          dotIdx === currentIdx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-600 hover:bg-slate-500'
                        }`}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition cursor-pointer"
                    aria-label="Previous quote"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition cursor-pointer"
                    aria-label="Next quote"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
