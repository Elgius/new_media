'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useArticleStore } from '@/lib/stores/articleStore';
import { useAdminStore } from '@/lib/stores/adminStore';
import { ArticleCalendar } from '@/components/admin/ArticleCalendar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { List, Plus } from 'lucide-react';

export default function CalendarPage() {
  const articles = useArticleStore((state) => state.articles);
  const categories = useArticleStore((state) => state.categories);

  const { statusFilter, categoryFilter, setStatusFilter, setCategoryFilter } =
    useAdminStore();

  // Filter articles for calendar
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Status filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'published' && article.status !== 'published' && article.status) {
          return false;
        }
        if (statusFilter === 'draft' && article.status !== 'draft') {
          return false;
        }
        if (statusFilter === 'scheduled' && article.status !== 'scheduled') {
          return false;
        }
      }

      // Category filter
      if (categoryFilter && article.category.id !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [articles, statusFilter, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Article Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Schedule and manage article publications
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/articles">
              <List className="h-4 w-4 mr-2" />
              List View
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

      {/* Filters */}
      <div className="flex gap-4">
        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select
          value={categoryFilter || 'all'}
          onValueChange={(value) => setCategoryFilter(value === 'all' ? null : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name.en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <div className="h-4 w-4 rounded bg-green-500" />
          <span>Published</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="h-4 w-4 rounded bg-gray-400" />
          <span>Draft</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="h-4 w-4 rounded bg-blue-500" />
          <span>Scheduled</span>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          Drag articles to reschedule • Click to edit
        </div>
      </div>

      {/* Calendar */}
      <ArticleCalendar articles={filteredArticles} />
    </div>
  );
}
