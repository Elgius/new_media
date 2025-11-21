/**
 * Zustand store for managing articles and categories
 */

import { create } from 'zustand';
import { Article, Category, DashboardStats } from '../types';
import { mockArticles, categories } from '../mockData';
import { startOfWeek, startOfMonth, isAfter, isWithinInterval } from 'date-fns';

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
  getArticleById: (id: string) => Article | undefined;
  getFeaturedArticles: () => Article[];
  searchArticles: (query: string) => Article[];

  // Editor actions
  createArticle: (article: Article) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  updateArticleStatus: (id: string, status: 'draft' | 'published' | 'scheduled') => void;
  getDraftArticles: () => Article[];
  getPublishedArticles: () => Article[];
  getScheduledArticles: () => Article[];

  // Admin actions
  bulkUpdateStatus: (ids: string[], status: 'draft' | 'published' | 'scheduled') => void;
  bulkDelete: (ids: string[]) => void;
  getArticlesByDateRange: (start: Date, end: Date) => Article[];
  getDashboardStats: () => DashboardStats;

  // Category management
  reassignCategoryForArticles: (articleIds: string[], newCategoryId: string) => void;
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

  getArticleById: (id) => {
    const { articles } = get();
    return articles.find((article) => article.id === id);
  },

  updateArticle: (id, updates) => {
    set((state) => ({
      articles: state.articles.map((article) =>
        article.id === id ? { ...article, ...updates, lastEditedAt: new Date() } : article
      ),
    }));
  },

  deleteArticle: (id) => {
    set((state) => ({
      articles: state.articles.filter((article) => article.id !== id),
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

  getScheduledArticles: () => {
    const { articles } = get();
    return articles.filter((article) => article.status === 'scheduled' && article.scheduledFor);
  },

  // Admin actions
  bulkUpdateStatus: (ids, status) => {
    set((state) => ({
      articles: state.articles.map((article) =>
        ids.includes(article.id) ? { ...article, status } : article
      ),
    }));
  },

  bulkDelete: (ids) => {
    set((state) => ({
      articles: state.articles.filter((article) => !ids.includes(article.id)),
    }));
  },

  getArticlesByDateRange: (start, end) => {
    const { articles } = get();
    return articles.filter((article) => {
      const date = article.scheduledFor || article.publishedAt;
      return isWithinInterval(date, { start, end });
    });
  },

  getDashboardStats: () => {
    const { articles, categories } = get();
    const now = new Date();
    const weekStart = startOfWeek(now);
    const monthStart = startOfMonth(now);

    const totalArticles = articles.length;
    const publishedArticles = articles.filter(
      (a) => a.status === 'published' || !a.status
    ).length;
    const draftArticles = articles.filter((a) => a.status === 'draft').length;
    const scheduledArticles = articles.filter((a) => a.status === 'scheduled').length;

    const articlesThisWeek = articles.filter((article) => {
      const date = article.publishedAt;
      return isAfter(date, weekStart);
    }).length;

    const articlesThisMonth = articles.filter((article) => {
      const date = article.publishedAt;
      return isAfter(date, monthStart);
    }).length;

    const categoryBreakdown = categories.map((category) => ({
      category: category.name.en,
      count: articles.filter((a) => a.category.id === category.id).length,
      color: category.color,
    }));

    // Calculate engagement metrics
    const totalComments = articles.reduce((sum, article) => {
      return sum + (article.comments?.length || 0);
    }, 0);

    const totalReactions = articles.reduce((sum, article) => {
      if (!article.reactions) return sum;
      return (
        sum +
        article.reactions.like +
        article.reactions.love +
        article.reactions.haha +
        article.reactions.wow +
        article.reactions.sad +
        article.reactions.angry
      );
    }, 0);

    return {
      totalArticles,
      publishedArticles,
      draftArticles,
      scheduledArticles,
      articlesThisWeek,
      articlesThisMonth,
      totalComments,
      totalReactions,
      categoryBreakdown,
    };
  },

  // Category management
  reassignCategoryForArticles: (articleIds, newCategoryId) => {
    const { categories } = get();
    const newCategory = categories.find((c) => c.id === newCategoryId);

    if (!newCategory) {
      console.error(`Category with ID ${newCategoryId} not found`);
      return;
    }

    set((state) => ({
      articles: state.articles.map((article) =>
        articleIds.includes(article.id)
          ? { ...article, category: newCategory, lastEditedAt: new Date() }
          : article
      ),
    }));
  },
}));
