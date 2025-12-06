// ErrorMessage.jsx
import React from 'react';

/**
 * Friendly, non-technical error message for async errors.
 */
export default function ErrorMessage({ message = 'Something went wrong. Please try again.', className = '', ...props }) {
  return (
    <div className={`bg-red-50 text-red-700 rounded-xl px-4 py-3 text-center text-base shadow-sm ${className}`} role="alert" {...props}>
      <span role="img" aria-label="Error" className="mr-2">😕</span>
      {message}
    </div>
  );
}
