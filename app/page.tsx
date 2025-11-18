'use client';

import { HeroCard } from '@/components/news/HeroCard';
import { ArticleGrid } from '@/components/news/ArticleGrid';
import { ArticleRow } from '@/components/news/ArticleRow';
import { AdSlot } from '@/components/ads/AdSlot';
import { useArticleStore } from '@/lib/stores/articleStore';

export default function Home() {
  const { articles, getFeaturedArticles } = useArticleStore();

  // Get featured articles for the hero section
  const featuredArticles = getFeaturedArticles();
  const heroArticle = featuredArticles[0];
  const secondaryFeatures = featuredArticles.slice(1, 4);

  // Get remaining articles for the news stream
  const newsStreamArticles = articles
    .filter((article) => !article.featured)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Top Ad Banner */}
        <AdSlot slot={{ size: 'banner' }} className="mb-8" />

        {/* Hero Section */}
        {heroArticle && (
          <section className="mb-8">
            <HeroCard article={heroArticle} />
          </section>
        )}

        {/* Secondary Features Grid */}
        {secondaryFeatures.length > 0 && (
          <section className="mb-12">
            <ArticleGrid articles={secondaryFeatures} columns={3} />
          </section>
        )}

        {/* Main Content Grid: News Stream + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Stream */}
          <div className="lg:col-span-2">
            <div className="mb-4 pb-3 border-b-2 border-primary">
              <h2 className="text-2xl font-bold text-foreground">Latest News</h2>
            </div>

            <div className="space-y-0">
              {newsStreamArticles.map((article) => (
                <ArticleRow key={article.id} article={article} />
              ))}
            </div>

            {newsStreamArticles.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                No more articles to display.
              </p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Trending Section - handled by Sidebar component */}
            <div className="sticky top-24">
              <div className="space-y-6">
                {/* Trending Placeholder */}
                <div className="border rounded-lg p-6 bg-card">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-bold">Trending Now</h3>
                  </div>
                  <div className="space-y-4">
                    {articles.slice(0, 5).map((article, index) => (
                      <div key={article.id} className="flex gap-3 group">
                        <div className="text-2xl font-bold text-primary/20 group-hover:text-primary transition-colors">
                          {index + 1}
                        </div>
                        <div>
                          <a
                            href={`/article/${article.slug}`}
                            className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                          >
                            {article.title}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ad Rectangle */}
                <AdSlot slot={{ size: 'rectangle' }} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
