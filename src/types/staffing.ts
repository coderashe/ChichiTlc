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

export interface QualificationOption {
  id: string;
  label: string;
  category: 'Mandatory' | 'Clinical' | 'Specialist';
  description?: string;
}

export interface RoleOption {
  id: JobRole;
  title: string;
  category: string;
  hourlyRateEstimate: number;
  shortNoticeRateEstimate: number;
  description: string;
  defaultQualifications: string[];
}

export interface StaffRequestFormValue {
  // Facility Details
  facilityName: string;
  facilityType: FacilityType;
  managerName: string;
  email: string;
  phone: string;
  postcode: string;
  address: string;
  wardUnit: string;

  // Role Required
  role: JobRole;
  staffQuantity: number;
  genderPreference: 'No Preference' | 'Female' | 'Male';

  // Qualifications
  qualifications: string[];
  additionalCertifications: string;

  // Shift Details
  shiftDate: string;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  urgencyLevel: UrgencyLevel;

  // Specifics
  specialNotes: string;
  breakDurationMinutes: number;
  uniformRequired: boolean;
  termsAccepted: boolean;
}

export interface StaffRequestSubmission extends StaffRequestFormValue {
  id: string;
  referenceNumber: string;
  submittedAt: string;
  status: 'Pending Dispatch' | 'Allocating Staff' | 'Confirmed' | 'Completed';
  estimatedResponseTime: string;
  assignedCarers?: {
    name: string;
    role: string;
    dbsNumber: string;
    badgeId: string;
    contactNumber: string;
    eta?: string;
  }[];
  totalHours: number;
  estimatedCost: number;
}
