'use client';

import { Category } from '@/lib/types';
import { useArticleStore } from '@/lib/stores/articleStore';
import { useUIStore } from '@/lib/stores/uiStore';
import { CategoryBadge } from '@/components/news/CategoryBadge';

interface CategorySelectorProps {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category) => void;
}

export function CategorySelector({ selectedCategory, onCategoryChange }: CategorySelectorProps) {
  const categories = useArticleStore((state) => state.categories);
  const language = useUIStore((state) => state.language);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Category</label>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`
              p-4 rounded-lg border-2 transition-all
              ${
                selectedCategory?.id === category.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }
            `}
          >
            <CategoryBadge category={category} />
          </button>
        ))}
      </div>
      {selectedCategory && (
        <div className="p-3 rounded-lg bg-muted/50 text-sm">
          Selected: <span className="font-medium">{selectedCategory.name[language.code]}</span>
        </div>
      )}
    </div>
  );
}
