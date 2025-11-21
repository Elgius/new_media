'use client';

import { StatCard } from './StatCard';
import { Users, Award, UserPlus } from 'lucide-react';

interface AuthorStatsProps {
  totalAuthors: number;
  topContributor: {
    author: { name: { en: string } } | null;
    articleCount: number;
  };
  recentlyAddedCount: number;
  averageArticlesPerAuthor: number;
}

export function AuthorStats({
  totalAuthors,
  topContributor,
  recentlyAddedCount,
  averageArticlesPerAuthor,
}: AuthorStatsProps) {
  const topContributorDisplay = topContributor.author
    ? `${topContributor.author.name.en} (${topContributor.articleCount})`
    : 'N/A';

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Authors"
        value={totalAuthors}
        icon={Users}
      />
      <StatCard
        title="Top Contributor"
        value={topContributorDisplay}
        icon={Award}
      />
      <StatCard
        title="Recently Added"
        value={recentlyAddedCount}
        icon={UserPlus}
      />
      <StatCard
        title="Average Articles"
        value={averageArticlesPerAuthor}
        icon={Users}
      />
    </div>
  );
}
