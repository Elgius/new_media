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

  // Editor actions
  createArticle: (article: Article) => void;
  updateArticleStatus: (id: string, status: 'draft' | 'published') => void;
  getDraftArticles: () => Article[];
  getPublishedArticles: () => Article[];
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
    return articles.filter((article) => {
      // Search in bilingual title
      const titleMatch =
        article.title.en.toLowerCase().includes(lowerQuery) ||
        article.title.dv.toLowerCase().includes(lowerQuery);

      // Search in bilingual summary
      const summaryMatch =
        article.summary.en.toLowerCase().includes(lowerQuery) ||
        article.summary.dv.toLowerCase().includes(lowerQuery);

      // Search in bilingual category name
      const categoryMatch =
        article.category.name.en.toLowerCase().includes(lowerQuery) ||
        article.category.name.dv.toLowerCase().includes(lowerQuery);

      // Search in bilingual author
      const authorMatch =
        article.author.name.en.toLowerCase().includes(lowerQuery) ||
        article.author.name.dv.toLowerCase().includes(lowerQuery);

      // Search in bilingual tags
      const tagsMatch = article.tags?.some(
        (tag) =>
          tag.en.toLowerCase().includes(lowerQuery) ||
          tag.dv.toLowerCase().includes(lowerQuery)
      );

      return titleMatch || summaryMatch || categoryMatch || authorMatch || tagsMatch;
    });
  },

  // Editor actions
  createArticle: (article) => {
    set((state) => ({
      articles: [...state.articles, article],
    }));
  },

  updateArticleStatus: (id, status) => {
    set((state) => ({
      articles: state.articles.map((article) =>
        article.id === id ? { ...article, status } : article
      ),
    }));
  },

  getDraftArticles: () => {
    const { articles } = get();
    return articles.filter((article) => article.status === 'draft');
  },

  getPublishedArticles: () => {
    const { articles } = get();
    return articles.filter((article) => article.status === 'published' || !article.status);
  },
}));
