import { create } from "zustand";

interface useAnimeWishlistUpdateProps {
    updated:boolean,
    updateWishlist: (state: any) => void
}

export const useAnimeWishlistUpdate = create<useAnimeWishlistUpdateProps>((set) => ({
    updated: false,
    updateWishlist: () => set((state) => ({ updated: !state.updated })),
}))