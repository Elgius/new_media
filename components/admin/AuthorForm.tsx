'use client';

/**
 * Form component for creating and editing authors
 * Supports bilingual input, social links, and slug generation
 */

import { useState } from 'react';
import { Author } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Helper function to generate slug from name
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

interface AuthorFormProps {
  author?: Author; // If editing, pass existing author
  onSubmit: (author: Omit<Author, 'id' | 'createdAt' | 'isDeleted'>) => void;
  onCancel: () => void;
  existingSlugs?: string[]; // Array of slugs to check for uniqueness
}

export function AuthorForm({ author, onSubmit, onCancel, existingSlugs = [] }: AuthorFormProps) {
  // Form state
  const [nameEn, setNameEn] = useState(author?.name.en || '');
  const [nameDv, setNameDv] = useState(author?.name.dv || '');
  const [slug, setSlug] = useState(author?.slug || '');
  const [bioEn, setBioEn] = useState(author?.bio.en || '');
  const [bioDv, setBioDv] = useState(author?.bio.dv || '');
  const [photo, setPhoto] = useState(author?.photo || '');
  const [twitter, setTwitter] = useState(author?.socialLinks?.twitter || '');
  const [linkedin, setLinkedin] = useState(author?.socialLinks?.linkedin || '');
  const [facebook, setFacebook] = useState(author?.socialLinks?.facebook || '');
  const [email, setEmail] = useState(author?.socialLinks?.email || '');
  const [autoSlug, setAutoSlug] = useState(!author); // Auto-generate slug for new authors

  // Handle name change and auto-generate slug if enabled
  const handleNameEnChange = (value: string) => {
    setNameEn(value);
    if (autoSlug && value) {
      setSlug(generateSlug(value));
    }
  };

  // Check if slug is unique
  const isSlugUnique = (slugToCheck: string): boolean => {
    // If editing, allow the current author's slug
    if (author && slugToCheck === author.slug) {
      return true;
    }
    return !existingSlugs.includes(slugToCheck);
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

    if (!isSlugUnique(slug)) {
      alert('This slug is already in use. Please choose another.');
      return;
    }

    if (!bioEn.trim() || !bioDv.trim()) {
      alert('Please provide both English and Dhivehi bios');
      return;
    }

    if (!photo.trim()) {
      alert('Please provide a photo URL');
      return;
    }

    // Email validation if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please provide a valid email address');
      return;
    }

    const authorData: Omit<Author, 'id' | 'createdAt' | 'isDeleted'> = {
      name: { en: nameEn.trim(), dv: nameDv.trim() },
      slug: slug.trim(),
      bio: { en: bioEn.trim(), dv: bioDv.trim() },
      photo: photo.trim(),
      socialLinks: {
        ...(twitter.trim() && { twitter: twitter.trim() }),
        ...(linkedin.trim() && { linkedin: linkedin.trim() }),
        ...(facebook.trim() && { facebook: facebook.trim() }),
        ...(email.trim() && { email: email.trim() }),
      },
    };

    onSubmit(authorData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Author name and identification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nameEn">
                English Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nameEn"
                value={nameEn}
                onChange={(e) => handleNameEnChange(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nameDv">
                Dhivehi Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nameDv"
                value={nameDv}
                onChange={(e) => setNameDv(e.target.value)}
                placeholder="ޖޯން ޑޯ"
                required
                className="text-right"
                dir="rtl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setAutoSlug(!autoSlug)}
                className="text-xs"
              >
                {autoSlug ? '🔒 Auto-generate' : '🔓 Manual'}
              </Button>
            </div>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setAutoSlug(false);
              }}
              placeholder="john-doe"
              required
              disabled={autoSlug}
            />
            <p className="text-xs text-muted-foreground">
              URL-friendly identifier (e.g., john-doe for /writers/john-doe)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">
              Photo URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="photo"
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              required
            />
            <p className="text-xs text-muted-foreground">
              Use an Unsplash image URL or any valid image URL
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      <Card>
        <CardHeader>
          <CardTitle>Biography</CardTitle>
          <CardDescription>Author background and description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bioEn">
              English Bio <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="bioEn"
              value={bioEn}
              onChange={(e) => setBioEn(e.target.value)}
              placeholder="Enter author biography in English..."
              rows={4}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bioDv">
              Dhivehi Bio <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="bioDv"
              value={bioDv}
              onChange={(e) => setBioDv(e.target.value)}
              placeholder="ލިޔުންތެރިޔާގެ ތަޢާރަފު ދިވެހިބަހުން..."
              rows={4}
              required
              className="text-right"
              dir="rtl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Optional social media profiles and contact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://twitter.com/johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@newshub.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Form Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{author ? 'Update Author' : 'Create Author'}</Button>
      </div>
    </form>
  );
}
