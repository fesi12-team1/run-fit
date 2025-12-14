export interface Review {
  id: number;
  sessionId: number;
  crewId: number;
  userId: number;
  description: string;
  ranks: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  image?: string;
}
