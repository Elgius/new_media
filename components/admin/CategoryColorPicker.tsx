'use client';

/**
 * Color picker component for category colors
 * Uses react-colorful with preset theme colors
 */

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface CategoryColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

// Preset theme colors (green shades for the news site)
const PRESET_COLORS = [
  '#0F8A2F', // Primary green
  '#40B657', // Secondary green
  '#1A5D2F', // Dark green
  '#2DA84A', // Medium green
  '#059669', // Emerald
  '#10B981', // Light emerald
  '#065F46', // Deep green
  '#047857', // Forest green
  // Additional colors for variety
  '#DC2626', // Red (for special categories like Elections)
  '#2563EB', // Blue
  '#7C3AED', // Purple
  '#DB2777', // Pink
  '#EA580C', // Orange
  '#CA8A04', // Gold
  '#6B7280', // Gray
  '#1F2937', // Dark gray
];

export function CategoryColorPicker({ value, onChange }: CategoryColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label>Color</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <div
              className="h-5 w-5 rounded border border-gray-300"
              style={{ backgroundColor: value }}
            />
            <span className="text-sm">{value.toUpperCase()}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3" align="start">
          <div className="space-y-3">
            {/* Custom color picker */}
            <div>
              <Label className="text-xs text-gray-500">Custom Color</Label>
              <HexColorPicker color={value} onChange={onChange} className="w-full mt-2" />
            </div>

            {/* Preset colors */}
            <div>
              <Label className="text-xs text-gray-500">Theme Colors</Label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`h-7 w-7 rounded border-2 transition-all hover:scale-110 ${
                      value.toLowerCase() === color.toLowerCase()
                        ? 'border-black ring-2 ring-offset-1 ring-black'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      onChange(color);
                      setIsOpen(false);
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
