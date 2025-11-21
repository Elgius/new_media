# Admin Portal Documentation

## Overview

The Admin Portal is a comprehensive Content Management System (CMS) for managing the news website. It provides tools for creating, editing, scheduling, and organizing articles with full bilingual support (English and Dhivehi).

## Access

The admin portal is accessible at `/admin` and includes the following pages:

- **Dashboard**: `/admin` - Overview statistics and recent articles
- **Articles List**: `/admin/articles` - Manage all articles with filtering and bulk operations
- **Calendar View**: `/admin/articles/calendar` - Visual calendar with drag-drop scheduling
- **Create Article**: `/admin/articles/new` - Create new articles
- **Edit Article**: `/admin/articles/[id]/edit` - Edit existing articles

## Features

### 1. Dashboard (`/admin`)

The dashboard provides an at-a-glance view of your content:

**Statistics Cards:**
- Total Articles Count
- Published Articles
- Draft Articles
- Scheduled Articles
- Articles Published This Week
- Articles Published This Month

**Recent Articles:**
- Table showing the 10 most recently updated articles
- Quick links to edit each article
- Status indicators (Published, Draft, Scheduled)

**Quick Actions:**
- New Article button
- View Calendar button
- Navigate to Articles List

### 2. Articles Management (`/admin/articles`)

Comprehensive article management interface:

**Features:**
- Sortable table with columns: Title (EN), Category, Author, Status, Published Date, Actions
- Search articles by title, summary, or content (bilingual)
- Filter by:
  - Status (All, Published, Draft, Scheduled)
  - Category
  - Date Range
- Bulk Operations:
  - Bulk publish/unpublish
  - Bulk delete
  - Bulk category change
- Individual Actions:
  - Edit article
  - Delete article
  - Duplicate article
  - View published article
- Pagination (20 articles per page)

**Status Indicators:**
- 🟢 **Published**: Live on the website
- 🟡 **Draft**: Saved but not published
- 🔵 **Scheduled**: Will auto-publish at scheduled time

### 3. Calendar View (`/admin/articles/calendar`)

Visual calendar for scheduling and managing article publications:

**Features:**
- FullCalendar integration with Month/Week/Day views
- Color-coded events by category (using category colors)
- Click article to quick-edit or navigate to full editor
- Drag-and-drop to reschedule articles
- Filter by category and status
- Shows published date for published articles
- Shows scheduled date for scheduled articles

**Calendar Event Colors:**
- Each article uses its category color
- Published articles: Solid color
- Scheduled articles: Lighter shade
- Draft articles: Dashed border

### 4. Article Editor (`/admin/articles/new` & `/admin/articles/[id]/edit`)

Enhanced bilingual article editor with scheduling capabilities:

**Core Fields:**
- Title (EN & DV) - Required
- Subtitle (EN & DV) - Optional
- Summary (EN & DV) - Required
- Body (EN & DV) - Rich text editor with formatting
- Author - Select from existing authors
- Category - Required
- Cover Image - Required
- Video URL - Optional
- Tags - Bilingual tags

**New Features:**
- **Scheduling**: Set future publish date and time
- **SEO Fields**: Meta description, keywords, og:image
- **Auto-save**: Drafts auto-save every 30 seconds
- **Status Management**: Draft, Scheduled, or Published
- **Preview Mode**: Live preview of article

**Publishing Options:**
- **Save Draft**: Save without publishing
- **Publish Now**: Publish immediately
- **Schedule for Later**: Choose date/time for auto-publish

**Rich Text Editor Features:**
- Bold, Italic, Underline
- Headings (H2, H3)
- Bullet and Numbered Lists
- Links
- Images
- Undo/Redo
- RTL support for Dhivehi

## Data Model

### Enhanced Article Type

```typescript
interface Article {
  // Basic Info
  id: string;
  slug: string;
  title: BilingualText;
  subtitle?: BilingualText;
  summary: BilingualText;
  body: BilingualText;

  // Media
  coverImage: string;
  hasVideo?: boolean;
  videoUrl?: string;

  // Organization
  category: Category;
  author: Author;
  tags?: BilingualText[];
  relatedArticles?: string[];

  // Publishing
  status?: 'draft' | 'published' | 'scheduled';
  publishedAt: Date;
  scheduledFor?: Date;  // NEW: When to auto-publish
  featured?: boolean;

  // Tracking
  updatedAt?: Date;
  lastEditedAt?: Date;  // NEW: Last edit timestamp
  lastEditedBy?: string;  // NEW: Who last edited
  publishedBy?: string;  // NEW: Who published

  // SEO
  metaDescription?: BilingualText;  // NEW: SEO description
  keywords?: string[];  // NEW: SEO keywords
  ogImage?: string;  // NEW: Social media image
}
```

