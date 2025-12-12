import { PaginationQueryParams } from './api';
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
  coords: {
    lat: number;
    lng: number;
  };
  sessionAt: string;
  registerBy: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  status: 'OPEN' | 'CLOSED';
  pace: number;
  maxParticipantCount: number;
  currentParticipantCount: number;
  createdAt: string;
  liked: boolean;
}

export type SessionListFilters = PaginationQueryParams & {
  city?: string[];
  district?: string[];
  crewId?: number;
  level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  dateFrom?: string;
  dateTo?: string;
  timeFrom?: string;
  timeTo?: string;
  sort: 'createdAtDesc' | 'sessionAtAsc' | 'registerByAsc';
};
