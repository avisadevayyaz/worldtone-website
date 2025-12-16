import { useEffect, useRef } from "react";

export function useScrollToBottom<T = unknown>(
  dependency: T,
): React.RefObject<HTMLDivElement | null> {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [dependency]);

  return containerRef;
}
