import { create } from "zustand";

interface useNavbarInterface {
    mounted: boolean;
    mount: () => void;
    unmount: () => void;
}

export const useNavbar = create<useNavbarInterface>((set) => ({
    mounted: false,
    mount: () => set({ mounted: true }),
    unmount: () => set({ mounted: false }),
}));
