export interface Session {
  id: string;
  crewId: string;
  userId: string; // host user id

  name: string;
  description: string;
  image?: string;

  location: string;
  // TODO: 이 부분은 지도 관련 결정이 나면 수정 필요
  // city: string;
  // district: string;

  createdAt: string;
  sessionAt: string;
  registerBy: string;
  level: 'beginner' | 'intermediate' | 'advanced';

  status: 'OPEN' | 'CLOSED';
  pace: number; // 분/km

  maxParticipantCount: number;
  currentParticipantCount: number;
}
