// EmptyState.jsx
import React from 'react';

/**
 * Informative, reassuring empty state for lists or sections.
 */
export default function EmptyState({ title = 'Nothing here yet', description = '', icon = '🌱', className = '', ...props }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-12 ${className}`} {...props}>
      <div className="text-4xl mb-2" aria-hidden>{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      {description && <p className="text-gray-500 text-base max-w-xs mx-auto">{description}</p>}
    </div>
  );
}
