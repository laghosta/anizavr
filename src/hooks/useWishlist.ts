import { create } from "zustand";
import {WishlistAnime} from "@/utils/AnimeApi";

interface useWishlistInterface {
    wishlist : WishlistAnime[] | null;
    setWishlist: (data:WishlistAnime[] | null) => void;
    removeWishlist: () => void
}

export const useWishlist = create<useWishlistInterface>((set) => ({
    wishlist: [],
    setWishlist: (data) => set({ wishlist: data }),
    removeWishlist : () => set({wishlist:[]})
}));