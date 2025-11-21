'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Author } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash2, RotateCcw, ExternalLink, FileText } from 'lucide-react';
import { useUIStore } from '@/lib/stores/uiStore';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AuthorCardProps {
  author: Author;
  articleCount: number;
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
}

export function AuthorCard({ author, articleCount, onDelete, onRestore }: AuthorCardProps) {
  const language = useUIStore((state) => state.language);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);

  const name = author.name[language.code];
  const bio = author.bio[language.code];

  // Truncate bio to 2 lines (approximately 100 characters)
  const truncatedBio = bio.length > 100 ? bio.substring(0, 100) + '...' : bio;

  const handleDelete = () => {
    onDelete(author.id);
    setShowDeleteDialog(false);
  };

  const handleRestore = () => {
    onRestore(author.id);
    setShowRestoreDialog(false);
  };

  return (
    <>
      <Card className={`h-full flex flex-col ${author.isDeleted ? 'opacity-60 border-red-300' : ''}`}>
        <CardContent className="pt-6 flex-1">
          {/* Author Photo */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={author.photo}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-lg truncate">{name}</h3>
                  {author.isDeleted && (
                    <Badge variant="destructive" className="mt-1">
                      DELETED
                    </Badge>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!author.isDeleted && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/authors/${author.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/writers/${author.slug}`} target="_blank">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setShowDeleteDialog(true)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </>
                    )}
                    {author.isDeleted && (
                      <DropdownMenuItem
                        onClick={() => setShowRestoreDialog(true)}
                        className="text-green-600"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restore
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {truncatedBio}
          </p>

          {/* Article Count Badge */}
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{articleCount}</span>
            <span className="text-muted-foreground">
              {articleCount === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {/* Social Links */}
          {author.socialLinks && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {author.socialLinks.twitter && (
                <Badge variant="outline" className="text-xs">
                  Twitter
                </Badge>
              )}
              {author.socialLinks.linkedin && (
                <Badge variant="outline" className="text-xs">
                  LinkedIn
                </Badge>
              )}
              {author.socialLinks.facebook && (
                <Badge variant="outline" className="text-xs">
                  Facebook
                </Badge>
              )}
              {author.socialLinks.email && (
                <Badge variant="outline" className="text-xs">
                  Email
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        {!author.isDeleted && (
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/admin/authors/${author.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Author
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Author</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{name}</strong>? This author has{' '}
              <strong>{articleCount}</strong> {articleCount === 1 ? 'article' : 'articles'}.
              <br />
              <br />
              The author and their articles will be hidden from public view but can be restored
              later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Restore Confirmation Dialog */}
      <AlertDialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore Author</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to restore <strong>{name}</strong>? This will make the author
              and their articles visible again on the public site.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRestore}
              className="bg-green-600 hover:bg-green-700"
            >
              Restore
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
