'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useArticleStore } from '@/lib/stores/articleStore';
import { formatDistanceToNow } from 'date-fns';

export function Sidebar() {
  const { articles } = useArticleStore();

  // Get the 5 most recent articles as "trending"
  const trendingArticles = articles
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, 5);

  return (
    <aside className="space-y-6">
      {/* Trending Stories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingArticles.map((article, index) => (
              <div key={article.id} className="group">
                <Link href={`/article/${article.slug}`}>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 text-2xl font-bold text-primary/20 group-hover:text-primary transition-colors">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </Link>
                {index < trendingArticles.length - 1 && (
                  <div className="mt-4 border-b" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ad Slot Placeholder */}
      <Card className="bg-muted/50">
        <CardContent className="p-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Advertisement</p>
            <p className="text-xs text-muted-foreground mt-1">300 x 250</p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
