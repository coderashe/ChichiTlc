import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StaffingService } from '../../services/staffing.service';
import { FacilityType, JobRole, UrgencyLevel, StaffRequestSubmission } from '../../models/staff-request.model';

@Component({
  selector: 'app-request-staff',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-8">
      
      <!-- Header -->
      <div class="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-widest text-amber-600">B2B PORTAL</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-[#0e223d]">Request Healthcare Staff</h1>
          <p class="text-sm text-slate-500 mt-1">Submit your temporary cover requirements. Rapid response within 15 minutes for short notice.</p>
        </div>
        <button 
          type="button"
          (click)="onCancel.emit()"
          class="text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50 transition cursor-pointer self-start sm:self-auto">
          &larr; Back to Overview
        </button>
      </div>

      <!-- Success State -->
      @if (lastSubmission) {
        <div class="bg-white rounded-2xl border-2 border-emerald-500 p-8 shadow-xl text-center max-w-xl mx-auto space-y-5 animate-fade-in">
          <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
            ✓
          </div>
          <div>
            <h2 class="text-2xl font-bold text-[#0e223d]">Request Received!</h2>
            <p class="text-sm text-slate-600 mt-1">
              Your staffing request has been registered in our on-call dispatch desk.
            </p>
          </div>

          <div class="bg-slate-50 p-4 rounded-xl text-left border border-slate-200 space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-500">Booking Reference:</span>
              <span class="font-mono font-bold text-amber-600">{{ lastSubmission.referenceNumber }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Facility:</span>
              <span class="font-medium text-slate-800">{{ lastSubmission.facilityName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Role:</span>
              <span class="font-medium text-slate-800">{{ lastSubmission.role }} (x{{ lastSubmission.staffQuantity }})</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Date & Shift:</span>
              <span class="font-medium text-slate-800">{{ lastSubmission.shiftDate }} ({{ lastSubmission.startTime }} - {{ lastSubmission.endTime }})</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Urgency:</span>
              <span class="font-semibold" [class.text-amber-600]="lastSubmission.urgencyLevel === 'Short Notice'" [class.text-emerald-600]="lastSubmission.urgencyLevel === 'Standard'">
                {{ lastSubmission.urgencyLevel }}
              </span>
            </div>
            <div class="flex justify-between border-t border-slate-200 pt-2 font-bold">
              <span>Estimated Rate Total:</span>
              <span class="text-slate-900">£{{ lastSubmission.estimatedCost }}</span>
            </div>
          </div>

          <div class="flex justify-center gap-4 pt-2">
            <button 
              type="button" 
              (click)="resetForm()"
              class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow cursor-pointer text-sm">
              Submit Another Request
            </button>
            <button 
              type="button" 
              (click)="onCancel.emit()"
              class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-sm cursor-pointer">
              Return Home
            </button>
          </div>
        </div>
      } @else {

        <!-- Reactive Form -->
        <form [formGroup]="requestForm" (ngSubmit)="onSubmit()" class="space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          
          <!-- Section 1: Facility Details -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span class="w-6 h-6 rounded-full bg-[#0e223d] text-white flex items-center justify-center text-xs font-bold">1</span>
              <h2 class="text-lg font-bold text-[#0e223d]">Facility Information</h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Facility Name -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Facility Name *
                </label>
                <input 
                  type="text" 
                  formControlName="facilityName" 
                  placeholder="e.g. Queen Elizabeth Hospital / Meadow View Care"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                />
                @if (requestForm.get('facilityName')?.invalid && requestForm.get('facilityName')?.touched) {
                  <p class="text-xs text-rose-500 mt-1 font-medium">Facility name is required.</p>
                }
              </div>

              <!-- Facility Type Dropdown -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Facility Type *
                </label>
                <select 
                  formControlName="facilityType"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition">
                  @for (t of facilityTypes; track t) {
                    <option [value]="t">{{ t }}</option>
                  }
                </select>
              </div>

              <!-- Manager Name -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Duty Manager / Requester Name *
                </label>
                <input 
                  type="text" 
                  formControlName="managerName" 
                  placeholder="e.g. Sarah Jenkins"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                @if (requestForm.get('managerName')?.invalid && requestForm.get('managerName')?.touched) {
                  <p class="text-xs text-rose-500 mt-1 font-medium">Manager name is required.</p>
                }
              </div>

              <!-- Ward or Unit -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Ward / Unit / Wing
                </label>
                <input 
                  type="text" 
                  formControlName="wardUnit" 
                  placeholder="e.g. Ward 4 / Dementia Suite A"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Contact Work Email *
                </label>
                <input 
                  type="email" 
                  formControlName="email" 
                  placeholder="manager@carefacility.co.uk"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                @if (requestForm.get('email')?.invalid && requestForm.get('email')?.touched) {
                  <p class="text-xs text-rose-500 mt-1 font-medium">Please provide a valid work email.</p>
                }
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Direct Telephone Number *
                </label>
                <input 
                  type="tel" 
                  formControlName="phone" 
                  placeholder="+44 121 000 0000"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                @if (requestForm.get('phone')?.invalid && requestForm.get('phone')?.touched) {
                  <p class="text-xs text-rose-500 mt-1 font-medium">Phone number is required for dispatch verification.</p>
                }
              </div>

              <!-- Postcode -->
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Postcode & Location *
                </label>
                <input 
                  type="text" 
                  formControlName="postcode" 
                  placeholder="e.g. B15 2TT (Birmingham & surrounding)"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          <!-- Section 2: Role Required -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span class="w-6 h-6 rounded-full bg-[#0e223d] text-white flex items-center justify-center text-xs font-bold">2</span>
              <h2 class="text-lg font-bold text-[#0e223d]">Role & Quantity Required</h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <!-- Role selection -->
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Role Title *
                </label>
                <select 
                  formControlName="role"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                  @for (r of availableRoles; track r) {
                    <option [value]="r">{{ r }}</option>
                  }
                </select>
              </div>

              <!-- Staff Quantity -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Staff Count *
                </label>
                <input 
                  type="number" 
                  min="1" 
                  max="25"
                  formControlName="staffQuantity"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          <!-- Section 3: Qualifications & Specific Certifications -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span class="w-6 h-6 rounded-full bg-[#0e223d] text-white flex items-center justify-center text-xs font-bold">3</span>
              <h2 class="text-lg font-bold text-[#0e223d]">Required Qualifications & Competencies</h2>
            </div>

            <p class="text-xs text-slate-500">Select all required qualifications for this shift. All ChichiTlc staff are pre-screened with Enhanced DBS.</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              @for (cert of qualificationOptions; track cert.id) {
                <label class="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                  <input 
                    type="checkbox" 
                    [checked]="hasQualification(cert.id)"
                    (change)="toggleQualification(cert.id)"
                    class="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <div>
                    <span class="font-semibold text-slate-800 block">{{ cert.label }}</span>
                    <span class="text-[11px] text-slate-400">{{ cert.category }}</span>
                  </div>
                </label>
              }
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Other Specific Requirements / Clinical Competency Notes
              </label>
              <textarea 
                formControlName="additionalCertifications" 
                rows="2"
                placeholder="e.g. Experience with PEG feeding, syringe driver, or non-verbal communication..."
                class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </div>
          </div>

          <!-- Section 4: Shift Details & Urgency Level -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span class="w-6 h-6 rounded-full bg-[#0e223d] text-white flex items-center justify-center text-xs font-bold">4</span>
              <h2 class="text-lg font-bold text-[#0e223d]">Shift Details & Urgency</h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Date -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Shift Date *
                </label>
                <input 
                  type="date" 
                  formControlName="shiftDate"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <!-- Shift Type Preset -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Shift Type
                </label>
                <select 
                  formControlName="shiftType" 
                  (change)="onShiftTypeChange($any($event.target).value)"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="Day Shift">Day Shift (08:00 - 16:00)</option>
                  <option value="Night Shift">Night Shift (20:00 - 08:00)</option>
                  <option value="Long Day">Long Day (08:00 - 20:00)</option>
                  <option value="Custom">Custom Times</option>
                </select>
              </div>

              <!-- Start Time -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Start Time *
                </label>
                <input 
                  type="time" 
                  formControlName="startTime"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <!-- End Time -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  End Time *
                </label>
                <input 
                  type="time" 
                  formControlName="endTime"
                  class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <!-- Urgency Level Toggle (Standard vs Short Notice) -->
            <div class="pt-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Urgency Level *
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label 
                  [class.border-emerald-500]="requestForm.get('urgencyLevel')?.value === 'Standard'"
                  [class.bg-emerald-50]="requestForm.get('urgencyLevel')?.value === 'Standard'"
                  class="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 cursor-pointer transition">
                  <input 
                    type="radio" 
                    value="Standard" 
                    formControlName="urgencyLevel" 
                    class="text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span class="font-bold text-sm text-[#0e223d] block">Standard Cover</span>
                    <span class="text-xs text-slate-500">Planned absence, rota vacancies (24h+ notice)</span>
                  </div>
                </label>

                <label 
                  [class.border-amber-500]="requestForm.get('urgencyLevel')?.value === 'Short Notice'"
                  [class.bg-amber-50]="requestForm.get('urgencyLevel')?.value === 'Short Notice'"
                  class="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 cursor-pointer transition">
                  <input 
                    type="radio" 
                    value="Short Notice" 
                    formControlName="urgencyLevel" 
                    class="text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span class="font-bold text-sm text-amber-900 block flex items-center gap-1">
                      ⚡ Short Notice / Urgent Cover
                    </span>
                    <span class="text-xs text-slate-500">Immediate sickness, rapid deployment under 4 hours</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Special Notes -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Special Instructions / Acuity Notes
              </label>
              <textarea 
                formControlName="specialNotes" 
                rows="2"
                placeholder="Key handover instructions, designated contact on arrival, parking info..."
                class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </div>
          </div>

          <!-- Terms & Submit -->
          <div class="pt-4 border-t border-slate-200 space-y-4">
            <label class="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
              <input 
                type="checkbox" 
                formControlName="termsAccepted" 
                class="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
              />
              <span>
                I confirm that I am an authorised representative of the facility and agree to ChichiTlc Ltd standard service level terms and staffing engagement rates.
              </span>
            </label>
            @if (requestForm.get('termsAccepted')?.invalid && requestForm.get('termsAccepted')?.touched) {
              <p class="text-xs text-rose-500 font-medium">You must accept the terms before submitting.</p>
            }

            <div class="flex items-center justify-between pt-2">
              <button 
                type="button" 
                (click)="onCancel.emit()"
                class="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800">
                Cancel
              </button>

              <button 
                type="submit" 
                [disabled]="requestForm.invalid"
                class="px-7 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md transition-all cursor-pointer">
                Submit Staffing Request &rarr;
              </button>
            </div>
          </div>

        </form>
      }

    </div>
  `
})
export class RequestStaffComponent {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onRequestSubmitted = new EventEmitter<StaffRequestSubmission>();

  private fb: FormBuilder = inject(FormBuilder);
  private staffingService: StaffingService = inject(StaffingService);

  facilityTypes: FacilityType[] = [
    'Care Home',
    'Nursing Home',
    'Hospital',
    'Clinic',
    'Supported Living',
    'Hospice'
  ];

  availableRoles: JobRole[] = [
    'Registered Nurse (RGN)',
    'Senior Care Assistant',
    'Caregiver / Healthcare Assistant',
    'Support Worker',
    'PCN (Primary Care Network Nurse)',
    'Mental Health Nurse (RMN)'
  ];

  qualificationOptions = [
    { id: 'dbs', label: 'Enhanced DBS (Online Update Service)', category: 'Mandatory' },
    { id: 'mandatory_training', label: 'CSTF All-in-One Training', category: 'Mandatory' },
    { id: 'moving_handling', label: 'Safe Moving & Handling', category: 'Mandatory' },
    { id: 'med_admin', label: 'Medication Administration', category: 'Clinical' },
    { id: 'pmva', label: 'PMVA / MAPA Restraint', category: 'Specialist' },
    { id: 'dementia_care', label: 'Dementia Care (Tier 2)', category: 'Specialist' },
  ];

  selectedQualifications: string[] = ['dbs', 'mandatory_training'];
  lastSubmission: StaffRequestSubmission | null = null;

  requestForm: FormGroup = this.fb.group({
    facilityName: ['', [Validators.required, Validators.minLength(2)]],
    facilityType: ['Care Home', Validators.required],
    managerName: ['', [Validators.required, Validators.minLength(2)]],
    wardUnit: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    postcode: ['', Validators.required],
    address: [''],
    role: ['Caregiver / Healthcare Assistant', Validators.required],
    staffQuantity: [1, [Validators.required, Validators.min(1), Validators.max(25)]],
    additionalCertifications: [''],
    shiftDate: [new Date().toISOString().split('T')[0], Validators.required],
    shiftType: ['Day Shift'],
    startTime: ['08:00', Validators.required],
    endTime: ['16:00', Validators.required],
    urgencyLevel: ['Standard' as UrgencyLevel, Validators.required],
    specialNotes: [''],
    termsAccepted: [false, Validators.requiredTrue],
  });

  hasQualification(id: string): boolean {
    return this.selectedQualifications.includes(id);
  }

  toggleQualification(id: string): void {
    if (this.selectedQualifications.includes(id)) {
      this.selectedQualifications = this.selectedQualifications.filter(item => item !== id);
    } else {
      this.selectedQualifications.push(id);
    }
  }

  onShiftTypeChange(type: string): void {
    if (type === 'Day Shift') {
      this.requestForm.patchValue({ startTime: '08:00', endTime: '16:00' });
    } else if (type === 'Night Shift') {
      this.requestForm.patchValue({ startTime: '20:00', endTime: '08:00' });
    } else if (type === 'Long Day') {
      this.requestForm.patchValue({ startTime: '08:00', endTime: '20:00' });
    }
  }

  onSubmit(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.requestForm.value,
      qualifications: this.selectedQualifications,
    };

    const submission = this.staffingService.submitRequest(payload);
    this.lastSubmission = submission;
    this.onRequestSubmitted.emit(submission);
  }

  resetForm(): void {
    this.lastSubmission = null;
    this.requestForm.reset({
      facilityType: 'Care Home',
      role: 'Caregiver / Healthcare Assistant',
      staffQuantity: 1,
      shiftType: 'Day Shift',
      startTime: '08:00',
      endTime: '16:00',
      urgencyLevel: 'Standard',
      shiftDate: new Date().toISOString().split('T')[0],
      termsAccepted: false
    });
    this.selectedQualifications = ['dbs', 'mandatory_training'];
  }
}
