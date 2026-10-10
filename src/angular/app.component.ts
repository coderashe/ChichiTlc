import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RequestStaffComponent } from './components/request-staff/request-staff.component';
import { StaffRequestSubmission } from './models/staff-request.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent, RequestStaffComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      
      <!-- Top Emergency Notification Bar -->
      <div class="bg-[#09172a] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="font-medium">On-Call Staffing Hotline Open 24/7:</span>
            <a href="tel:+441234567890" class="text-amber-400 font-bold hover:underline">+44 123 456 7890</a>
          </div>
          <div class="flex items-center gap-4 text-slate-400">
            <span>Covering Birmingham, West Midlands & UK Nationwide</span>
            <span class="text-slate-600">|</span>
            <span>All Staff Enhanced DBS & CSTF Checked</span>
          </div>
        </div>
      </div>

      <!-- Main Sticky Navigation Bar -->
      <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <!-- Brand Logo matching the user's mockup -->
          <div (click)="currentView.set('home')" class="flex items-center gap-3 cursor-pointer group">
            <!-- Distinct Heart & Care Badge Icon -->
            <div class="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#0e223d] to-[#16365c] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <!-- Center healthcare cross window inside heart -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-2.5 h-2.5 bg-white/90 rounded-xs grid grid-cols-2 gap-0.5 p-0.5">
                  <div class="bg-[#0e223d]"></div>
                  <div class="bg-[#0e223d]"></div>
                  <div class="bg-[#0e223d]"></div>
                  <div class="bg-[#0e223d]"></div>
                </div>
              </div>
            </div>

            <!-- Brand Typography -->
            <div class="flex flex-col">
              <div class="flex items-baseline gap-1">
                <span class="text-xl sm:text-2xl font-extrabold text-[#0e223d] tracking-tight">Chichi<span class="text-amber-500">Tlc</span></span>
                <span class="text-sm font-bold text-[#0e223d]">Ltd</span>
              </div>
              <span class="text-[10px] sm:text-xs font-semibold text-slate-500 -mt-0.5 tracking-wide">
                Care Staffing Solutions
              </span>
              <span class="text-[8px] text-amber-700 tracking-wider uppercase font-medium">Right People • When You Need Them</span>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button 
              (click)="currentView.set('home')" 
              [class.text-[#0e223d]]="currentView() === 'home'" 
              [class.font-bold]="currentView() === 'home'"
              class="hover:text-amber-600 transition cursor-pointer">
              Home
            </button>
            <a href="#about" (click)="currentView.set('home')" class="hover:text-amber-600 transition">About Us</a>
            <a href="#services" (click)="currentView.set('home')" class="hover:text-amber-600 transition">Services</a>
            <a href="#why-choose-us" (click)="currentView.set('home')" class="hover:text-amber-600 transition">Why Choose Us</a>
            <a href="#contact" class="hover:text-amber-600 transition">Contact</a>
          </nav>

          <!-- Primary CTA Button -->
          <div class="flex items-center gap-3">
            <button 
              (click)="currentView.set('request')"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-sm rounded-full shadow-md shadow-amber-500/20 transition-all cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>Request Staff</span>
            </button>
          </div>

        </div>
      </header>

      <!-- Main Dynamic Content with Angular 17 @if Control Flow -->
      <main class="flex-1">
        @if (currentView() === 'home') {
          <app-home (onRequestStaff)="currentView.set('request')"></app-home>
        } @else if (currentView() === 'request') {
          <app-request-staff 
            (onCancel)="currentView.set('home')"
            (onRequestSubmitted)="handleRequestSubmitted($event)">
          </app-request-staff>
        }
      </main>

      <!-- Modern Footer matching the ChichiTlc Ltd mockup -->
      <footer id="contact" class="bg-[#09172a] text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            <!-- Brand Column -->
            <div class="lg:col-span-4 space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-amber-400">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white">Chichi<span class="text-amber-400">Tlc</span> Ltd</h3>
                  <p class="text-xs text-slate-400">Care Staffing Solutions</p>
                </div>
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">
                Right People • When You Need Them. Delivering flexible, dependable and vetted care staffing for care homes, hospitals, clinics, and supported living across the UK.
              </p>
            </div>

            <!-- Quick Links -->
            <div class="lg:col-span-3 space-y-3">
              <h4 class="text-sm font-bold text-white tracking-wider uppercase">Quick Links</h4>
              <ul class="space-y-2 text-xs">
                <li><a href="#" (click)="currentView.set('home')" class="hover:text-amber-400 transition">Home</a></li>
                <li><a href="#about" (click)="currentView.set('home')" class="hover:text-amber-400 transition">About Us</a></li>
                <li><a href="#services" (click)="currentView.set('home')" class="hover:text-amber-400 transition">Services</a></li>
                <li><a href="#services" (click)="currentView.set('home')" class="hover:text-amber-400 transition">Why Choose Us</a></li>
                <li><a href="#contact" class="hover:text-amber-400 transition">Contact</a></li>
              </ul>
            </div>

            <!-- Contact Us -->
            <div class="lg:col-span-5 space-y-4">
              <h4 class="text-sm font-bold text-white tracking-wider uppercase">Contact Us</h4>
              <ul class="space-y-2.5 text-xs text-slate-300">
                <li class="flex items-center gap-3">
                  <span class="text-amber-400">📞</span>
                  <a href="tel:+441234567890" class="hover:underline">+44 123 456 7890 (24/7 Hotline)</a>
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-amber-400">✉️</span>
                  <a href="mailto:info@chichitlc.co.uk" class="hover:underline">info@chichitlc.co.uk</a>
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-amber-400">📍</span>
                  <span>Birmingham, West Midlands, United Kingdom</span>
                </li>
              </ul>

              <div class="pt-2">
                <button 
                  (click)="currentView.set('request')"
                  class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg text-xs transition cursor-pointer">
                  Request Staffing Now
                </button>
              </div>
            </div>
          </div>

          <!-- Copyright and Bottom Line -->
          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2025 ChichiTlc Ltd. All rights reserved.</p>
            <p class="font-medium text-slate-400">Care • Support • Solutions</p>
          </div>

        </div>
      </footer>

    </div>
  `
})
export class AppComponent {
  currentView = signal<'home' | 'request'>('home');

  handleRequestSubmitted(submission: StaffRequestSubmission): void {
    console.log('New request processed by ChichiTlc Ltd desk:', submission);
  }
}
