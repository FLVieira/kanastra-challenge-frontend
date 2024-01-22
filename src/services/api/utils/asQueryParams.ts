export function asQueryParams<T extends Record<string, unknown>>(
  params: T,
): string {
  const keys = Object.keys(params) as (keyof T)[];
  const queryParams: string[] = [];

  keys.forEach((key) => {
    const value = params[key];
    if (typeof value === 'boolean' || typeof value === 'number' || value) {
      const keyString = String(key);
      queryParams.push(`${keyString}=${value}`);
    }
  });

  return queryParams.join('&');
}
