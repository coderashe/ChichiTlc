import React, { useState } from 'react';
import { Code2, Copy, Check, FileCode, Layers, Sparkles, X, Terminal } from 'lucide-react';

interface AngularCodeViewerProps {
  onClose: () => void;
  onRequestStaffClick: () => void;
}

export const AngularCodeViewer: React.FC<AngularCodeViewerProps> = ({ onClose, onRequestStaffClick }) => {
  const [activeTab, setActiveTab] = useState<'app' | 'home' | 'request' | 'service' | 'model'>('request');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    request: {
      fileName: 'src/angular/components/request-staff/request-staff.component.ts',
      title: 'RequestStaffComponent (Reactive Forms & @if/@for)',
      desc: 'Angular 17+ standalone component implementing ReactiveFormsModule, FormBuilder, custom validation, and new control flow.',
      code: `import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StaffingService } from '../../services/staffing.service';
import { FacilityType, JobRole, UrgencyLevel, StaffRequestSubmission } from '../../models/staff-request.model';

@Component({
  selector: 'app-request-staff',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: \`
    <div class="max-w-4xl mx-auto px-4 py-8">
      
      <!-- Reactive Form Header -->
      <div class="mb-8 border-b border-slate-200 pb-6">
        <span class="text-xs font-extrabold uppercase tracking-widest text-amber-600">B2B PORTAL</span>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-[#0e223d]">Request Healthcare Staff</h1>
        <p class="text-sm text-slate-500 mt-1">Submit your temporary cover requirements. Rapid response within 15 minutes.</p>
      </div>

      <!-- Success Confirmation State via Angular 17 @if control flow -->
      @if (lastSubmission) {
        <div class="bg-white rounded-2xl border-2 border-emerald-500 p-8 shadow-xl text-center max-w-xl mx-auto space-y-5">
          <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
            ✓
          </div>
          <div>
            <h2 class="text-2xl font-bold text-[#0e223d]">Staff Request Received</h2>
            <p class="text-sm text-slate-600 mt-1">Booking reference: <span class="font-mono font-bold text-amber-600">{{ lastSubmission.referenceNumber }}</span></p>
          </div>
          <button (click)="resetForm()" class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-sm">
            Submit Another Request
          </button>
        </div>
      } @else {

        <!-- Reactive Form Structure -->
        <form [formGroup]="requestForm" (ngSubmit)="onSubmit()" class="space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          
          <!-- Section 1: Facility Details -->
          <div class="space-y-4">
            <h2 class="text-lg font-bold text-[#0e223d] border-b pb-2">1. Facility Details</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase">Facility Name *</label>
                <input type="text" formControlName="facilityName" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500" placeholder="e.g. St. Mary's Care Home" />
                @if (requestForm.get('facilityName')?.invalid && requestForm.get('facilityName')?.touched) {
                  <p class="text-xs text-rose-500 mt-1">Facility name is required.</p>
                }
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase">Facility Type *</label>
                <select formControlName="facilityType" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white">
                  @for (t of facilityTypes; track t) {
                    <option [value]="t">{{ t }}</option>
                  }
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase">Duty Manager Name *</label>
                <input type="text" formControlName="managerName" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase">Contact Email *</label>
                <input type="email" formControlName="email" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300" />
                @if (requestForm.get('email')?.invalid && requestForm.get('email')?.touched) {
                  <p class="text-xs text-rose-500 mt-1">Valid email address required.</p>
                }
              </div>
            </div>
          </div>

          <!-- Section 2: Role Required -->
          <div class="space-y-4">
            <h2 class="text-lg font-bold text-[#0e223d] border-b pb-2">2. Role Required</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-slate-700 uppercase">Role *</label>
                <select formControlName="role" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white">
                  @for (r of availableRoles; track r) {
                    <option [value]="r">{{ r }}</option>
                  }
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase">Quantity *</label>
                <input type="number" min="1" max="25" formControlName="staffQuantity" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300" />
              </div>
            </div>
          </div>

          <!-- Section 3: Shift Details & Urgency Level -->
          <div class="space-y-4">
            <h2 class="text-lg font-bold text-[#0e223d] border-b pb-2">3. Shift Details & Urgency</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase">Shift Date *</label>
                <input type="date" formControlName="shiftDate" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase">Start Time *</label>
                <input type="time" formControlName="startTime" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase">End Time *</label>
                <input type="time" formControlName="endTime" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300" />
              </div>
            </div>

            <!-- Urgency Level Radio Group -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <label class="p-4 rounded-xl border-2 flex items-center gap-3 cursor-pointer" [class.border-emerald-500]="requestForm.get('urgencyLevel')?.value === 'Standard'">
                <input type="radio" value="Standard" formControlName="urgencyLevel" />
                <span class="font-bold text-sm text-[#0e223d]">Standard Scheduled Cover</span>
              </label>

              <label class="p-4 rounded-xl border-2 flex items-center gap-3 cursor-pointer" [class.border-amber-500]="requestForm.get('urgencyLevel')?.value === 'Short Notice'">
                <input type="radio" value="Short Notice" formControlName="urgencyLevel" />
                <span class="font-bold text-sm text-amber-900">⚡ Short Notice / Urgent Cover (&lt; 4 hrs)</span>
              </label>
            </div>
          </div>

          <!-- Terms & Submit -->
          <div class="pt-4 border-t space-y-4">
            <label class="flex items-start gap-2 text-xs text-slate-600">
              <input type="checkbox" formControlName="termsAccepted" class="mt-0.5 rounded text-amber-500" />
              <span>I confirm that I am an authorised representative and agree to ChichiTlc Ltd terms.</span>
            </label>

            <button type="submit" [disabled]="requestForm.invalid" class="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold rounded-xl shadow">
              Submit Staffing Request &rarr;
            </button>
          </div>

        </form>
      }
    </div>
  \`
})
export class RequestStaffComponent {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onRequestSubmitted = new EventEmitter<StaffRequestSubmission>();

  private fb = inject(FormBuilder);
  private staffingService = inject(StaffingService);

  facilityTypes: FacilityType[] = ['Care Home', 'Nursing Home', 'Hospital', 'Clinic', 'Supported Living', 'Hospice'];
  availableRoles: JobRole[] = [
    'Registered Nurse (RGN)',
    'Senior Care Assistant',
    'Caregiver / Healthcare Assistant',
    'Support Worker',
    'PCN (Primary Care Network Nurse)',
    'Mental Health Nurse (RMN)'
  ];

  lastSubmission: StaffRequestSubmission | null = null;

  requestForm: FormGroup = this.fb.group({
    facilityName: ['', [Validators.required, Validators.minLength(2)]],
    facilityType: ['Care Home', Validators.required],
    managerName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    postcode: ['', Validators.required],
    role: ['Caregiver / Healthcare Assistant', Validators.required],
    staffQuantity: [1, [Validators.required, Validators.min(1), Validators.max(25)]],
    shiftDate: [new Date().toISOString().split('T')[0], Validators.required],
    startTime: ['08:00', Validators.required],
    endTime: ['16:00', Validators.required],
    urgencyLevel: ['Standard' as UrgencyLevel, Validators.required],
    specialNotes: [''],
    termsAccepted: [false, Validators.requiredTrue],
  });

  onSubmit(): void {
    if (this.requestForm.invalid) return;
    this.lastSubmission = this.staffingService.submitRequest(this.requestForm.value);
    this.onRequestSubmitted.emit(this.lastSubmission);
  }

  resetForm(): void {
    this.lastSubmission = null;
    this.requestForm.reset({
      facilityType: 'Care Home',
      role: 'Caregiver / Healthcare Assistant',
      staffQuantity: 1,
      startTime: '08:00',
      endTime: '16:00',
      urgencyLevel: 'Standard',
      shiftDate: new Date().toISOString().split('T')[0],
      termsAccepted: false
    });
  }
}`
    },
    home: {
      fileName: 'src/angular/components/home/home.component.ts',
      title: 'HomeComponent (Landing Page with @for)',
      desc: 'Angular 17+ standalone Home component implementing the exact visual sections from the ChichiTlc Ltd mockup.',
      code: `import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <!-- Hero Section matching the ChichiTlc Ltd mockup -->
    <section class="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-8 pb-16 md:pt-14 md:pb-24 border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div class="lg:col-span-6 space-y-6">
            <div class="inline-flex px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-800 tracking-widest">
              WELCOME TO
            </div>
            <h1 class="text-4xl sm:text-5xl font-extrabold text-[#0e223d] leading-tight">
              Chichi<span class="text-amber-500">Tlc</span> Ltd
            </h1>
            <p class="text-2xl font-bold text-[#0e223d]">
              Reliable Care Staff, When You Need Them
            </p>
            <p class="text-slate-600 leading-relaxed">
              We supply qualified, experienced and compassionate carers to support care homes, supported living services and other care providers — especially when you are short-staffed.
            </p>
            <div class="flex gap-4 pt-2">
              <button (click)="onRequestStaff.emit()" class="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full shadow-md">
                Request Staff &rarr;
              </button>
            </div>
          </div>

          <div class="lg:col-span-6 relative">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80" alt="Nurse and resident" class="w-full h-full object-cover" />
            </div>
            <div class="absolute -top-4 right-4 bg-white/95 px-4 py-2 rounded-2xl shadow-lg border border-amber-200 rotate-2">
              <span class="font-handwriting text-2xl font-bold text-[#0e223d]">Flexible staffing for better care 💛</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 5 Trust Indicators Bar using @for control flow -->
    <section class="py-10 bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        @for (item of trustIndicators; track item.title) {
          <div class="p-4 rounded-xl border border-slate-100 bg-slate-50/50 text-center flex flex-col items-center">
            <div class="w-12 h-12 rounded-full border-2 border-amber-400 bg-amber-50 flex items-center justify-center text-amber-600 mb-3">
              {{ item.icon }}
            </div>
            <h3 class="font-bold text-sm text-[#0e223d]">{{ item.title }}</h3>
            <p class="text-xs text-slate-500 mt-1">{{ item.description }}</p>
          </div>
        }
      </div>
    </section>
  \`
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
}`
    },
    app: {
      fileName: 'src/angular/app.component.ts',
      title: 'AppComponent (Root Shell)',
      desc: 'Angular 17+ standalone root shell with navigation, signal-based view routing, and branding.',
      code: `import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RequestStaffComponent } from './components/request-staff/request-staff.component';
import { StaffRequestSubmission } from './models/staff-request.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent, RequestStaffComponent],
  template: \`
    <div class="min-h-screen flex flex-col bg-slate-50 font-sans">
      
      <!-- Top Emergency Hotline Bar -->
      <div class="bg-[#09172a] text-slate-300 text-xs py-2 px-4">
        <div class="max-w-7xl mx-auto flex justify-between">
          <span>24/7 On-Call Desk: <strong class="text-amber-400">+44 123 456 7890</strong></span>
          <span>West Midlands & Nationwide UK</span>
        </div>
      </div>

      <!-- Navbar -->
      <header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b">
        <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div (click)="currentView.set('home')" class="cursor-pointer font-bold text-2xl text-[#0e223d]">
            Chichi<span class="text-amber-500">Tlc</span> Ltd
          </div>

          <button (click)="currentView.set('request')" class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full">
            Request Staff
          </button>
        </div>
      </header>

      <!-- View Switcher via Angular 17 @if -->
      <main class="flex-1">
        @if (currentView() === 'home') {
          <app-home (onRequestStaff)="currentView.set('request')"></app-home>
        } @else if (currentView() === 'request') {
          <app-request-staff (onCancel)="currentView.set('home')"></app-request-staff>
        }
      </main>

    </div>
  \`
})
export class AppComponent {
  currentView = signal<'home' | 'request'>('home');
}`
    },
    service: {
      fileName: 'src/angular/services/staffing.service.ts',
      title: 'StaffingService (Signal Store)',
      desc: 'Angular 17 Injectable service with reactive signals for staffing calculations and request storage.',
      code: `import { Injectable, signal } from '@angular/core';
import { StaffRequestFormValue, StaffRequestSubmission } from '../models/staff-request.model';

@Injectable({
  providedIn: 'root'
})
export class StaffingService {
  private requestsList = signal<StaffRequestSubmission[]>([]);
  readonly activeRequests = this.requestsList.asReadonly();

  submitRequest(formData: StaffRequestFormValue): StaffRequestSubmission {
    const submission: StaffRequestSubmission = {
      ...formData,
      id: 'req-' + Date.now(),
      referenceNumber: 'CTL-' + Math.floor(1000 + Math.random() * 9000),
      submittedAt: new Date().toISOString(),
      status: formData.urgencyLevel === 'Short Notice' ? 'Allocating Staff' : 'Pending Dispatch',
      totalHours: 8,
      estimatedCost: 156.0
    };

    this.requestsList.update(list => [submission, ...list]);
    return submission;
  }
}`
    },
    model: {
      fileName: 'src/angular/models/staff-request.model.ts',
      title: 'staff-request.model.ts (Types & Interfaces)',
      desc: 'TypeScript definitions for FacilityType, JobRole, and reactive form state.',
      code: `export type FacilityType = 'Care Home' | 'Nursing Home' | 'Hospital' | 'Clinic' | 'Supported Living' | 'Hospice';
export type JobRole = 'Registered Nurse (RGN)' | 'Senior Care Assistant' | 'Caregiver / Healthcare Assistant' | 'Support Worker' | 'PCN (Primary Care Network Nurse)' | 'Mental Health Nurse (RMN)';
export type UrgencyLevel = 'Standard' | 'Short Notice';

export interface StaffRequestFormValue {
  facilityName: string;
  facilityType: FacilityType;
  managerName: string;
  email: string;
  phone: string;
  postcode: string;
  role: JobRole;
  staffQuantity: number;
  shiftDate: string;
  startTime: string;
  endTime: string;
  urgencyLevel: UrgencyLevel;
  termsAccepted: boolean;
}

export interface StaffRequestSubmission extends StaffRequestFormValue {
  id: string;
  referenceNumber: string;
  submittedAt: string;
  status: 'Pending Dispatch' | 'Allocating Staff' | 'Confirmed';
  totalHours: number;
  estimatedCost: number;
}`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentSnippet = codeSnippets[activeTab];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Top Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              Angular 17+ Architecture Inspector
            </span>
            <span className="text-xs text-slate-400">• Standalone Components & Reactive Forms</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0e223d]">
            Angular 17 Codebase Blueprint
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Modular Angular 17+ standalone components, built-in <code className="text-rose-600 bg-rose-50 px-1 rounded">@if</code> and <code className="text-rose-600 bg-rose-50 px-1 rounded">@for</code> control flow, signals, and typed reactive forms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRequestStaffClick}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
          >
            Open Interactive Live Form &rarr;
          </button>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-200 pb-3">
        {(['request', 'home', 'app', 'service', 'model'] as const).map((tabKey) => {
          const tab = codeSnippets[tabKey];
          const isActive = activeTab === tabKey;
          return (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#0e223d] text-white border-[#0e223d] shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{tab.fileName.split('/').pop()}</span>
            </button>
          );
        })}
      </div>

      {/* Code Card */}
      <div className="bg-[#0b1626] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
        
        {/* Header inside code window */}
        <div className="px-5 py-3.5 bg-[#08101c] border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 font-mono text-slate-300 font-semibold">{currentSnippet.fileName}</span>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-xs font-medium cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Info description strip */}
        <div className="px-5 py-2.5 bg-slate-900/90 border-b border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{currentSnippet.desc}</span>
        </div>

        {/* Code Content */}
        <div className="p-5 overflow-x-auto max-h-[580px] font-mono text-xs text-slate-200 leading-relaxed selection:bg-amber-500 selection:text-black">
          <pre>
            <code>{currentSnippet.code}</code>
          </pre>
        </div>

      </div>

      {/* Angular Architecture Overview highlights */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm mb-2">
            1
          </div>
          <h4 className="font-bold text-sm text-[#0e223d]">Standalone Components</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Eliminates NgModules. Direct imports of <code className="bg-slate-100 px-1 rounded text-rose-600">ReactiveFormsModule</code> and <code className="bg-slate-100 px-1 rounded text-rose-600">CommonModule</code>.
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm mb-2">
            2
          </div>
          <h4 className="font-bold text-sm text-[#0e223d]">Built-In @if & @for</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Modern Angular 17 control flow replacing legacy *ngIf and *ngFor with zero runtime footprint.
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm mb-2">
            3
          </div>
          <h4 className="font-bold text-sm text-[#0e223d]">Reactive Forms Validation</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Rigorous form validation with <code className="bg-slate-100 px-1 rounded text-emerald-700">Validators.required</code>, touched-state error banners, and type safety.
          </p>
        </div>
      </div>

    </div>
  );
};
