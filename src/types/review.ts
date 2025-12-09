export interface Review {
  id: string;
  sessionId: string;
  crewId: string;
  userId: string;
  description: string;
  ranks: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  image?: string;
}
