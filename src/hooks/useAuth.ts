import { create } from "zustand";

interface useAuthInterface {
    isLogged: boolean;
    logout: () => void;
    login: () => void;
}

export const useAuth = create<useAuthInterface>((set) => ({
    isLogged: false,
    login: () => set({ isLogged: true }),
    logout: () => set({ isLogged: false }),
}));
