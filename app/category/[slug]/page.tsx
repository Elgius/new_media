'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { HeroCard } from '@/components/news/HeroCard';
import { ArticleGrid } from '@/components/news/ArticleGrid';
import { ArticleRow } from '@/components/news/ArticleRow';
import { AdSlot } from '@/components/ads/AdSlot';
import { useArticleStore } from '@/lib/stores/articleStore';
import { useUIStore } from '@/lib/stores/uiStore';
import { getCategoryBySlug } from '@/lib/mockData';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const { getArticlesByCategory } = useArticleStore();
  const language = useUIStore((state) => state.language);

  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryArticles = getArticlesByCategory(slug);

  if (categoryArticles.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div
              className="inline-block px-4 py-2 rounded-lg text-white text-2xl font-bold"
              style={{ backgroundColor: category.color }}
            >
              {category.name[language.code]}
            </div>
          </div>
          <p className="text-center text-muted-foreground py-12">
            No articles found in this category.
          </p>
        </div>
      </div>
    );
  }

  const featuredArticle = categoryArticles[0];
  const gridArticles = categoryArticles.slice(1, 4);
  const listArticles = categoryArticles.slice(4);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <div
            className="inline-block px-6 py-3 rounded-lg text-white text-3xl font-bold mb-4"
            style={{ backgroundColor: category.color }}
          >
            {category.name[language.code]}
          </div>
          <p className="text-muted-foreground">
            Latest news and updates in {category.name[language.code].toLowerCase()}
          </p>
        </div>

        {/* Top Ad Banner */}
        <AdSlot slot={{ size: 'banner' }} className="mb-8" />

        {/* Featured Article */}
        <section className="mb-8">
          <HeroCard article={featuredArticle} />
        </section>

        {/* Grid Articles */}
        {gridArticles.length > 0 && (
          <section className="mb-12">
            <ArticleGrid articles={gridArticles} columns={3} />
          </section>
        )}

        {/* Articles List + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles List */}
          <div className="lg:col-span-2">
            <div className="mb-4 pb-3 border-b-2 border-primary">
              <h2 className="text-2xl font-bold text-foreground">More in {category.name[language.code]}</h2>
            </div>

            {listArticles.length > 0 ? (
              <div className="space-y-0">
                {listArticles.map((article) => (
                  <ArticleRow key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-12">
                No more articles in this category.
              </p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-24">
              {/* Ad Rectangle */}
              <AdSlot slot={{ size: 'rectangle' }} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
