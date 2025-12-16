import { setupServer } from 'msw/node';
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

const layer = 'backend' as const;
const authMode = 'strict' as const;
const backendBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

const p = createPath(layer, backendBaseUrl);

// export const server = setupServer(
//   ...createAuthHandlers(p, authMode),
//   ...createMembershipHandlers(p, authMode)
// );

export const server = setupServer(
  ...authHandlers,
  ...bypassHandlers,
  ...crewHandlers,
  ...membershipHandlers,
  ...reviewHandlers,
  ...sessionHandlers,
  ...userHandlers
);
