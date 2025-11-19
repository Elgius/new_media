'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CategoryBadge } from '@/components/news/CategoryBadge';
import { FeatureCard } from '@/components/news/FeatureCard';
import { AdSlot } from '@/components/ads/AdSlot';
import { getArticleBySlug, getRelatedArticles } from '@/lib/mockData';
import { useUIStore } from '@/lib/stores/uiStore';
import { getTranslation } from '@/lib/translations';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  const article = getArticleBySlug(slug);
  const language = useUIStore((state) => state.language);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.id);

  return (
    <div className="min-h-screen bg-background">
      <article className="container mx-auto px-4 py-8">
        {/* Article Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="mb-4">
            <CategoryBadge category={article.category} />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {article.title[language.code]}
          </h1>

          {article.subtitle && (
            <p className="text-xl text-muted-foreground mb-6">{article.subtitle[language.code]}</p>
          )}

          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b">
            <div className="flex items-center gap-4 text-sm">
              <span className="font-medium">
                {getTranslation('article.by', language)}{' '}
                <Link href={`/writers/${article.author.slug}`} className="hover:text-primary transition-colors">
                  {article.author.name[language.code]}
                </Link>
              </span>
              <span className="text-muted-foreground">•</span>
              <time className="text-muted-foreground">
                {format(article.publishedAt, 'MMMM dd, yyyy • HH:mm')}
              </time>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Share:</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Cover Image or Video */}
        <div className="max-w-5xl mx-auto mb-8">
          {article.hasVideo && article.videoUrl ? (
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src={article.videoUrl}
                className="w-full h-full"
                allowFullScreen
                title={article.title[language.code]}
              />
            </div>
          ) : (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={article.coverImage}
                alt={article.title[language.code]}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* Article Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Body */}
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: article.body[language.code] }}
            />

            {/* Inline Ad after content */}
            <AdSlot slot={{ size: 'inline' }} className="my-8" />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-8 pt-8 border-t">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                    >
                      #{tag[language.code]}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedArticles.map((related) => (
                    <FeatureCard key={related.id} article={related} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* More from Category */}
              <Card className="p-6">
                <h3 className="font-bold mb-4">
                  More in{' '}
                  <Link
                    href={`/category/${article.category.slug}`}
                    className="text-primary hover:underline"
                  >
                    {article.category.name[language.code]}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Explore more stories from this category
                </p>
              </Card>

              {/* Ad Rectangle */}
              <AdSlot slot={{ size: 'rectangle' }} />

              {/* Newsletter Signup (Placeholder) */}
              <Card className="p-6 bg-primary/5">
                <h3 className="font-bold mb-2">Stay Informed</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest news delivered to your inbox.
                </p>
                <Button className="w-full" disabled>
                  Subscribe (Coming Soon)
                </Button>
              </Card>
            </div>
          </aside>
        </div>

        {/* Bottom Ad Banner */}
        <div className="max-w-5xl mx-auto mt-12">
          <AdSlot slot={{ size: 'banner' }} />
        </div>
      </article>
    </div>
  );
}
