import { setupServer } from 'msw/node';
import { bypassHandlers } from './handlers/bypass';
import { postsHandlers } from './handlers/posts';

export const server = setupServer(...bypassHandlers, ...postsHandlers);
