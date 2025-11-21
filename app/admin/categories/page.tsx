'use client';

/**
 * Category Management Page
 * Allows admins to create, edit, delete, and organize categories hierarchically
 */

import { useEffect, useState } from 'react';
import { Category } from '@/lib/types';
import { useCategoryStore } from '@/lib/stores/categoryStore';
import { useArticleStore } from '@/lib/stores/articleStore';
import { categories as mockCategories } from '@/lib/mockData';
import { CategoryTree } from '@/components/admin/CategoryTree';
import { CategoryForm } from '@/components/admin/CategoryForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, FolderTree, Eye, EyeOff, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type FilterType = 'all' | 'active' | 'inactive' | 'special';

export default function CategoriesPage() {
  const {
    categories,
    initializeCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoryStore();
  const { articles, reassignCategoryForArticles } = useArticleStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
  const [parentForNew, setParentForNew] = useState<Category | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);

  // Initialize categories from mock data
  useEffect(() => {
    if (categories.length === 0) {
      initializeCategories(mockCategories);
    }
  }, [categories.length, initializeCategories]);

  // Filter categories
  const filteredCategories = categories.filter((cat) => {
    if (filter === 'active') return cat.isActive;
    if (filter === 'inactive') return !cat.isActive;
    if (filter === 'special') return cat.isSpecial;
    return true;
  });

  // Statistics
  const stats = {
    total: categories.length,
    active: categories.filter((c) => c.isActive).length,
    inactive: categories.filter((c) => !c.isActive).length,
    special: categories.filter((c) => c.isSpecial).length,
  };

  // Handle create/edit
  const handleSubmit = (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingCategory) {
      // Update existing
      updateCategory(editingCategory.id, categoryData);
    } else {
      // Create new
      const newCategoryData = parentForNew
        ? { ...categoryData, parentId: parentForNew.id }
        : categoryData;
      createCategory(newCategoryData);
    }
    closeForm();
  };

  // Handle delete
  const handleDelete = (category: Category) => {
    setDeleteConfirm(category);
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;

    const articlesInCategory = articles.filter(
      (a) => a.category.id === deleteConfirm.id
    );

    if (articlesInCategory.length > 0) {
      // Reassign to uncategorized
      reassignCategoryForArticles(
        articlesInCategory.map((a) => a.id),
        'uncategorized'
      );
    }

    deleteCategory(deleteConfirm.id);
    setDeleteConfirm(null);
  };

  // Handle toggle active
  const handleToggleActive = (category: Category) => {
    updateCategory(category.id, { isActive: !category.isActive });
  };

  // Handle add child
  const handleAddChild = (parent: Category) => {
    setParentForNew(parent);
    setEditingCategory(undefined);
    setIsFormOpen(true);
  };

  // Handle edit
  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setParentForNew(null);
    setIsFormOpen(true);
  };

  // Close form
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCategory(undefined);
    setParentForNew(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="text-gray-500 mt-1">
          Manage your content categories and hierarchy
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <FolderTree className="h-4 w-4" />
            Total Categories
          </div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-green-600 text-sm mb-1">
            <Eye className="h-4 w-4" />
            Active
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <EyeOff className="h-4 w-4" />
            Inactive
          </div>
          <div className="text-2xl font-bold text-gray-400">{stats.inactive}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-purple-600 text-sm mb-1">
            <Star className="h-4 w-4" />
            Special
          </div>
          <div className="text-2xl font-bold text-purple-600">{stats.special}</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as FilterType)}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
              <SelectItem value="special">Special Categories</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="text-xs">
            {filteredCategories.length} shown
          </Badge>
        </div>
        <Button
          onClick={() => {
            setEditingCategory(undefined);
            setParentForNew(null);
            setIsFormOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Category
        </Button>
      </div>

      {/* Category Tree */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <FolderTree className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No categories found</p>
            <p className="text-sm text-gray-400 mt-1">
              Create your first category to get started
            </p>
          </div>
        ) : (
          <CategoryTree
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddChild={handleAddChild}
            onToggleActive={handleToggleActive}
          />
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCategory
                ? `Edit Category: ${editingCategory.name.en}`
                : parentForNew
                ? `Add Child to: ${parentForNew.name.en}`
                : 'Create New Category'}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? 'Update category details below'
                : 'Fill in the details to create a new category'}
            </DialogDescription>
          </DialogHeader>
          <CategoryForm
            category={editingCategory}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteConfirm?.name.en}&quot;?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {deleteConfirm && (
              <>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Impact:</strong>
                  </p>
                  <ul className="text-sm text-yellow-700 mt-2 space-y-1 list-disc list-inside">
                    <li>
                      {articles.filter((a) => a.category.id === deleteConfirm.id).length}{' '}
                      article(s) will be moved to &quot;Uncategorized&quot;
                    </li>
                    <li>
                      Child categories will be moved to{' '}
                      {deleteConfirm.parentId
                        ? 'their grandparent category'
                        : 'root level'}
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={confirmDelete}
                  >
                    Delete Category
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
