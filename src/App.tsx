/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustIndicators } from './components/TrustIndicators';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ComplianceVetting } from './components/ComplianceVetting';
import { TestimonialsSection } from './components/TestimonialsSection';
import { RequestStaffForm } from './components/RequestStaffForm';
import { ActiveRequestsModal } from './components/ActiveRequestsModal';
import { AngularCodeViewer } from './components/AngularCodeViewer';
import { Footer } from './components/Footer';
import { INITIAL_SUBMISSIONS } from './data/mockData';
import { FacilityType, JobRole, StaffRequestSubmission } from './types/staffing';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'request' | 'code'>('home');
  const [requests, setRequests] = useState<StaffRequestSubmission[]>(INITIAL_SUBMISSIONS);
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [preselectedFacilityType, setPreselectedFacilityType] = useState<FacilityType | undefined>(undefined);
  const [preselectedRole, setPreselectedRole] = useState<JobRole | undefined>(undefined);

  const handleOpenRequestWithPreset = (serviceTitle: string, facilityType: FacilityType) => {
    setPreselectedFacilityType(facilityType);
    if (serviceTitle.includes('Nurse') || serviceTitle.includes('Nursing')) {
      setPreselectedRole('Registered Nurse (RGN)');
    } else if (serviceTitle.includes('Supported')) {
      setPreselectedRole('Support Worker');
    } else {
      setPreselectedRole('Caregiver / Healthcare Assistant');
    }
    setCurrentView('request');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestSubmitSuccess = (submission: StaffRequestSubmission) => {
    setRequests((prev) => [submission, ...prev]);
  };

  const handleNavigate = (view: 'home' | 'request' | 'code', hash?: string) => {
    setCurrentView(view);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-amber-400 selection:text-slate-900">
      
      {/* Sticky Header */}
      <Header
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeRequestsCount={requests.length}
        onOpenRequestsList={() => setIsRosterOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* Hero Section matching the user's mockup image */}
            <Hero
              onRequestStaff={() => {
                setCurrentView('request');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onLearnMore={() => {
                const el = document.querySelector('#services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 5 Trust Indicators matching mockup */}
            <TrustIndicators />

            {/* Care Staffing Solutions (4 Services Cards) */}
            <ServicesSection onSelectService={handleOpenRequestWithPreset} />

            {/* About ChichiTlc Ltd matching mockup */}
            <AboutSection
              onRequestStaff={() => {
                setCurrentView('request');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Clinical Governance & 21-Point DBS Standards */}
            <ComplianceVetting
              onEmergencyRequest={() => {
                setCurrentView('request');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Testimonials Quote Section matching mockup */}
            <TestimonialsSection />
          </div>
        )}

        {currentView === 'request' && (
          <div className="animate-in fade-in duration-300">
            <RequestStaffForm
              onCancel={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSubmitSuccess={handleRequestSubmitSuccess}
              preselectedFacilityType={preselectedFacilityType}
              preselectedRole={preselectedRole}
            />
          </div>
        )}

        {currentView === 'code' && (
          <div className="animate-in fade-in duration-300">
            <AngularCodeViewer
              onClose={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onRequestStaffClick={() => {
                setCurrentView('request');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </main>

      {/* Roster & Active Requests Drawer/Modal */}
      <ActiveRequestsModal
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        requests={requests}
        onNewRequestClick={() => {
          setCurrentView('request');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modern Dark Navy Footer matching mockup */}
      <Footer
        onRequestStaff={() => {
          setCurrentView('request');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
