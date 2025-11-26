export interface User {
  id: number; // 또는 string UUID (백앤드에서 주는 대로)
  name: string;
  profileImage?: string;
}

export interface Profile extends User {
  introduction: string;
  area: string;
  level: '초급' | '중급' | '상급';
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
  city: string; // 지역(시)
  district: string; // 지역(구)
  image: string;
  members: Member[];
  sessions: Session[];
  createdAt: string; // 생성일
}

export interface Session {
  id: string;
  crewId: string;
  userId: string;

  name: string;
  description: string;
  image?: string;
  location: string;
  createdAt: string; // ISO 8601
  sessionAt: string; // ISO 8601 - 세션 시간
  registerBy: string; // ISO 8601 - 신청 마감

  level: '초급' | '중급' | '고급';
  minParticipantCount: number;
  maxParticipantCount: number;
  participants: Member[];
  heartUsers: User[];
  reviews: Review[];
}

export interface Review {
  // - 작성자
  // - 작성일
  // - 대상 세션
  // - 내용
  // - 평점
}
