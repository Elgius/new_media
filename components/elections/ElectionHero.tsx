'use client';

import { ElectionRace } from '@/lib/types';
import { useUIStore } from '@/lib/stores/uiStore';
import { getTranslation } from '@/lib/translations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Check, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

interface ElectionHeroProps {
  race: ElectionRace;
}

export function ElectionHero({ race }: ElectionHeroProps) {
  const { language } = useUIStore();

  const getRaceTypeBadge = () => {
    const type = race.type;
    const colors = {
      presidential: 'bg-red-500',
      parliamentary: 'bg-blue-500',
      local: 'bg-green-500'
    };

    return (
      <Badge className={`${colors[type]} text-white text-base px-4 py-1`}>
        {getTranslation(`elections.raceType.${type}`, language)}
      </Badge>
    );
  };

  const getStatusIndicator = () => {
    if (race.status === 'live') {
      return (
        <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg">
          <Activity className="h-5 w-5 animate-pulse" />
          <span className="font-bold uppercase tracking-wide">
            {getTranslation('elections.live', language)}
          </span>
        </div>
      );
    } else if (race.status === 'final') {
      return (
        <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg">
          <Check className="h-5 w-5" />
          <span className="font-bold uppercase tracking-wide">
            {getTranslation('elections.final', language)}
          </span>
        </div>
      );
    }
    return null;
  };

  // Get top 3 candidates
  const topCandidates = [...race.candidates]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background border-2 border-primary/20 rounded-lg overflow-hidden">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {getStatusIndicator()}
          {getRaceTypeBadge()}
          <div className="ml-auto text-sm text-muted-foreground">
            {getTranslation('elections.updated', language)}{' '}
            {formatDistanceToNow(race.lastUpdated, { addSuffix: true })}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {race.name[language.code]}
        </h1>

        {/* Reporting Status */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg font-semibold text-foreground">
              {race.reportingPercentage}% {getTranslation('elections.reporting', language)}
            </span>
            <span className="text-muted-foreground">
              ({race.totalVotes.toLocaleString('en-US')} {getTranslation('elections.votes', language)})
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${race.reportingPercentage}%` }}
            />
          </div>
        </div>

        {/* Top Candidates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCandidates.map((candidate, index) => (
            <div
              key={candidate.id}
              className={`bg-white rounded-lg p-6 border-2 transition-all hover:shadow-lg ${
                index === 0 ? 'border-primary ring-2 ring-primary/20' : 'border-border'
              }`}
            >
              {/* Candidate Photo */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={candidate.photo}
                  alt={candidate.name[language.code]}
                  fill
                  className="object-cover rounded-full"
                />
                {candidate.isWinner && (
                  <div className="absolute -top-2 -right-2 bg-green-600 rounded-full p-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>

              {/* Candidate Info */}
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg text-foreground mb-1">
                  {candidate.name[language.code]}
                </h3>
                <p
                  className="text-sm font-medium mb-2"
                  style={{ color: candidate.partyColor }}
                >
                  {candidate.party[language.code]}
                </p>
              </div>

              {/* Vote Stats */}
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-1">
                  {candidate.percentage}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {candidate.votes.toLocaleString('en-US')} {getTranslation('elections.votes', language)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 w-full bg-muted rounded-full h-2">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${candidate.percentage}%`,
                    backgroundColor: candidate.partyColor
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* View Full Results CTA */}
        <div className="mt-8 text-center">
          <Link href="/elections">
            <Button size="lg" className="gap-2">
              {getTranslation('elections.viewFullResults', language)}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
