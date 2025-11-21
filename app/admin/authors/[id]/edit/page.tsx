'use client';

/**
 * Edit Author Page - Update existing author
 */

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthorStore } from '@/lib/stores/authorStore';
import { Author } from '@/lib/types';
import { AuthorForm } from '@/components/admin/AuthorForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';

export default function EditAuthorPage() {
  const router = useRouter();
  const params = useParams();
  const authorId = params.id as string;

  const { getAuthorById, updateAuthor, getAllAuthors } = useAuthorStore();

  const author = getAuthorById(authorId);
  const existingAuthors = getAllAuthors();
  const existingSlugs = existingAuthors.map((a) => a.slug);

  if (!author) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/authors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Author Not Found</h1>
            <p className="text-muted-foreground mt-1">
              The author you are looking for does not exist.
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/admin/authors">Back to Authors</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (authorData: Omit<Author, 'id' | 'createdAt' | 'isDeleted'>) => {
    updateAuthor(authorId, authorData);
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
              <Edit className="h-8 w-8" />
              Edit Author
            </h1>
            <p className="text-muted-foreground mt-1">
              Update {author.name.en}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <AuthorForm
        author={author}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        existingSlugs={existingSlugs}
      />
    </div>
  );
}
