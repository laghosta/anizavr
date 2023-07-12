import { create } from "zustand";

interface useModalInterface {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useRegisterModal = create<useModalInterface>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export const useLoginModal = create<useModalInterface>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export const useSearchModal = create<useModalInterface>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
