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
  status?: 'draft' | 'published'; // Article status for editor
  hasVideo?: boolean;
  videoUrl?: string;
  tags?: BilingualText[];
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
