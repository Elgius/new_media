import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '@/lib/types';
import { CategoryBadge } from './CategoryBadge';
import { Video } from 'lucide-react';

interface ArticleRowProps {
  article: Article;
}

export function ArticleRow({ article }: ArticleRowProps) {
  return (
    <div className="group border-b pb-4 mb-4 last:border-0">
      <Link href={`/article/${article.slug}`} className="flex gap-4">
        {/* Thumbnail */}
        <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden rounded">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.hasVideo && (
            <div className="absolute top-1 right-1 bg-black/80 text-white px-1.5 py-0.5 rounded flex items-center gap-0.5 text-xs">
              <Video className="h-3 w-3" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <CategoryBadge category={article.category} />
          </div>
          <h3 className="text-base font-bold leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {article.summary}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{article.author}</span>
            <span>•</span>
            <span>{formatDistanceToNow(article.publishedAt, { addSuffix: true })}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
