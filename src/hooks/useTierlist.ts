import { create } from "zustand";

interface useTierlistProps {
    tierlistAction:boolean,
    handleTierlistAction: (tierlistAction:boolean) => void
}

export const useTierlist= create<useTierlistProps>((set) => ({
    tierlistAction : false,
    handleTierlistAction: () => set((state) => ({ tierlistAction: !state.tierlistAction })),
}));