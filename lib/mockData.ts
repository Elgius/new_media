/**
 * Mock data for the News Website
 * This provides sample articles and categories for development
 */

import { Article, Category, Author } from './types';

// Categories with full metadata
export const categories: Category[] = [
  // Default category for uncategorized articles (hidden from public)
  {
    id: 'uncategorized',
    name: { en: 'Uncategorized', dv: 'ކެޓަގަރީ ނެތް' },
    slug: 'uncategorized',
    color: '#6B7280',
    parentId: null,
    description: {
      en: 'Articles that have not been assigned to a specific category',
      dv: 'ކެޓަގަރީއަކަށް ބަހައްޓާފައި ނުވާ ލިޔުންތައް'
    },
    icon: '📋',
    order: 999,
    isActive: false, // Hidden from public
    isSpecial: false,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00'),
  },
  // Main categories
  {
    id: '1',
    name: { en: 'Politics', dv: 'ސިޔާސަތު' },
    slug: 'politics',
    color: '#0F8A2F',
    parentId: null,
    description: {
      en: 'Political news, government policies, and legislative updates',
      dv: 'ސިޔާސީ ހަބަރުތަކާއި ސަރުކާރުގެ ސިޔާސަތުތަކާއި ގާނޫނީ މައުލޫމާތު'
    },
    icon: '🏛️',
    order: 0,
    isActive: true,
    isSpecial: false,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00'),
  },
  {
    id: '2',
    name: { en: 'Sports', dv: 'ކުޅިވަރު' },
    slug: 'sports',
    color: '#40B657',
    parentId: null,
    description: {
      en: 'Sports news, matches, tournaments, and athlete profiles',
      dv: 'ކުޅިވަރު ހަބަރުތަކާއި މެޗުތަކާއި މުބާރާތްތަކާއި ކުޅުންތެރިންގެ މައުލޫމާތު'
    },
    icon: '⚽',
    order: 1,
    isActive: true,
    isSpecial: false,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00'),
  },
  {
    id: '3',
    name: { en: 'Business', dv: 'ވިޔަފާރި' },
    slug: 'business',
    color: '#1A5D2F',
    parentId: null,
    description: {
      en: 'Business news, market trends, startups, and economic analysis',
      dv: 'ވިޔަފާރީގެ ހަބަރުތަކާއި މާކެޓް ޓްރެންޑްސް އަދި އިގްތިސާދީ ތަހުލީލު'
    },
    icon: '💼',
    order: 2,
    isActive: true,
    isSpecial: false,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00'),
  },
  {
    id: '4',
    name: { en: 'Local', dv: 'ލޯކަލް' },
    slug: 'local',
    color: '#2DA84A',
    parentId: null,
    description: {
      en: 'Local community news, events, and cultural happenings',
      dv: 'ލޯކަލް ކޮމިއުނިޓީގެ ހަބަރުތަކާއި ހަރަކާތްތަކާއި ސަގާފީ ހަރަކާތްތައް'
    },
    icon: '🏘️',
    order: 3,
    isActive: true,
    isSpecial: false,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00'),
  },
  // Special category for Elections with custom page
  {
    id: 'elections',
    name: { en: 'Elections', dv: 'އިންތިހާބު' },
    slug: 'elections',
    color: '#DC2626',
    parentId: null,
    description: {
      en: 'Live election coverage, results, and political race analysis',
      dv: 'އިންތިހާބުގެ ލައިވް ކަވަރޭޖާއި ނަތީޖާއާއި ސިޔާސީ ތަހުލީލު'
    },
    icon: '🗳️',
    order: 4,
    isActive: true,
    isSpecial: true,
    specialPageRoute: '/elections',
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00'),
  },
];

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};

// Authors
export const authors: Author[] = [
  {
    id: '1',
    slug: 'sarah-johnson',
    name: { en: 'Sarah Johnson', dv: 'ސާރާ ޖޮންސަން' },
    bio: {
      en: 'Sarah Johnson is a senior political correspondent with over 10 years of experience covering national and international affairs. Her investigative reporting has earned her multiple journalism awards.',
      dv: 'ސާރާ ޖޮންސަން އަކީ 10 އަހަރަށްވުރެ ގިނަ ދުވަސް ގައުމީ އަދި ބައިނަލްއަގުވާމީ ކަންކަމުގެ ރިޕޯޓު ކުރައްވާ ސިނިއަރ ސިޔާސީ ނޫސްވެރިއެކެވެ. އޭނާގެ ތަހުގީގީ ރިޕޯޓިންގަށް ގިނަ ނޫސްވެރިކަމުގެ އެވޯޑުތައް ލިބިފައިވެއެވެ.'
    },
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    socialLinks: {
      twitter: 'https://twitter.com/sarahjohnson',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      email: 'sarah.johnson@newshub.com'
    }
  },
  {
    id: '2',
    slug: 'ahmed-rahman',
    name: { en: 'Ahmed Rahman', dv: 'އަހްމަދު ރަހްމާން' },
    bio: {
      en: 'Ahmed Rahman is a sports journalist passionate about football and athletics. He has covered major sporting events including national championships and regional tournaments for the past 8 years.',
      dv: 'އަހްމަދު ރަހްމާން އަކީ ފުޓްބޯޅައާއި އެތުލެޓިކްސްއަށް ޝައުގުވެރިކަން ހުރި ކުޅިވަރު ނޫސްވެރިއެކެވެ. އޭނާ 8 އަހަރު ވަންދެން ގައުމީ ޗެމްޕިއަންޝިޕާއި ސަރަހައްދީ މުބާރާތްތަކުގެ ރިޕޯޓު ކުރައްވަމުން ގެންދަވައެވެ.'
    },
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    socialLinks: {
      twitter: 'https://twitter.com/ahmedrahman',
      facebook: 'https://facebook.com/ahmedrahman',
      email: 'ahmed.rahman@newshub.com'
    }
  },
  {
    id: '3',
    slug: 'michael-chen',
    name: { en: 'Michael Chen', dv: 'މައިކަލް ޗެން' },
    bio: {
      en: 'Michael Chen specializes in business and technology reporting. With a background in economics and a keen interest in innovation, he brings deep insights into market trends and emerging technologies.',
      dv: 'މައިކަލް ޗެން އަކީ ވިޔަފާރި އަދި ޓެކްނޮލޮޖީ ރިޕޯޓިންގައި ހާއްސަ ތަޖުރިބާ ލިބިފައިވާ ނޫސްވެރިއެކެވެ. އިގްތިސާދީ ފަންނުގެ ތަޖުރިބާ އޮތުމާއެކު ނަވީންކަރުމަށް ޝައުގުވެރިކަން ހުރުމުގެ ސަބަބުން މާކެޓް ޓްރެންޑްސް އަދި ނަވީން ޓެކްނޮލޮޖީތަކުގެ ފުންކޮށް ގިނަ މައުލޫމާތު ހިއްސާ ކުރައްވައެވެ.'
    },
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    socialLinks: {
      twitter: 'https://twitter.com/michaelchen',
      linkedin: 'https://linkedin.com/in/michaelchen',
      email: 'michael.chen@newshub.com'
    }
  },
  {
    id: '4',
    slug: 'jennifer-williams',
    name: { en: 'Jennifer Williams', dv: 'ޖެނިފަރ ވިލިއަމްސް' },
    bio: {
      en: 'Jennifer Williams is a community reporter dedicated to telling local stories that matter. She has been covering neighborhood news, cultural events, and grassroots initiatives for 6 years.',
      dv: 'ޖެނިފަރ ވިލިއަމްސް އަކީ މުހިއްމު ލޯކަލް ވާހަކަތައް ކިޔައިދިނުމަށް ވަގުތު ހޭދަކުރައްވާ ކޮމިއުނިޓީ ރިޕޯޓަރެކެވެ. އޭނާ 6 އަހަރު ވަންދެން ސަރަހައްދީ ހަބަރުތަކާއި ސަގާފީ ހަރަކާތްތަކާއި ލޯކަލް ފެށުންތަކުގެ ރިޕޯޓު ކުރައްވަމުން ގެންދަވައެވެ.'
    },
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    socialLinks: {
      twitter: 'https://twitter.com/jenniferwilliams',
      facebook: 'https://facebook.com/jenniferwilliams',
      email: 'jennifer.williams@newshub.com'
    }
  },
  {
    id: '5',
    slug: 'robert-taylor',
    name: { en: 'Robert Taylor', dv: 'ރޮބަރޓް ޓޭލާ' },
    bio: {
      en: 'Robert Taylor covers the business beat with a focus on startups, venture capital, and entrepreneurship. His in-depth analysis helps readers understand the evolving business landscape.',
      dv: 'ރޮބަރޓް ޓޭލާ އަކީ ސްޓާރޓްއަޕް، ވެންޗަރ ކެޕިޓަލް، އަދި އެންޓަޕްރެނިއާޝިޕްއަށް ހާއްސަ ސަމާލުކަމެއް ދީގެން ވިޔަފާރި ހަބަރުތައް ރިޕޯޓު ކުރައްވާ ނޫސްވެރިއެކެވެ. އޭނާގެ ފުންކޮށް ދިރާސާކުރުމުގެ ސަބަބުން ވިޔަފާރީގެ ކުރިއަރަމުންދާ މަންޒަރު ރީޑަރުންނަށް ވިސްނައިދެއްވައެވެ.'
    },
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    socialLinks: {
      twitter: 'https://twitter.com/roberttaylor',
      linkedin: 'https://linkedin.com/in/roberttaylor',
      email: 'robert.taylor@newshub.com'
    }
  },
];

