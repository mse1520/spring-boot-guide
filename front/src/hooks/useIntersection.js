import { useEffect } from 'react';

/**
 * IntersectionObserver hooks
 * @param {React.MutableRefObject} ref 감지대상
 * @param {IntersectionObserverCallback} effect 효과를 정의한 함수
 * @param {React.DependencyList} deps 효과를 실행하는 감지 목록
 */
const useIntersection = (ref, effect, deps = []) => useEffect(() => {
  if (!ref.current) return;

  const observer = new IntersectionObserver(effect);
  observer.observe(ref.current);

  return () => observer.disconnect();
}, deps);

export default useIntersection;