/**
 * Mock data for the News Website
 * This provides sample articles and categories for development
 */

import { Article, Category } from './types';

// Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Politics',
    slug: 'politics',
    color: '#0F8A2F',
  },
  {
    id: '2',
    name: 'Sports',
    slug: 'sports',
    color: '#40B657',
  },
  {
    id: '3',
    name: 'Business',
    slug: 'business',
    color: '#1A5D2F',
  },
  {
    id: '4',
    name: 'Local',
    slug: 'local',
    color: '#2DA84A',
  },
];

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};

// Mock Articles
export const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'parliament-passes-historic-climate-bill',
    title: 'Parliament Passes Historic Climate Change Bill',
    subtitle: 'New legislation sets ambitious targets for carbon neutrality by 2040',
    summary:
      'In a landmark decision, Parliament has unanimously approved comprehensive climate legislation that establishes binding targets for reducing greenhouse gas emissions.',
    body: `<p>In a historic vote today, Parliament has passed sweeping climate change legislation that sets the country on a path to carbon neutrality by 2040. The bill, which received support from all major parties, represents one of the most ambitious climate commitments in the region.</p>

<p>The legislation includes provisions for transitioning to renewable energy sources, investing in green infrastructure, and implementing carbon pricing mechanisms. Environmental groups have praised the move as a crucial step in addressing the climate crisis.</p>

<p>"This is a defining moment for our nation," said Prime Minister during the announcement. "We are taking decisive action to protect our environment for future generations."</p>

<p>The bill also allocates substantial funding for climate adaptation measures and support for communities affected by the transition to a green economy.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200',
    category: categories[0], // Politics
    author: 'Sarah Johnson',
    publishedAt: new Date('2024-01-15T10:30:00'),
    featured: true,
    tags: ['climate', 'legislation', 'environment'],
    relatedArticles: ['2', '4'],
  },
  {
    id: '2',
    slug: 'national-team-advances-championship',
    title: 'National Team Advances to Championship Finals',
    subtitle: 'Thrilling victory secures spot in regional tournament',
    summary:
      'The national football team delivered a stunning performance last night, securing their place in the championship finals with a 3-1 victory.',
    body: `<p>In an electrifying match that kept fans on the edge of their seats, the national football team has secured their spot in the championship finals with a decisive 3-1 victory over their regional rivals.</p>

<p>Star striker Ahmed Mohamed scored two crucial goals, while midfielder Hassan Ali added another spectacular strike in the second half. The victory marks the team's best performance in five years.</p>

<p>Coach Ibrahim praised his team's dedication and teamwork. "The players showed incredible determination tonight. This victory is for all our supporters who have stood by us."</p>

