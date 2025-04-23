'use client'
import {useState, useCallback, useRef} from 'react';
import useInterval from './useInterval';

const useCountdown = (onEnd?: () => void) => {
  const [currentCount, setCurrentCount] = useState(0);

  const onEndRef = useRef<() => void | undefined>(undefined);
  onEndRef.current = onEnd;

  useInterval(() => {
    setCurrentCount(pre => --pre);
    if (currentCount - 1 <= 0) {
      onEndRef.current && onEndRef.current();
    }
  }, currentCount > 0 ? 1000 : -1);

  const startCountdown = useCallback((count: number) => setCurrentCount(count), []);
  const cancelCountdown = useCallback(() => setCurrentCount(0), []);

  return {
    currentCount,
    startCountdown,
    cancelCountdown
  };
};

export default useCountdown;
