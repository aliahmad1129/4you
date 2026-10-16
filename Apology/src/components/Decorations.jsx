import React from 'react';

// Cute 5-pointed rounded yellow cartoon star as seen in reference image
export function Star({ className = "w-6 h-6", rotate = 0 }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} inline-block`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path 
        d="
          M 50 8
          C 53 25 58 35 75 38
          C 92 40 95 48 82 60
          C 68 70 70 80 73 95
          C 74 102 65 104 53 90
          C 43 78 35 80 23 93
          C 12 102 5 95 12 80
          C 18 68 15 58 6 48
          C -2 38 4 32 24 35
          C 38 36 45 25 50 8
          Z
        " 
        fill="#FFD95A" 
        stroke="#29211F" 
        strokeWidth="5" 
        strokeLinejoin="round" 
        strokeLinecap="round" 
      />
      {/* Little highlight in corner */}
      <circle cx="48" cy="28" r="4" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

// Chubby Cartoon Alarm Clock
export function CartoonAlarmClock({ className = "w-28 h-28", ringing = false }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${ringing ? 'animate-wiggle' : ''}`}
    >
      {/* Top bells */}
      <ellipse cx="60" cy="50" rx="22" ry="18" transform="rotate(-30 60 50)" fill="#FF8A3D" stroke="#29211F" strokeWidth="6" />
      <ellipse cx="140" cy="50" rx="22" ry="18" transform="rotate(30 140 50)" fill="#FF8A3D" stroke="#29211F" strokeWidth="6" />
      {/* Top hammer handle */}
      <rect x="94" y="32" width="12" height="18" rx="4" fill="#29211F" />

      {/* Feet */}
      <line x1="65" y1="160" x2="45" y2="185" stroke="#29211F" strokeWidth="8" strokeLinecap="round" />
      <line x1="135" y1="160" x2="155" y2="185" stroke="#29211F" strokeWidth="8" strokeLinecap="round" />

      {/* Main Clock Circle */}
      <circle cx="100" cy="110" r="65" fill="#F1E3D9" stroke="#29211F" strokeWidth="7" />
      <circle cx="100" cy="110" r="54" fill="#FFFFFF" stroke="#29211F" strokeWidth="3" />

      {/* Clock numbers dots */}
      <circle cx="100" cy="68" r="3.5" fill="#29211F" />
      <circle cx="142" cy="110" r="3.5" fill="#29211F" />
      <circle cx="100" cy="152" r="3.5" fill="#29211F" />
      <circle cx="58" cy="110" r="3.5" fill="#29211F" />

      {/* Clock Hands pointing to 15 mins */}
      <line x1="100" y1="110" x2="100" y2="82" stroke="#29211F" strokeWidth="6" strokeLinecap="round" />
      <line x1="100" y1="110" x2="128" y2="110" stroke="#FF8A3D" strokeWidth="5" strokeLinecap="round" />
      <circle cx="100" cy="110" r="6" fill="#29211F" />

      {/* Sound waves if ringing */}
      {ringing && (
        <g stroke="#FFD95A" strokeWidth="4" strokeLinecap="round">
          <path d="M 28 35 Q 20 50 30 65" />
          <path d="M 172 35 Q 180 50 170 65" />
        </g>
      )}
    </svg>
  );
}

// Hand-drawn arrow for the equation
export function HandDrawnArrow({ className = "w-16 h-8" }) {
  return (
    <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path 
        d="M 10 20 Q 50 10 80 20" 
        stroke="#29211F" 
        strokeWidth="4" 
        strokeLinecap="round" 
        fill="none" 
      />
      <path 
        d="M 68 8 L 86 20 L 68 32" 
        stroke="#29211F" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
    </svg>
  );
}

// Hand-drawn Heart
export function CuteHeart({ className = "w-6 h-6", color = "#FF8A8A" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path 
        d="
          M 50 85 
          C 20 65 5 45 10 25 
          C 15 10 35 8 50 25 
          C 65 8 85 10 90 25 
          C 95 45 80 65 50 85 
          Z
        " 
        fill={color} 
        stroke="#29211F" 
        strokeWidth="6" 
        strokeLinejoin="round" 
      />
      <circle cx="32" cy="25" r="5" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}
