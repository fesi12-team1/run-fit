import { setupWorker } from 'msw/browser';
import { seedMockDb } from '../db';
import { authHandlers } from '../handlers/auth';
import { bypassHandlers } from '../handlers/bypass';
import { crewHandlers } from '../handlers/crew';
import { membershipHandlers } from '../handlers/membership';
import { reviewHandlers } from '../handlers/review';
import { sessionHandlers } from '../handlers/session';
import { userHandlers } from '../handlers/user';

await seedMockDb();

export const worker = setupWorker(
  ...authHandlers,
  ...bypassHandlers,
  ...crewHandlers,
  ...membershipHandlers,
  ...reviewHandlers,
  ...sessionHandlers,
  ...userHandlers
);
