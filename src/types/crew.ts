import { PaginationQueryParams } from './api';

export interface Crew {
  id: number;
  name: string;
  description: string;
  city: string;
  image: string;
  createdAt: string;
}

export type CrewListFilters = PaginationQueryParams & {
  region?: string;
  sort?: string;
};
