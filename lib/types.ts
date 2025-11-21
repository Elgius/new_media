/**
 * TypeScript types and interfaces for the News Website
 */

// Bilingual text support
export interface BilingualText {
  en: string;
  dv: string;
}

export interface Category {
  id: string;
  name: BilingualText;
  slug: string;
  color: string; // Hex color for category badge

  // Hierarchy
  parentId: string | null; // Parent category ID for nesting

  // Content
  description?: BilingualText; // SEO description for category pages
  icon?: string; // Emoji or icon identifier

  // Ordering & State
  order: number; // Manual sort order within parent level
  isActive: boolean; // Enable/disable without deleting

  // Special categories (e.g., Elections with custom pages)
  isSpecial: boolean; // Flag for special categories with custom routes
  specialPageRoute?: string | null; // Custom route path (e.g., "/elections")

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string; // User ID who created the category
}

export interface Author {
  id: string;
  slug: string;
  name: BilingualText;
  bio: BilingualText;
  photo: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    email?: string;
  };
}

// Engagement types
export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

export interface Reactions {
  like: number;
  love: number;
  haha: number;
  wow: number;
  sad: number;
  angry: number;
}

export interface Comment {
  id: string;
  articleId: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: BilingualText;
  timestamp: Date;
}

export interface Article {
  id: string;
  slug: string;
  title: BilingualText;
  subtitle?: BilingualText;
  summary: BilingualText;
  body: BilingualText;
  coverImage: string;
  category: Category;
  author: Author;
  publishedAt: Date;
  updatedAt?: Date;
  featured?: boolean; // For hero/featured stories
  status?: 'draft' | 'published' | 'scheduled'; // Article status for editor
  hasVideo?: boolean;
  videoUrl?: string;
  tags?: BilingualText[];
  relatedArticles?: string[]; // Array of article IDs

  // Scheduling
  scheduledFor?: Date; // When to auto-publish

  // Tracking
  lastEditedAt?: Date; // Last edit timestamp
  lastEditedBy?: string; // Who last edited
  publishedBy?: string; // Who published

  // SEO
  metaDescription?: BilingualText; // SEO description
  keywords?: string[]; // SEO keywords
  ogImage?: string; // Social media image

  // Engagement
  reactions?: Reactions; // Article reactions (like, love, etc.)
  comments?: Comment[]; // Article comments
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

// Election types
export interface Candidate {
  id: string;
  name: BilingualText;
  party: BilingualText;
  partyColor: string; // Hex color for party branding
  photo: string;
  votes: number;
  percentage: number;
  bio?: BilingualText;
  isWinner?: boolean;
}

export interface ElectionRace {
  id: string;
  name: BilingualText;
  type: 'presidential' | 'parliamentary' | 'local';
  candidates: Candidate[];
  totalVotes: number;
  reportingPercentage: number; // % of votes counted
  status: 'live' | 'final' | 'upcoming';
  lastUpdated: Date;
}

export interface Region {
  id: string;
  name: BilingualText;
  winnerId: string | null; // candidate id
  votes: { [candidateId: string]: number | null };
  reportingPercentage: number;
}

export interface ElectoralMap {
  raceId: string;
  regions: Region[];
}

// Admin Portal types
export interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  scheduledArticles: number;
  articlesThisWeek: number;
  articlesThisMonth: number;
  totalComments: number; // Total comments across all articles
  totalReactions: number; // Total reactions across all articles
  categoryBreakdown: {
    category: string;
    count: number;
    color: string;
  }[];
}

export interface ArticleFilter {
  status?: 'all' | 'draft' | 'published' | 'scheduled';
  category?: string | null;
  searchQuery?: string;
  dateRange?: {
    start: Date;
    end: Date;
  } | null;
}

export type ViewMode = 'list' | 'calendar' | 'grid';
