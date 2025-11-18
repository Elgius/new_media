'use client';

import { ElectoralMap as ElectoralMapType, Candidate } from '@/lib/types';
import { useUIStore } from '@/lib/stores/uiStore';
import { getTranslation } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface ElectoralMapProps {
  mapData: ElectoralMapType;
  candidates: Candidate[];
}

export function ElectoralMap({ mapData, candidates }: ElectoralMapProps) {
  const { language } = useUIStore();
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getCandidateById = (id: string | null) => {
    if (!id) return null;
    return candidates.find(c => c.id === id);
  };

  const getRegionColor = (winnerId: string | null) => {
    const candidate = getCandidateById(winnerId);
    return candidate?.partyColor || '#E5E7EB';
  };

  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        {getTranslation('elections.map.title', language)}
      </h3>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-4">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: candidate.partyColor }}
            />
            <span className="text-sm font-medium text-foreground">
              {candidate.name[language.code]}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-300" />
          <span className="text-sm font-medium text-foreground">
            {getTranslation('elections.map.notReported', language)}
          </span>
        </div>
      </div>

      {/* Map Grid - Simplified representation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mapData.regions.map((region) => {
          const winner = getCandidateById(region.winnerId);
          const totalVotes = Object.values(region.votes).reduce<number>(
            (sum, votes) => sum + (votes || 0),
            0
          );

          return (
            <div
              key={region.id}
              className="relative border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-105"
              style={{
                borderColor: getRegionColor(region.winnerId),
                backgroundColor: region.winnerId
                  ? `${getRegionColor(region.winnerId)}15`
                  : '#F9FAFB'
              }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              {/* Region Name */}
              <h4 className="font-bold text-foreground mb-2">
                {region.name[language.code]}
              </h4>

              {/* Reporting Status */}
              <div className="text-xs text-muted-foreground mb-2">
                {region.reportingPercentage}% {getTranslation('elections.reporting', language)}
              </div>

              {/* Winner Info */}
              {winner && (
                <div>
                  <div
                    className="text-sm font-semibold mb-1"
                    style={{ color: winner.partyColor }}
                  >
                    {winner.name[language.code]}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {totalVotes.toLocaleString('en-US')} {getTranslation('elections.votes', language)}
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${region.reportingPercentage}%`,
                    backgroundColor: getRegionColor(region.winnerId)
                  }}
                />
              </div>

              {/* Tooltip on Hover */}
              {hoveredRegion === region.id && (
                <div className="absolute z-10 top-full left-0 mt-2 p-3 bg-white border rounded-lg shadow-lg min-w-[200px]">
                  <h5 className="font-bold text-foreground mb-2">
                    {region.name[language.code]}
                  </h5>
                  <div className="space-y-1">
                    {Object.entries(region.votes).map(([candidateId, votes]) => {
                      const candidate = getCandidateById(candidateId);
                      if (!candidate || votes === null) return null;

                      const percentage = totalVotes > 0
                        ? Math.round((votes / totalVotes) * 100)
                        : 0;

                      return (
                        <div
                          key={candidateId}
                          className="flex justify-between items-center text-sm"
                        >
                          <span style={{ color: candidate.partyColor }}>
                            {candidate.name[language.code]}
                          </span>
                          <span className="font-medium text-foreground">
                            {percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {mapData.regions.length}
            </div>
            <div className="text-sm text-muted-foreground">
              {getTranslation('elections.map.totalRegions', language)}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {mapData.regions.filter(r => r.reportingPercentage === 100).length}
            </div>
            <div className="text-sm text-muted-foreground">
              {getTranslation('elections.map.complete', language)}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {Math.round(
                mapData.regions.reduce((sum, r) => sum + r.reportingPercentage, 0) /
                  mapData.regions.length
              )}%
            </div>
            <div className="text-sm text-muted-foreground">
              {getTranslation('elections.map.avgReporting', language)}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {mapData.regions.filter(r => r.winnerId !== null).length}
            </div>
            <div className="text-sm text-muted-foreground">
              {getTranslation('elections.map.called', language)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
