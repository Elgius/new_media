'use client';

import { Comment } from '@/lib/types';
import { useUIStore } from '@/lib/stores/uiStore';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CommentItemProps {
  comment: Comment;
  className?: string;
}

export function CommentItem({ comment, className }: CommentItemProps) {
  const { language } = useUIStore();
  const content = comment.content[language.code];

  return (
    <div className={cn('flex gap-4 p-4 bg-gray-50 rounded-lg', className)}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {comment.author.avatar ? (
          <Image
            src={comment.author.avatar}
            alt={comment.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {comment.author.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Comment content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-900">
            {comment.author.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
          {content}
        </p>
      </div>
    </div>
  );
}
