'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useArticleStore } from '@/lib/stores/articleStore';
import { useAdminStore } from '@/lib/stores/adminStore';
import { ArticlesTable } from '@/components/admin/ArticlesTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Calendar, Search, X, MoreHorizontal } from 'lucide-react';

export default function ArticlesListPage() {
  const articles = useArticleStore((state) => state.articles);
  const categories = useArticleStore((state) => state.categories);
  const bulkUpdateStatus = useArticleStore((state) => state.bulkUpdateStatus);
  const bulkDelete = useArticleStore((state) => state.bulkDelete);

  const {
    statusFilter,
    categoryFilter,
    searchQuery,
    selectedArticleIds,
    setStatusFilter,
    setCategoryFilter,
    setSearchQuery,
    resetFilters,
    clearSelection,
  } = useAdminStore();

  // Filter articles
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

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const titleMatch = article.title.en.toLowerCase().includes(query) ||
          article.title.dv.toLowerCase().includes(query);
        const summaryMatch = article.summary.en.toLowerCase().includes(query) ||
          article.summary.dv.toLowerCase().includes(query);
        const authorMatch = article.author.name.en.toLowerCase().includes(query) ||
          article.author.name.dv.toLowerCase().includes(query);

        return titleMatch || summaryMatch || authorMatch;
      }

      return true;
    });
  }, [articles, statusFilter, categoryFilter, searchQuery]);

  const hasFilters = statusFilter !== 'all' || categoryFilter || searchQuery;

  const handleBulkAction = (action: string) => {
    if (selectedArticleIds.length === 0) {
      alert('Please select articles first');
      return;
    }

    switch (action) {
      case 'publish':
        if (confirm(`Publish ${selectedArticleIds.length} articles?`)) {
          bulkUpdateStatus(selectedArticleIds, 'published');
          clearSelection();
        }
        break;
      case 'draft':
        if (confirm(`Move ${selectedArticleIds.length} articles to draft?`)) {
          bulkUpdateStatus(selectedArticleIds, 'draft');
          clearSelection();
        }
        break;
      case 'delete':
        if (
          confirm(
            `Are you sure you want to delete ${selectedArticleIds.length} articles? This action cannot be undone.`
          )
        ) {
          bulkDelete(selectedArticleIds);
          clearSelection();
        }
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your articles
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/articles/calendar">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
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

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

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

        {hasFilters && (
          <Button variant="outline" onClick={resetFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedArticleIds.length > 0 && (
        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">
            {selectedArticleIds.length} article{selectedArticleIds.length > 1 ? 's' : ''} selected
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4 mr-2" />
                Bulk Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleBulkAction('publish')}>
                Publish Selected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulkAction('draft')}>
                Move to Draft
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleBulkAction('delete')}
                className="text-destructive focus:text-destructive"
              >
                Delete Selected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="sm" onClick={clearSelection}>
            Clear Selection
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Showing {filteredArticles.length} of {articles.length} articles
        </p>
      </div>

      {/* Articles Table */}
      <ArticlesTable articles={filteredArticles} />
    </div>
  );
}
