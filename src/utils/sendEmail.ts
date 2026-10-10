import emailjs from '@emailjs/browser';
import { StaffRequestSubmission } from '../types/staffing';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
const REQUESTER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_REQUESTER_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendRequestEmails(submission: StaffRequestSubmission) {
  const common = {
    reference_number: submission.referenceNumber,
    facility_name: submission.facilityName,
    facility_type: submission.facilityType,
    manager_name: submission.managerName,
    role: submission.role,
    staff_quantity: String(submission.staffQuantity),
    shift_date: submission.shiftDate,
    start_time: submission.startTime,
    end_time: submission.endTime,
    urgency_level: submission.urgencyLevel,
    estimated_cost: `£${submission.estimatedCost.toFixed(2)}`,
    estimated_response: submission.estimatedResponseTime,
    phone: submission.phone,
    postcode: submission.postcode,
    special_notes: submission.specialNotes || 'None',
  };

  // Notify admin
  await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, {
    ...common,
    to_email: 'simbastart.dev@gmail.com',
    requester_email: submission.email,
  }, PUBLIC_KEY);

  // Confirm to requester
  await emailjs.send(SERVICE_ID, REQUESTER_TEMPLATE_ID, {
    ...common,
    to_email: submission.email,
    to_name: submission.managerName,
  }, PUBLIC_KEY);
}
