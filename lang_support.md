# Language Support & Election Section Implementation Plan

## Overview

This document outlines the implementation plan for two major features:
1. **Bilingual Support**: Full English + Dhivehi language support with RTL layout
2. **Election Section**: CNN-style election coverage with live results, maps, and candidate profiles

## Part 1: Bilingual Support (English + Dhivehi with RTL)

### Goals
- Add Dhivehi (official language of Maldives) translations for ALL content (UI + articles)
- Implement RTL (right-to-left) layout switching
- Add language toggle button in header
- Persist language preference across sessions
- Use Mv Iyyu Formal font for Thaana script

### Architecture Changes

#### 1. Type System Updates

**File**: `lib/types.ts`

Update core types to support bilingual content:

```typescript
// Before
interface Article {
  title: string;
  subtitle: string;
  summary: string;
  body: string;
  // ...
}

interface Category {
  name: string;
  // ...
}

// After
interface Article {
  title: { en: string; dv: string };
  subtitle: { en: string; dv: string };
  summary: { en: string; dv: string };
  body: { en: string; dv: string };
  // ...
}

interface Category {
  name: { en: string; dv: string };
  // ...
}
```

#### 2. Translation System

**File**: `lib/translations.ts` (NEW)

Create centralized translation dictionary for UI strings:

```typescript
export const translations = {
  header: {
    search: { en: "Search news...", dv: "ހޯދާ..." },
    home: { en: "Home", dv: "ހޯމް" },
    // ...
  },
  footer: {
    quickLinks: { en: "Quick Links", dv: "ލިންކްތައް" },
    // ...
  },
  // ...
};

export function t(key: string): string {
  const { language } = useUIStore.getState();
  // Navigate through translations object using key path
  // Return translation for current language
}
```

#### 3. Font Configuration

**File**: `app/globals.css`

Add Mv Iyyu Formal font (already available in project):

```css
@font-face {
  font-family: 'Mv Iyyu Formal';
  src: url('/fonts/OnlineWebFonts_COM_da8ceb43c70325200d8039403cce053e/Mv Iyyu Formal/Web Fonts/3a488419d6f809a24ab0a7e1eb6ce51d.woff2') format('woff2'),
       url('/fonts/OnlineWebFonts_COM_da8ceb43c70325200d8039403cce053e/Mv Iyyu Formal/Web Fonts/3a488419d6f809a24ab0a7e1eb6ce51d.woff') format('woff'),
       url('/fonts/OnlineWebFonts_COM_da8ceb43c70325200d8039403cce053e/Mv Iyyu Formal/Web Fonts/3a488419d6f809a24ab0a7e1eb6ce51d.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Apply font when Dhivehi is active */
[lang="dv"] {
  font-family: 'Mv Iyyu Formal', sans-serif;
  line-height: 1.8; /* Better readability for Thaana */
}
```

#### 4. RTL Layout System

**Install dependency**:
```bash
pnpm install @tailwindcss/rtl
```

**File**: `tailwind.config.ts`

```typescript
import rtl from '@tailwindcss/rtl';

export default {
  plugins: [rtl],
  // ...
}
```

**File**: `app/globals.css`

Add RTL-specific utilities:

```css
/* RTL spacing utilities */
[dir="rtl"] {
  /* Flip margins and padding */
}

/* RTL-aware logical properties */
.ms-4 { margin-inline-start: 1rem; }
.me-4 { margin-inline-end: 1rem; }
```

#### 5. Language State Management

**File**: `lib/stores/uiStore.ts`

Enhance existing language support with persistence:

```typescript
interface UIState {
  language: Language;
  setLanguage: (language: Language) => void;
  // ...
}

// Add in create function
setLanguage: (language) => {
  set({ language });
  // Persist to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', language.code);
  }
}

// Initialize from localStorage on store creation
const initLanguage = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('preferred-language');
    if (saved === 'dv') return LANGUAGES.dv;
  }
  return LANGUAGES.en;
};
```

