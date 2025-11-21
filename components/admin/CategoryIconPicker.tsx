'use client';

/**
 * Icon/Emoji picker component for category icons
 * Uses emoji-picker-react for easy selection
 */

import { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface CategoryIconPickerProps {
  value?: string;
  onChange: (icon: string) => void;
}

// Suggested category icons
const SUGGESTED_ICONS = [
  '📰', // News
  '🏛️', // Politics
  '⚽', // Sports
  '💼', // Business
  '🏘️', // Local
  '🗳️', // Elections
  '🌍', // World
  '💻', // Technology
  '🎨', // Arts & Culture
  '🎬', // Entertainment
  '🏥', // Health
  '🔬', // Science
  '📚', // Education
  '🍽️', // Food
  '✈️', // Travel
  '🏦', // Finance
  '⚖️', // Legal
  '🌱', // Environment
  '🏗️', // Development
  '📱', // Mobile
];

export function CategoryIconPicker({ value = '📋', onChange }: CategoryIconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChange(emojiData.emoji);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <Label>Icon</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <span className="text-2xl">{value}</span>
            <span className="text-sm text-gray-500">Click to change</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3" align="start">
          <div className="space-y-3">
            {/* Suggested icons */}
            <div>
              <Label className="text-xs text-gray-500">Suggested Icons</Label>
              <div className="grid grid-cols-10 gap-1 mt-2">
                {SUGGESTED_ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className={`h-8 w-8 rounded text-xl transition-all hover:scale-110 hover:bg-gray-100 ${
                      value === icon ? 'bg-green-100 ring-2 ring-green-500' : ''
                    }`}
                    onClick={() => {
                      onChange(icon);
                      setIsOpen(false);
                    }}
                    title={icon}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Full emoji picker */}
            <div>
              <Label className="text-xs text-gray-500">All Emojis</Label>
              <div className="mt-2">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width="100%"
                  height={350}
                  searchPlaceholder="Search icons..."
                  previewConfig={{ showPreview: false }}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
