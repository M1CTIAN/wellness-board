import React from 'react';

export default function TipCard({ tip, onOpen, onSave, isSaved, index = 0, variant = 'standard' }) {
    const handleSave = (e) => {
        e.stopPropagation();
        onSave(tip);
    };

    const isPrimary = variant === 'primary';

    return (
        <div 
            onClick={() => onOpen(tip)}
            className={`group relative flex flex-col h-full break-inside-avoid mb-8 cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2
                ${isPrimary ? 'bg-stone-900 text-white' : 'bg-white text-stone-900 hover:shadow-2xl hover:shadow-stone-200/50'}
                rounded-[2rem] overflow-hidden border ${isPrimary ? 'border-stone-900' : 'border-stone-100'}
            `}
        >
            <div className="p-8 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110
                        ${isPrimary ? 'bg-white/10 text-white' : 'bg-stone-50 text-stone-900'}
                    `}>
                        {tip.icon || '✨'}
                    </div>
                    <button 
                        onClick={handleSave}
                        className={`
                            w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                            ${isSaved 
                                ? 'bg-pink-500 text-white scale-110' 
                                : isPrimary 
                                    ? 'bg-white/10 text-white/50 hover:bg-white/20 hover:text-white' 
                                    : 'bg-stone-50 text-stone-400 hover:bg-pink-50 hover:text-pink-500'
                            }
                        `}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                
                <div className="mb-auto">
                    <h3 className={`font-serif text-2xl mb-3 leading-tight ${isPrimary ? 'text-white' : 'text-stone-900'}`}>
                        {tip.title}
                    </h3>
                    <p className={`text-lg font-light leading-relaxed ${isPrimary ? 'text-stone-300' : 'text-stone-500'}`}>
                        {tip.short}
                    </p>
                </div>

                <div className={`mt-8 pt-8 border-t flex items-center justify-between ${isPrimary ? 'border-white/10' : 'border-stone-100'}`}>
                    <span className={`text-xs font-medium tracking-widest uppercase truncate max-w-[120px] ${isPrimary ? 'text-stone-400' : 'text-stone-400'}`}>
                        {tip.generatedFor || tip.category || 'Wellness Tip'}
                    </span>
                    <div className={`
                        flex items-center gap-2 text-sm font-medium transition-all duration-300 transform translate-x-0 group-hover:translate-x-1
                        ${isPrimary ? 'text-white' : 'text-stone-900'}
                    `}>
                        Explore
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
