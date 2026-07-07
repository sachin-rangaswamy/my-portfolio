'use client';

import type { ScaleKey } from '@/lib/scales';

/**
 * Lightweight animated visual per scale — each one represents the actual
 * physical process, not decoration. Pure SVG/CSS, so it costs almost nothing
 * and is silenced automatically by prefers-reduced-motion.
 */
export default function ScaleVisual({ scale }: { scale: ScaleKey }) {
  switch (scale) {
    case 'quantum':
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
          {/* electron cloud */}
          <defs>
            <radialGradient id="cloud" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6c63ff" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#6c63ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="60" r="46" fill="url(#cloud)" />
          <circle cx="100" cy="60" r="5" fill="#ffd166" />
          {/* orbitals */}
          {[0, 60, 120].map((rot) => (
            <ellipse
              key={rot}
              cx="100"
              cy="60"
              rx="52"
              ry="20"
              fill="none"
              stroke="#00f5d4"
              strokeOpacity="0.5"
              strokeWidth="1"
              transform={`rotate(${rot} 100 60)`}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`${rot} 100 60`}
                to={`${rot + 360} 100 60`}
                dur="9s"
                repeatCount="indefinite"
              />
            </ellipse>
          ))}
          <circle cx="152" cy="60" r="3.5" fill="#00f5d4">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 60"
              to="360 100 60"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      );

    case 'disorder':
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
          {/* random alloy: two species share one lattice */}
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => {
              const species = (r * 13 + c * 7) % 3 === 0;
              return (
                <circle
                  key={`${r}${c}`}
                  cx={22 + c * 22}
                  cy={20 + r * 20}
                  r={species ? 5.5 : 4}
                  fill={species ? '#ffd166' : '#8a7bff'}
                  opacity="0.85"
                >
                  <animate
                    attributeName="fill"
                    values={
                      species
                        ? '#ffd166;#8a7bff;#ffd166'
                        : '#8a7bff;#8a7bff;#ffd166;#8a7bff'
                    }
                    dur={`${5 + ((r * c) % 4)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })
          )}
        </svg>
      );

    case 'atomistic':
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
          {/* vibrating atoms + a diffusing defect */}
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => {
              // vacancy site
              if (r === 1 && c === 3) return null;
              return (
                <circle
                  key={`${r}${c}`}
                  cx={25 + c * 25}
                  cy={22 + r * 25}
                  r="5"
                  fill="#00d4e0"
                  opacity="0.85"
                >
                  <animate
                    attributeName="cx"
                    values={`${25 + c * 25};${25 + c * 25 + 2.5};${25 + c * 25 - 2};${25 + c * 25}`}
                    dur={`${0.9 + ((r + c) % 5) * 0.18}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values={`${22 + r * 25};${22 + r * 25 - 2};${22 + r * 25 + 2.5};${22 + r * 25}`}
                    dur={`${1.1 + ((r * c) % 4) * 0.15}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })
          )}
          {/* atom hopping into the vacancy */}
          <circle r="5" fill="#ffd166">
            <animate
              attributeName="cx"
              values="75;100;100;75;75"
              keyTimes="0;0.35;0.5;0.85;1"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="47;47;47;47;47"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      );

    case 'micro':
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
          {/* growing precipitates in a matrix */}
          <rect width="200" height="120" fill="#0f2a26" opacity="0.5" rx="8" />
          {[
            { cx: 50, cy: 40, r: 16, d: '6s' },
            { cx: 120, cy: 70, r: 22, d: '8s' },
            { cx: 165, cy: 32, r: 12, d: '5s' },
            { cx: 80, cy: 95, r: 10, d: '7s' },
          ].map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} fill="#00f5d4" opacity="0.5">
              <animate
                attributeName="r"
                values={`${p.r * 0.4};${p.r};${p.r * 0.85};${p.r}`}
                dur={p.d}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          {/* grain boundaries */}
          <path
            d="M0 60 Q 50 40 90 62 T 200 55"
            fill="none"
            stroke="#ffd166"
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
          <path
            d="M60 0 Q 75 60 55 120 M140 0 Q 125 55 150 120"
            fill="none"
            stroke="#ffd166"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
        </svg>
      );

    case 'continuum':
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
          {/* streamlines around an obstacle */}
          <circle cx="100" cy="60" r="16" fill="#12121c" stroke="#a8e063" strokeOpacity="0.6" />
          {[20, 38, 82, 100].map((y, i) => (
            <path
              key={y}
              d={`M0 ${y} C 60 ${y}, 70 ${y < 60 ? y - 14 : y + 14}, 100 ${y < 60 ? y - 10 : y + 10} S 150 ${y}, 200 ${y}`}
              fill="none"
              stroke="#a8e063"
              strokeOpacity="0.55"
              strokeWidth="1.4"
              strokeDasharray="8 10"
              className="energy-stream"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
          <path
            d="M0 60 C 55 60, 66 46, 84 46 M116 46 C 140 46, 150 60, 200 60"
            fill="none"
            stroke="#00f5d4"
            strokeOpacity="0.5"
            strokeWidth="1.4"
            strokeDasharray="8 10"
            className="energy-stream"
          />
        </svg>
      );

    case 'engineering':
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
          {/* FEM-meshed beam with a stress hot-spot */}
          <defs>
            <linearGradient id="stress" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6c63ff" stopOpacity="0.6" />
              <stop offset="55%" stopColor="#00f5d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffd166" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <rect x="20" y="42" width="160" height="36" rx="4" fill="url(#stress)">
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>
          {/* mesh */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={20 + i * 20}
              y1="42"
              x2={20 + i * 20}
              y2="78"
              stroke="#0a0a0f"
              strokeOpacity="0.6"
              strokeWidth="1"
            />
          ))}
          <line x1="20" y1="60" x2="180" y2="60" stroke="#0a0a0f" strokeOpacity="0.6" strokeWidth="1" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`d${i}`}
              x1={20 + i * 20}
              y1="42"
              x2={40 + i * 20}
              y2="78"
              stroke="#0a0a0f"
              strokeOpacity="0.45"
              strokeWidth="0.8"
            />
          ))}
          {/* load arrow */}
          <path d="M172 20 v14 m0 0 l-5 -7 m5 7 l5 -7" stroke="#ffd166" strokeWidth="2" fill="none">
            <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
          </path>
          {/* support */}
          <path d="M20 78 l-8 12 h16 z" fill="none" stroke="#f0f0f0" strokeOpacity="0.5" />
        </svg>
      );
  }
}