### Dashboard Statistics

```typescript
interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  scheduledArticles: number;
  articlesThisWeek: number;
  articlesThisMonth: number;
  categoryBreakdown: {
    category: string;
    count: number;
    color: string;
  }[];
}
```

## State Management

### Article Store (`lib/stores/articleStore.ts`)

**New Methods:**
- `updateArticle(id, updates)` - Update existing article
- `deleteArticle(id)` - Delete article
- `bulkUpdateStatus(ids, status)` - Bulk status change
- `bulkDelete(ids)` - Bulk delete
- `getScheduledArticles()` - Get articles with scheduledFor date
- `getArticlesByDateRange(start, end)` - For calendar view
- `getDashboardStats()` - Calculate dashboard statistics
- `getArticleById(id)` - Get article by ID

### Admin Store (`lib/stores/adminStore.ts`)

Manages admin UI state:

```typescript
interface AdminStore {
  // Filters
  statusFilter: 'all' | 'draft' | 'published' | 'scheduled';
  categoryFilter: string | null;
  searchQuery: string;
  dateRange: { start: Date; end: Date } | null;

  // Selection
  selectedArticleIds: string[];

  // View
  viewMode: 'list' | 'calendar';
  currentPage: number;
  articlesPerPage: number;

  // Actions
  setStatusFilter: (status) => void;
  setCategoryFilter: (category) => void;
  setSearchQuery: (query) => void;
  setDateRange: (range) => void;
  toggleArticleSelection: (id: string) => void;
  selectAllArticles: (ids: string[]) => void;
  clearSelection: () => void;
  setViewMode: (mode) => void;
  setCurrentPage: (page) => void;
}
```

## Components

### Admin Components (`components/admin/`)

- **AdminSidebar**: Navigation sidebar with links
- **StatCard**: Reusable statistics card
- **RecentArticles**: Recent articles table
- **ArticlesTable**: Main articles management table
- **ArticleFilters**: Filter panel for articles
- **BulkActions**: Bulk operations dropdown
- **ArticleCalendar**: FullCalendar integration
- **EventQuickEdit**: Quick edit dialog for calendar

### Editor Components (`components/editor/`)

- **ArticleEditor**: Main bilingual editor (enhanced)
- **RichTextEditor**: TipTap rich text editor
- **AuthorSelector**: NEW - Dropdown to select author
- **SchedulePicker**: NEW - Date/time picker for scheduling
- **SEOFields**: NEW - SEO meta fields
- **ImageUpload**: Cover image uploader
- **CategorySelector**: Category dropdown
- **TagManager**: Tag management
- **ArticlePreview**: Live preview

## Styling

The admin portal maintains the site's green theme:

- **Primary Green**: `#0F8A2F` - Main brand color
- **Secondary Green**: `#40B657` - Accent color
- **Dark Green**: `#1A5D2F` - Hover states
- **Light Green**: `#2DA84A` - Backgrounds

### Components Use:
- shadcn/ui components with "new-york" variant
- Tailwind CSS v4
- Custom CSS variables for theming
- Responsive design (mobile-friendly)
- RTL support for Dhivehi maintained

## Routing Structure

```
/admin                              → Dashboard
/admin/articles                     → Articles list
/admin/articles/calendar            → Calendar view
/admin/articles/new                 → Create new article
/admin/articles/[id]/edit           → Edit article
```

### Layout Hierarchy

```
app/admin/layout.tsx (Admin sidebar + header)
├── app/admin/page.tsx (Dashboard)
├── app/admin/articles/page.tsx (Articles list)
├── app/admin/articles/calendar/page.tsx (Calendar)
├── app/admin/articles/new/page.tsx (New article)
└── app/admin/articles/[id]/edit/page.tsx (Edit article)
```

## Usage Guide

