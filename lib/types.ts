/**
 * TypeScript types and interfaces for the News Website
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string; // Hex color for category badge
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  body: string;
  coverImage: string;
  category: Category;
  author: string;
  publishedAt: Date;
  updatedAt?: Date;
  featured?: boolean; // For hero/featured stories
  hasVideo?: boolean;
  videoUrl?: string;
  tags?: string[];
  relatedArticles?: string[]; // Array of article IDs
}

export interface AdSlot {
  id: string;
  size: 'banner' | 'rectangle' | 'inline';
  position: string;
  imageUrl?: string;
  htmlContent?: string;
}

export type ArticleCardVariant = 'hero' | 'feature' | 'row' | 'grid';

export interface Language {
  code: 'en' | 'dv';
  name: string;
  direction: 'ltr' | 'rtl';
}
