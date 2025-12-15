export interface Review {
  id: number;
  sessionId: number;
  crewId: number;
  userId: number;
  userName: string;
  userImage?: string;
  description: string;
  ranks: 1 | 2 | 3 | 4 | 5;
  image?: string;
  createdAt: string;
}
