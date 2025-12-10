import { setupServer } from 'msw/node';
import { seedMockDb } from './db';
import { bypassHandlers } from './handlers/bypass';
import { crewHandlers } from './handlers/crew';

await seedMockDb();

export const server = setupServer(...bypassHandlers, ...crewHandlers);
