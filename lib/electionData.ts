/**
 * Mock election data for CNN-style election coverage
 * Includes presidential, parliamentary, and local races with bilingual content
 */

import { ElectionRace, Candidate, ElectoralMap, Region } from './types';

// Presidential Election 2024
export const presidentialCandidates: Candidate[] = [
  {
    id: 'candidate-1',
    name: { en: 'Ahmed Mohamed', dv: 'އަހްމަދު މުހައްމަދު' },
    party: { en: 'Progressive Party', dv: 'ޕްރޮގްރެސިވް ޕާޓީ' },
    partyColor: '#DC2626', // Red
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    votes: 67500,
    percentage: 45,
    isWinner: true,
    bio: {
      en: 'Experienced leader with 20 years in public service, focusing on economic development and social welfare.',
      dv: '20 އަހަރުގެ ދައުލަތީ ޚިދުމަތުގެ ތަޖުރިބާކާރު ލީޑަރު، އިގްތިސާދީ ތަރައްގީ އާއި އިޖުތިމާއީ ބެލެހެއްޓުމަށް އަހައްމިއްޔަތު ދެއްވާ'
    }
  },
  {
    id: 'candidate-2',
    name: { en: 'Fatima Hassan', dv: 'ފާޠިމާ ހަސަން' },
    party: { en: 'Democratic Alliance', dv: 'ޑިމޮކްރެޓިކް އެލަޔަންސް' },
    partyColor: '#2563EB', // Blue
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    votes: 52500,
    percentage: 35,
    bio: {
      en: 'Former Minister of Education, advocate for youth empowerment and climate action.',
      dv: 'ކުރީގެ އެޑިއުކޭޝަން މިނިސްޓަރު، ޒުވާނުންގެ ބާރު ލިބިދިނުމާއި ޖައްވުގެ އަމަލު ހިމާޔަތް ކުރުމަށް މަސައްކަތް ކުރައްވާ'
    }
  },
  {
    id: 'candidate-3',
    name: { en: 'Ibrahim Ali', dv: 'އިބްރާހީމް ޢަލީ' },
    party: { en: 'Reform Movement', dv: 'ރިފޯމް މޫވްމަންޓް' },
    partyColor: '#059669', // Green
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    votes: 30000,
    percentage: 20,
    bio: {
      en: 'Businessman and philanthropist committed to economic reform and transparency.',
      dv: 'ވިޔަފާރިވެރިއެއް އަދި އިޖުތިމާއީ ޚިދުމަތް ކުރައްވާ، އިގްތިސާދީ އިސްލާހު އާއި ވަކި ކަންކަމުގައި ހާމަކަމަށް ވަފާތެރި'
    }
  }
];

// Parliamentary Election 2024 - Male' Constituency
export const parliamentaryCandidates: Candidate[] = [
  {
    id: 'mp-1',
    name: { en: 'Mohamed Rasheed', dv: 'މުހައްމަދު ރަޝީދު' },
    party: { en: 'Progressive Party', dv: 'ޕްރޮގްރެސިވް ޕާޓީ' },
    partyColor: '#DC2626',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    votes: 5200,
    percentage: 42,
    isWinner: true,
    bio: {
      en: 'Incumbent MP with strong track record on infrastructure development.',
      dv: 'މިހާރުގެ މެންބަރު، އިންފްރާސްޓްރަކްޗަރ ތަރައްގީގައި ވަރުގަދަ ކާމިޔާބީއެއް ހޯދާފައި'
    }
  },
  {
    id: 'mp-2',
    name: { en: 'Aisha Ibrahim', dv: 'ޢާއިޝާ އިބްރާހީމް' },
    party: { en: 'Democratic Alliance', dv: 'ޑިމޮކްރެޓިކް އެލަޔަންސް' },
    partyColor: '#2563EB',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    votes: 4500,
    percentage: 36,
    bio: {
      en: 'Community organizer focused on healthcare and social services.',
      dv: 'ކޮމިއުނިޓީ އޯގަނައިޒަރ، ސިއްހީ ޚިދުމަތް އާއި އިޖުތިމާއީ ޚިދުމަތަށް ސަމާލުކަން ދެއްވާ'
    }
  },
  {
    id: 'mp-3',
    name: { en: 'Hassan Saeed', dv: 'ހަސަން ސަޢީދު' },
    party: { en: 'Independent', dv: 'އިސްތިގުލާލް' },
    partyColor: '#6B7280',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    votes: 2700,
    percentage: 22,
    bio: {
      en: 'Independent candidate advocating for local autonomy and environmental protection.',
      dv: 'އިސްތިގުލާލް ކެންޑިޑޭޓް، ލޯކަލް އޮޓޮނަމީ އާއި ޕާރީސް ހިމާޔަތް ކުރުމަށް ގޮވާލާ'
    }
  }
];

