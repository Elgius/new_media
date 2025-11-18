'use client';

import { ElectionRace } from '@/lib/types';
import { useUIStore } from '@/lib/stores/uiStore';
import { getTranslation } from '@/lib/translations';
import { RaceCard } from './RaceCard';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface RaceDashboardProps {
  races: ElectionRace[];
}

type RaceFilter = 'all' | 'live' | 'final' | 'upcoming';

export function RaceDashboard({ races }: RaceDashboardProps) {
  const { language } = useUIStore();
  const [filter, setFilter] = useState<RaceFilter>('all');

  const filteredRaces = races.filter((race) => {
    if (filter === 'all') return true;
    return race.status === filter;
  });

  const getFilterCount = (filterType: RaceFilter) => {
    if (filterType === 'all') return races.length;
    return races.filter((race) => race.status === filterType).length;
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          className="gap-2"
        >
          {getTranslation('elections.filter.all', language)}
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
            {getFilterCount('all')}
          </span>
        </Button>
        <Button
          variant={filter === 'live' ? 'default' : 'outline'}
          onClick={() => setFilter('live')}
          className="gap-2"
        >
          {getTranslation('elections.filter.live', language)}
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
            {getFilterCount('live')}
          </span>
        </Button>
        <Button
          variant={filter === 'final' ? 'default' : 'outline'}
          onClick={() => setFilter('final')}
          className="gap-2"
        >
          {getTranslation('elections.filter.final', language)}
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
            {getFilterCount('final')}
          </span>
        </Button>
        <Button
          variant={filter === 'upcoming' ? 'default' : 'outline'}
          onClick={() => setFilter('upcoming')}
          className="gap-2"
        >
          {getTranslation('elections.filter.upcoming', language)}
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
            {getFilterCount('upcoming')}
          </span>
        </Button>
      </div>

      {/* Race Grid */}
      {filteredRaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaces.map((race) => (
            <RaceCard key={race.id} race={race} compact />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {getTranslation('elections.noRaces', language)}
          </p>
        </div>
      )}
    </div>
  );
}
