'use client'
import {useEffect, useRef} from 'react';

interface UseIntervalOptions {
  immediate?: boolean; // 是否立即执行首次回调
}

const useInterval = (
  callback: () => void,
  delay: number | null,
  options: UseIntervalOptions = {}
) => {
  const {immediate = false} = options;
  const savedCallback = useRef<() => void>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  // 保存最新回调函数
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 处理定时逻辑
  useEffect(() => {
    if (delay === null || delay < 0) return;

    const tick = () => {
      savedCallback.current?.();
      timeoutRef.current = setTimeout(tick, delay);
    };

    if (immediate) {
      tick(); // 立即执行首次回调
    } else {
      timeoutRef.current = setTimeout(tick, delay);
    }

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [delay, immediate]);
};

export default useInterval;
