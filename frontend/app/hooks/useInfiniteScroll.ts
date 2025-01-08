import { useEffect, useRef } from "react";

export function useInfiniteScroll(
  callback: () => void,
  isFetching: boolean,
  allItemsFetched: boolean
) {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Cleanup function to disconnect the observer
    const disconnectObserver = () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };

    if (observer.current) disconnectObserver();

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isFetching && !allItemsFetched) {
        callback();
      }
    };

    if (!allItemsFetched) {
      observer.current = new IntersectionObserver(handleIntersect, {
        rootMargin: "0px",
        threshold: 1.0,
      });

      if (lastElementRef.current) {
        observer.current.observe(lastElementRef.current);
      }
    }
    // Cleanup on component unmount or when allItemsFetched changes
    return () => {
      disconnectObserver();
    };
  }, [callback, isFetching, allItemsFetched]);

  return lastElementRef;
}