#### 6. Layout Updates

**File**: `app/layout.tsx`

Set dynamic `lang` and `dir` attributes:

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { language } = useUIStore();

  return (
    <html lang={language.code} dir={language.direction}>
      <body className={language.code === 'dv' ? 'font-dhivehi' : ''}>
        {children}
      </body>
    </html>
  );
}
```

#### 7. Component Updates

**File**: `components/layout/Header.tsx`

Add language toggle button:

```typescript
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { language, setLanguage } = useUIStore();

  const toggleLanguage = () => {
    setLanguage(language.code === 'en' ? LANGUAGES.dv : LANGUAGES.en);
  };

  return (
    <button onClick={toggleLanguage} className="flex items-center gap-2">
      <Globe className="h-5 w-5" />
      <span>{language.code === 'en' ? 'DV' : 'EN'}</span>
    </button>
  );
};
```

Update all UI text to use translations:
- "Search news..." → `t('header.search')`
- "Home" → `t('header.home')`
- Category names → `category.name[language.code]`

**File**: `components/layout/Footer.tsx`

Replace all hardcoded strings with translation calls.

**All page components**: Update to access bilingual article data:
```typescript
// Before
<h1>{article.title}</h1>

// After
const { language } = useUIStore();
<h1>{article.title[language.code]}</h1>
```

### Mock Data Updates

**File**: `lib/mockData.ts`

Add Dhivehi translations for all 8 articles and 4 categories:

```typescript
export const categories: Category[] = [
  {
    id: '1',
    name: {
      en: 'Politics',
      dv: 'ސިޔާސަތު'
    },
    slug: 'politics',
    color: '#DC2626'
  },
  // ... all categories
];

export const articles: Article[] = [
  {
    id: '1',
    slug: 'breaking-news-major-policy',
    title: {
      en: 'Breaking: Major Policy Reform Announced',
      dv: 'ބުރަކަށްޓަށް: މުހިއްމު ސިޔާސަތު ރިފޯމެއް އިއުލާންކޮށްފި'
    },
    subtitle: {
      en: 'Government introduces sweeping changes',
      dv: 'ސަރުކާރުން ބޮޑެތި ބަދަލުތަކެއް ގެނެސްދީފި'
    },
    // ... all bilingual fields
  },
  // ... all articles
];
```

### Implementation Checklist

- [ ] Update `lib/types.ts` with bilingual fields
- [ ] Configure Mv Iyyu Formal font in `globals.css`
- [ ] Install and configure `@tailwindcss/rtl`
- [ ] Create `lib/translations.ts` with UI strings
- [ ] Update `lib/mockData.ts` with Dhivehi content
- [ ] Enhance `uiStore.ts` with localStorage
- [ ] Update `layout.tsx` for dynamic lang/dir
- [ ] Add language toggle to `Header.tsx`
- [ ] Update `Footer.tsx` with translations
- [ ] Update all page components (home, category, article)
- [ ] Update all news components (HeroCard, FeatureCard, ArticleRow, etc.)
- [ ] Test RTL layout in all views
- [ ] Test language persistence across sessions
- [ ] Test font rendering for Thaana script

---

## Part 2: Election Section (CNN-style)

### Goals
- Create dedicated elections page with live results
- Add election section to home page
- Display electoral maps, candidate profiles, and race tracking
- Use boilerplate data initially (CMS integration in future)
- Build bilingual from the start

### Architecture

#### 1. Type Definitions

**File**: `lib/types.ts`

Add election-specific types:

```typescript
export interface ElectionRace {
  id: string;
  name: { en: string; dv: string };
  type: 'presidential' | 'parliamentary' | 'local';
  candidates: Candidate[];
  totalVotes: number;
  reportingPercentage: number; // % of votes counted
  status: 'live' | 'final' | 'upcoming';
  lastUpdated: Date;
}

