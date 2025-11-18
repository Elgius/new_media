'use client';

import { Badge } from '@/components/ui/badge';
import { Category } from '@/lib/types';
import { useUIStore } from '@/lib/stores/uiStore';

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const language = useUIStore((state) => state.language);

  return (
    <Badge
      variant="secondary"
      className="font-medium"
      style={{
        backgroundColor: category.color,
        color: 'white',
      }}
    >
      {category.name[language.code]}
    </Badge>
  );
}
