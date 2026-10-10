import { Injectable, signal } from '@angular/core';
import { StaffRequestFormValue, StaffRequestSubmission } from '../models/staff-request.model';

@Injectable({
  providedIn: 'root'
})
export class StaffingService {
  // Angular 17+ Signals for reactive state management
  private requestsList = signal<StaffRequestSubmission[]>([
    {
      id: 'req-1',
      referenceNumber: 'CTL-8492-EMG',
      facilityName: 'St. Mary’s Care Home',
      facilityType: 'Care Home',
      managerName: 'Eleanor Vance',
      email: 'manager@stmaryscare.co.uk',
      phone: '+44 121 496 0192',
      postcode: 'B15 2TT',
      address: '42 Meadow Lane, Edgbaston, Birmingham',
      wardUnit: 'Rosewood Dementia Wing',
      role: 'Senior Care Assistant',
      staffQuantity: 2,
      qualifications: ['dbs', 'mandatory_training', 'med_admin'],
      additionalCertifications: 'Electronic MAR charts experience',
      shiftDate: '2026-10-10',
      shiftType: 'Night Shift',
      startTime: '20:00',
      endTime: '08:00',
      urgencyLevel: 'Short Notice',
      specialNotes: 'Emergency sickness cover needed for evening handover.',
      termsAccepted: true,
      submittedAt: new Date().toISOString(),
      status: 'Allocating Staff',
      totalHours: 12,
      estimatedCost: 564.0
    }
  ]);

  readonly activeRequests = this.requestsList.asReadonly();

  calculateHours(startTime: string, endTime: string): number {
    if (!startTime || !endTime) return 8;
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    let diff = (endH + endM / 60) - (startH + startM / 60);
    if (diff <= 0) diff += 24; // Overnight shift
    return Math.round(diff * 10) / 10;
  }

  estimateRate(role: string, isShortNotice: boolean): number {
    const baseRates: Record<string, number> = {
      'Registered Nurse (RGN)': 32.5,
      'Senior Care Assistant': 19.5,
      'Caregiver / Healthcare Assistant': 16.5,
      'Support Worker': 17.5,
      'PCN (Primary Care Network Nurse)': 36.0,
      'Mental Health Nurse (RMN)': 34.0,
    };
    const rate = baseRates[role] || 18.0;
    return isShortNotice ? Math.round(rate * 1.2 * 10) / 10 : rate;
  }

  submitRequest(formData: StaffRequestFormValue): StaffRequestSubmission {
    const hours = this.calculateHours(formData.startTime, formData.endTime);
    const hourlyRate = this.estimateRate(formData.role, formData.urgencyLevel === 'Short Notice');
    const estimatedCost = Math.round(hours * hourlyRate * (formData.staffQuantity || 1) * 100) / 100;
    const refCode = `CTL-${Math.floor(1000 + Math.random() * 9000)}-${formData.urgencyLevel === 'Short Notice' ? 'EMG' : 'STD'}`;

    const submission: StaffRequestSubmission = {
      ...formData,
      id: 'req-' + Date.now(),
      referenceNumber: refCode,
      submittedAt: new Date().toISOString(),
      status: formData.urgencyLevel === 'Short Notice' ? 'Allocating Staff' : 'Pending Dispatch',
      totalHours: hours,
      estimatedCost
    };

    this.requestsList.update((list: StaffRequestSubmission[]) => [submission, ...list]);
    return submission;
  }
}
