// frontend/src/components/TipCard.jsx
import React from 'react';

export default function TipCard({ tip, onOpen, onSave }) {
    return (
        <div className="border rounded p-4 shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="text-3xl">{tip.icon || '💡'}</div>
                <div>
                    <h3 className="font-semibold">{tip.title}</h3>
                    <p className="text-sm text-gray-600">{tip.short}</p>
                </div>
            </div>
            <div className="mt-3 flex gap-2">
                <button onClick={() => onOpen(tip)} className="text-sm px-2 py-1 border rounded">
                    Open
                </button>
                <button onClick={() => onSave(tip)} className="text-sm px-2 py-1 bg-green-600 text-white rounded">
                    Save
                </button>
            </div>
        </div>
    );
}
