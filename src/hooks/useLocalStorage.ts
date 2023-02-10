import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(key: string, initialVale: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue === null) {
      if (typeof initialVale === 'function') {
        return initialVale as () => T;
      } else {
        return initialVale;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
}
