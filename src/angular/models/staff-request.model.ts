export type FacilityType = 
  | 'Care Home' 
  | 'Nursing Home' 
  | 'Hospital' 
  | 'Clinic' 
  | 'Supported Living' 
  | 'Hospice';

export type JobRole = 
  | 'Registered Nurse (RGN)' 
  | 'Senior Care Assistant' 
  | 'Caregiver / Healthcare Assistant' 
  | 'Support Worker' 
  | 'PCN (Primary Care Network Nurse)' 
  | 'Mental Health Nurse (RMN)';

export type UrgencyLevel = 'Standard' | 'Short Notice';
export type ShiftType = 'Day Shift' | 'Night Shift' | 'Long Day' | 'Custom';

export interface QualificationItem {
  id: string;
  label: string;
  category: 'Mandatory' | 'Clinical' | 'Specialist';
}

export interface StaffRequestFormValue {
  facilityName: string;
  facilityType: FacilityType;
  managerName: string;
  email: string;
  phone: string;
  postcode: string;
  address: string;
  wardUnit: string;
  role: JobRole;
  staffQuantity: number;
  qualifications: string[];
  additionalCertifications: string;
  shiftDate: string;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  urgencyLevel: UrgencyLevel;
  specialNotes: string;
  termsAccepted: boolean;
}

export interface StaffRequestSubmission extends StaffRequestFormValue {
  id: string;
  referenceNumber: string;
  submittedAt: string;
  status: 'Pending Dispatch' | 'Allocating Staff' | 'Confirmed';
  totalHours: number;
  estimatedCost: number;
}
