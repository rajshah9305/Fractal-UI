// src/components/MessageBox.jsx
// Custom dialog component for Fractal UI
import React from 'react';

/**
 * MessageBox Props:
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @param {string} type - 'info' | 'error' | 'warning' | 'success'
 * @param {Array} actions - [{ label: string, onClick: function, variant: string }]
 * @param {boolean} open - Whether the dialog is open
 * @param {function} onClose - Called when dialog is dismissed
 */
export default function MessageBox({ title, message, type = 'info', actions = [], open, onClose }) {
  if (!open) return null;

  // Color and icon based on type
  const typeStyles = {
    info: 'bg-blue-50 text-blue-800 border-blue-300',
    error: 'bg-red-50 text-red-800 border-red-300',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-300',
    success: 'bg-green-50 text-green-800 border-green-300',
  };
  const icon = {
    info: <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" /></svg>,
    error: <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9l-6 6m0-6l6 6" /></svg>,
    warning: <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" /></svg>,
    success: <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" /></svg>,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className={`w-full max-w-md rounded-lg border shadow-lg p-6 relative ${typeStyles[type]}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="messagebox-title"
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex items-center gap-3 mb-3">
          {icon[type]}
          <h3 id="messagebox-title" className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="mb-4 text-sm">{message}</div>
        <div className="flex justify-end gap-2">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded font-medium focus:outline-none transition ${
                action.variant === 'primary'
                  ? 'bg-primary text-white hover:bg-indigo-600'
                  : action.variant === 'danger'
                  ? 'bg-error text-white hover:bg-red-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 