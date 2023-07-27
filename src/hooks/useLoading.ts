import { create } from "zustand";

interface useLoadingProps {
    loading: boolean;
    setIsLoading: () => void;
    setIsNotLoading: () => void;
}

export const useLoading = create<useLoadingProps>((set) => ({
    loading: false,
    setIsLoading: () => set({ loading: true }),
    setIsNotLoading: () => set({ loading: false }),
}));
