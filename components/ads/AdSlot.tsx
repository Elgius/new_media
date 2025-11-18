import Image from 'next/image';
import { AdSlot as AdSlotType } from '@/lib/types';

interface AdSlotProps {
  slot: Partial<AdSlotType> & { size: AdSlotType['size'] };
  className?: string;
}

export function AdSlot({ slot, className = '' }: AdSlotProps) {
  const sizeClasses = {
    banner: 'w-full h-24', // 728x90
    rectangle: 'w-full aspect-[300/250]', // 300x250
    inline: 'w-full h-32',
  };

  const sizeLabels = {
    banner: '728 x 90',
    rectangle: '300 x 250',
    inline: 'Inline Ad',
  };

  return (
    <div
      className={`flex items-center justify-center bg-muted/30 border border-dashed border-muted-foreground/30 rounded ${sizeClasses[slot.size]} ${className}`}
    >
      {slot.imageUrl ? (
        <div className="relative w-full h-full">
          <Image
            src={slot.imageUrl}
            alt="Advertisement"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ) : slot.htmlContent ? (
        <div dangerouslySetInnerHTML={{ __html: slot.htmlContent }} />
      ) : (
        <div className="text-center px-4">
          <p className="text-sm text-muted-foreground font-medium">Advertisement</p>
          <p className="text-xs text-muted-foreground mt-1">{sizeLabels[slot.size]}</p>
        </div>
      )}
    </div>
  );
}
