import { useEffect, useRef, useState } from 'react';

export default function CountUp({ to, suffix = '', duration = 1200, start }: { to: number; suffix?: string; duration?: number; start: boolean }) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;
    const t0 = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, to, duration]);

  return <>{value.toLocaleString()}{suffix}</>;
}