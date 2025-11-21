'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '@/lib/types';
import { CategoryBadge } from './CategoryBadge';
import { Video } from 'lucide-react';
import { useUIStore } from '@/lib/stores/uiStore';
import { removeTimeApproximations } from '@/lib/utils';
import { EngagementStats } from '@/components/engagement/EngagementStats';

interface HeroCardProps {
  article: Article;
}

export function HeroCard({ article }: HeroCardProps) {
  const language = useUIStore((state) => state.language);
  return (
    <div className="group block relative">
      <Link href={`/article/${article.slug}`} className="block">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={article.coverImage}
            alt={article.title[language.code]}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
          {article.hasVideo && (
            <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span className="text-sm font-medium">Video</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      </Link>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
        <div className="mb-3">
          <CategoryBadge category={article.category} />
        </div>
        <Link href={`/article/${article.slug}`} className="pointer-events-auto">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2 group-hover:text-secondary transition-colors">
            {article.title[language.code]}
          </h1>
        </Link>
        {article.subtitle && (
          <p className="text-lg text-gray-200 mb-2">{article.subtitle[language.code]}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-300 pointer-events-auto">
          <Link href={`/writers/${article.author.slug}`} className="hover:text-white transition-colors">
            {article.author.name[language.code]}
          </Link>
          <span>•</span>
          <span>{removeTimeApproximations(formatDistanceToNow(article.publishedAt, { addSuffix: true }))}</span>
        </div>
        <div className="mt-3 pointer-events-auto">
          <EngagementStats
            reactions={article.reactions}
            comments={article.comments}
            variant="compact"
            className="text-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
