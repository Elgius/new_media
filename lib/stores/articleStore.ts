/**
 * Zustand store for managing articles and categories
 */

import { create } from 'zustand';
import { Article, Category } from '../types';
import { mockArticles, categories } from '../mockData';

interface ArticleStore {
  articles: Article[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;

  // Actions
  setSelectedCategory: (slug: string | null) => void;
  setSearchQuery: (query: string) => void;
  getArticlesByCategory: (slug: string) => Article[];
  getArticleBySlug: (slug: string) => Article | undefined;
  getFeaturedArticles: () => Article[];
  searchArticles: (query: string) => Article[];
}

export const useArticleStore = create<ArticleStore>((set, get) => ({
  articles: mockArticles,
  categories: categories,
  selectedCategory: null,
  searchQuery: '',

  setSelectedCategory: (slug) => set({ selectedCategory: slug }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  getArticlesByCategory: (slug) => {
    const { articles } = get();
    return articles.filter((article) => article.category.slug === slug);
  },

  getArticleBySlug: (slug) => {
    const { articles } = get();
    return articles.find((article) => article.slug === slug);
  },

  getFeaturedArticles: () => {
    const { articles } = get();
    return articles.filter((article) => article.featured);
  },

  searchArticles: (query) => {
    const { articles } = get();
    const lowerQuery = query.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.summary.toLowerCase().includes(lowerQuery) ||
        article.category.name.toLowerCase().includes(lowerQuery)
    );
  },
}));
