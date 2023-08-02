import { create } from "zustand";

interface useLoadingProps {
    loading: boolean;
    setIsLoading: () => void;
    setIsNotLoading: () => void;
}

export const useLoading = create<useLoadingProps>((set) => ({
    loading: true,
    setIsLoading: () => set({ loading: true }),
    setIsNotLoading: () => set({ loading: false }),
}));
