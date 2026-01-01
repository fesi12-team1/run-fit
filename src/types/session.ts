import { DateRange } from 'react-day-picker';
import { PaginationQueryParams } from './api';
import { CrewMember } from './crew';
import { Sido, Sigungu } from './region';

export interface Session<City extends Sido = Sido> {
  id: number;
  crewId: number;
  hostUserId: number;
  name: string;
  description: string;
  image: string;
  city: City;
  district: Sigungu<City>;
  location: string;
  coords: {
    lat: number;
    lng: number;
  };
  sessionAt: string;
  registerBy: string;
  level: SessionLevel;
  status: SessionStatus;
  pace: number;
  maxParticipantCount: number;
  currentParticipantCount: number;
  createdAt: string;
  ranks: number;
  liked: boolean;
  participants: CrewMember[];
}

export type SessionListFilters = PaginationQueryParams & {
  city?: string[];
  district?: string[];
  crewId?: number;
  level?: SessionLevel | 'ALL';
  dateFrom?: string;
  dateTo?: string;
  timeFrom?: string;
  timeTo?: string;
  sort: SessionSortKey;
};

export type SessionSortKey = 'createdAtDesc' | 'sessionAtAsc' | 'registerByAsc';
export type SessionLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type SessionStatus = 'OPEN' | 'CLOSED';
export type SessionTabKey = 'region' | 'date' | 'time' | 'level';

export type SessionFilterState = {
  sort: SessionSortKey;
  region?: Record<string, string[]>;
  date?: DateRange;
  time?: [number, number];
  level: SessionLevel | undefined;
};

export type ParticipatingSession = Omit<Session, 'description'> & {
  reviewed?: boolean;
};
