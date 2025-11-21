/**
 * Zustand store for category management
 * Handles hierarchical categories with CRUD operations
 */

import { create } from 'zustand';
import { Category } from '../types';

interface CategoryTree extends Category {
  children: CategoryTree[];
  articleCount?: number;
}

interface CategoryStore {
  categories: Category[];

  // Initialization
  initializeCategories: (categories: Category[]) => void;

  // CRUD Operations
  createCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Getters
  getCategoryById: (id: string) => Category | undefined;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getActiveCategories: () => Category[];
  getSpecialCategories: () => Category[];
  getRootCategories: () => Category[];
  getChildCategories: (parentId: string | null) => Category[];
  getCategoryTree: () => CategoryTree[];
  getCategoryPath: (categoryId: string) => Category[];

  // Hierarchy Management
  moveCategoryToParent: (categoryId: string, newParentId: string | null) => boolean;
  hasCircularDependency: (categoryId: string, newParentId: string | null) => boolean;

  // Ordering
  reorderCategories: (categoryIds: string[]) => void;
  reorderWithinParent: (categoryId: string, newOrder: number) => void;

  // Validation
  isSlugUnique: (slug: string, excludeId?: string) => boolean;
  canDeleteCategory: (categoryId: string) => { canDelete: boolean; reason?: string };

  // Article Count (will be updated by articleStore)
  updateArticleCount: (categoryId: string, count: number) => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],

  // Initialize categories from mock data or API
  initializeCategories: (categories) => {
    set({ categories });
  },

  // Create a new category
  createCategory: (categoryData) => {
    const id = `category-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();

    const newCategory: Category = {
      ...categoryData,
      id,
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({
      categories: [...state.categories, newCategory],
    }));

    return id;
  },

  // Update an existing category
  updateCategory: (id, updates) => {
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.id === id
          ? { ...cat, ...updates, updatedAt: new Date() }
          : cat
      ),
    }));
  },

  // Delete a category
  deleteCategory: (id) => {
    const { categories } = get();

    // Get children and reassign them to the deleted category's parent
    const deletedCategory = categories.find((c) => c.id === id);
    if (deletedCategory) {
      // Reassign children to parent
      set((state) => ({
        categories: state.categories
          .filter((c) => c.id !== id)
          .map((c) =>
            c.parentId === id
              ? { ...c, parentId: deletedCategory.parentId }
              : c
          ),
      }));
    }
  },

  // Get category by ID
  getCategoryById: (id) => {
    return get().categories.find((c) => c.id === id);
  },

  // Get category by slug
  getCategoryBySlug: (slug) => {
    return get().categories.find((c) => c.slug === slug);
  },

  // Get all active categories
  getActiveCategories: () => {
    return get().categories.filter((c) => c.isActive);
  },

  // Get special categories (Elections, etc.)
  getSpecialCategories: () => {
    return get().categories.filter((c) => c.isSpecial);
  },

  // Get root-level categories (no parent)
  getRootCategories: () => {
    return get().categories
      .filter((c) => c.parentId === null)
      .sort((a, b) => a.order - b.order);
  },

  // Get child categories of a parent
  getChildCategories: (parentId) => {
    return get().categories
      .filter((c) => c.parentId === parentId)
      .sort((a, b) => a.order - b.order);
  },

  // Build hierarchical category tree
  getCategoryTree: () => {
    const { categories } = get();

    const buildTree = (parentId: string | null): CategoryTree[] => {
      return categories
        .filter((c) => c.parentId === parentId)
        .sort((a, b) => a.order - b.order)
        .map((cat) => ({
          ...cat,
          children: buildTree(cat.id),
        }));
    };

    return buildTree(null);
  },

  // Get path from root to category (breadcrumb)
  getCategoryPath: (categoryId) => {
    const { getCategoryById } = get();
    const path: Category[] = [];

    let currentCategory = getCategoryById(categoryId);
    while (currentCategory) {
      path.unshift(currentCategory);
      currentCategory = currentCategory.parentId
        ? getCategoryById(currentCategory.parentId)
        : undefined;
    }

    return path;
  },

  // Move category to new parent
  moveCategoryToParent: (categoryId, newParentId) => {
    const { hasCircularDependency } = get();

    // Check for circular dependency
    if (hasCircularDependency(categoryId, newParentId)) {
      return false;
    }

    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === categoryId
          ? { ...c, parentId: newParentId, updatedAt: new Date() }
          : c
      ),
    }));

    return true;
  },

  // Check if moving would create circular dependency
  hasCircularDependency: (categoryId, newParentId) => {
    if (!newParentId) return false;
    if (categoryId === newParentId) return true;

    const { getCategoryById } = get();
    let current = getCategoryById(newParentId);

    while (current) {
      if (current.id === categoryId) return true;
      current = current.parentId ? getCategoryById(current.parentId) : undefined;
    }

    return false;
  },

  // Reorder categories (bulk update)
  reorderCategories: (categoryIds) => {
    set((state) => ({
      categories: state.categories.map((cat) => {
        const newOrder = categoryIds.indexOf(cat.id);
        return newOrder >= 0 ? { ...cat, order: newOrder } : cat;
      }),
    }));
  },

  // Reorder within same parent level
  reorderWithinParent: (categoryId, newOrder) => {
    const { categories, getCategoryById } = get();
    const category = getCategoryById(categoryId);

    if (!category) return;

    const siblings = categories
      .filter((c) => c.parentId === category.parentId && c.id !== categoryId)
      .sort((a, b) => a.order - b.order);

    // Insert at new position
    siblings.splice(newOrder, 0, category);

    // Update order for all siblings
    set((state) => ({
      categories: state.categories.map((c) => {
        const siblingIndex = siblings.findIndex((s) => s.id === c.id);
        return siblingIndex >= 0
          ? { ...c, order: siblingIndex }
          : c;
      }),
    }));
  },

  // Check if slug is unique
  isSlugUnique: (slug, excludeId) => {
    const { categories } = get();
    return !categories.some((c) => c.slug === slug && c.id !== excludeId);
  },

  // Check if category can be deleted
  canDeleteCategory: (categoryId) => {
    const category = get().getCategoryById(categoryId);

    if (!category) {
      return { canDelete: false, reason: 'Category not found' };
    }

    // Check if it's the uncategorized category
    if (categoryId === 'uncategorized') {
      return { canDelete: false, reason: 'Cannot delete the default uncategorized category' };
    }

    // Category can be deleted - articles will be auto-reassigned to uncategorized
    // Children will be reassigned to parent
    return { canDelete: true };
  },

  // Update article count for a category (called by articleStore)
  updateArticleCount: (categoryId, count) => {
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === categoryId ? ({ ...c, articleCount: count } as Category & { articleCount: number }) : c
      ),
    }));
  },
}));

// Helper function to generate slug from name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove duplicate hyphens
}