export interface Candidate {
  id: string;
  name: { en: string; dv: string };
  party: { en: string; dv: string };
  partyColor: string; // Hex color for party branding
  votes: number;
  percentage: number;
  photo: string;
  bio?: { en: string; dv: string };
  isWinner?: boolean;
}

export interface Region {
  id: string;
  name: { en: string; dv: string };
  winnerId: string | null; // candidate id
  votes: { [candidateId: string]: number };
  reportingPercentage: number;
}

export interface ElectoralMap {
  raceId: string;
  regions: Region[];
}
```

#### 2. Mock Data

**File**: `lib/electionData.ts` (NEW)

Create boilerplate election data:

```typescript
export const electionRaces: ElectionRace[] = [
  {
    id: 'presidential-2024',
    name: { en: 'Presidential Election 2024', dv: '2024 ރިޔާސީ އިންތިހާބު' },
    type: 'presidential',
    status: 'live',
    totalVotes: 150000,
    reportingPercentage: 75,
    lastUpdated: new Date(),
    candidates: [
      {
        id: 'candidate-1',
        name: { en: 'Ahmed Mohamed', dv: 'އަހްމަދު މުހައްމަދު' },
        party: { en: 'Progressive Party', dv: 'ޕްރޮގްރެސިވް ޕާޓީ' },
        partyColor: '#DC2626',
        photo: '/images/candidates/candidate-1.jpg',
        votes: 67500,
        percentage: 45,
        isWinner: true
      },
      // ... more candidates
    ]
  },
  // ... more races
];

export const electoralMaps: ElectoralMap[] = [
  {
    raceId: 'presidential-2024',
    regions: [
      {
        id: 'male',
        name: { en: 'Male City', dv: 'މާލެ' },
        winnerId: 'candidate-1',
        reportingPercentage: 100,
        votes: {
          'candidate-1': 25000,
          'candidate-2': 18000,
        }
      },
      // ... all atolls
    ]
  }
];
```

#### 3. Components

Create `components/elections/` directory with:

**ElectionHero.tsx**: Featured race display
- Large card with live indicator
- Top 2-3 candidates with vote bars
- "View Full Results" CTA
- Last updated timestamp

**RaceCard.tsx**: Compact race display
- Race name and type badge
- All candidates with horizontal bars
- Vote counts and percentages
- Winner checkmark
- Reporting percentage indicator

**CandidateProfile.tsx**: Detailed candidate view
- Photo and name
- Party affiliation with color
- Vote stats (count, percentage)
- Bio section
- Social media links (future)

**LiveResults.tsx**: Results table
- Sortable columns (name, party, votes, %)
- Real-time update indicator
- Responsive table design

**ElectoralMap.tsx**: Regional results map
- SVG map of Maldives atolls
- Color-coded by winning candidate/party
- Hover tooltips with vote breakdown
- Click for detailed regional results

**RaceDashboard.tsx**: Overview of all races
- Grid of race cards
- Filter by status (live, final, upcoming)
- Sort by date or importance

#### 4. Pages

**File**: `app/elections/page.tsx` (NEW)

Main election page layout:

```typescript
export default function ElectionsPage() {
  return (
    <div>
      {/* Top ad banner */}
      <AdSlot size="banner" />

      {/* Hero section - featured race */}
      <ElectionHero race={featuredRace} />

      {/* Electoral map */}
      <section>
        <h2>{t('elections.map.title')}</h2>
        <ElectoralMap mapData={presidentialMap} />
      </section>

      {/* Race dashboard */}
      <section>
        <h2>{t('elections.allRaces')}</h2>
        <RaceDashboard races={allRaces} />
      </section>

      {/* Detailed results */}
      <section>
        {races.map(race => (
          <LiveResults key={race.id} race={race} />
        ))}
      </section>
    </div>
  );
}
```

**File**: `app/page.tsx` (UPDATE)

Add election section to home page (between secondary features and main content):

```typescript
{/* Election Section */}
<section className="mb-12">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-bold">{t('elections.title')}</h2>
    <Link href="/elections" className="text-primary hover:underline">
      {t('elections.viewAll')} →
    </Link>
  </div>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {keyRaces.map(race => (
      <RaceCard key={race.id} race={race} compact />
    ))}
  </div>
