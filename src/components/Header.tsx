import React, { useState } from 'react';
import { Logo } from './Logo';
import { Phone, Calendar, Code2, Clock, Menu, X, ShieldCheck, ClipboardList } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'request' | 'code';
  setCurrentView: (view: 'home' | 'request' | 'code') => void;
  activeRequestsCount: number;
  onOpenRequestsList: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  activeRequestsCount,
  onOpenRequestsList,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'request' | 'code', hash?: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      
      {/* Top Emergency & Info Banner */}
      <div className="bg-[#09172a] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              24/7 Rapid On-Call Desk
            </span>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <a href="tel:+441234567890" className="text-white font-bold hover:text-amber-400 transition">
                +44 123 456 7890
              </a>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              All Carers Enhanced DBS & CSTF Checked
            </span>
            <span className="text-slate-600">|</span>
            <span>Birmingham, West Midlands & Nationwide UK</span>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer transition hover:opacity-90"
        >
          <Logo size="md" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button 
            onClick={() => handleNavClick('home')}
            className={`transition cursor-pointer ${currentView === 'home' ? 'text-[#0e223d] font-bold border-b-2 border-amber-500 pb-0.5' : 'hover:text-amber-600'}`}
          >
            Home
          </button>
          
          <button 
            onClick={() => handleNavClick('home', '#about')}
            className="hover:text-amber-600 transition cursor-pointer"
          >
            About Us
          </button>

          <button 
            onClick={() => handleNavClick('home', '#services')}
            className="hover:text-amber-600 transition cursor-pointer"
          >
            Services
          </button>

          <button 
            onClick={() => handleNavClick('home', '#why-choose-us')}
            className="hover:text-amber-600 transition cursor-pointer"
          >
            Why Choose Us
          </button>

          <button 
            onClick={() => handleNavClick('home', '#contact')}
            className="hover:text-amber-600 transition cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Active Bookings Tracker Button */}
          {activeRequestsCount > 0 && (
            <button
              onClick={onOpenRequestsList}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#0e223d] bg-slate-100 hover:bg-slate-200 rounded-full border border-slate-300 transition cursor-pointer"
              title="View your submitted staffing requests and allocated carers"
            >
              <ClipboardList className="w-3.5 h-3.5 text-amber-600" />
              <span>Bookings ({activeRequestsCount})</span>
            </button>
          )}

          {/* Angular 17 Code Inspector Button */}
         {/* <button
            onClick={() => setCurrentView('code')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-full transition cursor-pointer border ${
              currentView === 'code' 
                ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-400/20' 
                : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
            title="Inspect Angular 17+ standalone components, reactive forms, and control flow code"
          >
            <Code2 className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden lg:inline">Angular 17 Code</span>
            <span className="lg:hidden">Angular</span>
          </button> */}

          {/* Core CTA: Request Staff Button */}
          <button
            onClick={() => setCurrentView('request')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm rounded-full shadow-md shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Request Staff</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-left py-2 font-semibold text-slate-800 hover:text-amber-600"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('home', '#about')}
              className="text-left py-2 font-semibold text-slate-800 hover:text-amber-600"
            >
              About Us
            </button>
            <button 
              onClick={() => handleNavClick('home', '#services')}
              className="text-left py-2 font-semibold text-slate-800 hover:text-amber-600"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick('home', '#why-choose-us')}
              className="text-left py-2 font-semibold text-slate-800 hover:text-amber-600"
            >
              Why Choose Us
            </button>
            <button 
              onClick={() => handleNavClick('home', '#contact')}
              className="text-left py-2 font-semibold text-slate-800 hover:text-amber-600"
            >
              Contact
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('request')}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-center shadow flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Request Staff
            </button>

            <button
              onClick={() => handleNavClick('code')}
              className="w-full py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs text-center flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4 text-rose-600" />
              View Angular 17+ Code Architecture
            </button>

            {activeRequestsCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRequestsList();
                }}
                className="w-full py-2 bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs text-center flex items-center justify-center gap-2"
              >
                <ClipboardList className="w-4 h-4 text-amber-600" />
                Active Requests Roster ({activeRequestsCount})
              </button>
            )}
          </div>
        </div>
      )}

    </header>
  );
};
