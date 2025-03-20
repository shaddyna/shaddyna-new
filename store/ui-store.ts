import { create } from 'zustand';

interface UIStore {
  isDrawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isDrawerOpen: false,
  setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
}));