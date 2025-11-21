'use client';

import { Author } from '@/lib/types';
import { authors } from '@/lib/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AuthorSelectorProps {
  selectedAuthorId?: string;
  onAuthorChange: (author: Author) => void;
}

export function AuthorSelector({ selectedAuthorId, onAuthorChange }: AuthorSelectorProps) {
  const handleValueChange = (authorId: string) => {
    const author = authors.find((a) => a.id === authorId);
    if (author) {
      onAuthorChange(author);
    }
  };

  const selectedAuthor = authors.find((a) => a.id === selectedAuthorId);

  return (
    <Select value={selectedAuthorId} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select an author">
          {selectedAuthor && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={selectedAuthor.photo} alt={selectedAuthor.name.en} />
                <AvatarFallback>
                  {selectedAuthor.name.en.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{selectedAuthor.name.en}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {authors.map((author) => (
          <SelectItem key={author.id} value={author.id}>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={author.photo} alt={author.name.en} />
                <AvatarFallback>{author.name.en.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{author.name.en}</div>
                <div className="text-xs text-muted-foreground">{author.name.dv}</div>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