// Helper function to get author by slug
export const getAuthorBySlug = (slug: string): Author | undefined => {
  return authors.find((author) => author.slug === slug);
};

// Mock Articles
export const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'parliament-passes-historic-climate-bill',
    title: {
      en: 'Parliament Passes Historic Climate Change Bill',
      dv: 'މަޖިލީހުން މޫސުމީ ބަދަލުތަކާ ބެހޭ ތާރީޚީ ގާނޫނެއް ފާސްކޮށްފި'
    },
    subtitle: {
      en: 'New legislation sets ambitious targets for carbon neutrality by 2040',
      dv: '2040 ވަނަ އަހަރަށް ކާބަން ނިއުޓްރަލް ވުމުގެ އަމާޒު ހިމަނައިފި'
    },
    summary: {
      en: 'In a landmark decision, Parliament has unanimously approved comprehensive climate legislation that establishes binding targets for reducing greenhouse gas emissions.',
      dv: 'މަޖިލީހުން އިއްތިފާގުން މޫސުމީ ބަދަލުތަކާ ބެހޭ ފުރިހަމަ ގާނޫނެއް ފާސްކޮށްފައިވަނީ ގްރީން ހައުސް ގޭސް ކުޑަކުރުމުގެ އަމާޒުތައް ހިމަނައިގެންނެވެ.',
    },
    body: {
      en: `<p>In a historic vote today, Parliament has passed sweeping climate change legislation that sets the country on a path to carbon neutrality by 2040. The bill, which received support from all major parties, represents one of the most ambitious climate commitments in the region.</p>

<p>The legislation includes provisions for transitioning to renewable energy sources, investing in green infrastructure, and implementing carbon pricing mechanisms. Environmental groups have praised the move as a crucial step in addressing the climate crisis.</p>

<p>"This is a defining moment for our nation," said Prime Minister during the announcement. "We are taking decisive action to protect our environment for future generations."</p>

<p>The bill also allocates substantial funding for climate adaptation measures and support for communities affected by the transition to a green economy.</p>`,
      dv: `<p>މިއަދު މަޖިލީހުން މޫސުމީ ބަދަލުތަކާ ބެހޭ ފުރިހަމަ ގާނޫނެއް ފާސްކޮށްފައިވަނީ 2040 ވަނަ އަހަރަށް ކާބަން ނިއުޓްރަލް ގައުމަކަށް ވުމުގެ އަމާޒުގައެވެ. މި ގާނޫނަކީ ސަރަހައްދުގެ އެންމެ ވަރުގަދަ މޫސުމީ ބަދަލުތަކާ ބެހޭ ވައުދެކެވެ.</p>

<p>މި ގާނޫނުގައި ހިމެނެނީ ހިލޭ އެނަރޖީއަށް ބަދަލުވުމާއި، ފަޔަދާހުރި އިންފްރާސްޓްރަކްޗަރއަށް އިންވެސްޓްކުރުމާއި، ކާބަން ޕްރައިސިން ނިޒާމު ތަންފީޒުކުރުމުގެ ފިޔަވަޅުތަކެވެ.</p>

<p>"މިއީ ގައުމަށް ތާރީޚީ ދުވަހެއް،" ބުނެދެއްވީ ބޮޑުވަޒީރެވެ. "އަޅުގަނޑުމެން އަންނަން އޮތް ޖީލުތަކަށް ބިއުކެއްސާ ރައްކާތެރިކުރުމަށް ނިންމަވާނެ ފިޔަވަޅުތައް އަޅަނީ."</p>

<p>މި ގާނޫނުގައި މޫސުމީ ބަދަލުތަކާ އެޑެޕްޓް ވުމަށާއި ހުރިހާ މުޖުތަމައުތަކަށް އެހީތެރިވުމަށް ބޮޑު ބަޖެޓެއް ހިމަނައިފައިވެއެވެ.</p>`,
    },
    coverImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200',
    category: categories[0], // Politics
    author: authors[0], // Sarah Johnson,
    publishedAt: new Date('2024-01-15T10:30:00'),
    featured: true,
    tags: [
      { en: 'climate', dv: 'މޫސުން' },
      { en: 'legislation', dv: 'ގާނޫނު' },
      { en: 'environment', dv: 'ތިމާވެއްޓަ' },
    ],
    relatedArticles: ['2', '4'],
    reactions: {
      like: 342,
      love: 189,
      haha: 12,
      wow: 256,
      sad: 8,
      angry: 5,
    },
    comments: [
      {
        id: 'c1-1',
        articleId: '1',
        author: { name: 'Ahmed Ali', avatar: 'https://i.pravatar.cc/150?img=12' },
        content: {
          en: 'This is a huge step forward for our country! Finally, we are taking climate change seriously.',
          dv: 'މިއީ ގައުމަށް ވަރަށް ބޮޑު ފިޔަވަޅެއް! ފަހުން އަޅުގަނޑުމެން މޫސުމީ ބަދަލުތައް ސީރިއަސްކޮށް ބަލަނީ.'
        },
        timestamp: new Date('2024-01-15T11:15:00'),
      },
      {
        id: 'c1-2',
        articleId: '1',
        author: { name: 'Maria Santos', avatar: 'https://i.pravatar.cc/150?img=47' },
        content: {
          en: 'I hope this legislation comes with proper enforcement mechanisms. Laws are only as good as their implementation.',
          dv: 'އުންމީދުކުރަން މި ގާނޫނާއެކު ތަންފީޒުކުރުމުގެ ރަނގަޅު ނިޒާމެއް އައުމަށް. ގާނޫނުތައް ރަނގަޅީ ތަންފީޒުކުރާ ގޮތަށް.'
        },
        timestamp: new Date('2024-01-15T12:30:00'),
      },
      {
        id: 'c1-3',
        articleId: '1',
        author: { name: 'John Patterson', avatar: 'https://i.pravatar.cc/150?img=33' },
        content: {
          en: 'Great news! But we need more details on how this will affect businesses and job creation.',
          dv: 'އުފާވެރި ހަބަރެއް! އެކަމަކު މިއީ ވިޔަފާރިތަކަށާއި ވަޒީފާ ހޯދުމަށް ކިހާ އަސަރެއް ކުރާނެ ކަމުގެ މައުލޫމާތު ބޭނުންވެއެވެ.'
        },
        timestamp: new Date('2024-01-15T14:45:00'),
      },
      {
        id: 'c1-4',
        articleId: '1',
        author: { name: 'Fatima Hassan', avatar: 'https://i.pravatar.cc/150?img=20' },
        content: {
          en: 'Finally some positive climate action! We need to move beyond just promises.',
          dv: 'ފަހުން މޫސުމީ ބަދަލުތަކާމެދު ފިޔަވަޅު އެޅުން! ވައުދުތަކުން އިތުރަށް ކުރިއަށް ދެވޭނެ.'
        },
        timestamp: new Date('2024-01-15T16:20:00'),
      },
    ],
  },
  {
    id: '2',
    slug: 'national-team-advances-championship',
    title: {
      en: 'National Team Advances to Championship Finals',
      dv: 'ގައުމީ ޓީމު ޗެމްޕިއަންޝިޕް ފައިނަލަށް ދަތުރުކޮށްފި'
    },
    subtitle: {
      en: 'Thrilling victory secures spot in regional tournament',
      dv: 'ސަރަހައްދީ މުބާރާތުގެ ފައިނަލަށް ހޯދީ މޮޅުވެގެން'
    },
    summary: {
      en: 'The national football team delivered a stunning performance last night, securing their place in the championship finals with a 3-1 victory.',
      dv: 'ގައުމީ ފުޓްބޯޅަ ޓީމު ކާމިޔާބު ކުޅުމެއް ދައްކައި ޗެމްޕިއަންޝިޕް ފައިނަލަށް ދަތުރުކުރީ 3-1 ން މޮޅުވެގެންނެވެ.',
    },
    body: {
      en: `<p>In an electrifying match that kept fans on the edge of their seats, the national football team has secured their spot in the championship finals with a decisive 3-1 victory over their regional rivals.</p>

<p>Star striker Ahmed Mohamed scored two crucial goals, while midfielder Hassan Ali added another spectacular strike in the second half. The victory marks the team's best performance in five years.</p>

<p>Coach Ibrahim praised his team's dedication and teamwork. "The players showed incredible determination tonight. This victory is for all our supporters who have stood by us."</p>

<p>The championship final is scheduled for next month, and tickets are expected to sell out within hours of going on sale.</p>`,
      dv: `<p>ފޭނުން ހަމަހިމޭންކޮށްލި މެޗެއްގައި ގައުމީ ފުޓްބޯޅަ ޓީމުން ސަރަހައްދީ ވާދަވެރިން 3-1 ން ބަލިކޮށް ޗެމްޕިއަންޝިޕް ފައިނަލަށް ދަތުރުކުރުމުގެ ފުރުސަތު ހޯދައިފިއެވެ.</p>

<p>ސްޓާރ ސްޓްރައިކަރ އަހްމަދު މުހައްމަދު ދޮޅު މުހިއްމު ލަނޑު ޖަހައިދިނުމާއެކު، މިޑްފީލްޑަރ ހަސަން ޢަލީ ދެވަނަ ހާފުގައި ޖަހައިދިނީ ފުރިހަމަ ލަނޑެކެވެ. މި މޮޅު ހޯދުމަކީ ފަސް އަހަރުގެ ތެރޭގައި ޓީމުގެ އެންމެ ރަނގަޅު ކުޅުމެވެ.</p>

<p>"ކުޅުންތެރިން މިރޭ ދެއްކީ ވަރަށް ބުރަ މަސައްކަތެއް،" ކޯޗު އިބްރާހިމް ވިދާޅުވިއެވެ. "މި މޮޅަކީ އަޅުގަނޑުމެންނާ އެކު އޮންނަވާ ހުރިހާ ސަޕޯޓަރުންނަށް ހުރި މޮޅެއް."</p>

<p>ޗެމްޕިއަންޝިޕް ފައިނަލް އޮންނާނީ އަންނަ މަހު ކަމަށާއި، ޓިކެޓު ވިއްކަން ފަށާއިރު ގަޑިއިރުތަކެއްގެ ތެރޭގައި ވިއްކާލެވިދާނެ ކަމަށް ލަފާކުރެވެއެވެ.</p>`,
    },
    coverImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200',
    category: categories[1], // Sports
    author: authors[1], // Ahmed Rahman,
    publishedAt: new Date('2024-01-14T20:15:00'),
    featured: true,
    tags: [
      { en: 'football', dv: 'ފުޓްބޯޅަ' },
      { en: 'sports', dv: 'ކުޅިވަރު' },
      { en: 'championship', dv: 'ޗެމްޕިއަންޝިޕް' },
    ],
    relatedArticles: ['7'],
    reactions: {
      like: 589,
      love: 423,
      haha: 8,
      wow: 312,
      sad: 2,
      angry: 1,
    },
    comments: [
      {
        id: 'c2-1',
        articleId: '2',
        author: { name: 'Mohamed Ibrahim', avatar: 'https://i.pravatar.cc/150?img=15' },
        content: {
          en: 'What an incredible match! Ahmed Mohamed is unstoppable this season!',
          dv: 'ކިހާ މޮޅު މެޗެއް! އަހްމަދު މުހައްމަދު މި ސީޒަން ހުއްޓުވަން އުނދަގޫވެ!'
        },
        timestamp: new Date('2024-01-14T21:00:00'),
      },
      {
        id: 'c2-2',
        articleId: '2',
        author: { name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?img=25' },
        content: {
          en: 'So proud of our national team! That second goal was absolutely stunning!',
          dv: 'ގައުމީ ޓީމަކަށް ވަރަށް ފަޚުރުވެރި! ދެވަނަ ލަނޑު ވަރަށް ފުރިހަމަ!'
        },
        timestamp: new Date('2024-01-14T21:30:00'),
      },
      {
        id: 'c2-3',
        articleId: '2',
        author: { name: 'Ali Hassan', avatar: 'https://i.pravatar.cc/150?img=51' },
        content: {
          en: 'Already bought my tickets for the final! Cannot wait to see them play!',
          dv: 'ފައިނަލަށް ޓިކެޓް ގަނެފިން! މެޗު ބަލަން ވަރަށް އިންތިޒާރު ކުރަން!'
        },
        timestamp: new Date('2024-01-14T22:15:00'),
      },
    ],
  },
  {
    id: '3',
    slug: 'tech-sector-shows-strong-growth',
    title: {
      en: 'Technology Sector Shows Strong Growth This Quarter',
      dv: 'އިތުރު ގަ ވިޔަފާރި ވަނަ ކোއް ތިރީވެ ދިސްވަރަށް ވަރުގަދަ ކުދިކަމުވެ'
    },
    subtitle: {
      en: 'Local tech companies report record revenues',
      dv: 'ތިކުދަ ޓެކްނޮލޮޖީ ކোম්પެނިތައް ރެކޮރްޑް ވިއްސަވާދި'
    },
    summary: {
      en: 'The technology sector has demonstrated remarkable resilience and growth, with multiple companies reporting record-breaking quarterly results.',
      dv: 'ވިޔަފާރި ވަނަ ޓެކްނޮލޮޖީ ސެކްޓަރ ވަރުގަދަ ވިކަސް އަިދ ވަދާވެވި ވެތިކުދަ ކަމ ރެކޮރްޑް ވަޑިކުރެވި.',
    },
    body: {
      en: `<p>The local technology sector is experiencing unprecedented growth, with several major companies reporting their best quarterly results in company history. Industry analysts attribute this surge to increased digital adoption and innovation.</p>

<p>Leading software company TechCorp announced a 45% increase in revenue compared to the same period last year, while startup accelerators report a significant uptick in new ventures.</p>

<p>"We're seeing a perfect storm of favorable conditions," explains economic analyst Maria Stevens. "Investment in digital infrastructure, a skilled workforce, and supportive government policies are all contributing to this boom."</p>

<p>The sector now employs over 15,000 people and contributes significantly to the national economy.</p>`,
      dv: `<p>ތިކުދަ ޓެކްނޮލޮޖީ ވަނަ ވިޔަފާރި ސެކްޓަރ އިތުރެ ވިކަސްވެ އިރި، ވެތި ބޮޑުވެ ކަމ ސވާދި ވަރުގަދަ ކ维޾ރި ރަނގަޅެ މެޗެ ވިސް ވެވި.</p>

<p>އާ ވެސް ޓެކްއ ސޮފްޓްވެއ ކަމ ޓެކ ކޮރ ވަށާއިރު ۴۵ ޫ ވިއްސަވާދި ވަނަ ކޮތަ، ސްޓާރޓަޕ ށްޓަރ ވަނަ ނވަ ވިޔަފާރިތަ ވިސް ވެވި.</p>

<p>"އަިދެ ސަވާދި ތިކުދަ ވިވިދަ ވެ،" ވިސް ވިދާޅުވިދާނެ ސިއްސި ވިސް ވިސި. "ޓެކްނޮލޮޖީ އިংފްރާވަނަ އަިދ ވަރުވެ ތި ޖަމާ ސަރަކާރުވަނަ ވަނަ ވަިދ ގެ ވަިދ ވާނެވެ."</p>

<p>ވިޔަފާރި ސެކްޓަރ އިތުރެ 15,000 ވެ ތި ކި ވިސް އަިދ ގަ އިކޮނޮމި ވަިދ އިތުރާވެވި.</p>`,
    },
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
    category: categories[2], // Business
    author: authors[2], // Michael Chen,
    publishedAt: new Date('2024-01-14T09:00:00'),
    featured: true,
    tags: [
      { en: 'technology', dv: 'ޓެކްނޮލޮޖީ' },
      { en: 'business', dv: 'ވިޔަފާރި' },
      { en: 'economy', dv: 'އިކޮނޮމި' },
    ],
    relatedArticles: ['5'],
    reactions: {
      like: 276,
      love: 134,
      haha: 5,
      wow: 198,
      sad: 3,
      angry: 2,
    },
    comments: [
      {
        id: 'c3-1',
        articleId: '3',
        author: { name: 'David Chen', avatar: 'https://i.pravatar.cc/150?img=68' },
        content: {
          en: 'This is exactly the kind of economic growth we need. Tech sector is the future!',
          dv: 'މިއީ އަޅުގަނޑުމެންނަށް ބޭނުންވާ އިގްތިސާދީ ކުރިއެރުން! ޓެކްނޮލޮޖީ ސެކްޓަރަކީ މުސްތަގްބަލު!'
        },
        timestamp: new Date('2024-01-14T10:20:00'),
      },
      {
        id: 'c3-2',
        articleId: '3',
        author: { name: 'Nina Patel', avatar: 'https://i.pravatar.cc/150?img=38' },
        content: {
          en: 'Great to see local companies thriving. Are they hiring? Would love to know more about job opportunities.',
          dv: 'ތިކުދަ ކުންފުނިތައް ކުރިއަރަމުން ދިއުން ފެނުމަކީ އުފާވެރި ކަމެއް. ވަޒީފާ ހުޅުވިފައިވޭތޯ؟ ފުރުސަތުތަކާމެދު އިތުރަށް ދެނެގަތުމަށް ޝައުގުވެރިވަން.'
        },
        timestamp: new Date('2024-01-14T11:45:00'),
      },
      {
        id: 'c3-3',
        articleId: '3',
        author: { name: 'Robert Martinez', avatar: 'https://i.pravatar.cc/150?img=56' },
        content: {
          en: 'The 45% increase is impressive. Would be interesting to know which sub-sectors are driving this growth.',
          dv: '45% އިތުރުވުމަކީ ވަރަށް ރަނގަޅު އަދަދެއް. މި ކުރިއެރުން އައީ ކޮން ސަބް-ސެކްޓަރތަކުން ކަމެއް ދެނެގަނެވުމަކީ ޝައުގުވެރި ކަމެއް.'
        },
        timestamp: new Date('2024-01-14T13:10:00'),
      },
    ],
  },
  {
    id: '4',
    slug: 'new-community-center-opens',
    title: {
      en: 'New Community Center Opens in Capital City',
      dv: 'ސާތްދާ ޓାވުގައި ނވަ ކުވެރިކަމަ ވަނަ ގޯތި ކޮށްފި'
    },
    subtitle: {
      en: 'State-of-the-art facility to serve thousands of residents',
      dv: 'ވަރާސް ރަނގަޅު އިފާދާ ލާޙަ ދިރިވަސް އެހެވި'
    },
    summary: {
      en: 'A modern community center with sports facilities, library, and educational spaces has officially opened its doors to the public.',
      dv: 'ކުޅިވަރުވަނަ އިފާދާ، ފާރުވި ދާވެ، އަިދ ޝިކުވާ ތަބަސް އް ރި ޓާވުވާ ކެވި.',
    },
    body: {
      en: `<p>The new Capital Community Center opened its doors today, offering residents a wide range of facilities and programs designed to bring the community together.</p>

<p>The $12 million facility includes a full-size gymnasium, swimming pool, library, computer lab, and multipurpose rooms for classes and events. The center is expected to serve more than 5,000 residents weekly.</p>

<p>Mayor Lisa Anderson cut the ribbon at the opening ceremony, attended by hundreds of excited community members. "This center represents our commitment to creating spaces where our community can thrive," she said.</p>

<p>The facility will offer free programs for children and seniors, including sports clinics, computer literacy classes, and art workshops.</p>`,
      dv: `<p>ނވަ ސާތްދާ ޓާވު ކުވެރިކަމަ ވަނަ ގޯތި ދިރިވަސް އެހެވި އިފާދާއާއި ބުރަ ވެ ސްކިމްތައް އިސްތިމާލުކުރުމަށް ވަނަވާފި.</p>

<p>ވެ 12 މިލިޔަން ވަނަ އިފާދާ ފުރި ޖިމްނެޞިއަމް، ސްވިމިंސ ސްވިމް، ފާރުވި ދާވެ، ކޮމްޕިއުޓަރ ލިބް، އަިދ ވެތި ރޫމްތިބި ކުވެރިކަމަ ވަނަ ގޯތި ސަވާދި ވަނަ ވިޖީ ވަނަ ދިރިވަސް އェވި.</p>

<p>މިނިސްޓަރ ލިސާ އަިނޑާސް ކޮށް ވަނަ ވަނަވާ އާތި ސަތްތަ ވަނަ ދިރިވަސް މަނިވި. "މި ގޯތި ނ ވިސްނާ ވަނަ ދިރިވަސް އަިދ ވަރުވަވި ވަނަވާފި،" ވިސް އިވާ.</p>

<p>އިފާދާ ކޮދިވެ އަިދ ބޮސް ދިރިވަސް އެހެވި ކުޅިވަރުވަނަ ސި، ކޮމްޕިއުޓަރ އާއި އާރުށާ ވާތިފާއިހި.</p>`,
    },
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    category: categories[3], // Local
    author: authors[3], // Jennifer Williams,
    publishedAt: new Date('2024-01-13T14:30:00'),
    tags: [
      { en: 'community', dv: 'ކުވެރިކަމަ' },
      { en: 'infrastructure', dv: 'އިނވްސްޓްރަކްޗަރ' },
      { en: 'local news', dv: 'ލޯކަލް ނިވްސް' },
    ],
    relatedArticles: ['8'],
    reactions: {
      like: 412,
      love: 298,
      haha: 3,
      wow: 156,
      sad: 1,
      angry: 0,
    },
    comments: [
      {
        id: 'c4-1',
        articleId: '4',
        author: { name: 'Lisa Anderson', avatar: 'https://i.pravatar.cc/150?img=43' },
        content: {
          en: 'This is wonderful news for our neighborhood! Can\'t wait to take my kids to the library.',
          dv: 'އަޅުގަނޑުމެންގެ ސަރަހައްދަށް މިއީ ވަރަށް އުފާވެރި ހަބަރެއް! ކުދިން ފޮތްކަށިއަށް ގެންދަން ކެތްމަދުވެއްޖެ.'
        },
        timestamp: new Date('2024-01-13T15:00:00'),
      },
      {
        id: 'c4-2',
        articleId: '4',
        author: { name: 'James Thompson', avatar: 'https://i.pravatar.cc/150?img=59' },
        content: {
          en: 'Finally! We\'ve been waiting for this community center for years. Great investment in our future.',
          dv: 'ފަހުން! އަހަރުތަކެއް ވެއްޖެ މި ކޮމިއުނިޓީ ސެންޓަރަށް އިންތިޒާރު ކުރަމުން. އަޅުގަނޑުމެންގެ މުސްތަގްބަލަށް ރަނގަޅު އިންވެސްޓްމަންޓެއް.'
        },
        timestamp: new Date('2024-01-13T16:30:00'),
      },
      {
        id: 'c4-3',
        articleId: '4',
        author: { name: 'Aisha Mohamed', avatar: 'https://i.pravatar.cc/150?img=31' },
        content: {
          en: 'The free programs for seniors are especially welcome! This will really help bring the community together.',
          dv: 'ބޮޑެތި މީހުންނަށް ހުރި ހިލޭ ޕްރޮގްރާމްތައް ވަރަށް މުހިއްމު! މިއީ ކޮމިއުނިޓީ ގުޅުވައިދޭނެ ކަމެއް.'
        },
        timestamp: new Date('2024-01-13T17:45:00'),
      },
      {
        id: 'c4-4',
        articleId: '4',
        author: { name: 'Carlos Rivera', avatar: 'https://i.pravatar.cc/150?img=62' },
        content: {
          en: 'The gym and swimming pool are going to be amazing for local athletes. Excellent facilities!',
          dv: 'ޖިމް އަދި ސްވިމިންގ ޕޫލް ތިކުދަ ކުޅުންތެރިންނަށް ވަރަށް މުހިއްމު ވެގެންދާނެ. ފުރިހަމަ އިންތިޒާމްތައް!'
        },
        timestamp: new Date('2024-01-13T18:20:00'),
      },
      {
        id: 'c4-5',
        articleId: '4',
        author: { name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=27' },
        content: {
          en: 'I registered for the computer literacy class already! So excited about these opportunities.',
          dv: 'އަހަރެން ކޮމްޕިއުޓަރ ލިޓަރަސީ ކްލާހަށް ރަޖިސްޓަރީ ކޮށްފިން! މި ފުރުސަތުތައް ލިބުމަކީ ވަރަށް އުފާވެރި ކަމެއް.'
        },
        timestamp: new Date('2024-01-13T19:10:00'),
      },
    ],
  },
  {
    id: '5',
    slug: 'startup-raises-million-funding',
    title: {
      en: 'Local Startup Raises $10 Million in Series A Funding',
      dv: 'ތިކުދަ ސްޓާރޓަޕ $10 މިލިޔަން ސިރިޒ އެ ފަન්ޑިং ހޯދި'
    },
    subtitle: {
      en: 'AI-powered platform attracts major investors',
      dv: 'އް ތި ނިވާ ސިސްޓަމް ބޮޑާ ބަދާ ދި'
    },
    summary: {
      en: 'TechStartup Inc., a local artificial intelligence company, has successfully raised $10 million in Series A funding to expand its operations.',
      dv: 'ޓެކްސްޓާރޓަޕ އިނކ.، ތިކުދަ ކৃތްރިމް ވިކަސް ކަމ، $10 މިލިޔަން ސިރިޒ އެ ފަन්ޑިং ހޯދި ވިޔަފާރި ވިސްތަރު ކުރުމަށް.',
    },
    body: {
      en: `<p>TechStartup Inc., a promising local AI company, announced today it has secured $10 million in Series A funding led by prominent venture capital firms. The company plans to use the investment to expand its team and accelerate product development.</p>

<p>Founded just two years ago, TechStartup has developed an AI-powered platform that helps businesses automate customer service operations. The platform has already been adopted by over 200 companies.</p>

<p>CEO David Park expressed excitement about the funding round. "This investment validates our vision and will help us scale our technology to serve more businesses globally."</p>

<p>The company plans to hire 50 new employees over the next year, primarily in engineering and sales roles.</p>`,
      dv: `<p>ޓެކްސްޓާރޓަޕ އިނކ.، ވަަދާވި ތިކުދަ ސް ކަމ، $10 މިލިޔަން ސިރިޒ އެ ފަન്ડިং ސިކުރާ ކަތިތަ ވަިނޔަށް ވަސް ފައި ކުރެވިގެ. ކަވާ ވިޔަފާރި ވިސްތަރު އަިދ ޕްރޮޑަކްޓް ވިކަસް ވިޔަފާރި ކުރުމަށް ވަިނޔަތަ ހުރި.</p>

<p>ތިނިވިަ އަހަރަށް ސްޓާރޓަޕ އް ތި ނިވާ ސިސްޓަމް ވިކަސް ކާވާ ކަވާ ކަސްޓަމަރ ސަރވިސް އޮޕާރޭސަނ ވިސްތަރު ކުރިއަށް. ސިސްޓަމް ވާނީ 200 ކާވާ ހޯދި ކަވާ.</p>

<p>ސީއޮއް ޑެވިޑް ޕާކް ފަന්ޑިং ރާউンޑް އޭއަށް ވަސް ވިދާޅުވިދާނެ. "މި ވިޔަފާރި އަުގަނޑުމެް ވިސްނާ ނ އްވާ އަިދ ވަ ގްލޯބަލް ވިޔަފާރި ކަވާ ސަރވިސް ކުރުމަށް ވަ."</p>

<p>ކަވާ އަވަނަ އަހަރުގެ ތެރޭގައި 50 ނވަ ކަވާ އަިދ އިނޖިނިއަރިިނ އަިދ ސޭލް ވަިސވި.</p>`,
    },
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200',
    category: categories[2], // Business
    author: authors[4], // Robert Taylor,
    publishedAt: new Date('2024-01-13T11:00:00'),
    tags: [
      { en: 'startup', dv: 'ސްޓާރޓަޕ' },
      { en: 'funding', dv: 'ފަގްޑިިނ' },
      { en: 'AI', dv: 'ސް' },
      { en: 'technology', dv: 'ޓެކްނޮލޮޖީ' },
    ],
    relatedArticles: ['3'],
    reactions: {
      like: 318,
      love: 145,
      haha: 4,
      wow: 289,
      sad: 1,
      angry: 0,
    },
    comments: [
      {
        id: 'c5-1',
        articleId: '5',
        author: { name: 'David Park', avatar: 'https://i.pravatar.cc/150?img=14' },
        content: {
          en: 'Congratulations to the TechStartup team! This is a huge milestone for local AI companies.',
          dv: 'ޓެކްސްޓާރޓަޕް ޓީމަށް މަރުހަބާ! މިއީ ތިކުދަ އެއައި ކުންފުނިތަކަށް ބޮޑު ކުރިއެރުމެއް.'
        },
        timestamp: new Date('2024-01-13T12:00:00'),
      },
      {
        id: 'c5-2',
        articleId: '5',
        author: { name: 'Sophia Lee', avatar: 'https://i.pravatar.cc/150?img=44' },
        content: {
          en: 'AI automation is the future. Excited to see local companies leading the charge!',
          dv: 'އެއައި އޮޓޮމޭޝަނަކީ މުސްތަގްބަލު. ތިކުދަ ކުންފުނިތައް މި ދާނީ ކުރިއަށް ފެނުން ވަރަށް އުފާވެރި!'
        },
        timestamp: new Date('2024-01-13T13:30:00'),
      },
    ],
  },
  {
    id: '6',
    slug: 'education-reform-proposal-unveiled',
    title: {
      en: 'Education Minister Unveils Comprehensive Reform Proposal',
      dv: 'ޝިކުވާތީ މިނިސްޓަރ ފުރިހަމަ ބަދަލުވާ އަިސސްތިހާގަ ވިސް ކޮށްފި'
    },
    subtitle: {
      en: 'New initiative focuses on STEM education and teacher training',
      dv: 'ނވަ ކަމ ސްޓެމ ޝިކުވާ އަིދ ޝިކުވޭ އިސްތިދާ ވާތިފާ.'
    },
    summary: {
      en: 'The Ministry of Education has announced a wide-ranging reform package aimed at modernizing the education system and improving student outcomes.',
      dv: 'ޝިކުވާތީ ވަގުތުވެ ފުރިހަމަ ބަދަލުވާ ސްކިމް ވިސް ކޮށްފި ޝިކުވާ ސިސްޓަމް އަިދ ސްޓޫޑަન્ট ނަތީޖާ އްފަނާ.',
    },
    body: {
      en: `<p>Education Minister Dr. Fatima Hassan today unveiled an ambitious education reform proposal that aims to transform the country's school system over the next five years.</p>

<p>The reform package includes significant investments in STEM education, teacher professional development, and upgrading school infrastructure. The plan allocates $500 million in new funding.</p>

<p>"Our goal is to prepare students for the jobs of tomorrow," Dr. Hassan explained at the press conference. "This means not only teaching fundamental skills but also fostering critical thinking, creativity, and digital literacy."</p>

<p>The proposal has received broad support from educators and parent groups, though some have called for even more ambitious measures.</p>`,
      dv: `<p>ޝިކުވާތީ މިނިސްޓަރ ޑޮކްޓާ ފާތިމާ ހަސަން ޝިކުވާ ބަދަލުވާ ސްކިމް ވިސް ކޮށްފި ގަވާއިދުވެ ކަވާ ސިސްޓަމް އަވަނަ ފަސް އަހަރުގެ ތެރޭގައި ބަދަލުވަނިވި.</p>

<p>ބަދަލުވާ ސްކިމް ސްޓެމ ޝިކުވާ، ޝިކުވޭ ވަިސވި އަިދ ކަވާ އިnْޚްޖާޙާ އްފަނި. ސްކިމް $500 މިލިޔަން ނވަ ފަރާވި ބަޖެޓް އިސްތިމާލުކޮށްފި.</p>

<p>"އަޅުގަނޑުކގެ އަިސސް ސްޓޫޑަنާ އަވަނަ ވަސް ތޯ އيسతಿދާ،" ޑޮކްޓާ ހަސަން பிເス ކޮnფेRESNސްގައި ވިސް ކޮށްފި. "މި ސッچेکോ ސிတូмെ. ޖޮမަތި ސ्कيলام ވިސްދިނުމުގެ އަنોވަިވ ސވާܠ ವಿಚಾರணை، ްcrೃ่يೋತিತต، އަिდ ڈिજيٹալ साکਸरता ވިکませ."</p>

<p>ސްކިމް ޝިކުވޭ އަிދ މަތި ގްރޫޕްތިbilda ސަپޯޓް ކޮށްފި، ވެތި ަুوп ވަरుگɔنambitionس ސိкිме ަ ވިވަnguiទั.</p>`,
    },
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
    category: categories[0], // Politics
    author: authors[0], // Sarah Johnson,
    publishedAt: new Date('2024-01-12T13:45:00'),
    tags: [
      { en: 'education', dv: 'ޝިކުވާ' },
      { en: 'policy', dv: 'ސިޔާސަތް' },
      { en: 'reform', dv: 'ބަދަލުވާ' },
    ],
    relatedArticles: ['1'],
    reactions: {
      like: 394,
      love: 267,
      haha: 6,
      wow: 178,
      sad: 4,
      angry: 3,
    },
    comments: [
      {
        id: 'c6-1',
        articleId: '6',
        author: { name: 'Teacher Susan', avatar: 'https://i.pravatar.cc/150?img=29' },
        content: {
          en: 'As an educator, I\'m thrilled about the focus on teacher professional development. This is long overdue!',
          dv: 'ޓީޗަރެއްގެ ހައިސިއްޔަތުން ޓީޗަރުންގެ ތަރައްގީއަށް ސަމާލުކަން ދިނުމަކީ ވަރަށް އުފާވެރި ކަމެއް! މި ކަންވީ ވަރަށް ގިނަ ދުވަސް ފަހުން!'
        },
        timestamp: new Date('2024-01-12T14:30:00'),
      },
      {
        id: 'c6-2',
        articleId: '6',
        author: { name: 'Parent Mike', avatar: 'https://i.pravatar.cc/150?img=52' },
        content: {
          en: 'STEM education is critical. Glad to see this getting the attention it deserves.',
          dv: 'ސްޓެމް ތަޢުލީމަކީ ވަރަށް މުހިއްމު ކަމެއް. މިކަމަށް ސަމާލުކަން ދޭތާ ފެނުމަކީ އުފާވެރި ކަމެއް.'
        },
        timestamp: new Date('2024-01-12T15:45:00'),
      },
      {
        id: 'c6-3',
        articleId: '6',
        author: { name: 'Hassan Ahmed', avatar: 'https://i.pravatar.cc/150?img=70' },
        content: {
          en: '$500 million is a significant investment. Hope it\'s allocated efficiently and transparently.',
          dv: '$500 މިލިޔަން އަކީ ވަރަށް ބޮޑު އިންވެސްޓްމަންޓެއް. ނަހަމަ މެނުވީ މި ފައިސާ ހަމަ އަދުލުވެރިކަމާއެކީ ބެހެން ޖެހޭ.'
        },
        timestamp: new Date('2024-01-12T17:00:00'),
      },
    ],
  },
  {
    id: '7',
    slug: 'olympic-hopeful-breaks-national-record',
    title: {
      en: 'Olympic Hopeful Breaks National Swimming Record',
      dv: 'ހިނދުހަގވަާ ނިވާ ވިޔަތި ގަވާއިދި ވާވަގި ރިކޯރްޑް ފާޅުކުރި'
    },
    subtitle: {
      en: 'Young athlete sets new benchmark in 200m freestyle',
      dv: 'ދިރިވަސް ކޮޅި 200 މިޓަރ ފްރީސްޓައިލްގައި ނވަ ރިކޯރްޑް ސ�ފްކުރި'
    },
    summary: {
      en: 'Eighteen-year-old swimming sensation Maya Ibrahim shattered the national record in the 200m freestyle at yesterday\'s championship meet.',
      dv: '18 އަހަރުގެ ވަނިވިަ މާިާ އިބްރާހިމް ކާރަސްވަާ ވާވަގި އަުވިޔާތަ 200 މިޓަރ ފްރީސްޓައިލްގައި ރިކޯރްޑް ކަނދި ބާޝްކުރި.',
    },
    body: {
      en: `<p>In a stunning display of athletic prowess, 18-year-old swimmer Maya Ibrahim broke the long-standing national record in the 200m freestyle event at the National Swimming Championships.</p>

<p>Ibrahim completed the distance in 1:54.23, shaving nearly a full second off the previous record that had stood for eight years. The performance has Olympic scouts taking notice.</p>

<p>"I've been working toward this moment my entire life," Ibrahim said after the race. "But this is just the beginning. My goal is to represent our country at the Olympics."</p>

<p>Her coach, veteran swimmer Ali Hassan, believes she has what it takes to compete at the highest level. "Maya has the talent, discipline, and mental toughness to excel on the world stage."</p>`,
      dv: `<p>ވަރުގަދަ ވިޔަތި ކުޅުވެރިކަމެއްގާ 18 އަހަރުގެ ވަނިވިަ މާިާ އިބްރާހިމް ގަވާއިދި ވާވަގި އވަރި ރިކޯރްޑް 200 މިޓަރ ފްރީސްޓައިލްގައި ކަނދި ބާޅްކުރި.</p>

<p>އިބްރާހިމް 1:54.23 ވަގިތުގެ ތެރޭގައި މާލަނިވި، ވިސްވި އަތް އަހަރުވެ ހިމަނަފައިވާ ރިކޯރްޑާ އަިއް ސިކުނިނ ވިސްވި. މި ކުޅުވެރިކަމ އޮލިმ្પിക ސްކାউޓަސް ނޯޓިސް ކޮށްފި.</p>

<p>"މީ މޯމެंन ގެ ށަނގަި ދިވެހި ވަރުވި ވެވި،" އިބްރާހިމް ކުޅުވެރިކަވުވާ ދުވަހުގެ ފުރަތަމަ ވިސް ކޮށްފި. "އެވެ އިއްވާ ވިސްވާ ފާސްވި. އަޅުގަނޑުގެ އަިސސް ގަވާއިދް އޅިވާ އޮލިمپიक ވަގިތުގައި ވިވާވި."</p>

<p>ނިވާ ވިޔަތި ކޮވިޔާ އަލީ ހަސަން އވާރި، އވާރި ވަރުވި ވަގިތުވެ ވިޔަތި ކުޅިވަރާ އޭ ކުޅިވަރިވި ވިސް ކޮށްފި. "މާިާގަ ވިވާ، އިނޫސްތް، އަތް ތައްޔަރީ ވެވީ ވާނާ ކުޅިވަރަށް."</p>`,
    },
    coverImage: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1200',
    category: categories[1], // Sports
    author: authors[1], // Ahmed Rahman,
    publishedAt: new Date('2024-01-12T18:20:00'),
    tags: [
      { en: 'swimming', dv: 'ވާވަގި' },
      { en: 'olympics', dv: 'އޮލિم್पிက' },
      { en: 'records', dv: 'ރިކޯރްޑް' },
    ],
    relatedArticles: ['2'],
    reactions: {
      like: 521,
      love: 387,
      haha: 4,
      wow: 445,
      sad: 0,
      angry: 0,
    },
    comments: [
      {
        id: 'c7-1',
        articleId: '7',
        author: { name: 'Coach Ali', avatar: 'https://i.pravatar.cc/150?img=11' },
        content: {
          en: 'Maya is an incredible talent! Her dedication and hard work are paying off. Olympic gold is within reach!',
          dv: 'މާޔާ އަކީ ވަރަށް ހުނަރުވެރި ކުޅުންތެރިއެއް! އޭނާގެ ބުރަ މަސައްކަތް ފައިދާހުރި ވަމުން ދަނީ. އޮލިމްޕިކް ރަން މެޑަލް ހޯދަން ވަރަށް ގާތެވެ!'
        },
        timestamp: new Date('2024-01-12T19:00:00'),
      },
      {
        id: 'c7-2',
        articleId: '7',
        author: { name: 'Sports Fan Tony', avatar: 'https://i.pravatar.cc/150?img=63' },
        content: {
          en: 'Breaking a record that stood for 8 years! This is phenomenal! Go Maya!',
          dv: '8 އަހަރު ވެފައިވާ ރެކޯޑެއް ކަނޑާލުން! މިއީ ވަރަށް ފެންނާނެ ކަމެއް! މާޔާއަށް މަރުޙަބާ!'
        },
        timestamp: new Date('2024-01-12T19:45:00'),
      },
      {
        id: 'c7-3',
        articleId: '7',
        author: { name: 'Proud Parent', avatar: 'https://i.pravatar.cc/150?img=36' },
        content: {
          en: 'This is so inspiring for young athletes everywhere. Maya is a true role model!',
          dv: 'މިއީ ހުރިހާ ތަނެއްގައި ތިބި ޒުވާން ކުޅުންތެރިންނަށް ވަރަށް ހިތްވަރު ލިބޭނެ ކަމެއް. މާޔާ އަކީ ހަގީގީ ރޯލް މޮޑެލެއް!'
        },
        timestamp: new Date('2024-01-12T20:30:00'),
      },
    ],
  },
  {
    id: '8',
    slug: 'local-artists-showcase-exhibition',
    title: {
      en: 'Local Artists Showcase Work in Downtown Exhibition',
      dv: 'ތިކުދަ އާރިސްޓްި ވިޔަފާރި ސިނިމާ ވަނަ ނިވާ ސިވިވި'
    },
    subtitle: {
      en: 'Month-long exhibition features 30 emerging artists',
      dv: 'މަހުވެ ދިއްސާ ސިވިވި 30 ދިރިވަސް އާރިސްޓް ވިވާވި'
    },
    summary: {
      en: 'The Downtown Arts Gallery is hosting a major exhibition featuring works from 30 talented local artists across various mediums.',
      dv: 'ވިޔަފާރި ސިނިމާ އާރްޓް ގެލެރި 30 ވަރުވި ތިކުދަ އާރިސްޓް ވަނަ ވިވާ ބޮޑު ސިވިވި ވިޚާ ކުރަނީ.',
    },
    body: {
      en: `<p>The Downtown Arts Gallery opened its doors this week to a spectacular exhibition showcasing the work of 30 local emerging artists. The exhibition, titled "Voices of Our Community," runs through the end of the month.</p>

<p>The diverse collection includes paintings, sculptures, photographs, and mixed media pieces that reflect the rich cultural heritage and contemporary experiences of local residents.</p>

<p>Gallery curator Amina Rashid explained the exhibition's significance. "This exhibition celebrates the incredible talent in our community and provides a platform for artists who might not otherwise have this opportunity."</p>

<p>The gallery is offering free admission throughout the exhibition period, with special artist talks scheduled every weekend.</p>`,
      dv: `<p>ވިޔަފާރި ސިނިމާ އާރްޓް ގެލެރި މި ހަފުތާވެ 30 ތިކުދަ ދިރިވަސް އާރިސްޓް ވަނަ އާ ވިވާ ވަރަށް ކުޅި ސިވިވި ކޮށްފި. މި ސިވިވި ބަޔާ "އަޅުގަނޑު ކުވެރިކަމާ ވާމެ" ކަމަށް ދެއްވި، މި މަހުގެ ސިނި ސަ ވަޅާއެވެ.</p>

<p>ވަރަށް ތިކުދަ ގަވާ ވިވާ ވާ ންތަ ސިތާ، ވަކޑި ވާ ކަނޑި، ފޮޓޯ، އަިދ ވަރާ ންތަ ވިވާ ސްޕިއާވިތިވި ތިކުދަ ރަސްވާ ގަވާ ރިވެރި ވިވާވިވެވެ.</p>

<p>ގެލެރި ކިއިރޭޓަރ އަމާନާ ރަޝީދް ސިވިވި ކުވަވި ވިސް ކޮށްފި. "މި ސިވިވި އަޅުގަނޑު ކުވެރިކަމާ ވާ ވަރުވި އާރިސްޓް ވެިވާވެސް އަި އިވާ އަި ވިވާ ސިވިވި ކުވެރިކަމެއް ދިނެވި."</p>

<p>ގެލެރި ސިވިވި ސަ ބޭވަ ދިއްސާ ވެ ވާ ވަނަވާފި، އާއި ވިކަސް އާރިސްޓް ވިސް އަިވ ހަފުތަ ނިވާ ތާ ސަ ވަނަވާފި.</p>`,
    },
    coverImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200',
    category: categories[3], // Local
    author: authors[3], // Jennifer Williams,
    publishedAt: new Date('2024-01-11T10:00:00'),
    tags: [
      { en: 'arts', dv: 'އާރްޓް' },
      { en: 'culture', dv: 'ކޮލްޗަރ' },
      { en: 'exhibition', dv: 'ސިވިވި' },
    ],
    relatedArticles: ['4'],
    reactions: {
      like: 356,
      love: 289,
      haha: 2,
      wow: 201,
      sad: 0,
      angry: 0,
    },
    comments: [
      {
        id: 'c8-1',
        articleId: '8',
        author: { name: 'Art Lover Jane', avatar: 'https://i.pravatar.cc/150?img=23' },
        content: {
          en: 'Visited the exhibition yesterday - absolutely stunning work by our local artists! Highly recommend!',
          dv: 'އިއްޔެ މި ސިވިވި ބައްލަވައިގަތިން - ތިކުދަ އާޓިސްޓުންގެ ވަރަށް ފުރިހަމަ މަސައްކަތް! ހުރިހާ ބައެއްވެސް ބަލާލަން ޖެހޭ!'
        },
        timestamp: new Date('2024-01-11T11:30:00'),
      },
      {
        id: 'c8-2',
        articleId: '8',
        author: { name: 'Curator Amina', avatar: 'https://i.pravatar.cc/150?img=45' },
        content: {
          en: 'So proud to showcase these talented emerging artists. Don\'t miss the artist talks this weekend!',
          dv: 'މި ހުނަރުވެރި އާޓިސްޓުން ދައްކުވައިދެވުނީމަ ވަރަށް ފަޚުރުވެރިވޭ. މި ހަފްތާގެ ކުރީއަށް އާޓިސްޓް ވާހަކަތައް ގެއްލުވައިނުލައްވާ!'
        },
        timestamp: new Date('2024-01-11T14:00:00'),
      },
      {
        id: 'c8-3',
        articleId: '8',
        author: { name: 'Student Artist', avatar: 'https://i.pravatar.cc/150?img=60' },
        content: {
          en: 'As an aspiring artist, this exhibition is so inspiring! Thank you for supporting local talent.',
          dv: 'އާޓިސްޓަކަށް ވާން އުންމީދުކުރާ މީހެއްގެ ގޮތުން މި ސިވިވި ވަރަށް ހިތްވަރު ލިބޭ! ތިކުދަ ހުނަރުވެރިންނަށް ސަޕޯޓްކުރައްވާތީ ޝުކުރިއްޔާ.'
        },
        timestamp: new Date('2024-01-11T16:45:00'),
      },
      {
        id: 'c8-4',
        articleId: '8',
        author: { name: 'Community Member', avatar: 'https://i.pravatar.cc/150?img=48' },
        content: {
          en: 'Free admission is great! Planning to take my family this weekend. Love supporting local arts.',
          dv: 'ހިލޭ އެޑްމިޝަން ވަރަށް ރަނގަޅު! މި ހަފްތާގެ ކުރީއަށް އާއިލާ ގެންދަން ޕްލޭން ކުރަމުން. ތިކުދަ އާޓް ސަޕޯޓްކުރުން ވަރަށް ރަގަނޅު!'
        },
        timestamp: new Date('2024-01-11T18:20:00'),
      },
    ],
  },
];

// Helper function to get article by slug
export const getArticleBySlug = (slug: string): Article | undefined => {
  return mockArticles.find((article) => article.slug === slug);
};

// Helper function to get articles by category
export const getArticlesByCategory = (categorySlug: string): Article[] => {
  return mockArticles.filter((article) => article.category.slug === categorySlug);
};

// Helper function to get featured articles
export const getFeaturedArticles = (): Article[] => {
  return mockArticles.filter((article) => article.featured);
};

// Helper function to get related articles
export const getRelatedArticles = (articleId: string): Article[] => {
  const article = mockArticles.find((a) => a.id === articleId);
  if (!article || !article.relatedArticles) return [];

  return mockArticles.filter((a) => article.relatedArticles?.includes(a.id));
};
