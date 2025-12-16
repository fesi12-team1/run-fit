import { setupWorker } from 'msw/browser';
import { createPath } from '../core/path';
import { seedMockDb } from '../data';
import { authHandlers } from '../handlers/auth';
import { bypassHandlers } from '../handlers/bypass';
import { crewHandlers } from '../handlers/crew';
import { membershipHandlers } from '../handlers/membership';
import { reviewHandlers } from '../handlers/review';
import { sessionHandlers } from '../handlers/session';
import { userHandlers } from '../handlers/user';

await seedMockDb();

const layer = 'proxy' as const;
const authMode = 'bypass' as const;
const p = createPath(layer, '');

// export const worker = setupWorker(...createMembershipHandlers(p, authMode));
export const worker = setupWorker(
  ...authHandlers,
  ...bypassHandlers,
  ...crewHandlers,
  ...membershipHandlers,
  ...reviewHandlers,
  ...sessionHandlers,
  ...userHandlers
);
