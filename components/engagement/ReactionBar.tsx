'use client';

import { Reactions, ReactionType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ReactionBarProps {
  reactions: Reactions;
  className?: string;
  showCounts?: boolean;
}

const reactionConfig: Record<
  ReactionType,
  { emoji: string; label: string; color: string }
> = {
  like: { emoji: '👍', label: 'Like', color: 'hover:bg-blue-50' },
  love: { emoji: '❤️', label: 'Love', color: 'hover:bg-red-50' },
  haha: { emoji: '😂', label: 'Haha', color: 'hover:bg-yellow-50' },
  wow: { emoji: '😮', label: 'Wow', color: 'hover:bg-purple-50' },
  sad: { emoji: '😢', label: 'Sad', color: 'hover:bg-blue-50' },
  angry: { emoji: '😠', label: 'Angry', color: 'hover:bg-orange-50' },
};

export function ReactionBar({
  reactions,
  className,
  showCounts = true,
}: ReactionBarProps) {
  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {/* Reaction buttons */}
      <div className="flex items-center gap-2">
        {(Object.entries(reactionConfig) as [ReactionType, typeof reactionConfig[ReactionType]][]).map(
          ([type, config]) => {
            const count = reactions[type];
            return (
              <button
                key={type}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200',
                  'transition-colors',
                  config.color,
                  count > 0 && 'border-primary/20 bg-primary/5'
                )}
                title={`${config.label}: ${count}`}
                aria-label={`${config.label}: ${count}`}
              >
                <span className="text-lg">{config.emoji}</span>
                {showCounts && count > 0 && (
                  <span className="text-sm font-medium text-gray-700">
                    {count.toLocaleString()}
                  </span>
                )}
              </button>
            );
          }
        )}
      </div>

      {/* Total count */}
      {totalReactions > 0 && (
        <div className="text-sm text-muted-foreground">
          {totalReactions.toLocaleString()} {totalReactions === 1 ? 'reaction' : 'reactions'}
        </div>
      )}
    </div>
  );
}
