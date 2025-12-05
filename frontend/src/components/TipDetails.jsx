// frontend/src/components/TipDetails.jsx
import React from 'react';

export default function TipDetails({ detail, onBack }) {
    if (!detail) return null;
    return (
        <div className="p-6">
            <button onClick={onBack} className="mb-4 px-3 py-1 border rounded">Back</button>
            <h2 className="text-xl font-semibold mb-2">{detail.title}</h2>
            <p className="mb-4">{detail.description}</p>
            <ol className="list-decimal pl-6">
                {detail.steps?.map((s, i) => (
                    <li key={i} className="mb-2">
                        {s}
                    </li>
                ))}
            </ol>
        </div>
    );
}
