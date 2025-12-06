import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProfileForm from './components/ProfileForm';
import TipCard from './components/TipCard';
import TipDetails from './components/TipDetails';
import SkeletonLoader from './components/SkeletonLoader';
import useStore from './stores/useStore';
import { generateTips, expandTip } from './services/aiService';

// Navigation Component
function Navigation() {
  const location = useLocation();
  const favorites = useStore((s) => s.favorites);
  const profile = useStore((s) => s.profile);

  // Public Nav for Landing Page
  if (location.pathname === '/') {
    return (
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">✦</span>
              <span className="font-bold text-xl text-slate-900 tracking-tight">Wellness Board</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  // Minimal Nav for Onboarding
  if (location.pathname === '/start') {
    return (
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">✦</span>
              <span className="font-bold text-xl text-slate-900 tracking-tight">Wellness Board</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  // App Nav for authenticated users
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">✦</span>
            <span className="font-bold text-xl text-slate-900 tracking-tight">Wellness</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/tips"
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/tips' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tips
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/favorites' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Saved</span>
              {favorites.length > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Loading Component
function LoadingState() {
  const messages = [
    'Analyzing your wellness profile...',
    'Crafting personalized recommendations...',
    'Finding the perfect tips for your goals...',
    'Gathering wisdom from health experts...',
    'Finalizing your wellness plan...'
  ];
  const [messageIndex, setMessageIndex] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-16 h-16 mb-8 text-indigo-600 animate-bounce">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
      <p className="text-lg font-medium text-slate-700 mb-2 transition-all duration-300">
        {messages[messageIndex]}
      </p>
      <p className="text-sm text-slate-400">This usually takes a few seconds</p>
    </div>
  );
}

function TipsPage() {
  const profile = useStore((s) => s.profile);
  const tips = useStore((s) => s.tips);
  const setTips = useStore((s) => s.setTips);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const favorites = useStore((s) => s.favorites);
  const isLoading = useStore((s) => s.isLoading);
  const error = useStore((s) => s.error);
  const setLoading = useStore((s) => s.setLoading);
  const setError = useStore((s) => s.setError);

  const [detail, setDetail] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!profile) return;
    if (tips.length > 0) return; // Persist tips across navigation

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const result = await generateTips(profile);
        // Attach the goal context to each tip so we remember why it was generated
        const tipsWithContext = result.map(t => ({ ...t, generatedFor: profile.goal }));
        setTips(tipsWithContext);
      } catch (err) {
        setError(err.message || 'Failed to generate tips');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [profile, tips.length]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[20%] w-[30rem] h-[30rem] bg-indigo-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute bottom-[20%] left-[20%] w-[35rem] h-[35rem] bg-pink-200/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-lg w-full text-center relative z-10 animate-fade-in">
          <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-stone-200/50 flex items-center justify-center mx-auto mb-10 rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="text-4xl">🌱</span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 leading-tight">
            Begin your <br/>
            <span className="italic text-stone-400">wellness journey.</span>
          </h2>
          
          <p className="text-lg text-stone-500 mb-10 leading-relaxed font-light">
            To curate a personalized toolkit that adapts to your rhythm, we first need to understand your unique goals.
          </p>
          
          <Link 
            to="/start" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-stone-900 rounded-full hover:bg-stone-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-stone-200"
          >
            Create your profile
          </Link>
          
          <p className="mt-8 text-sm text-stone-400">
            Takes less than 1 minute • Private & Secure
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 animate-fade-in">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 text-sm font-medium tracking-wide">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mb-6 leading-[1.1]">
              Good morning. <br />
              <span className="text-stone-400 italic">Your daily wellness ritual.</span>
            </h1>
            <p className="text-xl text-stone-500 font-light leading-relaxed">
              We've curated these insights to help you find balance today.
            </p>
          </div>
          <button
            onClick={() => {
              setLoading(true);
              generateTips(profile).then(res => {
                const tipsWithContext = res.map(t => ({ ...t, generatedFor: profile.goal }));
                setTips(tipsWithContext);
              }).finally(() => setLoading(false));
            }}
            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-all duration-300"
            disabled={isLoading}
          >
            <span className={`text-lg transition-transform duration-700 ${isLoading ? "animate-spin" : "group-hover:rotate-180"}`}>↻</span>
            <span className="font-medium">Refresh Insights</span>
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 mb-12 flex items-start gap-4">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-serif text-xl text-red-900 mb-2">Unable to load insights</h3>
              <p className="text-red-700/80 mb-6 font-light">{error}</p>
              <button onClick={() => window.location.reload()} className="text-sm font-medium text-red-900 border-b border-red-900/20 hover:border-red-900 pb-0.5 transition-colors">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !detail && (
          <>
            <LoadingState />
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 mt-12">
              {[...Array(6)].map((_, i) => (
                <SkeletonLoader key={i} />
              ))}
            </div>
          </>
        )}

        {/* Tips Grid - Masonry Layout */}
        {!isLoading && !error && !detail && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {tips.map((t, index) => (
              <div key={t.id} className="animate-fade-in break-inside-avoid" style={{ animationDelay: `${index * 0.15}s` }}>
                <TipCard
                  tip={t}
                  index={index}
                  variant={index === 0 ? 'primary' : 'standard'}
                  isSaved={favorites.some(f => f.id === t.id)}
                  onOpen={async (tip) => {
                    try {
                      // Open immediately with basic info
                      setDetail(tip);
                      const expanded = await expandTip(tip, profile);
                      // Update with full details
                      setDetail(prev => ({ ...prev, ...expanded }));
                    } catch (err) {
                      setError(err.message || 'Failed to expand tip');
                      // Close detail if it failed? Or show error in detail?
                      // For now, let's keep it simple. If it fails, maybe we should close it or show an error toast.
                      setDetail(null); 
                    }
                  }}
                  onSave={(tip) => {
                    const isSaved = favorites.some(f => f.id === tip.id);
                    toggleFavorite(tip);
                    showToast(isSaved ? 'Removed from collection' : 'Saved to collection');
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Detail View */}
        {detail && <TipDetails detail={detail} onBack={() => setDetail(null)} />}

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in z-50">
            <span className="text-green-400">✓</span>
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

function FavoritesPage() {
  const favorites = useStore((s) => s.favorites);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const profile = useStore((s) => s.profile);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="mb-20 animate-fade-in max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-sm font-medium tracking-wide">
              Collection
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mb-6 leading-[1.1]">
            Your personal <br />
            <span className="text-stone-400 italic">sanctuary.</span>
          </h1>
          <p className="text-xl text-stone-500 font-light leading-relaxed">
            The insights and rituals you've saved for your journey.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in border-2 border-dashed border-stone-200 rounded-[3rem]">
            <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-8 text-4xl grayscale opacity-50">
              ✨
            </div>
            <h2 className="font-serif text-3xl text-stone-900 mb-4">Your collection awaits</h2>
            <p className="text-stone-500 mb-10 max-w-md text-lg font-light">
              Save tips that inspire you to build your personal wellness library.
            </p>
            <Link to="/tips" className="px-8 py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-stone-200">
              Discover Insights
            </Link>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {favorites.map((t, index) => (
              <div key={t.id} className="animate-fade-in break-inside-avoid" style={{ animationDelay: `${index * 0.1}s` }}>
                <TipCard
                  tip={t}
                  index={index}
                  isSaved={true}
                  onOpen={async (tip) => {
                    try {
                      setDetail(tip);
                      const expanded = await expandTip(tip, profile || { age: 25, goal: 'General Wellness' });
                      setDetail(prev => ({ ...prev, ...expanded }));
                    } catch (err) {
                      setError(err.message || 'Failed to expand tip');
                      setDetail(null);
                    }
                  }}
                  onSave={(tip) => {
                    toggleFavorite(tip);
                    showToast('Removed from collection');
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Detail View */}
        {detail && <TipDetails detail={detail} onBack={() => setDetail(null)} />}

        {/* Loading Overlay for Details */}
        {loading && (
          <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="animate-spin text-4xl">✦</div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-8 right-8 bg-stone-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 animate-fade-in z-50">
            <span className="text-pink-400">♥</span>
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const loadFavorites = useStore((s) => s.loadFavorites);

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/start" element={<ProfileForm />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
