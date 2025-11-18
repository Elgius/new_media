'use client';

import Image from 'next/image';
import { Article } from '@/lib/types';
import { useUIStore } from '@/lib/stores/uiStore';
import { CategoryBadge } from '@/components/news/CategoryBadge';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ArticlePreviewProps {
  article: Partial<Article>;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  const language = useUIStore((state) => state.language);

  if (!article.title?.en && !article.title?.dv) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/30">
        <p className="text-muted-foreground">Start typing to see preview...</p>
      </div>
    );
  }

  const title = article.title?.[language.code] || article.title?.en || article.title?.dv || '';
  const subtitle = article.subtitle?.[language.code] || '';
  const summary = article.summary?.[language.code] || '';
  const body = article.body?.[language.code] || '';
  const author = article.author?.[language.code] || '';

  return (
    <div className="space-y-6">
      <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
        Preview ({language.code === 'en' ? 'English' : 'Dhivehi'})
      </div>

      <article className="space-y-6">
        {/* Category & Meta */}
        {article.category && (
          <div className="flex items-center gap-3 text-sm">
            <CategoryBadge category={article.category} />
            {author && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{author}</span>
              </>
            )}
            {article.publishedAt && (
              <>
                <span className="text-muted-foreground">•</span>
                <time className="text-muted-foreground">
                  {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
                </time>
              </>
            )}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{title || 'Untitled Article'}</h1>

        {/* Subtitle */}
        {subtitle && <h2 className="text-xl text-muted-foreground">{subtitle}</h2>}

        {/* Cover Image */}
        {article.coverImage && (
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={article.coverImage}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Summary */}
        {summary && (
          <p className="text-lg font-medium text-muted-foreground border-l-4 border-primary pl-4">
            {summary}
          </p>
        )}

        {/* Video */}
        {article.hasVideo && article.videoUrl && (
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <iframe
              src={article.videoUrl}
              className="w-full h-full"
              allowFullScreen
              title="Article video"
            />
          </div>
        )}

        {/* Body */}
        {body && (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-6 border-t">
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag[language.code] || tag.en || tag.dv}
              </Badge>
            ))}
          </div>
        )}

        {/* Status Badge */}
        {article.status && (
          <div className="pt-4">
            <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
              {article.status === 'published' ? 'Published' : 'Draft'}
            </Badge>
          </div>
        )}
      </article>
    </div>
  );
}
