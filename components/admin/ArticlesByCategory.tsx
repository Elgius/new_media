'use client';

/**
 * Expandable folder view showing articles grouped by category and status
 * Displays articles in a tree structure under each category
 */

import { useState } from 'react';
import { Category, Article } from '@/lib/types';
import { useArticleStore } from '@/lib/stores/articleStore';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import {
  ChevronRight,
  ChevronDown,
  FileText,
  Calendar,
  Edit,
  Eye,
  Clock,
} from 'lucide-react';
import { format } from 'date-fns';

interface ArticlesByCategoryProps {
  category: Category;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function ArticlesByCategory({
  category,
  isExpanded: externalExpanded,
  onToggle
}: ArticlesByCategoryProps) {
  const { articles } = useArticleStore();
  const router = useRouter();
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [expandedStatus, setExpandedStatus] = useState<Set<string>>(new Set());

  const isExpanded = externalExpanded !== undefined ? externalExpanded : internalExpanded;

  // Get articles for this category
  const categoryArticles = articles.filter(
    (article) => article.category.id === category.id
  );

  // Group articles by status
  const groupedArticles = {
    published: categoryArticles.filter(
      (a) => a.status === 'published' || !a.status
    ),
    scheduled: categoryArticles.filter((a) => a.status === 'scheduled'),
    draft: categoryArticles.filter((a) => a.status === 'draft'),
  };

  const totalArticles = categoryArticles.length;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const toggleStatusGroup = (status: string) => {
    setExpandedStatus((prev) => {
      const next = new Set(prev);
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  };

  const handleArticleClick = (articleId: string) => {
    router.push(`/admin/articles/${articleId}/edit`);
  };

  if (totalArticles === 0) {
    return null; // Don't show categories with no articles
  }

  return (
    <div className="border-l-2 border-gray-200 ml-4 pl-4">
      {/* Category Header */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 w-full text-left py-2 hover:bg-gray-50 rounded px-2 transition-colors"
        type="button"
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        )}
        <FileText className="h-4 w-4 text-gray-500" />
        <span className="font-medium text-sm">Articles</span>
        <Badge variant="outline" className="text-xs">
          {totalArticles}
        </Badge>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="ml-6 mt-2 space-y-2">
          {/* Published Articles */}
          {groupedArticles.published.length > 0 && (
            <div>
              <button
                onClick={() => toggleStatusGroup('published')}
                className="flex items-center gap-2 w-full text-left py-1.5 hover:bg-gray-50 rounded px-2 transition-colors"
                type="button"
              >
                {expandedStatus.has('published') ? (
                  <ChevronDown className="h-3 w-3 text-gray-400" />
                ) : (
                  <ChevronRight className="h-3 w-3 text-gray-400" />
                )}
                <Eye className="h-3 w-3 text-green-600" />
                <span className="text-xs font-medium text-green-700">Published</span>
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  {groupedArticles.published.length}
                </Badge>
              </button>
              {expandedStatus.has('published') && (
                <div className="ml-6 mt-1 space-y-1">
                  {groupedArticles.published.map((article) => (
                    <ArticleItem
                      key={article.id}
                      article={article}
                      onClick={() => handleArticleClick(article.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Scheduled Articles */}
          {groupedArticles.scheduled.length > 0 && (
            <div>
              <button
                onClick={() => toggleStatusGroup('scheduled')}
                className="flex items-center gap-2 w-full text-left py-1.5 hover:bg-gray-50 rounded px-2 transition-colors"
                type="button"
              >
                {expandedStatus.has('scheduled') ? (
                  <ChevronDown className="h-3 w-3 text-gray-400" />
                ) : (
                  <ChevronRight className="h-3 w-3 text-gray-400" />
                )}
                <Calendar className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">Scheduled</span>
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  {groupedArticles.scheduled.length}
                </Badge>
              </button>
              {expandedStatus.has('scheduled') && (
                <div className="ml-6 mt-1 space-y-1">
                  {groupedArticles.scheduled.map((article) => (
                    <ArticleItem
                      key={article.id}
                      article={article}
                      onClick={() => handleArticleClick(article.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Draft Articles */}
          {groupedArticles.draft.length > 0 && (
            <div>
              <button
                onClick={() => toggleStatusGroup('draft')}
                className="flex items-center gap-2 w-full text-left py-1.5 hover:bg-gray-50 rounded px-2 transition-colors"
                type="button"
              >
                {expandedStatus.has('draft') ? (
                  <ChevronDown className="h-3 w-3 text-gray-400" />
                ) : (
                  <ChevronRight className="h-3 w-3 text-gray-400" />
                )}
                <Edit className="h-3 w-3 text-gray-600" />
                <span className="text-xs font-medium text-gray-700">Draft</span>
                <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                  {groupedArticles.draft.length}
                </Badge>
              </button>
              {expandedStatus.has('draft') && (
                <div className="ml-6 mt-1 space-y-1">
                  {groupedArticles.draft.map((article) => (
                    <ArticleItem
                      key={article.id}
                      article={article}
                      onClick={() => handleArticleClick(article.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface ArticleItemProps {
  article: Article;
  onClick: () => void;
}

function ArticleItem({ article, onClick }: ArticleItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-2 w-full text-left py-2 px-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 transition-all group"
      type="button"
    >
      <FileText className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
            {article.title.en}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.scheduledFor
              ? format(new Date(article.scheduledFor), 'MMM d, h:mm a')
              : format(new Date(article.publishedAt), 'MMM d, h:mm a')}
          </span>
          {article.author && (
            <span className="truncate">
              by {article.author.name.en}
            </span>
          )}
          {article.featured && (
            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
              Featured
            </Badge>
          )}
        </div>
      </div>
      <Edit className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </button>
  );
}
