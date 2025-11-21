/**
 * Zustand store for managing authors
 */

import { create } from 'zustand';
import { Author, BilingualText } from '../types';
import { authors as mockAuthors } from '../mockData';
import { startOfMonth } from 'date-fns';

interface AuthorStats {
  totalAuthors: number;
  activeAuthors: number;
  deletedAuthors: number;
  recentlyAddedCount: number;
  topContributor: {
    author: Author | null;
    articleCount: number;
  };
  averageArticlesPerAuthor: number;
}

interface AuthorStore {
  authors: Author[];
  searchQuery: string;

  // Getters
  getAuthorById: (id: string) => Author | undefined;
  getAuthorBySlug: (slug: string) => Author | undefined;
  getActiveAuthors: () => Author[];
  getDeletedAuthors: () => Author[];
  getAllAuthors: () => Author[];

  // Search
  setSearchQuery: (query: string) => void;
  searchAuthors: (query: string) => Author[];

  // CRUD operations
  createAuthor: (author: Author) => void;
  updateAuthor: (id: string, updates: Partial<Author>) => void;
  softDeleteAuthor: (id: string) => void;
  restoreAuthor: (id: string) => void;

  // Stats
  getAuthorStats: (articlesData?: { authorId: string }[]) => AuthorStats;
  getAuthorArticleCount: (authorId: string, articlesData?: { authorId: string }[]) => number;
}

export const useAuthorStore = create<AuthorStore>((set, get) => ({
  authors: mockAuthors.map(author => ({
    ...author,
    createdAt: author.createdAt || new Date('2024-01-01'),
    isDeleted: author.isDeleted || false,
  })),
  searchQuery: '',

  // Getters
  getAuthorById: (id) => {
    const { authors } = get();
    return authors.find((author) => author.id === id);
  },

  getAuthorBySlug: (slug) => {
    const { authors } = get();
    return authors.find((author) => author.slug === slug);
  },

  getActiveAuthors: () => {
    const { authors } = get();
    return authors.filter((author) => !author.isDeleted);
  },

  getDeletedAuthors: () => {
    const { authors } = get();
    return authors.filter((author) => author.isDeleted);
  },

  getAllAuthors: () => {
    const { authors } = get();
    return authors;
  },

  // Search
  setSearchQuery: (query) => set({ searchQuery: query }),

  searchAuthors: (query) => {
    const { authors } = get();
    const lowerQuery = query.toLowerCase();

    return authors.filter((author) => {
      // Search in bilingual name
      const nameMatch =
        author.name.en.toLowerCase().includes(lowerQuery) ||
        author.name.dv.toLowerCase().includes(lowerQuery);

      // Search in bilingual bio
      const bioMatch =
        author.bio.en.toLowerCase().includes(lowerQuery) ||
        author.bio.dv.toLowerCase().includes(lowerQuery);

      // Search in slug
      const slugMatch = author.slug.toLowerCase().includes(lowerQuery);

      return nameMatch || bioMatch || slugMatch;
    });
  },

  // CRUD operations
  createAuthor: (author) => {
    set((state) => ({
      authors: [...state.authors, {
        ...author,
        createdAt: new Date(),
        isDeleted: false,
      }],
    }));
  },

  updateAuthor: (id, updates) => {
    set((state) => ({
      authors: state.authors.map((author) =>
        author.id === id ? { ...author, ...updates } : author
      ),
    }));
  },

  softDeleteAuthor: (id) => {
    set((state) => ({
      authors: state.authors.map((author) =>
        author.id === id ? { ...author, isDeleted: true } : author
      ),
    }));
  },

  restoreAuthor: (id) => {
    set((state) => ({
      authors: state.authors.map((author) =>
        author.id === id ? { ...author, isDeleted: false } : author
      ),
    }));
  },

  // Stats
  getAuthorStats: (articlesData = []) => {
    const { authors } = get();
    const now = new Date();
    const monthStart = startOfMonth(now);

    const activeAuthors = authors.filter((a) => !a.isDeleted);
    const deletedAuthors = authors.filter((a) => a.isDeleted);

    // Count recently added authors (this month)
    const recentlyAddedCount = authors.filter((author) => {
      return author.createdAt >= monthStart;
    }).length;

    // Calculate top contributor
    let topContributor: { author: Author | null; articleCount: number } = {
      author: null,
      articleCount: 0,
    };

    if (articlesData.length > 0) {
      const authorArticleCounts = new Map<string, number>();

      articlesData.forEach((article) => {
        const count = authorArticleCounts.get(article.authorId) || 0;
        authorArticleCounts.set(article.authorId, count + 1);
      });

      let maxCount = 0;
      let topAuthorId = '';

      authorArticleCounts.forEach((count, authorId) => {
        if (count > maxCount) {
          maxCount = count;
          topAuthorId = authorId;
        }
      });

      if (topAuthorId) {
        const topAuthor = authors.find((a) => a.id === topAuthorId);
        if (topAuthor) {
          topContributor = {
            author: topAuthor,
            articleCount: maxCount,
          };
        }
      }
    }

    // Calculate average articles per author
    const totalArticles = articlesData.length;
    const averageArticlesPerAuthor = activeAuthors.length > 0
      ? Math.round((totalArticles / activeAuthors.length) * 10) / 10
      : 0;

    return {
      totalAuthors: authors.length,
      activeAuthors: activeAuthors.length,
      deletedAuthors: deletedAuthors.length,
      recentlyAddedCount,
      topContributor,
      averageArticlesPerAuthor,
    };
  },

  getAuthorArticleCount: (authorId, articlesData = []) => {
    return articlesData.filter((article) => article.authorId === authorId).length;
  },
}));
