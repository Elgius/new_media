'use client';

import { useUIStore } from '@/lib/stores/uiStore';
import { getTranslation } from '@/lib/translations';
import { electionRaces, electoralMaps } from '@/lib/electionData';
import { ElectionHero } from '@/components/elections/ElectionHero';
import { ElectoralMap } from '@/components/elections/ElectoralMap';
import { RaceDashboard } from '@/components/elections/RaceDashboard';
import { LiveResults } from '@/components/elections/LiveResults';
import { AdSlot } from '@/components/ads/AdSlot';

export default function ElectionsPage() {
  const { language } = useUIStore();

  // Get the featured presidential race
  const featuredRace = electionRaces.find((race) => race.type === 'presidential');
  const presidentialMap = electoralMaps.find((map) => map.raceId === 'presidential-2024');

  // Get live races
  const liveRaces = electionRaces.filter((race) => race.status === 'live');

  return (
    <div className="min-h-screen bg-background">
      {/* Top Ad Banner */}
      <div className="container mx-auto px-4 py-4">
        <AdSlot slot={{ size: 'banner' }} />
      </div>

      {/* Hero Section - Featured Race */}
      {featuredRace && (
        <div className="mb-12">
          <ElectionHero race={featuredRace} />
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Electoral Map Section */}
        {presidentialMap && featuredRace && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {getTranslation('elections.map.heading', language)}
            </h2>
            <ElectoralMap
              mapData={presidentialMap}
              candidates={featuredRace.candidates}
            />
          </section>
        )}

        {/* Ad Slot */}
        <div className="mb-12">
          <AdSlot slot={{ size: 'rectangle' }} />
        </div>

        {/* All Races Dashboard */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            {getTranslation('elections.allRaces', language)}
          </h2>
          <RaceDashboard races={electionRaces} />
        </section>

        {/* Detailed Live Results */}
        {liveRaces.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {getTranslation('elections.liveResults', language)}
            </h2>
            <div className="space-y-6">
              {liveRaces.map((race) => (
                <LiveResults key={race.id} race={race} />
              ))}
            </div>
          </section>
        )}

        {/* Bottom Ad */}
        <div className="mb-12">
          <AdSlot slot={{ size: 'banner' }} />
        </div>
      </div>
    </div>
  );
}
