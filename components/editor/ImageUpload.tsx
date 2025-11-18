'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Link as LinkIcon } from 'lucide-react';

interface ImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ imageUrl, onImageChange, label = 'Cover Image' }: ImageUploadProps) {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock upload: convert to object URL for preview
      const objectUrl = URL.createObjectURL(file);
      onImageChange(objectUrl);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onImageChange(urlInput.trim());
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  const handleRemoveImage = () => {
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">{label}</label>

      {imageUrl ? (
        <div className="relative group">
          <div className="relative w-full h-64 rounded-lg overflow-hidden border">
            <Image
              src={imageUrl}
              alt="Cover preview"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setShowUrlInput(!showUrlInput)}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Image URL
            </Button>
          </div>

          {showUrlInput && (
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleUrlSubmit();
                  }
                }}
              />
              <Button type="button" onClick={handleUrlSubmit}>
                Add
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
            <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No image selected</p>
          </div>
        </div>
      )}
    </div>
  );
}
