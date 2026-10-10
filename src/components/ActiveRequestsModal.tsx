import React from 'react';
import { X, ShieldCheck, Clock, Zap, MapPin, Phone, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import { StaffRequestSubmission } from '../types/staffing';

interface ActiveRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: StaffRequestSubmission[];
  onNewRequestClick: () => void;
}

export const ActiveRequestsModal: React.FC<ActiveRequestsModalProps> = ({
  isOpen,
  onClose,
  requests,
  onNewRequestClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-xl font-extrabold text-[#0e223d]">Facility Roster & Staffing Bookings</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live dispatch status of your submitted staffing cover requests.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Requests */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {requests.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold">No active staffing requests found.</p>
              <button
                onClick={() => {
                  onClose();
                  onNewRequestClick();
                }}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                Submit First Staff Request
              </button>
            </div>
          ) : (
            requests.map((item) => (
              <div 
                key={item.id}
                className="border border-slate-200 rounded-2xl p-5 hover:border-amber-300 transition-all bg-slate-50/50 space-y-4 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {item.referenceNumber}
                    </span>
                    <span className="text-xs font-bold text-[#0e223d] ml-2">
                      {item.facilityName}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">({item.facilityType})</span>
                  </div>

                  <span className={`px-2.5 py-1 text-xs font-extrabold rounded-full ${
                    item.status === 'Confirmed' 
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'Allocating Staff' 
                      ? 'bg-amber-100 text-amber-800 animate-pulse'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    ● {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Role:</span>
                    <span className="font-bold text-slate-800">{item.role} &times; {item.staffQuantity}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Shift Date & Hours:</span>
                    <span className="font-bold text-slate-800">{item.shiftDate} ({item.startTime} - {item.endTime})</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Urgency:</span>
                    <span className={`font-bold ${item.urgencyLevel === 'Short Notice' ? 'text-amber-600' : 'text-slate-700'}`}>
                      {item.urgencyLevel}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Estimated Rate Total:</span>
                    <span className="font-bold text-slate-800">£{item.estimatedCost.toFixed(2)}</span>
                  </div>
                </div>

                {/* Assigned Carers / Workers */}
                {item.assignedCarers && item.assignedCarers.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Assigned Personnel & Verification:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.assignedCarers.map((carer, cIdx) => (
                        <div key={cIdx} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 font-bold text-slate-800">
                              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{carer.name}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono">
                              DBS: {carer.dbsNumber} • ID: {carer.badgeId}
                            </p>
                          </div>
                          {carer.eta && (
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              ETA: {carer.eta}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-3xl flex items-center justify-between">
          <p className="text-xs text-slate-500">
            For modifications to active rosters, call on-call dispatch directly.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onNewRequestClick();
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
            >
              + Request More Staff
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