</section>
```

#### 5. Navigation

**File**: `components/layout/Header.tsx`

Add Elections link:

```typescript
const navLinks = [
  { href: '/', label: { en: 'Home', dv: 'ހޯމް' } },
  { href: '/elections', label: { en: 'Elections', dv: 'އިންތިހާބު' } },
  // ... categories
];
```

#### 6. Styling & Interactions

- **Color coding**: Use candidate.partyColor for bars, badges, borders
- **Progress bars**: Animated CSS transitions (0 → final percentage)
- **Live indicator**: Red dot with pulse animation
- **Winner badge**: Green checkmark icon
- **Hover states**: Scale images, highlight rows
- **Responsive**: Stack on mobile, multi-column on desktop
- **Loading states**: Skeleton loaders for data fetching

### Implementation Checklist

- [ ] Create election types in `lib/types.ts`
- [ ] Create `lib/electionData.ts` with mock data
- [ ] Build `ElectionHero` component
- [ ] Build `RaceCard` component
- [ ] Build `CandidateProfile` component
- [ ] Build `LiveResults` component
- [ ] Build `ElectoralMap` component (SVG)
- [ ] Build `RaceDashboard` component
- [ ] Create `app/elections/page.tsx`
- [ ] Add election section to home page
- [ ] Update Header with Elections link
- [ ] Add election translations to `lib/translations.ts`
- [ ] Test responsive layouts
- [ ] Test bilingual content display
- [ ] Add appropriate ad placements

---

## Implementation Order

### Phase 1: Bilingual Foundation (Priority 1)
1. Type system updates
2. Font configuration
3. Translation system
4. Mock data with Dhivehi
5. Language toggle and state
6. Component updates
7. RTL layout and testing

### Phase 2: Election Section (Priority 2)
Build on bilingual foundation - all election content will be bilingual from day one.

1. Election types and data
2. Core components (RaceCard, CandidateProfile)
3. Advanced components (Map, Dashboard)
4. Pages (elections page, home integration)
5. Navigation updates
6. Testing and polish

---

## Dependencies

```bash
pnpm install @tailwindcss/rtl
```

---

## Testing Checklist

### Bilingual Testing
- [ ] Toggle language and verify all UI text changes
- [ ] Verify Mv Iyyu Formal font loads correctly
- [ ] Test RTL layout (header, footer, content flow)
- [ ] Verify language persistence after page reload
- [ ] Test on mobile devices
- [ ] Test with long Dhivehi text (no overflow)
- [ ] Verify icons flip correctly in RTL

### Election Testing
- [ ] Verify all election pages render correctly
- [ ] Test responsive layouts (mobile, tablet, desktop)
- [ ] Verify bilingual election content
- [ ] Test interactive elements (hover, click)
- [ ] Verify color coding consistency
- [ ] Test with different race statuses (live, final, upcoming)
- [ ] Verify ad placements

---

## Future Enhancements

### Phase 3+
- Real-time WebSocket updates for live results
- CMS integration for election data
- Advanced map interactions (zoom, filter)
- Historical election data
- Candidate comparison tools
- Vote projections and analysis
- Social media integration
- Push notifications for race calls

---

## Notes

- All new content must be bilingual (English + Dhivehi) from the start
- Follow existing component patterns and styling
- Maintain green theme throughout (#0F8A2F primary, #40B657 secondary)
- Use boilerplate data for elections initially
- Election data structure should support future CMS integration
- Keep performance in mind - optimize images and use lazy loading
- Ensure accessibility (ARIA labels, keyboard navigation)

---

Last Updated: 2025-11-18
