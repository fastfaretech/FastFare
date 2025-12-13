import React, { type JSX } from 'react';

export default function ParticleField(): JSX.Element {
  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="g-common" x1="0" x2="1">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      <circle cx="10%" cy="85%" r="140" fill="url(#g-common)">
        <animate attributeName="cy" dur="12s" values="90%;80%;88%" repeatCount="indefinite" />
        <animate attributeName="r" dur="10s" values="120;160;130" repeatCount="indefinite" />
      </circle>

      <circle cx="85%" cy="20%" r="120" fill="#6d28d933">
        <animate attributeName="cy" dur="16s" values="18%;26%;20%" repeatCount="indefinite" />
        <animate attributeName="r" dur="14s" values="100;140;110" repeatCount="indefinite" />
      </circle>

      <circle cx="50%" cy="48%" r="80" fill="#06b6d422">
        <animate attributeName="cx" dur="18s" values="48%;52%;49%" repeatCount="indefinite" />
        <animate attributeName="r" dur="12s" values="60;90;70" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
