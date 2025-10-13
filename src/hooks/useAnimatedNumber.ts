import { useEffect, useRef, useState } from "react";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const useAnimatedNumber = (value: number, duration = 260) => {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (value === previousValue.current) {
      setDisplayValue(value);
      return;
    }

    const start = performance.now();
    const initial = previousValue.current;
    const delta = value - initial;

    const loop = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOut(progress);
      setDisplayValue(Math.round(initial + delta * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(loop);
      } else {
        previousValue.current = value;
      }
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]);

  useEffect(() => {
    previousValue.current = value;
  }, [value]);

  return displayValue;
};
