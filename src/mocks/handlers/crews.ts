import { HttpResponse } from 'msw';
import { crews } from '../db';
import { apiGet } from '../utils';

export const crewsHandlers = [
  apiGet('/api/crews', () => {
    return HttpResponse.json(crews.all());
  }),
];
