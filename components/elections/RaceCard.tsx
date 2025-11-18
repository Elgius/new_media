'use client';

import { ElectionRace } from '@/lib/types';
import { useUIStore } from '@/lib/stores/uiStore';
import { getTranslation } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RaceCardProps {
  race: ElectionRace;
  compact?: boolean;
}

export function RaceCard({ race, compact = false }: RaceCardProps) {
  const { language } = useUIStore();

  const getRaceTypeBadge = () => {
    const type = race.type;
    const colors = {
      presidential: 'bg-red-500',
      parliamentary: 'bg-blue-500',
      local: 'bg-green-500'
    };

    return (
      <Badge className={`${colors[type]} text-white`}>
        {getTranslation(`elections.raceType.${type}`, language)}
      </Badge>
    );
  };

  const getStatusBadge = () => {
    if (race.status === 'live') {
      return (
        <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
          <Activity className="h-4 w-4 animate-pulse" />
          <span>{getTranslation('elections.live', language)}</span>
        </div>
      );
    } else if (race.status === 'final') {
      return (
        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
          <Check className="h-4 w-4" />
          <span>{getTranslation('elections.final', language)}</span>
        </div>
      );
    }
    return null;
  };

  // Sort candidates by percentage (descending)
  const sortedCandidates = [...race.candidates].sort((a, b) => b.percentage - a.percentage);

  // Show top 3 candidates in compact mode, all in full mode
  const displayCandidates = compact ? sortedCandidates.slice(0, 3) : sortedCandidates;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {getRaceTypeBadge()}
            {getStatusBadge()}
          </div>
          <h3 className={`font-bold text-foreground ${compact ? 'text-lg' : 'text-xl'}`}>
            {race.name[language.code]}
          </h3>
        </div>
      </div>

      {/* Reporting Percentage */}
      <div className="mb-4 text-sm text-muted-foreground">
        <span className="font-medium">{race.reportingPercentage}%</span>{' '}
        {getTranslation('elections.reporting', language)}
      </div>

      {/* Candidates */}
      <div className="space-y-4">
        {displayCandidates.map((candidate) => (
          <div key={candidate.id}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="font-semibold text-foreground truncate">
                    {candidate.name[language.code]}
                  </span>
                  {candidate.isWinner && (
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  )}
                </div>
              </div>
              <div className="text-right ml-4 flex-shrink-0">
                <div className="font-bold text-foreground">{candidate.percentage}%</div>
                <div className="text-xs text-muted-foreground">
                  {candidate.votes.toLocaleString('en-US')} {getTranslation('elections.votes', language)}
                </div>
              </div>
            </div>

            {/* Party */}
            <div className="text-sm text-muted-foreground mb-2">
              {candidate.party[language.code]}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${candidate.percentage}%`,
                  backgroundColor: candidate.partyColor
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total Votes & Last Updated */}
      <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
        <div className="flex justify-between items-center">
          <span>
            {getTranslation('elections.totalVotes', language)}:{' '}
            <span className="font-medium">{race.totalVotes.toLocaleString('en-US')}</span>
          </span>
          <span className="text-xs">
            {getTranslation('elections.updated', language)}{' '}
            {formatDistanceToNow(race.lastUpdated, { addSuffix: true })}
          </span>
        </div>
      </div>
    </Card>
  );
}