// Local Council Election - Hulhumale' Constituency
export const localCouncilCandidates: Candidate[] = [
  {
    id: 'local-1',
    name: { en: 'Aminath Shauna', dv: 'އާމިނަތު ޝައުނާ' },
    party: { en: 'Progressive Party', dv: 'ޕްރޮގްރެސިވް ޕާޓީ' },
    partyColor: '#DC2626',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    votes: 2100,
    percentage: 48,
    isWinner: true,
    bio: {
      en: 'Youth leader passionate about urban planning and community development.',
      dv: 'ޒުވާން ލީޑަރު، ސިޓީ ޕްލޭނިންގ އާއި ކޮމިއުނިޓީ ތަރައްގީއަށް ބޭނުންވާ'
    }
  },
  {
    id: 'local-2',
    name: { en: 'Ali Fazeel', dv: 'ޢަލީ ފާޟިލް' },
    party: { en: 'Democratic Alliance', dv: 'ޑިމޮކްރެޓިކް އެލަޔަންސް' },
    partyColor: '#2563EB',
    photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
    votes: 1800,
    percentage: 41,
    bio: {
      en: 'Business owner committed to improving local infrastructure and public services.',
      dv: 'ވިޔަފާރިވެރިއެއް، ލޯކަލް އިންފްރާސްޓްރަކްޗަރ އާއި ދައުލަތީ ޚިދުމަތް ރަނގަޅު ކުރުމަށް ވަފާތެރި'
    }
  },
  {
    id: 'local-3',
    name: { en: 'Mariyam Naseema', dv: 'މަރިޔަމް ނަސީމާ' },
    party: { en: 'Independent', dv: 'އިސްތިގުލާލް' },
    partyColor: '#6B7280',
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
    votes: 480,
    percentage: 11,
    bio: {
      en: 'Teacher and parent advocate for better schools and recreational facilities.',
      dv: 'ޓީޗަރު އަދި މައިންބަފައިންގެ ވަކީލު، އިސްކޫލް އާއި ކުޅިވަރު ތަންތަން ރަނގަޅު ކުރުމަށް މަސައްކަތް ކުރައްވާ'
    }
  }
];

// Election Races
export const electionRaces: ElectionRace[] = [
  {
    id: 'presidential-2024',
    name: { en: 'Presidential Election 2024', dv: '2024 ރިޔާސީ އިންތިހާބު' },
    type: 'presidential',
    candidates: presidentialCandidates,
    totalVotes: 150000,
    reportingPercentage: 75,
    status: 'live',
    lastUpdated: new Date('2024-11-18T14:30:00')
  },
  {
    id: 'parliamentary-male-2024',
    name: { en: "Male' Central Parliamentary Seat", dv: "މާލެ މެދު ރައްޔިތުންގެ މަޖިލިސް ގޮނޑި" },
    type: 'parliamentary',
    candidates: parliamentaryCandidates,
    totalVotes: 12400,
    reportingPercentage: 92,
    status: 'live',
    lastUpdated: new Date('2024-11-18T14:45:00')
  },
  {
    id: 'local-hulhumale-2024',
    name: { en: "Hulhumale' Local Council", dv: 'ހުޅުމާލެ ލޯކަލް ކައުންސިލް' },
    type: 'local',
    candidates: localCouncilCandidates,
    totalVotes: 4380,
    reportingPercentage: 100,
    status: 'final',
    lastUpdated: new Date('2024-11-18T15:00:00')
  }
];

// Electoral Map Data - Maldives Regions
export const regions: Region[] = [
  {
    id: 'male',
    name: { en: "Male' City", dv: 'މާލެ ސިޓީ' },
    winnerId: 'candidate-1',
    reportingPercentage: 100,
    votes: {
      'candidate-1': 25000,
      'candidate-2': 18000,
      'candidate-3': 7000
    }
  },
  {
    id: 'hulhumale',
    name: { en: "Hulhumale'", dv: 'ހުޅުމާލެ' },
    winnerId: 'candidate-1',
    reportingPercentage: 100,
    votes: {
      'candidate-1': 12000,
      'candidate-2': 9500,
      'candidate-3': 5500
    }
  },
  {
    id: 'vilimale',
    name: { en: "Vilimale'", dv: 'ވިލިމާލެ' },
    winnerId: 'candidate-2',
    reportingPercentage: 100,
    votes: {
      'candidate-1': 4500,
      'candidate-2': 6500,
      'candidate-3': 2000
    }
  },
  {
    id: 'addu',
    name: { en: 'Addu City', dv: 'އައްޑޫ ސިޓީ' },
    winnerId: 'candidate-2',
    reportingPercentage: 85,
    votes: {
      'candidate-1': 8000,
      'candidate-2': 11000,
      'candidate-3': 4500
    }
  },
  {
    id: 'north',
    name: { en: 'Northern Atolls', dv: 'އުތުރުގެ އަތޮޅުތައް' },
    winnerId: 'candidate-1',
    reportingPercentage: 65,
    votes: {
      'candidate-1': 15000,
      'candidate-2': 7500,
      'candidate-3': 8500
    }
  },
  {
    id: 'central',
    name: { en: 'Central Atolls', dv: 'މެދުގެ އަތޮޅުތައް' },
    winnerId: 'candidate-3',
    reportingPercentage: 70,
    votes: {
      'candidate-1': 3000,
      'candidate-2': null,
      'candidate-3': 2500
    }
  },
  {
    id: 'south',
    name: { en: 'Southern Atolls', dv: 'ދެކުނުގެ އަތޮޅުތައް' },
    winnerId: null,
    reportingPercentage: 45,
    votes: {
      'candidate-1': null,
      'candidate-2': null,
      'candidate-3': null
    }
  }
];

export const electoralMaps: ElectoralMap[] = [
  {
    raceId: 'presidential-2024',
    regions: regions
  }
];

// Helper functions
export function getRaceById(raceId: string): ElectionRace | undefined {
  return electionRaces.find(race => race.id === raceId);
}

export function getLiveRaces(): ElectionRace[] {
  return electionRaces.filter(race => race.status === 'live');
}

export function getFinalRaces(): ElectionRace[] {
  return electionRaces.filter(race => race.status === 'final');
}

export function getMapByRaceId(raceId: string): ElectoralMap | undefined {
  return electoralMaps.find(map => map.raceId === raceId);
}
