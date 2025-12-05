// frontend/src/components/ProfileForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../stores/useStore';

export default function ProfileForm() {
    const [age, setAge] = useState(25);
    const [gender, setGender] = useState('Other');
    const [goal, setGoal] = useState('Improve sleep');
    const setProfile = useStore((s) => s.setProfile);
    const navigate = useNavigate();

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Tell us about you</h1>
            <label className="block mb-2">Age</label>
            <input value={age} onChange={(e) => setAge(Number(e.target.value))} type="number" className="border p-2 w-full rounded mb-4" />
            <label className="block mb-2">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="border p-2 w-full rounded mb-4">
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
            </select>
            <label className="block mb-2">Main goal</label>
            <input value={goal} onChange={(e) => setGoal(e.target.value)} className="border p-2 w-full rounded mb-4" />
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        setProfile({ age, gender, goal });
                        navigate('/tips');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Get Tips
                </button>
            </div>
        </div>
    );
}
