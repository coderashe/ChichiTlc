import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Hero Section matching the ChichiTlc Ltd mockup -->
    <section class="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-200/70 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Text Content -->
          <div class="lg:col-span-6 space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-xs font-bold text-amber-800 uppercase tracking-widest">
              <span>WELCOME TO</span>
            </div>

            <div class="space-y-2">
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0e223d] tracking-tight leading-[1.1]">
                Chichi<span class="text-amber-500">Tlc</span> Ltd
              </h1>
              <p class="text-2xl sm:text-3xl font-bold text-[#0e223d]">
                Reliable Care Staff, When You Need Them
              </p>
            </div>

            <p class="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              We supply qualified, experienced and compassionate carers to support care homes, supported living services and other care providers — especially when you are short-staffed or need additional cover.
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-2">
              <button 
                (click)="onRequestStaff.emit()"
                class="inline-flex items-center gap-2.5 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full shadow-md shadow-amber-500/25 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span>Request Staff &rarr;</span>
              </button>

              <a 
                href="#services"
                class="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-[#0e223d] font-semibold rounded-full border border-slate-300 shadow-sm transition-all duration-200">
                <span>Learn More &rarr;</span>
              </a>
            </div>
          </div>

          <!-- Right Hero Image with Floating Badge -->
          <div class="lg:col-span-6 relative">
            <div class="relative mx-auto max-w-lg lg:max-w-none">
              <!-- Rounded Hero Image with Nurse & Patient -->
              <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/3] sm:aspect-[16/11]">
                <img 
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80" 
                  alt="Compassionate healthcare nurse assisting an elderly care resident"
                  class="w-full h-full object-cover object-center"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0e223d]/40 via-transparent to-transparent"></div>
              </div>

              <!-- Top Right Floating Handwriting Badge -->
              <div class="absolute -top-4 -right-2 sm:-top-6 sm:right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-2xl shadow-lg border border-amber-200 rotate-2 flex items-center gap-2">
                <span class="font-handwriting text-xl sm:text-2xl font-bold text-[#0e223d]">
                  Flexible staffing for better care
                </span>
                <span class="text-amber-500 text-lg">💛</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 5 Trust Indicators Bar -->
    <section class="py-10 bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          @for (item of trustIndicators; track item.title) {
            <div class="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-200 text-center flex flex-col items-center">
              <div class="w-12 h-12 rounded-full border-2 border-amber-400 bg-amber-50 flex items-center justify-center text-amber-600 mb-3 shadow-inner">
                <span class="text-xl">{{ item.icon }}</span>
              </div>
              <h3 class="font-bold text-sm text-[#0e223d] mb-1.5">{{ item.title }}</h3>
              <p class="text-xs text-slate-500 leading-snug">{{ item.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-16 md:py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <span class="text-xs font-extrabold uppercase tracking-widest text-amber-600">OUR SERVICES</span>
          <h2 class="text-3xl font-extrabold text-[#0e223d] mt-2 mb-3">Care Staffing Solutions</h2>
          <p class="text-slate-600 text-sm sm:text-base">We provide flexible, dependable and professional care staff to suit your needs.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (service of services; track service.title) {
            <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div class="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 text-2xl mb-5 group-hover:scale-110 transition-transform">
                  {{ service.icon }}
                </div>
                <h3 class="font-bold text-lg text-[#0e223d] mb-2">{{ service.title }}</h3>
                <p class="text-sm text-slate-500 leading-relaxed mb-6">{{ service.description }}</p>
              </div>

              <button 
                (click)="onRequestStaff.emit()"
                class="self-end w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
                title="Request this service">
                &rarr;
              </button>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- About ChichiTlc Ltd Section -->
    <section class="py-16 md:py-24 bg-white border-t border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div class="lg:col-span-5">
            <div class="relative rounded-3xl overflow-hidden shadow-xl border-4 border-slate-50">
              <img 
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80" 
                alt="Compassionate hands of carer holding hands of elderly client"
                class="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>

          <div class="lg:col-span-7 space-y-6">
            <div>
              <span class="text-xs font-extrabold uppercase tracking-widest text-amber-600">ABOUT CHICHITLC LTD</span>
              <h2 class="text-3xl font-extrabold text-[#0e223d] mt-2">Your Trusted Care Staffing Partner</h2>
            </div>

            <p class="text-slate-600 leading-relaxed text-sm sm:text-base">
              At ChichiTlc Ltd, we understand the pressures care providers face. That’s why we’re committed to supplying reliable, skilled and caring professionals who make a real difference. Our focus is on quality, consistency and building long-term partnerships based on trust.
            </p>

            <ul class="space-y-3 pt-2">
              @for (point of checklist; track point) {
                <li class="flex items-center gap-3 text-sm sm:text-base font-medium text-slate-700">
                  <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  <span>{{ point }}</span>
                </li>
              }
            </ul>

            <div class="pt-4">
              <button 
                (click)="onRequestStaff.emit()"
                class="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full shadow-md transition-all cursor-pointer">
                Request Staffing Support &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="py-14 bg-[#0e223d] text-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div class="md:col-span-4 border-b md:border-b-0 md:border-r border-slate-700 pb-6 md:pb-0 md:pr-6">
            <span class="text-xs font-bold tracking-widest text-amber-400 uppercase">WHAT OUR CLIENTS SAY</span>
            <h3 class="text-2xl font-bold mt-1 text-white">Trusted by Care Providers</h3>
          </div>
          <div class="md:col-span-8 space-y-3">
            <p class="text-base sm:text-lg italic text-slate-200">
              "ChichiTlc Ltd has been a fantastic partner for our service. They provide reliable, professional staff at short notice, which gives us real peace of mind."
            </p>
            <p class="text-xs font-semibold text-amber-400 uppercase tracking-wider">— Care Home Manager, Birmingham</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {
  @Output() onRequestStaff = new EventEmitter<void>();

  trustIndicators = [
    { icon: '🛡️', title: 'Qualified & Vetted Staff', description: 'All carers are fully trained, DBS checked and reference verified.' },
    { icon: '⏱️', title: 'Short Notice & Planned Cover', description: 'We can provide staff at short notice or for planned absences.' },
    { icon: '👥', title: 'Support for Care Providers', description: 'Care homes, supported living and other care settings.' },
    { icon: '🤝', title: 'Reliable & Professional', description: 'Committed to delivering consistent, high-quality care staffing solutions.' },
    { icon: '❤️', title: 'Better Outcomes', description: 'Ensuring continuity of care for the people who matter.' },
  ];

  services = [
    { icon: '🩺', title: 'Care Home Staffing', description: 'Skilled and compassionate carers for residential and nursing homes.' },
    { icon: '🏠', title: 'Supported Living', description: 'Experienced staff for independent living and community-based support.' },
    { icon: '👥', title: 'Respite & Planned Cover', description: 'Cover for annual leave, sickness and other planned absences.' },
    { icon: '⚡', title: 'Short Notice Staffing', description: 'Fast, efficient response when you’re short-staffed or face unexpected gaps.' },
  ];

  checklist = [
    'Experienced & trained carers',
    'DBS checked and reference verified',
    'Flexible and responsive service',
    'Local and national coverage',
    'A partner you can rely on',
  ];
}
