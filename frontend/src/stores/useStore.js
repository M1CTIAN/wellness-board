// frontend/src/stores/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
    profile: undefined,
    tips: [],
    favorites: [],
    isLoading: false,
    error: null,
    setProfile: (p) => set({ profile: p }),
    setTips: (t) => set({ tips: t }),
    setLoading: (l) => set({ isLoading: l }),
    setError: (e) => set({ error: e }),
    toggleFavorite: (t) =>
        set((s) => {
            const exists = s.favorites.find((f) => f.id === t.id);
            let next;
            if (exists) {
                next = s.favorites.filter((f) => f.id !== t.id);
            } else {
                next = [...s.favorites, t];
            }
            localStorage.setItem('favorites', JSON.stringify(next));
            return { favorites: next };
        }),
    loadFavorites: () =>
        set(() => {
            try {
                const raw = localStorage.getItem('favorites');
                return { favorites: raw ? JSON.parse(raw) : [] };
            } catch {
                return { favorites: [] };
            }
        }),
}));

export default useStore;
