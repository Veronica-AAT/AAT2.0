"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  label: string;
};

function parseNumeric(val: string): { prefix: string; number: number; suffix: string; decimals: number } {
  const match = val.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: val, decimals: 0 };
  const numStr = match[2];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix: match[1], number: parseFloat(numStr), suffix: match[3], decimals };
}

export default function AnimatedCounter({ value, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const { prefix, number, suffix, decimals } = parseNumeric(value);
          if (number === 0) {
            setDisplay(value);
            return;
          }

          const duration = 2000;
          const steps = 60;
          const stepTime = duration / steps;
          let step = 0;

          const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = number * eased;
            setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);

            if (step >= steps) {
              clearInterval(interval);
              setDisplay(value);
            }
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl md:text-3xl font-bold text-white transition-all duration-300">
        {display}
      </p>
      <p className="text-primary-100 text-sm mt-1">{label}</p>
    </div>
  );
}
