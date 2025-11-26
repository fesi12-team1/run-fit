import { Flatten } from '@/lib/type';

import { Crew, Session } from '.';

// 임의로 작성해보는 겁니당
export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

// Crews endpoint
export type GetCrews = Crew[];
export type GetCrewById = Omit<Crew, 'members' | 'sessions'>;
export type PostCrewsBody = Pick<
  // 'Crew' as response
  Crew,
  'name' | 'description' | 'city' | 'district'
> &
  Partial<Pick<Crew, 'image'>>;
type FPostCrewsBody = Flatten<PostCrewsBody>;

export type GetCrewSessions = Omit<Session, ''>;
export type GetCrewMembers = Pick<Crew, 'id' | 'members'>;

// Sessions endpoint
// ... work in progress

// Reviews endpoint
// ... work in progress
