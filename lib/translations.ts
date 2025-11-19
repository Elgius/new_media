/**
 * Translation system for bilingual support (English/Dhivehi)
 * UI strings for static text throughout the application
 */

import { BilingualText } from './types';

// Translation dictionary
export const translations = {
  // Header
  header: {
    search: { en: 'Search news...', dv: 'ހޯދާ...' } as BilingualText,
    home: { en: 'Home', dv: 'ހޯމް' } as BilingualText,
    elections: { en: 'Elections', dv: 'އިންތިހާބު' } as BilingualText,
  },

  // Footer
  footer: {
    description: {
      en: 'Your trusted source for timely, accurate, and comprehensive news coverage. Stay informed with stories that matter.',
      dv: 'ވަގުތުން ވަގުތަށް، ސައްހަ އަދި ފުރިހަމަ ހަބަރުތަކެއް ލިބިގަތުމަށް އިތުބާރު ކުރެވޭ މަރުޖައު. މުހިއްމު ވާހަކަތަކުން އަޕްޑޭޓް ވެވަޑައިގަންނަވާ.',
    } as BilingualText,
    brandDescription: {
      en: 'Your trusted source for news and information from the Maldives and around the world.',
      dv: 'ދިވެހިރާއްޖެއާއި ދުނިޔޭގެ ހަބަރުތަކާއި މައުލޫމާތު ހޯދުމަށް އިތުބާރު ކުރެވޭ ތަނެއް.',
    } as BilingualText,
    quickLinks: { en: 'Quick Links', dv: 'ލިންކްތައް' } as BilingualText,
    aboutUs: { en: 'About Us', dv: 'އަޅުގަނޑުމެންނާ ބެހޭ' } as BilingualText,
    contact: { en: 'Contact', dv: 'ގުޅުއްވާ' } as BilingualText,
    privacy: { en: 'Privacy Policy', dv: 'ޕްރައިވެސީ ޕޮލިސީ' } as BilingualText,
    privacyPolicy: { en: 'Privacy Policy', dv: 'ޕްރައިވެސީ ޕޮލިސީ' } as BilingualText,
    terms: { en: 'Terms of Service', dv: 'ޚިދުމަތުގެ ޝަރުތުތައް' } as BilingualText,
    termsOfService: { en: 'Terms of Service', dv: 'ޚިދުމަތުގެ ޝަރުތުތައް' } as BilingualText,
    stayUpdated: { en: 'Stay Updated', dv: 'އަޕްޑޭޓް ވެވަޑައިގަންނަވާ' } as BilingualText,
    newsletter: {
      en: 'Subscribe to our newsletter for the latest news and updates.',
      dv: 'ފަހުގެ ހަބަރުތަކާއި އަޕްޑޭޓްތައް ލިބިގަތުމަށް އަޅުގަނޑުމެންގެ ނިއުސްލެޓަރަށް ސަބްސްކްރައިބް ކުރައްވާ.',
    } as BilingualText,
    newsletterText: {
      en: 'Subscribe to our newsletter for the latest news and updates delivered to your inbox.',
      dv: 'އަޅުގަނޑުމެންގެ ނިއުސްލެޓަރަށް ސަބްސްކްރައިބް ކުރައްވައި ފަހުގެ ހަބަރުތައް އީމެއިލަށް ލިބިވަޑައިގަންނަވާ.',
    } as BilingualText,
    comingSoon: { en: 'Newsletter coming soon', dv: 'ނިއުސްލެޓަރ އަންނަނީ' } as BilingualText,
    rights: { en: 'All rights reserved.', dv: 'ހުރިހާ ހައްގުތަކެއް ރައްކާތެރިވެގެންވެއެވެ.' } as BilingualText,
    copyright: {
      en: '© 2024 NewsHub. All rights reserved.',
      dv: '© 2024 ނިއުސްހަބް. ހުރިހާ ހައްގުތަކެއް ރައްކާތެރިވެގެންވެއެވެ.',
    } as BilingualText,
    builtWith: {
      en: 'Built with Next.js and TailwindCSS',
      dv: 'ނެކްސްޓް.ޖޭއެސް އާއި ޓެއިލްވިންޑް ސީއެސްއެސް ބޭނުންކޮށްގެން އުފައްދާފައި',
    } as BilingualText,
  },

  // Home page
  home: {
    latestNews: { en: 'Latest News', dv: 'ފަހުގެ ހަބަރުތައް' } as BilingualText,
    trendingNow: { en: 'Trending Now', dv: 'މިހާރު ޓްރެންޑިން' } as BilingualText,
    noMoreArticles: {
      en: 'No more articles to display',
      dv: 'ދައްކާނެ އިތުރު ލިޔުންތަކެއް ނެތް',
    } as BilingualText,
  },

  // Category page
  category: {
    latestIn: { en: 'Latest news and updates in', dv: 'ފަހުގެ ހަބަރުތަކާއި އަޕްޑޭޓްތައް' } as BilingualText,
    moreIn: { en: 'More in', dv: 'އިތުރު' } as BilingualText,
    noArticles: {
      en: 'No articles found in this category',
      dv: 'މި ކެޓަގަރީގައި ލިޔުންތަކެއް ނުފެނުނު',
    } as BilingualText,
  },

  // Article page
  article: {
    by: { en: 'By', dv: 'ލިޔުނީ' } as BilingualText,
    share: { en: 'Share:', dv: 'ހިއްސާކުރައްވާ:' } as BilingualText,
    relatedArticles: { en: 'Related Articles', dv: 'ގުޅުންހުރި ލިޔުންތައް' } as BilingualText,
    stayInformed: { en: 'Stay Informed', dv: 'ހަބަރުތައް ލިބިވަޑައިގަންނަވާ' } as BilingualText,
    subscribeComingSoon: {
      en: 'Subscribe to our newsletter for the latest updates (Coming Soon)',
      dv: 'އަޅުގަނޑުމެންގެ ނިއުސްލެޓަރަށް ސަބްސްކްރައިބް ކުރައްވާ (އަންނަނީ)',
    } as BilingualText,
  },

  // Common
  common: {
    video: { en: 'Video', dv: 'ވީޑިއޯ' } as BilingualText,
    readMore: { en: 'Read More', dv: 'ތަފްސީލް' } as BilingualText,
    viewAll: { en: 'View All', dv: 'ހުރިހާ ބައްލަވާ' } as BilingualText,
    loading: { en: 'Loading...', dv: 'ލޯޑްވަނީ...' } as BilingualText,
  },

  // Elections
  elections: {
    title: { en: 'Election Results', dv: 'އިންތިހާބު ނަތީޖާ' } as BilingualText,
    viewAll: { en: 'View All Election Results', dv: 'ހުރިހާ ނަތީޖާތައް ބައްލަވާ' } as BilingualText,
    live: { en: 'LIVE', dv: 'ލައިވް' } as BilingualText,
    final: { en: 'FINAL', dv: 'ފައިނަލް' } as BilingualText,
    upcoming: { en: 'UPCOMING', dv: 'އަންނަނީ' } as BilingualText,
    winner: { en: 'Winner', dv: 'ކާމިޔާބު' } as BilingualText,
    votes: { en: 'votes', dv: 'ވޯޓު' } as BilingualText,
    totalVotes: { en: 'Total Votes', dv: 'ޖުމްލަ ވޯޓު' } as BilingualText,
    reporting: { en: 'Reporting', dv: 'ރިޕޯޓް ވެފައި' } as BilingualText,
    updated: { en: 'Updated', dv: 'އަޕްޑޭޓް ކުރީ' } as BilingualText,
    lastUpdated: { en: 'Last updated', dv: 'ފަހުން އަޕްޑޭޓް ކުރީ' } as BilingualText,
    allRaces: { en: 'All Races', dv: 'ހުރިހާ ވޯޓުތައް' } as BilingualText,
    liveResults: { en: 'Live Results', dv: 'ލައިވް ނަތީޖާ' } as BilingualText,
    viewFullResults: { en: 'View Full Results', dv: 'ފުރިހަމަ ނަތީޖާ ބައްލަވާ' } as BilingualText,
    about: { en: 'About', dv: 'ވާހަކަ' } as BilingualText,
    voteShare: { en: 'Vote Share', dv: 'ވޯޓު ހިއްސާ' } as BilingualText,
    noRaces: { en: 'No races found', dv: 'ވޯޓެއް ނުފެނުނު' } as BilingualText,
    raceType: {
      presidential: { en: 'Presidential', dv: 'ރިޔާސީ' } as BilingualText,
      parliamentary: { en: 'Parliamentary', dv: 'މަޖިލިސް' } as BilingualText,
      local: { en: 'Local Council', dv: 'ލޯކަލް ކައުންސިލް' } as BilingualText,
    },
    filter: {
      all: { en: 'All', dv: 'ހުރިހާ' } as BilingualText,
      live: { en: 'Live', dv: 'ލައިވް' } as BilingualText,
      final: { en: 'Final', dv: 'ފައިނަލް' } as BilingualText,
      upcoming: { en: 'Upcoming', dv: 'އަންނަނީ' } as BilingualText,
    },
    table: {
      candidate: { en: 'Candidate', dv: 'ކެންޑިޑޭޓް' } as BilingualText,
      party: { en: 'Party', dv: 'ޕާޓީ' } as BilingualText,
      votes: { en: 'Votes', dv: 'ވޯޓު' } as BilingualText,
      percentage: { en: 'Percentage', dv: 'ޕަސެންޓޭޖް' } as BilingualText,
    },
    map: {
      title: { en: 'Electoral Map', dv: 'އިލެކްޓޯރަލް މެޕް' } as BilingualText,
      heading: { en: 'Results by Region', dv: 'ސަރަހައްދުން ނަތީޖާ' } as BilingualText,
      regionResults: { en: 'Results by Region', dv: 'ސަރަހައްދުން ނަތީޖާ' } as BilingualText,
      notReported: { en: 'Not Reported', dv: 'ރިޕޯޓް ނުވެފައި' } as BilingualText,
      totalRegions: { en: 'Total Regions', dv: 'ޖުމްލަ ސަރަހައްދު' } as BilingualText,
      complete: { en: 'Complete', dv: 'ފުރިހަމަވި' } as BilingualText,
      avgReporting: { en: 'Avg. Reporting', dv: 'އެވްރެޖް ރިޕޯޓިން' } as BilingualText,
      called: { en: 'Called', dv: 'ކޯލްވި' } as BilingualText,
    },
    candidateProfile: { en: 'Candidate Profile', dv: 'ކެންޑިޑޭޓް ޕްރޮފައިލް' } as BilingualText,
    party: { en: 'Party', dv: 'ޕާޓީ' } as BilingualText,
    raceTypes: {
      presidential: { en: 'Presidential Election', dv: 'ރިޔާސީ އިންތިހާބު' } as BilingualText,
      parliamentary: { en: 'Parliamentary Election', dv: 'މަޖިލިސް އިންތިހާބު' } as BilingualText,
      local: { en: 'Local Council Election', dv: 'ލޯކަލް ކައުންސިލް އިންތިހާބު' } as BilingualText,
    },
  },

  // Time formatting
  time: {
    ago: { en: 'ago', dv: 'ކުރިން' } as BilingualText,
    justNow: { en: 'just now', dv: 'މިހާރުހެން' } as BilingualText,
    minutesAgo: { en: 'minutes ago', dv: 'މިނެޓް ކުރިން' } as BilingualText,
    hoursAgo: { en: 'hours ago', dv: 'ގަޑިއިރު ކުރިން' } as BilingualText,
    daysAgo: { en: 'days ago', dv: 'ދުވަސް ކުރިން' } as BilingualText,
  },
};

