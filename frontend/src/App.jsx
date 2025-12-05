// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import TipCard from './components/TipCard';
import TipDetails from './components/TipDetails';
import useStore from './stores/useStore';
import { generateTips, expandTip } from './services/aiService';

function TipsPage() {
  const profile = useStore((s) => s.profile);
  const tips = useStore((s) => s.tips);
  const setTips = useStore((s) => s.setTips);
  const addFavorite = useStore((s) => s.addFavorite);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (!profile) return;
    async function load() {
      try {
        setLoading(true);
        setError(undefined);
        const result = await generateTips(profile);
        setTips(result);
      } catch (err) {
        setError(err.message || 'Failed to generate tips');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [profile]);

  if (!profile) return <div className="p-6">Please set your profile first. <Link to="/">Go back</Link></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Personalized Tips</h1>
        <Link to="/favorites" className="text-sm underline">Saved</Link>
      </div>

      {loading && <div>Loading tips…</div>}
      {error && (
        <div>
          <div className="text-red-600 mb-2">Error: {error}</div>
          <button onClick={() => window.location.reload()} className="px-3 py-1 border rounded">Retry</button>
        </div>
      )}

      {!loading && !error && !detail && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((t) => (
            <TipCard
              key={t.id}
              tip={t}
              onOpen={async (tip) => {
                try {
                  setLoading(true);
                  const expanded = await expandTip(tip, profile);
                  setDetail({ ...expanded, title: tip.title });
                } catch (err) {
                  setError(err.message || 'Failed to expand tip');
                } finally {
                  setLoading(false);
                }
              }}
              onSave={(tip) => addFavorite(tip)}
            />
          ))}
        </div>
      )}

      {detail && <TipDetails detail={detail} onBack={() => setDetail(null)} />}
    </div>
  );
}

function FavoritesPage() {
  const favorites = useStore((s) => s.favorites);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Saved Tips</h1>
      {favorites.length === 0 && <div>No saved tips yet.</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favorites.map((t) => (
          <div key={t.id} className="border p-4 rounded shadow-sm">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{t.icon}</div>
              <div>
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-gray-600">{t.short}</div>
              </div>
            </div>
          </div>
        ))}
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
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<ProfileForm />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
