'use client';

/**
 * Form component for creating and editing categories
 * Supports bilingual input, hierarchy, special categories, and full customization
 */

import { useState } from 'react';
import { Category } from '@/lib/types';
import { useCategoryStore, generateSlug } from '@/lib/stores/categoryStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CategoryColorPicker } from './CategoryColorPicker';
import { CategoryIconPicker } from './CategoryIconPicker';
import { Separator } from '@/components/ui/separator';

interface CategoryFormProps {
  category?: Category; // If editing, pass existing category
  onSubmit: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  const { categories, isSlugUnique } = useCategoryStore();

  // Form state
  const [nameEn, setNameEn] = useState(category?.name.en || '');
  const [nameDv, setNameDv] = useState(category?.name.dv || '');
  const [slug, setSlug] = useState(category?.slug || '');
  const [descEn, setDescEn] = useState(category?.description?.en || '');
  const [descDv, setDescDv] = useState(category?.description?.dv || '');
  const [color, setColor] = useState(category?.color || '#0F8A2F');
  const [icon, setIcon] = useState(category?.icon || '📋');
  const [parentId, setParentId] = useState<string>(category?.parentId || 'none');
  const [isActive, setIsActive] = useState(category?.isActive ?? true);
  const [isSpecial, setIsSpecial] = useState(category?.isSpecial || false);
  const [specialRoute, setSpecialRoute] = useState(category?.specialPageRoute || '');
  const [autoSlug, setAutoSlug] = useState(!category); // Auto-generate slug for new categories

  // Handle name change and auto-generate slug if enabled
  const handleNameEnChange = (value: string) => {
    setNameEn(value);
    if (autoSlug && value) {
      setSlug(generateSlug(value));
    }
  };

  // Get available parent categories (exclude current category and its children)
  const getAvailableParents = () => {
    if (!category) return categories;

    // Recursive function to get all child IDs
    const getChildIds = (catId: string): string[] => {
      const children = categories.filter((c) => c.parentId === catId);
      const childIds = children.map((c) => c.id);
      const grandchildIds = children.flatMap((c) => getChildIds(c.id));
      return [...childIds, ...grandchildIds];
    };

    const excludeIds = [category.id, ...getChildIds(category.id)];
    return categories.filter((c) => !excludeIds.includes(c.id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!nameEn.trim() || !nameDv.trim()) {
      alert('Please provide both English and Dhivehi names');
      return;
    }

    if (!slug.trim()) {
      alert('Please provide a slug');
      return;
    }

    if (!isSlugUnique(slug, category?.id)) {
      alert('This slug is already in use. Please choose another.');
      return;
    }

    if (isSpecial && !specialRoute.trim()) {
      alert('Special categories require a route path');
      return;
    }

    const categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'> = {
      name: { en: nameEn.trim(), dv: nameDv.trim() },
      slug: slug.trim(),
      color,
      parentId: parentId === 'none' ? null : parentId,
      description: {
        en: descEn.trim(),
        dv: descDv.trim(),
      },
      icon,
      order: category?.order || 0,
      isActive,
      isSpecial,
      specialPageRoute: isSpecial ? specialRoute.trim() : null,
      createdBy: category?.createdBy,
    };

    onSubmit(categoryData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Names */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name-en">Name (English) *</Label>
          <Input
            id="name-en"
            value={nameEn}
            onChange={(e) => handleNameEnChange(e.target.value)}
            placeholder="e.g., Politics"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name-dv">Name (Dhivehi) *</Label>
          <Input
            id="name-dv"
            value={nameDv}
            onChange={(e) => setNameDv(e.target.value)}
            placeholder="e.g., ސިޔާސަތު"
            required
            dir="rtl"
          />
        </div>
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="slug">Slug *</Label>
          <label className="flex items-center gap-2 text-xs text-gray-500">
            <Checkbox
              checked={autoSlug}
              onCheckedChange={(checked) => setAutoSlug(checked as boolean)}
            />
            Auto-generate
          </label>
        </div>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g., politics"
          disabled={autoSlug}
          required
        />
        <p className="text-xs text-gray-500">URL: /category/{slug || 'slug'}</p>
      </div>

      <Separator />

      {/* Descriptions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="desc-en">Description (English)</Label>
          <Textarea
            id="desc-en"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            placeholder="SEO description for category page"
            rows={3}
          />
          <p className="text-xs text-gray-500">{descEn.length} / 160 characters</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc-dv">Description (Dhivehi)</Label>
          <Textarea
            id="desc-dv"
            value={descDv}
            onChange={(e) => setDescDv(e.target.value)}
            placeholder="ކެޓަގަރީގެ ސަފުހާއަށް SEO ލިޔުން"
            rows={3}
            dir="rtl"
          />
          <p className="text-xs text-gray-500">{descDv.length} / 160 characters</p>
        </div>
      </div>

      <Separator />

      {/* Visual customization */}
      <div className="grid grid-cols-2 gap-4">
        <CategoryIconPicker value={icon} onChange={setIcon} />
        <CategoryColorPicker value={color} onChange={setColor} />
      </div>

      <Separator />

      {/* Hierarchy */}
      <div className="space-y-2">
        <Label htmlFor="parent">Parent Category</Label>
        <Select value={parentId} onValueChange={setParentId}>
          <SelectTrigger id="parent">
            <SelectValue placeholder="Select parent category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None (Root level)</SelectItem>
            {getAvailableParents()
              .filter((c) => c.id !== 'uncategorized' && c.isActive)
              .sort((a, b) => a.order - b.order)
              .map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name.en}
                  {cat.parentId && ' (Child)'}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">
          Leave as root level or nest under another category
        </p>
      </div>

      <Separator />

      {/* Special category */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="special"
            checked={isSpecial}
            onCheckedChange={(checked) => setIsSpecial(checked as boolean)}
          />
          <div>
            <Label htmlFor="special" className="cursor-pointer">
              Special Category
            </Label>
            <p className="text-xs text-gray-500">
              Categories with custom pages (e.g., Elections)
            </p>
          </div>
        </div>

        {isSpecial && (
          <div className="space-y-2 ml-6">
            <Label htmlFor="route">Custom Route *</Label>
            <Input
              id="route"
              value={specialRoute}
              onChange={(e) => setSpecialRoute(e.target.value)}
              placeholder="/elections"
              required={isSpecial}
            />
            <p className="text-xs text-gray-500">
              Path to custom page (must start with /)
            </p>
          </div>
        )}
      </div>

      {/* Active toggle */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="active"
          checked={isActive}
          onCheckedChange={(checked) => setIsActive(checked as boolean)}
        />
        <div>
          <Label htmlFor="active" className="cursor-pointer">
            Active
          </Label>
          <p className="text-xs text-gray-500">
            Inactive categories are hidden from public views
          </p>
        </div>
      </div>

      <Separator />

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          {category ? 'Update Category' : 'Create Category'}
        </Button>
      </div>
    </form>
  );
}
