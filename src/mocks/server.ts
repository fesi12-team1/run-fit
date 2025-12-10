import { setupServer } from 'msw/node';
import { seedMockDb } from './db';
import { bypassHandlers } from './handlers/bypass';
import { crewsHandlers } from './handlers/crews';

await seedMockDb();

export const server = setupServer(...bypassHandlers, ...crewsHandlers);
