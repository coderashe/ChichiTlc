import React, { useState, useId } from 'react';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Calculator,
  ArrowRight,
  Printer
} from 'lucide-react';
import { FacilityType, JobRole, ShiftType, StaffRequestFormValue, StaffRequestSubmission, UrgencyLevel } from '../types/staffing';
import { AVAILABLE_ROLES, FACILITY_TYPES, QUALIFICATIONS_LIST } from '../data/mockData';
import { sendRequestEmails } from '../utils/sendEmail';

interface RequestStaffFormProps {
  onCancel: () => void;
  onSubmitSuccess: (submission: StaffRequestSubmission) => void;
  preselectedFacilityType?: FacilityType;
  preselectedRole?: JobRole;
}

export const RequestStaffForm: React.FC<RequestStaffFormProps> = ({
  onCancel,
  onSubmitSuccess,
  preselectedFacilityType,
  preselectedRole,
}) => {
  const formId = useId();

  // Form State
  const [formData, setFormData] = useState<StaffRequestFormValue>({
    facilityName: '',
    facilityType: preselectedFacilityType || 'Care Home',
    managerName: '',
    email: '',
    phone: '',
    postcode: 'B15 2TT',
    address: '',
    wardUnit: '',
    role: preselectedRole || 'Caregiver / Healthcare Assistant',
    staffQuantity: 1,
    genderPreference: 'No Preference',
    qualifications: ['dbs', 'mandatory_training'],
    additionalCertifications: '',
    shiftDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    shiftType: 'Day Shift',
    startTime: '08:00',
    endTime: '16:00',
    urgencyLevel: 'Standard',
    specialNotes: '',
    breakDurationMinutes: 30,
    uniformRequired: true,
    termsAccepted: false,
  });

  // Touched state for reactive validation
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submittedSuccess, setSubmittedSuccess] = useState<StaffRequestSubmission | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // Mark field as touched
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Validation errors
  const errors = {
    facilityName: !formData.facilityName.trim() ? 'Facility name is required' : '',
    managerName: !formData.managerName.trim() ? 'Duty manager name is required' : '',
    email: !formData.email.trim() 
      ? 'Email is required' 
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) 
      ? 'Please enter a valid work email' 
      : '',
    phone: !formData.phone.trim() 
      ? 'Contact phone is required' 
      : formData.phone.length < 8 
      ? 'Please enter a valid UK contact number' 
      : '',
    postcode: !formData.postcode.trim() ? 'Facility postcode is required' : '',
    shiftDate: !formData.shiftDate ? 'Shift date is required' : '',
    startTime: !formData.startTime ? 'Start time is required' : '',
    endTime: !formData.endTime ? 'End time is required' : '',
    termsAccepted: !formData.termsAccepted ? 'You must accept the terms before submitting' : '',
  };

  const isFormValid = !Object.values(errors).some(Boolean);

  // Shift calculation
  const calculateShiftHours = (): number => {
    if (!formData.startTime || !formData.endTime) return 8;
    const [startH, startM] = formData.startTime.split(':').map(Number);
    const [endH, endM] = formData.endTime.split(':').map(Number);
    let diff = (endH + endM / 60) - (startH + startM / 60);
    if (diff <= 0) diff += 24; // Overnight shift
    return Math.round(diff * 10) / 10;
  };

  const shiftHours = calculateShiftHours();
  const activeRoleConfig = AVAILABLE_ROLES.find((r) => r.id === formData.role) || AVAILABLE_ROLES[0];
  const hourlyRate = formData.urgencyLevel === 'Short Notice' 
    ? activeRoleConfig.shortNoticeRateEstimate 
    : activeRoleConfig.hourlyRateEstimate;
  const estimatedTotal = Math.round(shiftHours * hourlyRate * formData.staffQuantity * 100) / 100;

  // Preset Shift Handler
  const handleShiftPresetChange = (type: ShiftType) => {
    let start = formData.startTime;
    let end = formData.endTime;
    if (type === 'Day Shift') {
      start = '08:00';
      end = '16:00';
    } else if (type === 'Night Shift') {
      start = '20:00';
      end = '08:00';
    } else if (type === 'Long Day') {
      start = '08:00';
      end = '20:00';
    }
    setFormData((prev) => ({
      ...prev,
      shiftType: type,
      startTime: start,
      endTime: end,
    }));
  };

  // Toggle qualification
  const toggleQualification = (id: string) => {
    setFormData((prev) => {
      const exists = prev.qualifications.includes(id);
      return {
        ...prev,
        qualifications: exists 
          ? prev.qualifications.filter((q) => q !== id) 
          : [...prev.qualifications, id],
      };
    });
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    if (!isFormValid) {
      // scroll to first error
      const firstErrorElement = document.querySelector('[data-error="true"]');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const refNumber = `CTL-${Math.floor(1000 + Math.random() * 9000)}-${formData.urgencyLevel === 'Short Notice' ? 'EMG' : 'STD'}`;

    const submission: StaffRequestSubmission = {
      ...formData,
      id: `req-${Date.now()}`,
      referenceNumber: refNumber,
      submittedAt: new Date().toISOString(),
      status: formData.urgencyLevel === 'Short Notice' ? 'Allocating Staff' : 'Pending Dispatch',
      estimatedResponseTime: formData.urgencyLevel === 'Short Notice' ? 'Within 15 minutes' : 'Within 2 hours',
      totalHours: shiftHours,
      estimatedCost: estimatedTotal,
      assignedCarers: formData.urgencyLevel === 'Short Notice' ? [
        {
          name: 'Standby Carer (Dispatched)',
          role: formData.role,
          dbsNumber: '001928491021',
          badgeId: 'CTL-ONCALL-19',
          contactNumber: '+44 7700 900381',
          eta: 'Within 45 mins',
        }
      ] : undefined
    };

    setIsSending(true);
    setSendError(null);
    sendRequestEmails(submission)
      .catch(() => setSendError('Email delivery failed — request still logged.'))
      .finally(() => setIsSending(false));

    setSubmittedSuccess(submission);
    onSubmitSuccess(submission);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Breadcrumb & Title */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <span>B2B Healthcare Portal</span>
            <span>•</span>
            <span>Instant Dispatch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0e223d] tracking-tight">
            Request Staff Cover
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-2xl">
            Complete the form below to request temporary healthcare assistants, support workers, or registered nurses. 
            For emergency cover, our on-call dispatch desk confirms within 15 minutes.
          </p>
        </div>

        <button 
          type="button"
          onClick={onCancel}
          className="self-start sm:self-auto px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition cursor-pointer shadow-xs"
        >
          &larr; Back to Home
        </button>
      </div>

      {/* Confirmation Modal View if Form Submitted */}
      {submittedSuccess ? (
        <div className="bg-white rounded-3xl border-2 border-emerald-500 p-8 sm:p-12 shadow-2xl max-w-2xl mx-auto text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-200">
              Staff Request Logged Successfully
            </span>
            <h2 className="text-3xl font-extrabold text-[#0e223d]">
              Booking Confirmed
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Our 24/7 on-call coordinator is reviewing your shift requirements. A confirmation email and SMS dispatch link have been sent to <strong>{submittedSuccess.email}</strong>.
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-3 text-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-slate-500 font-medium">Booking Reference:</span>
              <span className="font-mono text-base font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                {submittedSuccess.referenceNumber}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-500 block">Facility:</span>
                <span className="font-bold text-slate-800">{submittedSuccess.facilityName} ({submittedSuccess.facilityType})</span>
              </div>
              <div>
                <span className="text-slate-500 block">Duty Manager:</span>
                <span className="font-bold text-slate-800">{submittedSuccess.managerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Role & Staff Count:</span>
                <span className="font-bold text-slate-800">{submittedSuccess.role} &times; {submittedSuccess.staffQuantity}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Shift Date:</span>
                <span className="font-bold text-slate-800">{submittedSuccess.shiftDate} ({submittedSuccess.startTime} - {submittedSuccess.endTime})</span>
              </div>
              <div>
                <span className="text-slate-500 block">Urgency Status:</span>
                <span className={`font-bold ${submittedSuccess.urgencyLevel === 'Short Notice' ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {submittedSuccess.urgencyLevel === 'Short Notice' ? '⚡ Short Notice (< 4h)' : 'Standard Cover'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Estimated Response:</span>
                <span className="font-bold text-slate-800">{submittedSuccess.estimatedResponseTime}</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-sm font-bold">
              <span className="text-slate-700">Estimated Shift Total:</span>
              <span className="text-base text-[#0e223d]">£{submittedSuccess.estimatedCost.toFixed(2)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Confirmation Receipt</span>
            </button>

            <button
              onClick={() => {
                setSubmittedSuccess(null);
                setFormData((prev) => ({
                  ...prev,
                  facilityName: '',
                  managerName: '',
                  termsAccepted: false,
                }));
                setTouched({});
              }}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl shadow-md transition cursor-pointer"
            >
              Submit Another Shift
            </button>

            <button
              onClick={onCancel}
              className="px-5 py-2.5 text-slate-600 hover:text-slate-900 text-sm font-semibold cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      ) : (

        /* Main Form & Calculation Sidebar Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Fields (8 Cols) */}
          <form onSubmit={handleSubmit} noValidate className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
            
            {/* Section 1: Facility Details */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div className="w-7 h-7 rounded-full bg-[#0e223d] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  1
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0e223d]">Facility & Requester Details</h2>
                  <p className="text-xs text-slate-500">Provide the hospital, care home, or clinic location details.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Facility Name */}
                <div data-error={Boolean(touched.facilityName && errors.facilityName)}>
                  <label htmlFor={`${formId}-facilityName`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Facility Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      id={`${formId}-facilityName`}
                      type="text"
                      value={formData.facilityName}
                      onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                      onBlur={() => handleBlur('facilityName')}
                      placeholder="e.g. Queen Elizabeth Hospital / Meadow View Care Home"
                      className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                        touched.facilityName && errors.facilityName
                          ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:ring-rose-400'
                          : 'border-slate-300 focus:border-amber-500 focus:ring-amber-400'
                      } focus:outline-none focus:ring-2 transition`}
                    />
                  </div>
                  {touched.facilityName && errors.facilityName && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.facilityName}</span>
                    </p>
                  )}
                </div>

                {/* Facility Type */}
                <div>
                  <label htmlFor={`${formId}-facilityType`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Facility Type *
                  </label>
                  <select
                    id={`${formId}-facilityType`}
                    value={formData.facilityType}
                    onChange={(e) => setFormData({ ...formData, facilityType: e.target.value as FacilityType })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition"
                  >
                    {FACILITY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Manager Name */}
                <div data-error={Boolean(touched.managerName && errors.managerName)}>
                  <label htmlFor={`${formId}-managerName`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Duty Manager / Requester Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      id={`${formId}-managerName`}
                      type="text"
                      value={formData.managerName}
                      onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                      onBlur={() => handleBlur('managerName')}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                        touched.managerName && errors.managerName
                          ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:ring-rose-400'
                          : 'border-slate-300 focus:border-amber-500 focus:ring-amber-400'
                      } focus:outline-none focus:ring-2 transition`}
                    />
                  </div>
                  {touched.managerName && errors.managerName && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.managerName}</span>
                    </p>
                  )}
                </div>

                {/* Ward / Unit Name */}
                <div>
                  <label htmlFor={`${formId}-wardUnit`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Ward / Unit / Wing (Optional)
                  </label>
                  <input
                    id={`${formId}-wardUnit`}
                    type="text"
                    value={formData.wardUnit}
                    onChange={(e) => setFormData({ ...formData, wardUnit: e.target.value })}
                    placeholder="e.g. Willow Dementia Suite / Ward 3B"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition"
                  />
                </div>

                {/* Contact Email */}
                <div data-error={Boolean(touched.email && errors.email)}>
                  <label htmlFor={`${formId}-email`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Work Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      id={`${formId}-email`}
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onBlur={() => handleBlur('email')}
                      placeholder="manager@carehome.co.uk"
                      className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                        touched.email && errors.email
                          ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:ring-rose-400'
                          : 'border-slate-300 focus:border-amber-500 focus:ring-amber-400'
                      } focus:outline-none focus:ring-2 transition`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Contact Phone */}
                <div data-error={Boolean(touched.phone && errors.phone)}>
                  <label htmlFor={`${formId}-phone`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Direct Contact Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      id={`${formId}-phone`}
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onBlur={() => handleBlur('phone')}
                      placeholder="+44 121 496 0000 / 07700..."
                      className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                        touched.phone && errors.phone
                          ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:ring-rose-400'
                          : 'border-slate-300 focus:border-amber-500 focus:ring-amber-400'
                      } focus:outline-none focus:ring-2 transition`}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Postcode */}
                <div className="sm:col-span-2" data-error={Boolean(touched.postcode && errors.postcode)}>
                  <label htmlFor={`${formId}-postcode`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Facility Postcode & Full Address *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      id={`${formId}-postcode`}
                      type="text"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      onBlur={() => handleBlur('postcode')}
                      placeholder="e.g. B15 2TT, 42 Meadow Lane, Edgbaston, Birmingham"
                      className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                        touched.postcode && errors.postcode
                          ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:ring-rose-400'
                          : 'border-slate-300 focus:border-amber-500 focus:ring-amber-400'
                      } focus:outline-none focus:ring-2 transition`}
                    />
                  </div>
                  {touched.postcode && errors.postcode && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.postcode}</span>
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Section 2: Role Required */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div className="w-7 h-7 rounded-full bg-[#0e223d] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  2
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0e223d]">Role Required & Staff Quantity</h2>
                  <p className="text-xs text-slate-500">Choose the job role and how many staff members are required.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* Role Dropdown */}
                <div className="sm:col-span-8">
                  <label htmlFor={`${formId}-role`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Job Role Required *
                  </label>
                  <select
                    id={`${formId}-role`}
                    value={formData.role}
                    onChange={(e) => {
                      const newRole = e.target.value as JobRole;
                      const roleMeta = AVAILABLE_ROLES.find((r) => r.id === newRole);
                      setFormData({
                        ...formData,
                        role: newRole,
                        // auto-add required default qualifications for this role
                        qualifications: Array.from(new Set([...formData.qualifications, ...(roleMeta?.defaultQualifications || [])])),
                      });
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition font-semibold text-[#0e223d]"
                  >
                    {AVAILABLE_ROLES.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.title} ({role.category})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-500 mt-1.5 italic">
                    {activeRoleConfig.description}
                  </p>
                </div>

                {/* Staff Quantity */}
                <div className="sm:col-span-4">
                  <label htmlFor={`${formId}-quantity`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Staff Quantity *
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, staffQuantity: Math.max(1, p.staffQuantity - 1) }))}
                      className="px-3.5 py-2.5 border border-slate-300 rounded-l-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm"
                    >
                      -
                    </button>
                    <input
                      id={`${formId}-quantity`}
                      type="number"
                      min={1}
                      max={25}
                      value={formData.staffQuantity}
                      onChange={(e) => setFormData({ ...formData, staffQuantity: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="w-full py-2.5 text-center text-sm font-bold border-y border-slate-300 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, staffQuantity: Math.min(25, p.staffQuantity + 1) }))}
                      className="px-3.5 py-2.5 border border-slate-300 rounded-r-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Section 3: Qualifications & Specific Certifications */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div className="w-7 h-7 rounded-full bg-[#0e223d] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  3
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0e223d]">Qualifications & Certifications Needed</h2>
                  <p className="text-xs text-slate-500">Select certifications required. All staff are DBS checked and reference-verified.</p>
                </div>
              </div>

              {/* Multi-select Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {QUALIFICATIONS_LIST.map((q) => {
                  const isSelected = formData.qualifications.includes(q.id);
                  return (
                    <div
                      key={q.id}
                      onClick={() => toggleQualification(q.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                        isSelected 
                          ? 'border-amber-500 bg-amber-50/70 text-amber-950 font-semibold shadow-xs ring-1 ring-amber-400/50' 
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // handled by parent onClick
                        className="mt-0.5 rounded text-amber-500 focus:ring-amber-400 pointer-events-none"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{q.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                            q.category === 'Mandatory' ? 'bg-slate-100 text-slate-600' :
                            q.category === 'Clinical' ? 'bg-sky-100 text-sky-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {q.category}
                          </span>
                        </div>
                        {q.description && (
                          <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
                            {q.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Specific Certifications & Acuity notes */}
              <div>
                <label htmlFor={`${formId}-certNotes`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Additional Clinical Competencies or Facility-Specific Rules
                </label>
                <textarea
                  id={`${formId}-certNotes`}
                  rows={2}
                  value={formData.additionalCertifications}
                  onChange={(e) => setFormData({ ...formData, additionalCertifications: e.target.value })}
                  placeholder="e.g. Must have experience with specific electronic care systems (Nourish, Care Control), hoist type, or tracheostomy care..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition"
                ></textarea>
              </div>
            </div>

            {/* Section 4: Shift Details & Urgency Level */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div className="w-7 h-7 rounded-full bg-[#0e223d] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  4
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0e223d]">Shift Timings & Urgency Level</h2>
                  <p className="text-xs text-slate-500">Specify dates, shift hours, and whether this is a planned cover or emergency short notice.</p>
                </div>
              </div>

              {/* Urgency Level Toggle (Core requirement) */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0e223d] mb-2.5">
                  Select Urgency Level *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Standard Option */}
                  <label
                    onClick={() => setFormData({ ...formData, urgencyLevel: 'Standard' })}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.urgencyLevel === 'Standard'
                        ? 'border-emerald-500 bg-emerald-50/60 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      checked={formData.urgencyLevel === 'Standard'}
                      onChange={() => setFormData({ ...formData, urgencyLevel: 'Standard' })}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span className="font-extrabold text-sm text-[#0e223d]">Standard Scheduled Cover</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Planned absences, holidays, and rota gaps booked in advance (24 hours+ notice). Standard framework rates apply.
                      </p>
                    </div>
                  </label>

                  {/* Short Notice Emergency Option */}
                  <label
                    onClick={() => setFormData({ ...formData, urgencyLevel: 'Short Notice' })}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.urgencyLevel === 'Short Notice'
                        ? 'border-amber-500 bg-amber-50 shadow-sm ring-1 ring-amber-400/40'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      checked={formData.urgencyLevel === 'Short Notice'}
                      onChange={() => setFormData({ ...formData, urgencyLevel: 'Short Notice' })}
                      className="mt-1 text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                        <span className="font-extrabold text-sm text-amber-900">
                          Short Notice / Emergency Cover
                        </span>
                      </div>
                      <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
                        Immediate sickness or sudden shortage (&lt; 4 hours notice). Priority dispatch with coordinator callback within 15 minutes.
                      </p>
                    </div>
                  </label>

                </div>
              </div>

              {/* Shift Presets */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Shift Timing Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Day Shift', 'Night Shift', 'Long Day', 'Custom'] as ShiftType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleShiftPresetChange(type)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer border ${
                        formData.shiftType === type
                          ? 'bg-[#0e223d] text-white border-[#0e223d]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shift Date, Start Time, End Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Date */}
                <div data-error={Boolean(touched.shiftDate && errors.shiftDate)}>
                  <label htmlFor={`${formId}-shiftDate`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Shift Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      id={`${formId}-shiftDate`}
                      type="date"
                      value={formData.shiftDate}
                      onChange={(e) => setFormData({ ...formData, shiftDate: e.target.value })}
                      onBlur={() => handleBlur('shiftDate')}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                {/* Start Time */}
                <div data-error={Boolean(touched.startTime && errors.startTime)}>
                  <label htmlFor={`${formId}-startTime`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Start Time *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      id={`${formId}-startTime`}
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value, shiftType: 'Custom' })}
                      onBlur={() => handleBlur('startTime')}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                {/* End Time */}
                <div data-error={Boolean(touched.endTime && errors.endTime)}>
                  <label htmlFor={`${formId}-endTime`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    End Time *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      id={`${formId}-endTime`}
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value, shiftType: 'Custom' })}
                      onBlur={() => handleBlur('endTime')}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

              </div>

              {/* Special Notes */}
              <div>
                <label htmlFor={`${formId}-notes`} className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Handover Instructions / Patient Acuity Notes
                </label>
                <textarea
                  id={`${formId}-notes`}
                  rows={2}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="e.g. Please report to Sister Mary at reception at 07:45 for handover. Free parking available on site."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                ></textarea>
              </div>

            </div>

            {/* Terms & Authorization */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <label 
                className={`flex items-start gap-3 text-xs cursor-pointer p-3 rounded-xl border ${
                  touched.termsAccepted && errors.termsAccepted 
                    ? 'border-rose-400 bg-rose-50/20' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  onBlur={() => handleBlur('termsAccepted')}
                  className="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
                />
                <span className="text-slate-600 leading-relaxed">
                  I confirm that I am an authorised duty manager or representative of this facility and accept ChichiTlc Ltd standard service terms, DBS verification compliance guarantee, and agreed rate card.
                </span>
              </label>
              {touched.termsAccepted && errors.termsAccepted && (
                <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.termsAccepted}</span>
                </p>
              )}
            </div>

            {/* Bottom Form Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel & Return
              </button>

              <button
                type="submit"
                disabled={isSending}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:opacity-60 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>{isSending ? 'Sending...' : 'Submit Staffing Request'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {sendError && <p className="text-xs text-rose-500 mt-1">{sendError}</p>}
            </div>

          </form>

          {/* Sticky Cost & Summary Calculation Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Live Rate Card & Calculation */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <Calculator className="w-5 h-5 text-amber-600" />
                <h3 className="font-extrabold text-base text-[#0e223d]">Live Shift Calculation</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Selected Role:</span>
                  <span className="font-bold text-slate-800 text-right">{formData.role}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Quantity:</span>
                  <span className="font-bold text-slate-800">{formData.staffQuantity} {formData.staffQuantity > 1 ? 'workers' : 'worker'}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Calculated Shift Hours:</span>
                  <span className="font-bold text-slate-800">{shiftHours} hrs</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Hourly Agency Rate:</span>
                  <span className="font-bold text-slate-800">£{hourlyRate.toFixed(2)}/hr</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Urgency Tier:</span>
                  <span className={`font-bold ${formData.urgencyLevel === 'Short Notice' ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {formData.urgencyLevel === 'Short Notice' ? 'Short Notice (+20%)' : 'Standard Tier'}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-extrabold text-[#0e223d] block">Estimated Total:</span>
                    <span className="text-[10px] text-slate-400">Excl. VAT • Transparent Invoicing</span>
                  </div>
                  <span className="text-2xl font-black text-amber-600">
                    £{estimatedTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {formData.urgencyLevel === 'Short Notice' && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    Emergency Short-Notice Activated
                  </p>
                  <p>Our on-call coordinator is alerted instantly. Priority placement with travel confirmation in &lt;15 mins.</p>
                </div>
              )}
            </div>

            {/* Trust & Guarantee Box */}
            <div className="bg-[#0e223d] text-white rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-sm text-white">ChichiTlc Guarantee</h4>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Enhanced DBS Checked:</strong> Verified via the government Update Service before arrival.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>CSTF Framework:</strong> Mandatory training certified for infection control and safe handling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Full Replacement Guarantee:</strong> If unsatisfied within 2 hours, replacement is dispatched free of charge.</span>
                </li>
              </ul>
            </div>

            {/* Direct Phone Assistance */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
              <p className="text-xs text-slate-500">Prefer to book by telephone?</p>
              <a 
                href="tel:+441234567890" 
                className="text-base font-extrabold text-[#0e223d] hover:text-amber-600 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>+44 123 456 7890</span>
              </a>
              <p className="text-[10px] text-slate-400">Available 24 hours a day, 365 days a year</p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
