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

// Available languages
export const LANGUAGES: { en: Language; dv: Language } = {
  en: { code: 'en', name: 'English', direction: 'ltr' },
  dv: { code: 'dv', name: 'ދިވެހި', direction: 'rtl' },
};

// localStorage key for language preference
const LANGUAGE_STORAGE_KEY = 'newsapp-language';

/**
 * Get initial language from localStorage or browser preference
 */
function getInitialLanguage(): Language {
  // Server-side rendering: return default
  if (typeof window === 'undefined') {
    return LANGUAGES.en;
  }

  // Try to get from localStorage
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === 'dv') {
      return LANGUAGES.dv;
    } else if (savedLanguage === 'en') {
      return LANGUAGES.en;
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
  }

  // Try to detect from browser language
  try {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('dv')) {
      return LANGUAGES.dv;
    }
  } catch (error) {
    console.warn('Failed to detect browser language:', error);
  }

  // Default to English
  return LANGUAGES.en;
}

/**
 * Save language preference to localStorage
 */
function saveLanguagePreference(languageCode: 'en' | 'dv'): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
  } catch (error) {
    console.warn('Failed to save language to localStorage:', error);
  }
}

export const useUIStore = create<UIStore>((set) => ({
  language: getInitialLanguage(),
  mobileMenuOpen: false,
  searchOpen: false,

  setLanguage: (language) => {
    set({ language });
    saveLanguagePreference(language.code);
  },

  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),

  closeMobileMenu: () => set({ mobileMenuOpen: false }),

  closeSearch: () => set({ searchOpen: false }),
}));
