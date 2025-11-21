'use client';

import { Category } from '@/lib/types';
import { useCategoryStore } from '@/lib/stores/categoryStore';
import { useUIStore } from '@/lib/stores/uiStore';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category) => void;
}

interface TreeNode extends Category {
  children: TreeNode[];
  level: number;
}

export function CategorySelector({ selectedCategory, onCategoryChange }: CategorySelectorProps) {
  const { getCategoryTree, getCategoryById } = useCategoryStore();
  const language = useUIStore((state) => state.language);

  // Build tree with levels for hierarchical display
  type CategoryWithChildren = Category & { children?: CategoryWithChildren[] };
  const buildTreeWithLevels = (nodes: CategoryWithChildren[], level = 0): TreeNode[] => {
    return nodes.map((node) => ({
      ...node,
      level,
      children: buildTreeWithLevels(node.children || [], level + 1),
    }));
  };

  // Flatten tree for select options
  const flattenTree = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.reduce((acc: TreeNode[], node) => {
      // Only include active, non-special, non-uncategorized categories
      if (node.isActive && !node.isSpecial && node.id !== 'uncategorized') {
        acc.push(node);
        if (node.children.length > 0) {
          acc.push(...flattenTree(node.children));
        }
      }
      return acc;
    }, []);
  };

  const tree = buildTreeWithLevels(getCategoryTree());
  const flatTree = flattenTree(tree);

  // Get breadcrumb path for selected category
  const getCategoryPath = (categoryId: string): string => {
    const category = getCategoryById(categoryId);
    if (!category) return '';

    const path: string[] = [];
    let current: Category | null = category;

    while (current) {
      path.unshift(current.name[language.code]);
      current = current.parentId ? getCategoryById(current.parentId)! : null;
    }

    return path.join(' › ');
  };

  const handleValueChange = (value: string) => {
    const category = getCategoryById(value);
    if (category) {
      onCategoryChange(category);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Category *</label>
      <Select
        value={selectedCategory?.id || ''}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category">
            {selectedCategory && (
              <div className="flex items-center gap-2">
                <span>{selectedCategory.icon}</span>
                <span>{selectedCategory.name[language.code]}</span>
                {selectedCategory.parentId && (
                  <Badge variant="outline" className="text-xs">
                    Child
                  </Badge>
                )}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select Category</SelectLabel>
            {flatTree.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No active categories available
              </div>
            ) : (
              flatTree.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  <div
                    className="flex items-center gap-2"
                    style={{ paddingLeft: `${cat.level * 16}px` }}
                  >
                    {cat.level > 0 && (
                      <ChevronRight className="h-3 w-3 text-gray-400" />
                    )}
                    <span>{cat.icon}</span>
                    <span>{cat.name[language.code]}</span>
                    <div
                      className="h-3 w-3 rounded-full border"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedCategory && (
        <div className="p-3 rounded-lg bg-muted/50 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Path:</span>
            <span className="font-medium">{getCategoryPath(selectedCategory.id)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
