import { useCallback, useMemo } from 'react';
import { InteractionManager } from 'react-native';

// Debounce hook for search inputs
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T;
};

// Throttle hook for scroll events
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = React.useRef(Date.now());

  return useCallback((...args: Parameters<T>) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]) as T;
};

// Intersection observer for lazy loading
export const useIntersectionObserver = (
  callback: () => void,
  threshold: number = 0.1
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const ref = React.useRef<View>(null);

  React.useEffect(() => {
    if (isIntersecting) {
      // Run after interactions to avoid blocking UI
      InteractionManager.runAfterInteractions(callback);
    }
  }, [isIntersecting, callback]);

  return { ref, setIsIntersecting };
};

// Memoized list item component
export const useMemoizedListItem = <T>(
  item: T,
  renderItem: (item: T) => React.ReactElement,
  dependencies: any[] = []
) => {
  return useMemo(
    () => renderItem(item),
    [item, ...dependencies]
  );
};