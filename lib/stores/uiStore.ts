/**
 * Zustand store for UI state management
 */

import { create } from 'zustand';
import { Language } from '../types';

interface UIStore {
  language: Language;
  mobileMenuOpen: boolean;
  searchOpen: boolean;

  // Actions
  setLanguage: (language: Language) => void;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
  closeMobileMenu: () => void;
  closeSearch: () => void;
}

const languages: { en: Language; dv: Language } = {
  en: { code: 'en', name: 'English', direction: 'ltr' },
  dv: { code: 'dv', name: 'ދިވެހި', direction: 'rtl' },
};

export const useUIStore = create<UIStore>((set) => ({
  language: languages.en,
  mobileMenuOpen: false,
  searchOpen: false,

  setLanguage: (language) => set({ language }),

  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),

  closeMobileMenu: () => set({ mobileMenuOpen: false }),

  closeSearch: () => set({ searchOpen: false }),
}));
