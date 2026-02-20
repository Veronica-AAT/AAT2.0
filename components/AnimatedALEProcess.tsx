"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    id: 1,
    title: "Surface Modification",
    subtitle: "Cl₂ adsorption",
    description: "Reactive gas modifies only the top atomic layer",
    color: "bg-accent",
    icon: "M",
  },
  {
    id: 2,
    title: "Purge",
    subtitle: "Ar/N₂ flow",
    description: "Inert gas removes unreacted species",
    color: "bg-primary-400",
    icon: "P",
  },
  {
    id: 3,
    title: "Removal",
    subtitle: "Ar⁺ bombardment",
    description: "Modified layer is selectively removed",
    color: "bg-accent",
    icon: "R",
  },
  {
    id: 4,
    title: "Repeat",
    subtitle: "0.3–1.0 nm/cycle",
    description: "Digital, atomic-scale etch depth control",
    color: "bg-primary-500",
    icon: "⟳",
  },
];

export default function AnimatedALEProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const animateSteps = () => {
      let step = 0;
      const interval = setInterval(() => {
        setActiveStep(step);
        step++;
        if (step > 3) {
          step = 0;
          setCycleCount((c) => c + 1);
        }
      }, 1500);

      return interval;
    };

    // Start after a short delay
    const timeout = setTimeout(() => {
      setActiveStep(0);
      const interval = animateSteps();
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isVisible]);

  return (
    <div ref={ref} className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Cycle counter */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-dark/5 rounded-full px-6 py-2">
            <span className="text-sm text-gray-500">Cycle</span>
            <span className="text-2xl font-bold text-accent tabular-nums">
              {cycleCount + 1}
            </span>
            <span className="text-sm text-gray-500">
              Etch depth: <strong className="text-dark">{((cycleCount + 1) * 0.5).toFixed(1)} nm</strong>
            </span>
          </div>
        </div>

        {/* Process visualization */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0">
            <div
              className="h-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${((activeStep + 1) / 4) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`flex flex-col items-center transition-all duration-500 ${
                  activeStep === i ? "scale-110" : activeStep > i ? "scale-100 opacity-70" : "scale-100 opacity-40"
                }`}
              >
                {/* Circle */}
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 transition-all duration-500 shadow-lg ${
                    activeStep === i
                      ? `${step.color} ring-4 ring-accent/30 shadow-accent/20`
                      : activeStep > i
                      ? "bg-gray-400"
                      : "bg-gray-300"
                  }`}
                >
                  {step.icon}
                </div>

                {/* Animated particles for active step */}
                {activeStep === i && (
                  <div className="absolute -top-2">
                    <div className="relative w-20 h-20">
                      {[...Array(6)].map((_, j) => (
                        <div
                          key={j}
                          className="absolute w-2 h-2 bg-accent rounded-full animate-ping"
                          style={{
                            top: `${50 + 40 * Math.sin((j * Math.PI * 2) / 6)}%`,
                            left: `${50 + 40 * Math.cos((j * Math.PI * 2) / 6)}%`,
                            animationDelay: `${j * 200}ms`,
                            animationDuration: "1.5s",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Text */}
                <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                <p className="text-accent text-xs font-medium mb-1">{step.subtitle}</p>
                <p className="text-gray-500 text-xs text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Animated wafer cross-section */}
        <div className="mt-12 bg-dark rounded-2xl p-6 overflow-hidden">
          <p className="text-white text-sm font-semibold mb-4 text-center">
            Wafer Cross-Section — Live Etch Progress
          </p>
          <div className="flex items-end justify-center gap-1 h-40">
            {[...Array(24)].map((_, i) => {
              const isCenter = i >= 8 && i <= 15;
              const baseHeight = isCenter ? 100 : 120;
              const etchDepth = isCenter ? Math.min(cycleCount * 5 + (activeStep >= 2 ? 3 : 0), 60) : 0;

              return (
                <div key={i} className="flex flex-col items-center" style={{ width: "3%" }}>
                  {/* Material column */}
                  <div
                    className="w-full rounded-t transition-all duration-700 ease-out"
                    style={{
                      height: `${baseHeight - etchDepth}px`,
                      background: isCenter
                        ? `linear-gradient(to bottom, ${activeStep === 0 ? "#fbbf24" : "#6b7280"}, #374151)`
                        : "linear-gradient(to bottom, #6b7280, #374151)",
                    }}
                  />
                  {/* Substrate */}
                  <div className="w-full h-8 bg-gray-800 rounded-b" />
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-6 mt-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-gray-500" /> Unmodified
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-yellow-500" /> Modified layer
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-gray-800" /> Substrate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
