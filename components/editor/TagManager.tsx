'use client';

import { useState } from 'react';
import { BilingualText } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface TagManagerProps {
  tags: BilingualText[];
  onTagsChange: (tags: BilingualText[]) => void;
}

export function TagManager({ tags, onTagsChange }: TagManagerProps) {
  const [tagInputEn, setTagInputEn] = useState('');
  const [tagInputDv, setTagInputDv] = useState('');

  const handleAddTag = () => {
    if (tagInputEn.trim() || tagInputDv.trim()) {
      const newTag: BilingualText = {
        en: tagInputEn.trim() || tagInputDv.trim(),
        dv: tagInputDv.trim() || tagInputEn.trim(),
      };
      onTagsChange([...tags, newTag]);
      setTagInputEn('');
      setTagInputDv('');
    }
  };

  const handleRemoveTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Tags</label>

      {/* Tag Input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Tag (English)"
            value={tagInputEn}
            onChange={(e) => setTagInputEn(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Input
            type="text"
            placeholder="Tag (Dhivehi)"
            value={tagInputDv}
            onChange={(e) => setTagInputDv(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddTag}
            disabled={!tagInputEn.trim() && !tagInputDv.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Press Enter or click + to add tag. Fill at least one language.
        </p>
      </div>

      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 rounded-lg border bg-muted/30">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="gap-2 pr-1">
              <span>{tag.en}</span>
              {tag.dv && tag.dv !== tag.en && (
                <span className="text-muted-foreground">/ {tag.dv}</span>
              )}
              <button
                type="button"
                onClick={() => handleRemoveTag(index)}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