// Type for nested translation keys
type TranslationKey =
  | `header.${keyof typeof translations.header}`
  | `footer.${keyof typeof translations.footer}`
  | `home.${keyof typeof translations.home}`
  | `category.${keyof typeof translations.category}`
  | `article.${keyof typeof translations.article}`
  | `common.${keyof typeof translations.common}`
  | `elections.${keyof typeof translations.elections}`
  | `elections.raceType.${keyof typeof translations.elections.raceType}`
  | `elections.filter.${keyof typeof translations.elections.filter}`
  | `elections.table.${keyof typeof translations.elections.table}`
  | `elections.map.${keyof typeof translations.elections.map}`
  | `elections.raceTypes.${keyof typeof translations.elections.raceTypes}`
  | `time.${keyof typeof translations.time}`;

/**
 * Get translation for a given key in the current language
 * @param key - Translation key (e.g., 'header.search', 'footer.aboutUs')
 * @param language - Language object or language code ('en' or 'dv')
 * @returns Translated string
 */
export function getTranslation(key: string, language: { code: 'en' | 'dv' } | 'en' | 'dv'): string {
  const languageCode = typeof language === 'string' ? language : language.code;
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    value = value?.[k];
    if (!value) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  // Return the translated text for the current language
  if (value && typeof value === 'object' && languageCode in value) {
    return value[languageCode];
  }

  console.warn(`Translation not found for key: ${key}, language: ${languageCode}`);
  return key;
}

/**
 * Hook to get translation function with current language from store
 * Import useUIStore in components to use this
 */
export function useTranslation() {
  // This will be imported in components with access to useUIStore
  // Usage: const t = useTranslation();
  return {
    t: (key: string) => {
      // Components will need to get languageCode from useUIStore
      // This is a helper structure - actual implementation in components
      return key;
    },
  };
}
