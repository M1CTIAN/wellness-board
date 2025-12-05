// frontend/src/stores/useStore.js
import create from 'zustand';

const useStore = create((set) => ({
    profile: undefined,
    tips: [],
    favorites: [],
    setProfile: (p) => set({ profile: p }),
    setTips: (t) => set({ tips: t }),
    addFavorite: (t) =>
        set((s) => {
            const exists = s.favorites.find((f) => f.id === t.id);
            if (exists) return s;
            const next = [...s.favorites, t];
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
