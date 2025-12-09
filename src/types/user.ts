export interface User {
  id: number;
  name: string;
  createdAt: string;
}

export interface Profile extends User {
  image?: string;
  introduction: string;
  city: string;
  pace: number;
  styles?: string[];
  updatedAt: string;
}

type Role = 'LEADER' | 'STAFF' | 'MEMBER';
export interface Member extends User {
  role: Role;
  joinedAt: string;
}
