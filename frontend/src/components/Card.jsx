// Card.jsx
import React from 'react';

/**
 * Minimal, soft card with padding, rounded corners, and gentle shadow.
 * Use for all main content blocks.
 */
export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white/80 rounded-2xl shadow-sm p-6 md:p-8 transition-shadow duration-200 hover:shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
