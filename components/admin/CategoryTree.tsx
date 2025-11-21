'use client';

/**
 * Hierarchical category tree with drag-drop reordering
 * Displays categories in a tree structure with expand/collapse
 */

import { useState } from 'react';
import { Category } from '@/lib/types';
import { useCategoryStore } from '@/lib/stores/categoryStore';
import { useArticleStore } from '@/lib/stores/articleStore';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronRight,
  ChevronDown,
  GripVertical,
  Edit,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Star,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArticlesByCategory } from './ArticlesByCategory';

interface CategoryTreeProps {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onAddChild: (parentCategory: Category) => void;
  onToggleActive: (category: Category) => void;
}

interface TreeNode extends Category {
  children: TreeNode[];
  level: number;
}

export function CategoryTree({
  onEdit,
  onDelete,
  onAddChild,
  onToggleActive,
}: CategoryTreeProps) {
  const { getCategoryTree, reorderCategories } = useCategoryStore();
  const { articles } = useArticleStore();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Build tree with levels
  type CategoryWithChildren = Category & { children?: CategoryWithChildren[] };
  const buildTreeWithLevels = (nodes: CategoryWithChildren[], level = 0): TreeNode[] => {
    return nodes.map((node) => ({
      ...node,
      level,
      children: buildTreeWithLevels(node.children || [], level + 1),
    }));
  };

  const tree = buildTreeWithLevels(getCategoryTree());

  // Flatten tree for drag-drop
  const flattenTree = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.reduce((acc: TreeNode[], node) => {
      acc.push(node);
      if (expandedIds.has(node.id) && node.children.length > 0) {
        acc.push(...flattenTree(node.children));
      }
      return acc;
    }, []);
  };

  const flatTree = flattenTree(tree);

  // Get article count for a category
  const getArticleCount = (categoryId: string): number => {
    return articles.filter((a) => a.category.id === categoryId).length;
  };

  // Toggle expand/collapse
  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = flatTree.findIndex((item) => item.id === active.id);
    const newIndex = flatTree.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newOrder = arrayMove(flatTree, oldIndex, newIndex);
      reorderCategories(newOrder.map((item) => item.id));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={flatTree.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-1">
          {flatTree.map((node) => (
            <CategoryTreeItem
              key={node.id}
              node={node}
              articleCount={getArticleCount(node.id)}
              isExpanded={expandedIds.has(node.id)}
              onToggleExpand={toggleExpand}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
              onToggleActive={onToggleActive}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

interface CategoryTreeItemProps {
  node: TreeNode;
  articleCount: number;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onAddChild: (category: Category) => void;
  onToggleActive: (category: Category) => void;
}

function CategoryTreeItem({
  node,
  articleCount,
  isExpanded,
  onToggleExpand,
  onEdit,
  onDelete,
  onAddChild,
  onToggleActive,
}: CategoryTreeItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const hasChildren = node.children && node.children.length > 0;
  const indentWidth = node.level * 24;
  const [showArticles, setShowArticles] = useState(false);

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`group flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
          isDragging
            ? 'bg-green-50 border-green-300'
            : 'bg-white border-gray-200 hover:bg-gray-50'
        } ${!node.isActive ? 'opacity-60' : ''}`}
      >
      {/* Indentation */}
      <div style={{ width: indentWidth }} />

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      {/* Expand/collapse */}
      <button
        onClick={() => {
          onToggleExpand(node.id);
          setShowArticles(!showArticles);
        }}
        className={`p-0.5 rounded hover:bg-gray-200 ${
          hasChildren || articleCount > 0 ? 'visible' : 'invisible'
        }`}
        type="button"
      >
        {isExpanded || showArticles ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {/* Icon */}
      <span className="text-xl">{node.icon}</span>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${!node.isActive ? 'text-gray-400' : ''}`}>
            {node.name.en}
          </span>
          <span className={`text-sm text-gray-500 ${!node.isActive ? 'text-gray-400' : ''}`}>
            ({node.name.dv})
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="inline-block h-3 w-3 rounded-full border"
            style={{ backgroundColor: node.color }}
          />
          <span className="text-xs text-gray-400">/{node.slug}</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2">
        {node.isSpecial && (
          <Badge variant="outline" className="text-xs border-purple-300 text-purple-700">
            <Star className="h-3 w-3 mr-1" />
            Special
          </Badge>
        )}
        {!node.isActive && (
          <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
            <EyeOff className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )}
        <Badge variant="outline" className="text-xs">
          {articleCount} {articleCount === 1 ? 'article' : 'articles'}
        </Badge>
      </div>

      {/* Actions menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100"
          >
            •••
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(node)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddChild(node)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Child Category
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onToggleActive(node)}>
            {node.isActive ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Deactivate
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Activate
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onDelete(node)}
            className="text-red-600"
            disabled={node.id === 'uncategorized'}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>

      {/* Articles folder view */}
      {showArticles && articleCount > 0 && (
        <ArticlesByCategory
          category={node}
          isExpanded={true}
        />
      )}
    </>
  );
}
