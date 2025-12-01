export type Response<T, E extends ResponseError> =
  | {
      success: true;
      data: T;
      error: null;
    }
  | {
      success: false;
      data: null;
      error: E;
    };

export interface ResponseError {
  code: string;
  message: string;
}

export interface User {
  id: number;
  name: string;
  profileImage?: string;
  createdAt: string;
}

export interface Profile extends User {
  introduction: string;
  city: string;
  district: string;
  level: '초급' | '중급' | '상급';
  pace: number;
  styles?: string[];
}

type Role = 'leader' | 'staff' | 'member';
export interface Member extends User {
  role: Role;
  joinedAt: string;
}

export interface Crew {
  id: number;
  name: string;
  description: string;
  city: string;
  image: string;
  members: Member[];
  sessions: Session[];
  createdAt: string;
}

export interface Session {
  id: string;
  crewId: string;
  userId: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  // 취소, 마감, 예정 / 모집 중, 마감

  name: string;
  description: string;
  image?: string;
  city: string;
  district: string;
  createdAt: string;
  sessionAt: string;
  registerBy: string;

  level: 'beginner' | 'intermediate' | 'advanced'; // 초급, 중급, 고급
  // minParticipantCount: number;
  maxParticipantCount: number;

  participants: Member[];
  likedUsers: User[];
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  sessionId: string;
  description: string;
  rating: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  image?: string;
}

export type PaginationQueryParams = {
  page?: number;
  limit?: number;
};
