import React, { useState, useEffect } from 'react';

export default function TipDetails({ detail, onBack }) {
    const [completedSteps, setCompletedSteps] = useState([]);
    
    useEffect(() => {
        setCompletedSteps([]);
        // Scroll to top when detail opens
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [detail]);

    if (!detail) return null;
    
    const toggleStep = (index) => {
        setCompletedSteps(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };
    
    const progress = detail.steps ? Math.round((completedSteps.length / detail.steps.length) * 100) : 0;
    
    return (
        <div className="fixed inset-0 z-50 bg-stone-50 overflow-y-auto animate-fade-in">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-12">
                {/* Navigation */}
                <button 
                    onClick={onBack} 
                    className="group mb-8 flex items-center gap-3 text-stone-500 hover:text-stone-900 transition-colors"
                >
                    <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-stone-900 transition-colors bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="font-medium tracking-wide">Back to collection</span>
                </button>
                
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-12 border-b border-stone-200 pb-12">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-4xl bg-white border border-stone-100 shadow-xl shadow-stone-200/50 flex items-center justify-center text-5xl md:text-6xl shrink-0">
                        {detail.icon || '✨'}
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-wrap gap-3 mb-6">
                            {[
                                { icon: '⏱️', label: '5-10 min' },
                                { icon: '🎯', label: 'Beginner Friendly' }
                            ].map((meta, i) => (
                                <span key={i} className="px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 text-sm font-medium">
                                    {meta.label}
                                </span>
                            ))}
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-tight mb-6">
                            {detail.title}
                        </h1>
                        <p className="text-xl text-stone-600 font-light leading-relaxed max-w-3xl">
                            {detail.description || detail.short || "Here's how you can improve your wellness with this simple practice."}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-start">
                    {/* Left Column: Steps */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-serif text-2xl text-stone-900">Your Ritual</h3>
                            <span className="text-sm font-medium text-stone-400">
                                {detail.steps ? `${completedSteps.length} of ${detail.steps.length} completed` : 'Loading steps...'}
                            </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            {detail.steps ? (
                                detail.steps.map((step, index) => (
                                <div 
                                    key={index}
                                    onClick={() => toggleStep(index)}
                                    className={`
                                        group p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-4 h-full
                                        ${completedSteps.includes(index)
                                            ? 'bg-stone-50 border-stone-200 opacity-60'
                                            : 'bg-white border-stone-100 hover:border-stone-300 hover:shadow-lg hover:shadow-stone-200/20'
                                        }
                                    `}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold tracking-widest text-stone-400 uppercase">Step {index + 1}</span>
                                        <div className={`
                                            w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300
                                            ${completedSteps.includes(index)
                                                ? 'bg-stone-900 border-stone-900 text-white'
                                                : 'border-stone-300 group-hover:border-stone-900 text-transparent'
                                            }
                                        `}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className={`text-lg leading-relaxed transition-colors ${completedSteps.includes(index) ? 'text-stone-400 line-through' : 'text-stone-800'}`}>
                                        {step}
                                    </p>
                                </div>
                            ))
                            ) : (
                                // Skeleton Loading State
                                [...Array(4)].map((_, i) => (
                                    <div key={i} className="p-6 rounded-2xl border border-stone-100 bg-white h-40 animate-pulse">
                                        <div className="flex justify-between mb-4">
                                            <div className="h-4 w-16 bg-stone-200 rounded"></div>
                                            <div className="h-6 w-6 rounded-full bg-stone-200"></div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-4 w-full bg-stone-200 rounded"></div>
                                            <div className="h-4 w-5/6 bg-stone-200 rounded"></div>
                                            <div className="h-4 w-4/6 bg-stone-200 rounded"></div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8 lg:sticky lg:top-8">
                        <div className="bg-stone-900 text-white p-8 rounded-4xl">
                            <h3 className="font-serif text-2xl mb-4">Why this works</h3>
                            <p className="text-stone-400 leading-relaxed mb-8 font-light">
                                This practice is grounded in behavioral science. Small, consistent actions create neural pathways that make habits stick.
                            </p>
                            <div className="flex items-center gap-4 pt-8 border-t border-stone-800">
                                <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center">
                                    🧬
                                </div>
                                <div>
                                    <div className="text-sm font-medium">Science Backed</div>
                                    <div className="text-xs text-stone-500">Verified by experts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