<p>The championship final is scheduled for next month, and tickets are expected to sell out within hours of going on sale.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200',
    category: categories[1], // Sports
    author: 'Ahmed Rahman',
    publishedAt: new Date('2024-01-14T20:15:00'),
    featured: true,
    tags: ['football', 'sports', 'championship'],
    relatedArticles: ['7'],
  },
  {
    id: '3',
    slug: 'tech-sector-shows-strong-growth',
    title: 'Technology Sector Shows Strong Growth This Quarter',
    subtitle: 'Local tech companies report record revenues',
    summary:
      'The technology sector has demonstrated remarkable resilience and growth, with multiple companies reporting record-breaking quarterly results.',
    body: `<p>The local technology sector is experiencing unprecedented growth, with several major companies reporting their best quarterly results in company history. Industry analysts attribute this surge to increased digital adoption and innovation.</p>

<p>Leading software company TechCorp announced a 45% increase in revenue compared to the same period last year, while startup accelerators report a significant uptick in new ventures.</p>

<p>"We're seeing a perfect storm of favorable conditions," explains economic analyst Maria Stevens. "Investment in digital infrastructure, a skilled workforce, and supportive government policies are all contributing to this boom."</p>

<p>The sector now employs over 15,000 people and contributes significantly to the national economy.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
    category: categories[2], // Business
    author: 'Michael Chen',
    publishedAt: new Date('2024-01-14T09:00:00'),
    featured: true,
    tags: ['technology', 'business', 'economy'],
    relatedArticles: ['5'],
  },
  {
    id: '4',
    slug: 'new-community-center-opens',
    title: 'New Community Center Opens in Capital City',
    subtitle: 'State-of-the-art facility to serve thousands of residents',
    summary:
      'A modern community center with sports facilities, library, and educational spaces has officially opened its doors to the public.',
    body: `<p>The new Capital Community Center opened its doors today, offering residents a wide range of facilities and programs designed to bring the community together.</p>

<p>The $12 million facility includes a full-size gymnasium, swimming pool, library, computer lab, and multipurpose rooms for classes and events. The center is expected to serve more than 5,000 residents weekly.</p>

<p>Mayor Lisa Anderson cut the ribbon at the opening ceremony, attended by hundreds of excited community members. "This center represents our commitment to creating spaces where our community can thrive," she said.</p>

<p>The facility will offer free programs for children and seniors, including sports clinics, computer literacy classes, and art workshops.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    category: categories[3], // Local
    author: 'Jennifer Williams',
    publishedAt: new Date('2024-01-13T14:30:00'),
    tags: ['community', 'infrastructure', 'local news'],
    relatedArticles: ['8'],
  },
  {
    id: '5',
    slug: 'startup-raises-million-funding',
    title: 'Local Startup Raises $10 Million in Series A Funding',
    subtitle: 'AI-powered platform attracts major investors',
    summary:
      'TechStartup Inc., a local artificial intelligence company, has successfully raised $10 million in Series A funding to expand its operations.',
    body: `<p>TechStartup Inc., a promising local AI company, announced today it has secured $10 million in Series A funding led by prominent venture capital firms. The company plans to use the investment to expand its team and accelerate product development.</p>

<p>Founded just two years ago, TechStartup has developed an AI-powered platform that helps businesses automate customer service operations. The platform has already been adopted by over 200 companies.</p>

<p>CEO David Park expressed excitement about the funding round. "This investment validates our vision and will help us scale our technology to serve more businesses globally."</p>

<p>The company plans to hire 50 new employees over the next year, primarily in engineering and sales roles.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200',
    category: categories[2], // Business
    author: 'Robert Taylor',
    publishedAt: new Date('2024-01-13T11:00:00'),
    tags: ['startup', 'funding', 'AI', 'technology'],
    relatedArticles: ['3'],
  },
  {
    id: '6',
    slug: 'education-reform-proposal-unveiled',
    title: 'Education Minister Unveils Comprehensive Reform Proposal',
    subtitle: 'New initiative focuses on STEM education and teacher training',
    summary:
      'The Ministry of Education has announced a wide-ranging reform package aimed at modernizing the education system and improving student outcomes.',
    body: `<p>Education Minister Dr. Fatima Hassan today unveiled an ambitious education reform proposal that aims to transform the country's school system over the next five years.</p>

<p>The reform package includes significant investments in STEM education, teacher professional development, and upgrading school infrastructure. The plan allocates $500 million in new funding.</p>

<p>"Our goal is to prepare students for the jobs of tomorrow," Dr. Hassan explained at the press conference. "This means not only teaching fundamental skills but also fostering critical thinking, creativity, and digital literacy."</p>

<p>The proposal has received broad support from educators and parent groups, though some have called for even more ambitious measures.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
    category: categories[0], // Politics
    author: 'Sarah Johnson',
    publishedAt: new Date('2024-01-12T13:45:00'),
    tags: ['education', 'policy', 'reform'],
    relatedArticles: ['1'],
  },
  {
    id: '7',
    slug: 'olympic-hopeful-breaks-national-record',
    title: 'Olympic Hopeful Breaks National Swimming Record',
    subtitle: 'Young athlete sets new benchmark in 200m freestyle',
    summary:
      'Eighteen-year-old swimming sensation Maya Ibrahim shattered the national record in the 200m freestyle at yesterday\'s championship meet.',
    body: `<p>In a stunning display of athletic prowess, 18-year-old swimmer Maya Ibrahim broke the long-standing national record in the 200m freestyle event at the National Swimming Championships.</p>

<p>Ibrahim completed the distance in 1:54.23, shaving nearly a full second off the previous record that had stood for eight years. The performance has Olympic scouts taking notice.</p>

<p>"I've been working toward this moment my entire life," Ibrahim said after the race. "But this is just the beginning. My goal is to represent our country at the Olympics."</p>

<p>Her coach, veteran swimmer Ali Hassan, believes she has what it takes to compete at the highest level. "Maya has the talent, discipline, and mental toughness to excel on the world stage."</p>`,
    coverImage: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1200',
    category: categories[1], // Sports
    author: 'Ahmed Rahman',
    publishedAt: new Date('2024-01-12T18:20:00'),
    tags: ['swimming', 'olympics', 'records'],
    relatedArticles: ['2'],
  },
  {
    id: '8',
    slug: 'local-artists-showcase-exhibition',
    title: 'Local Artists Showcase Work in Downtown Exhibition',
    subtitle: 'Month-long exhibition features 30 emerging artists',
    summary:
      'The Downtown Arts Gallery is hosting a major exhibition featuring works from 30 talented local artists across various mediums.',
    body: `<p>The Downtown Arts Gallery opened its doors this week to a spectacular exhibition showcasing the work of 30 local emerging artists. The exhibition, titled "Voices of Our Community," runs through the end of the month.</p>

<p>The diverse collection includes paintings, sculptures, photographs, and mixed media pieces that reflect the rich cultural heritage and contemporary experiences of local residents.</p>

<p>Gallery curator Amina Rashid explained the exhibition's significance. "This exhibition celebrates the incredible talent in our community and provides a platform for artists who might not otherwise have this opportunity."</p>

<p>The gallery is offering free admission throughout the exhibition period, with special artist talks scheduled every weekend.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200',
    category: categories[3], // Local
    author: 'Jennifer Williams',
    publishedAt: new Date('2024-01-11T10:00:00'),
    tags: ['arts', 'culture', 'exhibition'],
    relatedArticles: ['4'],
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
