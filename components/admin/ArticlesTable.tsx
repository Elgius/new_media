'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Article } from '@/lib/types';
import { useArticleStore } from '@/lib/stores/articleStore';
import { useAdminStore } from '@/lib/stores/adminStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, Eye, MessageSquare, Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ArticlesTableProps {
  articles: Article[];
}

export function ArticlesTable({ articles }: ArticlesTableProps) {
  const deleteArticle = useArticleStore((state) => state.deleteArticle);
  const {
    selectedArticleIds,
    toggleArticleSelection,
    selectAllArticles,
    clearSelection,
  } = useAdminStore();

  const [sortField, setSortField] = useState<'title' | 'publishedAt' | 'category'>('publishedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const allSelected = articles.length > 0 && selectedArticleIds.length === articles.length;
  const someSelected = selectedArticleIds.length > 0 && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAllArticles(articles.map((a) => a.id));
    }
  };

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedArticles = [...articles].sort((a, b) => {
    let aValue: string | Date;
    let bValue: string | Date;

    switch (sortField) {
      case 'title':
        aValue = a.title.en.toLowerCase();
        bValue = b.title.en.toLowerCase();
        break;
      case 'category':
        aValue = a.category.name.en.toLowerCase();
        bValue = b.category.name.en.toLowerCase();
        break;
      case 'publishedAt':
      default:
        aValue = a.publishedAt;
        bValue = b.publishedAt;
        break;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

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

  const handleDelete = (articleId: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      deleteArticle(articleId);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
                className="data-[state=indeterminate]:bg-primary"
                {...(someSelected && { 'data-state': 'indeterminate' })}
              />
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('title')}
            >
              Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('category')}
            >
              Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                <MessageSquare className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Heart className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('publishedAt')}
            >
              Published {sortField === 'publishedAt' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedArticles.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <Checkbox
                  checked={selectedArticleIds.includes(article.id)}
                  onCheckedChange={() => toggleArticleSelection(article.id)}
                  aria-label={`Select ${article.title.en}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="max-w-md">
                  <div className="truncate">{article.title.en}</div>
                  {article.subtitle && (
                    <div className="text-sm text-muted-foreground truncate">
                      {article.subtitle.en}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  style={{
                    borderColor: article.category.color,
                    color: article.category.color,
                  }}
                >
                  {article.category.name.en}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{article.author.name.en}</TableCell>
              <TableCell>{getStatusBadge(article.status)}</TableCell>
              <TableCell className="text-center text-sm text-muted-foreground">
                {article.comments?.length || 0}
              </TableCell>
              <TableCell className="text-center text-sm text-muted-foreground">
                {article.reactions
                  ? Object.values(article.reactions).reduce((a, b) => a + b, 0)
                  : 0}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/articles/${article.id}/edit`}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/article/${article.slug}`} target="_blank">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(article.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {sortedArticles.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No articles found</p>
        </div>
      )}
    </div>
  );
}
