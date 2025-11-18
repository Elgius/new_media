import { Article } from '@/lib/types';
import { FeatureCard } from './FeatureCard';

interface ArticleGridProps {
  articles: Article[];
  columns?: number;
}

export function ArticleGrid({ articles, columns = 3 }: ArticleGridProps) {
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-3';

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {articles.map((article) => (
        <FeatureCard key={article.id} article={article} />
      ))}
    </div>
  );
}
