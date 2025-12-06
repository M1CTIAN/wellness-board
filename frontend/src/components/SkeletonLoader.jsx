import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="bg-white rounded-4xl p-8 border border-stone-100 h-full flex flex-col mb-8 break-inside-avoid">
      <div className="flex justify-between items-start mb-8">
        <div className="w-14 h-14 bg-stone-100 rounded-2xl animate-pulse"></div>
        <div className="w-10 h-10 bg-stone-100 rounded-full animate-pulse"></div>
      </div>
      
      <div className="h-8 bg-stone-100 rounded-lg w-3/4 mb-4 animate-pulse"></div>
      
      <div className="space-y-3 grow">
        <div className="h-4 bg-stone-100 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-stone-100 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-stone-100 rounded w-2/3 animate-pulse"></div>
      </div>

      <div className="mt-8 pt-8 border-t border-stone-100 flex justify-between items-center">
        <div className="h-3 bg-stone-100 rounded w-20 animate-pulse"></div>
        <div className="h-3 bg-stone-100 rounded w-16 animate-pulse"></div>
      </div>
    </div>
  );
}
