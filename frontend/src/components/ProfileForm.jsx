import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../stores/useStore';

const goalSuggestions = [
  { icon: '😴', label: 'Better Sleep' },
  { icon: '💪', label: 'Build Strength' },
  { icon: '🧘', label: 'Reduce Stress' },
  { icon: '⚡', label: 'More Energy' },
  { icon: '🥗', label: 'Eat Healthier' },
  { icon: '🧠', label: 'Mental Clarity' },
];

export default function ProfileForm() {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [goal, setGoal] = useState('');
    const [selectedGoal, setSelectedGoal] = useState(null);
    const setProfile = useStore((s) => s.setProfile);
    const navigate = useNavigate();

    const genderOptions = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];

    const handleGoalSelect = (suggestion) => {
        setSelectedGoal(suggestion.label);
        setGoal(suggestion.label);
    };

    const handleSubmit = () => {
        if (!age || !gender || !goal) return;
        setProfile({ age: Number(age), gender, goal });
        navigate('/tips');
    };

    const isValid = age && gender && goal;

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 md:p-8">
            <div className="max-w-6xl w-full bg-white rounded-[3rem] shadow-2xl shadow-stone-200/50 overflow-hidden flex flex-col lg:flex-row animate-fade-in min-h-[800px]">
                {/* Left Side - Hero */}
                <div className="lg:w-5/12 bg-stone-900 p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Abstract Background */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl mix-blend-screen animate-blob"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen animate-blob animation-delay-2000"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-medium mb-12 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                            AI-Powered Personalization
                        </div>
                        
                        <h1 className="font-serif text-5xl lg:text-6xl leading-[1.1] mb-8 text-white">
                            Design your <br/>
                            <span className="text-stone-400 italic">daily ritual.</span>
                        </h1>
                        
                        <p className="text-stone-400 text-lg leading-relaxed font-light max-w-md">
                            Tell us a little about yourself, and we'll curate a wellness experience that adapts to your unique rhythm and goals.
                        </p>
                    </div>

                    <div className="relative z-10 mt-12 pt-12 border-t border-white/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex -space-x-3">
                                {[1,2,3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-stone-900 bg-stone-800 flex items-center justify-center text-xs overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <div className="font-medium text-white">Join 50,000+ others</div>
                                <div className="text-stone-500">finding their balance</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:w-7/12 p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-white">
                    <div className="max-w-xl mx-auto w-full">
                        <div className="mb-12">
                            <h2 className="font-serif text-3xl text-stone-900 mb-3">Let's get started</h2>
                            <p className="text-stone-500 font-light">This helps us tailor your insights.</p>
                        </div>
                        
                        <div className="space-y-10">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="block text-sm font-medium text-stone-500 mb-2 ml-1">Age</label>
                                    <input 
                                        value={age} 
                                        onChange={(e) => setAge(e.target.value)} 
                                        type="number" 
                                        min="1"
                                        max="120"
                                        placeholder="25"
                                        className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-2 border-transparent text-stone-900 placeholder-stone-400 focus:bg-white focus:border-stone-900 focus:outline-none transition-all duration-300 text-lg"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-medium text-stone-500 mb-2 ml-1">Gender</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsGenderOpen(!isGenderOpen)}
                                            className={`w-full px-6 py-4 rounded-2xl bg-stone-50 border-2 text-left flex items-center justify-between transition-all duration-300 text-lg outline-none focus:border-stone-900 ${
                                                isGenderOpen || gender ? 'bg-white border-stone-900 text-stone-900' : 'border-transparent text-stone-400'
                                            }`}
                                        >
                                            <span className={gender ? 'text-stone-900' : ''}>
                                                {gender || 'Select'}
                                            </span>
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className={`h-5 w-5 transition-transform duration-300 ${isGenderOpen ? 'rotate-180' : ''}`} 
                                                viewBox="0 0 20 20" 
                                                fill="currentColor"
                                            >
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        
                                        {isGenderOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden z-50 animate-fade-in">
                                                {genderOptions.map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        onClick={() => {
                                                            setGender(option);
                                                            setIsGenderOpen(false);
                                                        }}
                                                        className="w-full px-6 py-3 text-left hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors first:pt-4 last:pb-4 block"
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-500 mb-4 ml-1">What's your primary focus?</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                    {goalSuggestions.map((suggestion) => (
                                        <button
                                            key={suggestion.label}
                                            type="button"
                                            className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:-translate-y-1 ${
                                                selectedGoal === suggestion.label 
                                                    ? 'bg-stone-900 border-stone-900 text-white shadow-lg shadow-stone-200' 
                                                    : 'bg-white border-stone-100 text-stone-600 hover:border-stone-300 hover:shadow-md'
                                            }`}
                                            onClick={() => handleGoalSelect(suggestion)}
                                        >
                                            <span className="text-3xl">{suggestion.icon}</span>
                                            <span className="text-xs font-medium tracking-wide uppercase">{suggestion.label}</span>
                                        </button>
                                    ))}
                                </div>
                                <input 
                                    value={goal} 
                                    onChange={(e) => {
                                        setGoal(e.target.value);
                                        setSelectedGoal(null);
                                    }} 
                                    placeholder="Or type your own goal..."
                                    className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-2 border-transparent text-stone-900 placeholder-stone-400 focus:bg-white focus:border-stone-900 focus:outline-none transition-all duration-300"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={!isValid}
                                className="w-full py-5 text-lg font-medium text-white bg-stone-900 rounded-full hover:bg-stone-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-stone-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Create your profile
                            </button>

                            <p className="text-center text-stone-400 text-xs flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                Your data is stored locally and never shared.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
