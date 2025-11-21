'use client';

/**
 * Authors Admin Page - Main listing with card grid
 * Features: Search, statistics, card grid, soft delete support
 */

import { useState } from 'react';
import Link from 'next/link';
import { useAuthorStore } from '@/lib/stores/authorStore';
import { useArticleStore } from '@/lib/stores/articleStore';
import { AuthorStats } from '@/components/admin/AuthorStats';
import { AuthorCard } from '@/components/admin/AuthorCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Users } from 'lucide-react';

type FilterMode = 'all' | 'active' | 'deleted';

export default function AuthorsPage() {
  const {
    getAllAuthors,
    getActiveAuthors,
    getDeletedAuthors,
    searchAuthors,
    getAuthorStats,
    getAuthorArticleCount,
    softDeleteAuthor,
    restoreAuthor,
  } = useAuthorStore();

  const articles = useArticleStore((state) => state.articles);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>('active');

  // Get filtered authors based on search and filter mode
  const getFilteredAuthors = () => {
    let authors;

    if (filterMode === 'active') {
      authors = getActiveAuthors();
    } else if (filterMode === 'deleted') {
      authors = getDeletedAuthors();
    } else {
      authors = getAllAuthors();
    }

    if (searchQuery.trim()) {
      const searchResults = searchAuthors(searchQuery);
      authors = authors.filter(author =>
        searchResults.some(result => result.id === author.id)
      );
    }

    return authors;
  };

  const filteredAuthors = getFilteredAuthors();

  // Get stats
  const articlesData = articles.map(a => ({ authorId: a.author.id }));
  const stats = getAuthorStats(articlesData);

  const handleDelete = (id: string) => {
    softDeleteAuthor(id);
  };

  const handleRestore = (id: string) => {
    restoreAuthor(id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8" />
            Authors
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage writers and contributors
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/authors/new">
            <Plus className="h-4 w-4 mr-2" />
            New Author
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <AuthorStats
        totalAuthors={stats.totalAuthors}
        activeAuthors={stats.activeAuthors}
        topContributor={stats.topContributor}
        recentlyAddedCount={stats.recentlyAddedCount}
        averageArticlesPerAuthor={stats.averageArticlesPerAuthor}
      />

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search authors by name or bio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Show:</span>
          <Select value={filterMode} onValueChange={(value) => setFilterMode(value as FilterMode)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">
                Active ({stats.activeAuthors})
              </SelectItem>
              <SelectItem value="deleted">
                Deleted ({stats.deletedAuthors})
              </SelectItem>
              <SelectItem value="all">
                All ({stats.totalAuthors})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2">
        <Badge variant="outline">
          {filteredAuthors.length} {filteredAuthors.length === 1 ? 'author' : 'authors'}
        </Badge>
        {searchQuery && (
          <p className="text-sm text-muted-foreground">
            matching &quot;{searchQuery}&quot;
          </p>
        )}
      </div>

      {/* Authors Grid */}
      {filteredAuthors.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAuthors.map((author) => (
            <AuthorCard
              key={author.id}
              author={author}
              articleCount={getAuthorArticleCount(author.id, articlesData)}
              onDelete={handleDelete}
              onRestore={handleRestore}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No authors found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? `No authors match your search "${searchQuery}"`
              : filterMode === 'deleted'
              ? 'No deleted authors'
              : 'Get started by creating your first author'}
          </p>
          {!searchQuery && filterMode === 'active' && (
            <Button asChild>
              <Link href="/admin/authors/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Author
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
