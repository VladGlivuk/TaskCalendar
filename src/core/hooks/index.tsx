import { useEffect, useState } from 'react';

export const useDebounceValue = (value: string, delay = 200) => {
  const [delayedValue, setDelayedValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handler = setTimeout(() => setDelayedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return delayedValue;
};
