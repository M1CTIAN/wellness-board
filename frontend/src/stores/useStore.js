// frontend/src/stores/useStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
            profile: undefined,
            tips: [],
            favorites: [],
            reflections: {}, // { [tipId]: { text: string, date: string } }
            isLoading: false,
            error: null,
            setProfile: (p) => set({ profile: p }),
            setTips: (t) => set({ tips: t }),
            setLoading: (l) => set({ isLoading: l }),
            setError: (e) => set({ error: e }),
            saveReflection: (tipId, text) =>
                set((s) => {
                    const next = { 
                        ...s.reflections, 
                        [tipId]: { text, date: new Date().toISOString() } 
                    };
                    return { reflections: next };
                }),
            toggleFavorite: (t) =>
                set((s) => {
                    const exists = s.favorites.find((f) => f.id === t.id);
                    let next;
                    if (exists) {
                        next = s.favorites.filter((f) => f.id !== t.id);
                    } else {
                        next = [...s.favorites, t];
                    }
                    return { favorites: next };
                }),
        }),
        {
            name: 'wellness-storage', // name of the item in the storage (must be unique)
            partialize: (state) => ({ 
                profile: state.profile, 
                tips: state.tips, 
                favorites: state.favorites, 
                reflections: state.reflections 
            }), // Only persist these fields
        }
    )
);

export default useStore;
