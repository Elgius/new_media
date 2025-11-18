'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Article } from '@/lib/types';
import { CategoryBadge } from './CategoryBadge';
import { Video } from 'lucide-react';
import { useUIStore } from '@/lib/stores/uiStore';

interface FeatureCardProps {
  article: Article;
}

export function FeatureCard({ article }: FeatureCardProps) {
  const language = useUIStore((state) => state.language);
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/article/${article.slug}`}>
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title[language.code]}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.hasVideo && (
            <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded flex items-center gap-1 text-xs">
              <Video className="h-3 w-3" />
              <span>Video</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <CategoryBadge category={article.category} />
          </div>
          <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title[language.code]}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {article.summary[language.code]}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatDistanceToNow(article.publishedAt, { addSuffix: true })}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
