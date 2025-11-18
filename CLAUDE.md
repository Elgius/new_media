# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CNN-style news website built with Next.js 16, featuring a green color theme (#0F8A2F primary, #40B657 secondary). The project is currently in Phase 1 (English MVP - completed) with plans for Dhivehi/RTL support, enhanced media features, search functionality, backend integration, and performance optimization in future phases.

## Commands

### Development
```bash
npm run dev      # Start development server on http://localhost:3000
```

### Build & Production
```bash
npm run build    # Build production bundle
npm start        # Start production server
```

### Linting
```bash
npm run lint     # Run ESLint
```

## Architecture

### State Management
- **Zustand stores** handle all global state
  - `lib/stores/articleStore.ts`: Manages articles, categories, filtering, and search
  - `lib/stores/uiStore.ts`: Manages UI state (language, mobile menu, search modal)
- All data operations (filtering by category, search, etc.) are implemented as store methods

### Data Layer
- Currently uses mock data from `lib/mockData.ts` (8 articles, 4 categories)
- Store methods provide data access: `getArticlesByCategory()`, `getArticleBySlug()`, `getFeaturedArticles()`, `searchArticles()`
- Future phases will replace mock data with CMS/API integration

### Routing & Pages
- **App Router** structure (Next.js 16):
  - `/` - Home page with CNN-style layout (hero, features, vertical stream)
  - `/category/[slug]` - Category pages with filtered articles
  - `/article/[slug]` - Full article view with related content
- All routes use dynamic segments for slugs

### Component Organization
- `components/layout/` - Header, Footer, Sidebar (global layout components)
- `components/news/` - Article display components (HeroCard, FeatureCard, ArticleRow, ArticleGrid, CategoryBadge)
- `components/ads/` - Ad slot components for monetization
- `components/ui/` - shadcn/ui primitives (button, card, badge, input)

### Styling System
- **Tailwind CSS v4** with custom green theme
- **shadcn/ui** components styled with "new-york" variant
- Path alias `@/*` maps to project root
- Custom CSS variables defined in `app/globals.css`
- Geist and Geist Mono fonts from next/font/google

### Type Definitions
- Core types in `lib/types.ts`:
  - `Article`: Full article structure with category, author, media, tags
  - `Category`: Category metadata with color coding
  - `AdSlot`: Ad placement configuration
  - `Language`: Bilingual support (English/Dhivehi) with RTL direction

### Image Handling
- Next.js Image component with optimization enabled
- Remote pattern configured for `images.unsplash.com` in `next.config.ts`
- Use Next/Image for all article images and media

### Development Phases
The project follows a structured development plan documented in `phases.md`:
1. **Phase 1** (✅ Completed): English MVP with core features
2. **Phase 2** (🔜 Next): Dhivehi/RTL support with Faruma font
3. **Phase 3**: Enhanced media (video, galleries, rich content)
4. **Phase 4**: Search functionality and advanced features
5. **Phase 5**: Backend/CMS integration
6. **Phase 6**: Performance optimization and polish

When adding features, consider which phase they belong to and maintain consistency with the phased approach.

## Key Technical Details

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` for imports from root
- JSX mode: `react-jsx` (automatic runtime)

### Component Patterns
- Server components by default (Next.js App Router)
- Client components use Zustand for state access
- All date formatting uses `date-fns` with relative time display

### Future Considerations
- Phase 2 will add RTL layout support - all new components should be RTL-compatible
- Phase 5 will replace mock data - keep data access through store methods for easy migration
- Search functionality (currently UI-only) will be implemented in Phase 4
