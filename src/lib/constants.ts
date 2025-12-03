import { CrewListFilters } from '@/types/crew';
import { SessionListFilters } from '@/types/session';

const QUERY_KEY = {
  crews: 'crews',
  sessions: 'sessions',
  members: 'members',
  users: 'users',
  reviews: 'reviews',
  likes: 'likes',
};

export const QUERY_KEYS = {
  crews: {
    // (invalidate)
    all: [QUERY_KEY.crews],
    // Get /api/crews (크루 목록 조회)
    list: (filters: CrewListFilters) => [QUERY_KEY.crews, 'list', filters],
    // Get /api/crews/{crewId} (크루 상세 조회)
    byId: (crewId: number) => [QUERY_KEY.crews, crewId],

    members: {
      // Get /api/crews/{crewId}/members (크루 멤버 목록 조회)
      all: (crewId: number) => [
        QUERY_KEY.crews,
        crewId,
        QUERY_KEY.members,
        'all',
      ],
      // Get /api/crews/{crewId}/members?role=leader (크루 멤버 목록 중 leader 조회)
      leader: (crewId: number) => [
        QUERY_KEY.crews,
        crewId,
        QUERY_KEY.members,
        'leader',
      ],
      // Get /api/crews/{crewId}/members?role=staff (크루 멤버 목록 중 staff 조회)
      staff: (crewId: number) => [
        QUERY_KEY.crews,
        crewId,
        QUERY_KEY.members,
        'staff',
      ],
      // Get /api/crews/{crewId}/members?role=general (크루 멤버 목록 중 general 조회)
      general: (crewId: number) => [
        QUERY_KEY.crews,
        crewId,
        QUERY_KEY.members,
        'general',
      ],

      // Get /api/crews/{crewId}/members/count (크루 멤버 역할별 카운트 조회)
      count: (crewId: number) => [
        QUERY_KEY.crews,
        crewId,
        QUERY_KEY.members,
        'count',
      ],

      // Get /api/crews/{crewId}/members/{userId}/role (특정 사용자 역할 조회)
      role: (crewId: number, userId: number) => [
        QUERY_KEY.crews,
        crewId,
        QUERY_KEY.members,
        userId,
        'role',
      ],
    },
  },

  users: {
    // Get /api/user (내 정보 조회)
    me: [QUERY_KEY.users, 'me'],

    // GET /api/user/{userId} (특정 유저 정보 조회)
    byId: (userId: number) => [QUERY_KEY.users, userId],

    // GET /api/user/me/reviews(내가 작성한 리뷰 목록)
    myReviews: (params: { page: number; size: number }) => [
      QUERY_KEY.users,
      'me',
      QUERY_KEY.reviews,
      params,
    ],

    // GET /api/user/me/likes(내가 찜한 세션 목록)
    myLikes: (params: { page: number; size: number }) => [
      QUERY_KEY.users,
      'me',
      QUERY_KEY.likes,
      params,
    ],
  },

  sessions: {
    // (invalidate)
    all: [QUERY_KEY.sessions],

    // GET /api/sessions (세션 목록 조회)
    list: (filters: SessionListFilters) => [
      QUERY_KEY.sessions,
      'list',
      filters,
    ],

    // GET /api/sessions/{sessionId} (세션 상세 조회)
    byId: (sessionId: number) => [QUERY_KEY.sessions, sessionId],

    // GET /api/sessions/{sessionId}/participants (세션 참가자 목록 조회)
    participants: (sessionId: number) => [
      QUERY_KEY.sessions,
      sessionId,
      'participants',
    ],

    reviews: {
      // GET /api/sessions/{sessionId}/reviews (세션 리뷰 목록)
      all: (sessionId: number, params: { page: number; size: number }) => [
        QUERY_KEY.sessions,
        sessionId,
        QUERY_KEY.reviews,
        params,
      ],
      // DELETE /api/reviews/{reviewId} (리뷰 삭제 후 invalidate)
      byId: (reviewId: number) => [QUERY_KEY.reviews, reviewId],
    },
  },
};
