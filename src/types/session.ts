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
  level: Level;
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
  level?: Level;
  dateFrom?: string;
  dateTo?: string;
  timeFrom?: string;
  timeTo?: string;
  sort: SessionSort;
};

export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type SessionStatus = 'OPEN' | 'CLOSED';
export type SessionSort = 'createdAtDesc' | 'sessionAtAsc' | 'registerByAsc';

export type LikeSessions = Pick<
  Session,
  | 'crewId'
  | 'name'
  | 'image'
  | 'city'
  | 'district'
  | 'location'
  | 'coords'
  | 'sessionAt'
  | 'level'
  | 'status'
> & { sessionId: number };

export type ParticipatingSession = Omit<Session, 'description'> & {
  reviewed?: boolean;
};
