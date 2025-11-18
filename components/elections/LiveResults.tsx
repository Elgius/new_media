'use client';

import { ElectionRace } from '@/lib/types';
import { useUIStore } from '@/lib/stores/uiStore';
import { getTranslation } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Check, TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface LiveResultsProps {
  race: ElectionRace;
}

type SortField = 'name' | 'party' | 'votes' | 'percentage';
type SortDirection = 'asc' | 'desc';

export function LiveResults({ race }: LiveResultsProps) {
  const { language } = useUIStore();
  const [sortField, setSortField] = useState<SortField>('percentage');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedCandidates = [...race.candidates].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case 'name':
        comparison = a.name[language.code].localeCompare(b.name[language.code]);
        break;
      case 'party':
        comparison = a.party[language.code].localeCompare(b.party[language.code]);
        break;
      case 'votes':
        comparison = a.votes - b.votes;
        break;
      case 'percentage':
        comparison = a.percentage - b.percentage;
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <TrendingUp className="h-4 w-4 inline ml-1" />
    ) : (
      <TrendingDown className="h-4 w-4 inline ml-1" />
    );
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {race.name[language.code]}
        </h3>
        <p className="text-sm text-muted-foreground">
          {race.reportingPercentage}% {getTranslation('elections.reporting', language)} •{' '}
          {race.totalVotes.toLocaleString('en-US')} {getTranslation('elections.totalVotes', language)}
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="hover:text-primary transition-colors"
                >
                  {getTranslation('elections.table.candidate', language)}
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">
                <button
                  onClick={() => handleSort('party')}
                  className="hover:text-primary transition-colors"
                >
                  {getTranslation('elections.table.party', language)}
                  <SortIcon field="party" />
                </button>
              </th>
              <th className="text-right py-3 px-2 font-semibold text-foreground">
                <button
                  onClick={() => handleSort('votes')}
                  className="hover:text-primary transition-colors"
                >
                  {getTranslation('elections.table.votes', language)}
                  <SortIcon field="votes" />
                </button>
              </th>
              <th className="text-right py-3 px-2 font-semibold text-foreground">
                <button
                  onClick={() => handleSort('percentage')}
                  className="hover:text-primary transition-colors"
                >
                  {getTranslation('elections.table.percentage', language)}
                  <SortIcon field="percentage" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCandidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="border-b hover:bg-muted/50 transition-colors"
              >
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={candidate.photo}
                        alt={candidate.name[language.code]}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {candidate.name[language.code]}
                      </span>
                      {candidate.isWinner && (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: candidate.partyColor }}
                  >
                    {candidate.party[language.code]}
                  </span>
                </td>
                <td className="py-4 px-2 text-right font-semibold text-foreground">
                  {candidate.votes.toLocaleString('en-US')}
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <span className="font-bold text-lg text-foreground">
                      {candidate.percentage}%
                    </span>
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${candidate.percentage}%`,
                          backgroundColor: candidate.partyColor
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {sortedCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={candidate.photo}
                  alt={candidate.name[language.code]}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-foreground">
                    {candidate.name[language.code]}
                  </h4>
                  {candidate.isWinner && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <p
                  className="text-sm font-medium"
                  style={{ color: candidate.partyColor }}
                >
                  {candidate.party[language.code]}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold text-foreground">
                {candidate.percentage}%
              </span>
              <span className="text-sm text-muted-foreground">
                {candidate.votes.toLocaleString('en-US')} {getTranslation('elections.votes', language)}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
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
    </Card>
  );
}
