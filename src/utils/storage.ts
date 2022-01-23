export function fetchStoredKey<T>(key: string) {
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored) as T;
  }

  return [];
}

export function storeKey<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}
