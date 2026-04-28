import { useEffect } from 'react';

/**
 * Observes elements with class "reveal" and adds "visible" when they enter viewport.
 * Usage: import useScrollReveal from '../hooks/useScrollReveal'; useScrollReveal();
 */
export default function useScrollReveal(rootMargin = '0px 0px -60px 0px') {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [rootMargin]);
}
