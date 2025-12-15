import { PaginationQueryParams } from './api';

export interface Crew {
  id: number;
  name: string;
  description: string;
  city: string;
  image: string;
  createdAt: string;
}

export type CrewListFilters = PaginationQueryParams & {
  city?: string;
  keyword?: string;
  sort?:
    | 'memberCountDesc'
    | 'lastSessionDesc'
    | 'createdAtDesc'
    | 'nameAsc'
    | 'nameDesc';
};

export type MemberRoleFilters = {
  role?: 'leader' | 'staff' | 'general';
};

export interface CrewMember {
  userId: number;
  name: string;
  profileImage: string | null;
  role: 'LEADER' | 'STAFF' | 'MEMBER';
  joinedAt: string;
}

export type CrewMemberRoleData = Pick<CrewMember, 'userId' | 'role'>;
