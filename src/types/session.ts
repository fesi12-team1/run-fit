import { PaginationQueryParams } from './api';

export interface Session {
  id: string;
  crewId: string;
  userId: string; // host user id

  name: string;
  description: string;
  image?: string;

  // 위치 관련한 필드 - location은 실제 세션 장소, city 와 district는 필터링
  location: string; // 실제 세션 장소
  city: string; // 시
  district: string; // 군구

  createdAt: string;
  sessionAt: string;
  registerBy: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

  status: 'OPEN' | 'CLOSED';
  pace: number; // 분/km

  maxParticipantCount: number;
  currentParticipantCount: number;
}

export type SessionListFilters = PaginationQueryParams & {
  city?: string;
  level?: string;
  date?: string;
  sort?: string;
};
