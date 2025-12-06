// Button.jsx
import React from 'react';

/**
 * Soft, accessible button with subtle hover/press animation.
 * Disabled state is visually clear.
 */
export default function Button({ children, className = '', disabled, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold shadow-sm transition-all duration-150
        hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
