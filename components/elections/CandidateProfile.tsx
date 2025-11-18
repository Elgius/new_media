'use client';

import { Candidate } from '@/lib/types';
import { useUIStore } from '@/lib/stores/uiStore';
import { getTranslation } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import Image from 'next/image';

interface CandidateProfileProps {
  candidate: Candidate;
  showBio?: boolean;
}

export function CandidateProfile({ candidate, showBio = true }: CandidateProfileProps) {
  const { language } = useUIStore();

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src={candidate.photo}
              alt={candidate.name[language.code]}
              fill
              className="object-cover rounded-lg"
            />
            {candidate.isWinner && (
              <div className="absolute -top-2 -right-2 bg-green-600 rounded-full p-2">
                <Check className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          {/* Name & Party */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {candidate.name[language.code]}
            </h3>
            <Badge
              className="text-white"
              style={{ backgroundColor: candidate.partyColor }}
            >
              {candidate.party[language.code]}
            </Badge>
          </div>

          {/* Vote Statistics */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-3xl font-bold text-foreground">
                {candidate.percentage}%
              </div>
              <div className="text-sm text-muted-foreground">
                {getTranslation('elections.voteShare', language)}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">
                {candidate.votes.toLocaleString('en-US')}
              </div>
              <div className="text-sm text-muted-foreground">
                {getTranslation('elections.votes', language)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${candidate.percentage}%`,
                  backgroundColor: candidate.partyColor
                }}
              />
            </div>
          </div>

          {/* Bio */}
          {showBio && candidate.bio && (
            <div className="mt-4">
              <h4 className="font-semibold text-foreground mb-2">
                {getTranslation('elections.about', language)}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {candidate.bio[language.code]}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
