/**
 * Zustand store for managing admin portal UI state
 */

import { create } from 'zustand';
import { ViewMode } from '../types';

interface AdminStore {
  // Filters
  statusFilter: 'all' | 'draft' | 'published' | 'scheduled';
  categoryFilter: string | null;
  searchQuery: string;
  dateRange: { start: Date; end: Date } | null;

  // Selection
  selectedArticleIds: string[];

  // View
  viewMode: ViewMode;
  currentPage: number;
  articlesPerPage: number;

  // Filter Actions
  setStatusFilter: (status: 'all' | 'draft' | 'published' | 'scheduled') => void;
  setCategoryFilter: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setDateRange: (range: { start: Date; end: Date } | null) => void;
  resetFilters: () => void;

  // Selection Actions
  toggleArticleSelection: (id: string) => void;
  selectAllArticles: (ids: string[]) => void;
  clearSelection: () => void;
  isArticleSelected: (id: string) => boolean;

  // View Actions
  setViewMode: (mode: ViewMode) => void;
  setCurrentPage: (page: number) => void;
  setArticlesPerPage: (perPage: number) => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  // Initial state
  statusFilter: 'all',
  categoryFilter: null,
  searchQuery: '',
  dateRange: null,
  selectedArticleIds: [],
  viewMode: 'list',
  currentPage: 1,
  articlesPerPage: 20,

  // Filter Actions
  setStatusFilter: (status) => {
    set({ statusFilter: status, currentPage: 1 });
  },

  setCategoryFilter: (category) => {
    set({ categoryFilter: category, currentPage: 1 });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
  },

  setDateRange: (range) => {
    set({ dateRange: range, currentPage: 1 });
  },

  resetFilters: () => {
    set({
      statusFilter: 'all',
      categoryFilter: null,
      searchQuery: '',
      dateRange: null,
      currentPage: 1,
    });
  },

  // Selection Actions
  toggleArticleSelection: (id) => {
    set((state) => {
      const isSelected = state.selectedArticleIds.includes(id);
      return {
        selectedArticleIds: isSelected
          ? state.selectedArticleIds.filter((articleId) => articleId !== id)
          : [...state.selectedArticleIds, id],
      };
    });
  },

  selectAllArticles: (ids) => {
    set({ selectedArticleIds: ids });
  },

  clearSelection: () => {
    set({ selectedArticleIds: [] });
  },

  isArticleSelected: (id) => {
    const { selectedArticleIds } = get();
    return selectedArticleIds.includes(id);
  },

  // View Actions
  setViewMode: (mode) => {
    set({ viewMode: mode });
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  setArticlesPerPage: (perPage) => {
    set({ articlesPerPage: perPage, currentPage: 1 });
  },
}));
