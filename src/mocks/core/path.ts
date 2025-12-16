export type Layer = 'proxy' | 'backend';
export type PathFn = (p: string) => string;

export function createPath(layer: Layer, backendBaseUrl: string): PathFn {
  if (layer === 'proxy') return (p) => p;

  // '/api/xxx' -> `${backendBaseUrl}/xxx`
  return (p) => {
    if (!p.startsWith('/api')) return `${backendBaseUrl}${p}`;
    return `${backendBaseUrl}${p.slice(4)}`;
  };
}