### Creating a New Article

1. Navigate to `/admin/articles/new` or click "New Article" button
2. Switch between English and Dhivehi tabs to fill in content
3. Fill in required fields: Title, Summary, Body, Cover Image
4. Select category and author
5. Add tags (optional)
6. Choose publishing option:
   - **Save Draft**: Keep as draft for later
   - **Publish Now**: Publish immediately to website
   - **Schedule**: Click calendar icon to set publish date/time
7. Add SEO fields for better search engine visibility
8. Preview article before publishing

### Scheduling Articles

1. In the article editor, click the calendar icon next to "Publish"
2. Select date and time for publication
3. Click "Schedule Article"
4. Article will appear in calendar view with scheduled date
5. Article auto-publishes at the scheduled time

### Managing Articles in Calendar

1. Navigate to `/admin/articles/calendar`
2. View articles by month, week, or day
3. Drag article to different date to reschedule
4. Click article to quick-edit or view details
5. Filter by category using dropdown
6. Articles are color-coded by category

### Bulk Operations

1. In articles list, select multiple articles using checkboxes
2. Click "Bulk Actions" dropdown
3. Choose action: Publish, Unpublish, Delete, Change Category
4. Confirm action
5. Selected articles are updated

### Using Filters

**Status Filter:**
- All: Show all articles
- Published: Only live articles
- Draft: Only drafts
- Scheduled: Only scheduled articles

**Category Filter:**
- Select specific category or "All Categories"

**Date Range Filter:**
- Set start and end dates
- Filters by publishedAt or scheduledFor date

**Search:**
- Searches in titles, summaries, and content
- Works across both English and Dhivehi

## Technical Details

### Dependencies

**FullCalendar:**
```json
{
  "@fullcalendar/react": "^6.1.0",
  "@fullcalendar/daygrid": "^6.1.0",
  "@fullcalendar/timegrid": "^6.1.0",
  "@fullcalendar/interaction": "^6.1.0"
}
```

**Date Picker:**
```json
{
  "react-day-picker": "^9.0.0"
}
```

**Additional shadcn/ui components:**
- dialog
- select
- dropdown-menu
- table
- calendar
- popover
- separator
- tabs
- label
- checkbox
- avatar

### Package Manager

This project uses **pnpm** as the package manager.

**Install dependencies:**
```bash
pnpm install
```

**Add new dependency:**
```bash
pnpm add [package-name]
```

### Development Commands

```bash
# Start development server
pnpm dev

# Run linter
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

## Future Enhancements

### Phase 2 (Priority - Important Features)
- Media Library (`/admin/media`)
- Category Management (`/admin/categories`)
- Author Management (`/admin/authors`)
- User Management with roles
- Authentication system

### Phase 3 (Priority - Enhanced Features)
- Analytics & Reports (`/admin/analytics`)
- Comments Moderation
- Revision History & Rollback
- Auto-save improvements
- Collaboration features (multiple editors)
- Image editing and optimization
- Video upload and management

### Phase 4 (Advanced Features)
- Translation management tools
- Machine translation suggestions
- SEO audit and recommendations
- Social media scheduling
- Newsletter integration
- Advanced search with filters
- Custom fields for articles
- Workflow approvals

## Authentication (Future)

Currently, the admin portal has no authentication (UI-only). In future phases, authentication will be added with:

**User Roles:**
- **Admin**: Full access to all features
- **Editor**: Create, edit, publish all articles
- **Author**: Create and edit own articles only
- **Contributor**: Submit articles for review (draft only)

**Recommended Solution:**
- NextAuth.js for authentication
- Role-based access control (RBAC)
- Protected admin routes
- Session management

## Notes

- The admin portal is separate from the main website layout
- All existing features (bilingual support, RTL) are maintained
- Editor component is reused and enhanced (not rebuilt)
- No breaking changes to existing article structure
- Backward compatible with existing mock data
- Ready for backend/CMS integration (Phase 5)

## Support

For issues or questions about the admin portal:
1. Check this documentation
2. Review CLAUDE.md for project overview
3. Check phases.md for development roadmap
4. Review lib/types.ts for data structures

## Version

**Admin Portal Version**: 1.0.0
**Last Updated**: January 2025
**Status**: Phase 1 Complete (Essential Features)
