import { setupServer } from 'msw/node';
import { bypassHandlers } from './handlers/bypass';
import { crewsHandlers } from './handlers/crews';

export const server = setupServer(...bypassHandlers, ...crewsHandlers);
