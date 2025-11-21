'use client';

import { Comment } from '@/lib/types';
import { CommentItem } from './CommentItem';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommentsSectionProps {
  comments: Comment[];
  className?: string;
}

export function CommentsSection({ comments, className }: CommentsSectionProps) {
  const commentCount = comments.length;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-bold text-gray-900">
          Comments ({commentCount})
        </h3>
      </div>

      {/* Comments list */}
      {commentCount > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
}
