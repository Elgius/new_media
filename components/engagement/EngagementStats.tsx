'use client';

import { Reactions, Comment } from '@/lib/types';
import { MessageSquare, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EngagementStatsProps {
  reactions?: Reactions;
  comments?: Comment[];
  className?: string;
  variant?: 'default' | 'compact';
}

export function EngagementStats({
  reactions,
  comments,
  className,
  variant = 'default',
}: EngagementStatsProps) {
  const totalReactions = reactions
    ? Object.values(reactions).reduce((sum, count) => sum + count, 0)
    : 0;
  const commentCount = comments?.length || 0;

  if (totalReactions === 0 && commentCount === 0) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-3 text-sm text-muted-foreground', className)}>
        {totalReactions > 0 && (
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{totalReactions.toLocaleString()}</span>
          </div>
        )}
        {commentCount > 0 && (
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{commentCount.toLocaleString()}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-4 text-sm', className)}>
      {totalReactions > 0 && (
        <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <Heart className="h-4 w-4" />
          <span>
            {totalReactions.toLocaleString()}{' '}
            {totalReactions === 1 ? 'reaction' : 'reactions'}
          </span>
        </div>
      )}
      {commentCount > 0 && (
        <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <MessageSquare className="h-4 w-4" />
          <span>
            {commentCount.toLocaleString()} {commentCount === 1 ? 'comment' : 'comments'}
          </span>
        </div>
      )}
    </div>
  );
}
