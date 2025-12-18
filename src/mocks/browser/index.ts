import { setupWorker } from 'msw/browser';
import { createPath } from '../core/path';
import { createAuthHandlers } from '../handlers/auth';
import { bypassHandlers } from '../handlers/bypass';
import { createCrewHandlers } from '../handlers/crew';
import { createReviewHandlers } from '../handlers/review';
import { createSessionHandlers } from '../handlers/session';
import { createUserHandlers } from '../handlers/user';

const layer = 'proxy' as const;
const authMode = 'strict' as const;
const p = createPath(layer, '');

export const worker = setupWorker(
  ...bypassHandlers,
  ...createAuthHandlers(p, authMode),
  ...createCrewHandlers(p, authMode),
  ...createReviewHandlers(p, authMode),
  ...createSessionHandlers(p, authMode),
  ...createUserHandlers(p, authMode)
);
