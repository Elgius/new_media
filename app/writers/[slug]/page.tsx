'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Twitter, Linkedin, Facebook, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArticleRow } from '@/components/news/ArticleRow';
import { getAuthorBySlug, mockArticles } from '@/lib/mockData';
import { useUIStore } from '@/lib/stores/uiStore';

interface WriterPageProps {
  params: Promise<{ slug: string }>;
}

export default function WriterPage({ params }: WriterPageProps) {
  const { slug } = use(params);
  const author = getAuthorBySlug(slug);
  const language = useUIStore((state) => state.language);

  // Return 404 if author doesn't exist or is deleted
  if (!author || author.isDeleted) {
    notFound();
  }

  // Get all articles by this author
  const authorArticles = mockArticles.filter(
    (article) => article.author.id === author.id
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Author Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Author Photo */}
            <div className="relative w-48 h-48 flex-shrink-0 rounded-full overflow-hidden">
              <Image
                src={author.photo}
                alt={author.name[language.code]}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Author Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">
                {author.name[language.code]}
              </h1>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {author.bio[language.code]}
              </p>

              {/* Social Links */}
              {author.socialLinks && (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    {language.code === 'en' ? 'Connect:' : 'ގުޅުއްވާ:'}
                  </span>
                  {author.socialLinks.twitter && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      asChild
                    >
                      <a
                        href={author.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {author.socialLinks.linkedin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      asChild
                    >
                      <a
                        href={author.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {author.socialLinks.facebook && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      asChild
                    >
                      <a
                        href={author.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {author.socialLinks.email && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      asChild
                    >
                      <a
                        href={`mailto:${author.socialLinks.email}`}
                        aria-label="Email"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Articles by Author */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            {language.code === 'en' ? 'Articles' : 'ލިޔުންތައް'}{' '}
            <span className="text-primary">
              ({authorArticles.length})
            </span>
          </h2>

          {authorArticles.length > 0 ? (
            <div className="space-y-4">
              {authorArticles.map((article) => (
                <ArticleRow key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                {language.code === 'en'
                  ? 'No articles found from this author.'
                  : 'މި ލިޔުންތެރިޔާގެ ލިޔުންތައް ނެތް.'}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
