export type Layer = 'proxy' | 'backend';
export type PathFn = (path: string) => string;

export function createPath(layer: Layer, backendBaseUrl: string): PathFn {
  if (layer === 'proxy') return (path) => path;

  // '/api/xxx' -> `${backendBaseUrl}/xxx`
  return (path) => {
    if (!path.startsWith('/api')) return `${backendBaseUrl}${path}`;
    return `${backendBaseUrl}${path.slice(4)}`;
  };
}
