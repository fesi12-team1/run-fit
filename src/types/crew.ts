import { PaginationQueryParams } from './api';
import { Profile } from './user';

export interface Crew {
  id: number;
  name: string;
  description: string;
  city: string;
  image?: string | null;
  createdAt: string;
  memberCount: number;
}

export type CrewListFilters = PaginationQueryParams & {
  city?: string[];
  keyword?: string;
  sort?: CrewSortKey;
};

export type CrewSortKey =
  | 'memberCountDesc'
  | 'lastSessionDesc'
  | 'createdAtDesc'
  | 'nameAsc'
  | 'nameDesc';

export type MemberRoleFilters = {
  role?: 'leader' | 'staff' | 'general';
  sort?: 'joinedAtAsc' | 'roleAsc';
};

export const ROLE_LABEL = {
  LEADER: '크루장',
  STAFF: '운영진',
  MEMBER: '일반',
} as const;
export type CrewRole = keyof typeof ROLE_LABEL;

export interface CrewMember {
  userId: number;
  name: string;
  profileImage: string | null;
  role: CrewRole;
  introduction: Profile['introduction'];
  joinedAt: string;
}

export type CrewMemberRoleData = Pick<CrewMember, 'userId' | 'role'>;
