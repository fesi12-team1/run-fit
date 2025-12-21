export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export type UserCredentials = {
  email: string;
  password: string;
};

export type SigninResponse = {
  token: string;
};

export interface Profile extends User {
  image?: string | null;
  introduction: string | null;
  city: string | null;
  pace: number | null;
  styles?: string[];
  updatedAt: string;
}

export type Role = 'LEADER' | 'STAFF' | 'MEMBER';

export interface Member extends User {
  role: Role;
  joinedAt: string;
}
