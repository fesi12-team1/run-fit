export interface User {
  id: number;
  name: string;
  createdAt: string;
}

export type UserCredentials = {
  email: string;
  password: string;
};

export interface Profile extends User {
  image?: string;
  introduction: string;
  city: string;
  pace: number;
  styles?: string[];
  updatedAt: string;
}

export type Role = 'LEADER' | 'STAFF' | 'MEMBER';

export interface Member extends User {
  role: Role;
  joinedAt: string;
}
