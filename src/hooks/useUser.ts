import { create } from "zustand";
import {UserDto, WishlistAnime} from "@/utils/AnimeApi";

interface useUserProps {
    user : UserDto | null;
    setUser: (data:UserDto | null) => void;
    removeUser: () => void
}

export const useUser = create<useUserProps>((set) => ({
    user: null,
    setUser: (data:UserDto | null) => set({ user: data }),
    removeUser : () => set({user:null})
}));