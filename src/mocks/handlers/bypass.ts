import { http, passthrough } from 'msw';

export const bypassHandlers = [
  http.post('https://telemetry.nextjs.org/api/v1/record', () => passthrough()),
];
