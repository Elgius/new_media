'use client';

/**
 * New Author Page - Create new author
 */

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthorStore } from '@/lib/stores/authorStore';
import { Author } from '@/lib/types';
import { AuthorForm } from '@/components/admin/AuthorForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserPlus } from 'lucide-react';

export default function NewAuthorPage() {
  const router = useRouter();
  const { createAuthor, getAllAuthors } = useAuthorStore();

  const existingAuthors = getAllAuthors();
  const existingSlugs = existingAuthors.map((a) => a.slug);

  const handleSubmit = (authorData: Omit<Author, 'id' | 'createdAt' | 'isDeleted'>) => {
    // Generate new ID (in production, this would be handled by the backend)
    const newId = String(Math.max(...existingAuthors.map((a) => parseInt(a.id) || 0), 0) + 1);

    const newAuthor: Author = {
      ...authorData,
      id: newId,
      createdAt: new Date(),
      isDeleted: false,
    };

    createAuthor(newAuthor);
    router.push('/admin/authors');
  };

  const handleCancel = () => {
    router.push('/admin/authors');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/authors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <UserPlus className="h-8 w-8" />
              New Author
            </h1>
            <p className="text-muted-foreground mt-1">
              Create a new writer or contributor
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <AuthorForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        existingSlugs={existingSlugs}
      />
    </div>
  );
}
