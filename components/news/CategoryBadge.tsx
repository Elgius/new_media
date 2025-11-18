import { Badge } from '@/components/ui/badge';
import { Category } from '@/lib/types';

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="font-medium"
      style={{
        backgroundColor: category.color,
        color: 'white',
      }}
    >
      {category.name}
    </Badge>
  );
}
