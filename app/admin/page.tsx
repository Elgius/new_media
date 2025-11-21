'use client';

import Link from 'next/link';
import { useArticleStore } from '@/lib/stores/articleStore';
import { StatCard } from '@/components/admin/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  CheckCircle,
  FileEdit,
  Clock,
  TrendingUp,
  Calendar as CalendarIcon,
  Plus,
  MessageSquare,
  Heart,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function AdminDashboard() {
  const getDashboardStats = useArticleStore((state) => state.getDashboardStats);
  const articles = useArticleStore((state) => state.articles);

  const stats = getDashboardStats();

  // Get recent articles (last 10)
  const recentArticles = [...articles]
    .sort((a, b) => {
      const dateA = a.lastEditedAt || a.updatedAt || a.publishedAt;
      const dateB = b.lastEditedAt || b.updatedAt || b.publishedAt;
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 10);

  const getStatusBadge = (status?: string) => {
    if (status === 'published' || !status) {
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          Published
        </Badge>
      );
    }
    if (status === 'draft') {
      return <Badge variant="secondary">Draft</Badge>;
    }
    if (status === 'scheduled') {
      return (
        <Badge variant="outline" className="border-blue-500 text-blue-500">
          Scheduled
        </Badge>
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your news content and statistics
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/articles/calendar">
              <CalendarIcon className="h-4 w-4 mr-2" />
              View Calendar
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/articles/new">
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Total Articles"
          value={stats.totalArticles}
          icon={FileText}
        />
        <StatCard
          title="Published"
          value={stats.publishedArticles}
          icon={CheckCircle}
        />
        <StatCard
          title="Drafts"
          value={stats.draftArticles}
          icon={FileEdit}
        />
        <StatCard
          title="Scheduled"
          value={stats.scheduledArticles}
          icon={Clock}
        />
        <StatCard
          title="This Week"
          value={stats.articlesThisWeek}
          icon={TrendingUp}
        />
        <StatCard
          title="This Month"
          value={stats.articlesThisMonth}
          icon={CalendarIcon}
        />
        <StatCard
          title="Total Comments"
          value={stats.totalComments}
          icon={MessageSquare}
        />
        <StatCard
          title="Total Reactions"
          value={stats.totalReactions}
          icon={Heart}
        />
      </div>

      {/* Recent Articles */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Articles</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/articles">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentArticles.map((article) => {
              const lastUpdated = article.lastEditedAt || article.updatedAt || article.publishedAt;

              return (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium truncate">{article.title.en}</h3>
                      {getStatusBadge(article.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">{article.category.name.en}</span>
                      </span>
                      <span>•</span>
                      <span>{article.author.name.en}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(lastUpdated, { addSuffix: true })}</span>
                      {(article.comments?.length || 0) > 0 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5" />
                            {article.comments?.length}
                          </span>
                        </>
                      )}
                      {article.reactions && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3.5 w-3.5" />
                            {Object.values(article.reactions).reduce((a, b) => a + b, 0)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/articles/${article.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              );
            })}

            {recentArticles.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No articles yet</p>
                <p className="text-sm mt-1">Create your first article to get started</p>
                <Button className="mt-4" asChild>
                  <Link href="/admin/articles/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Article
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Articles by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.categoryBreakdown.map((item) => (
              <div key={item.category} className="flex items-center gap-4">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.count} articles
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(item.count / stats.totalArticles) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
