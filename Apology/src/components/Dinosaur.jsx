import React, { useState } from 'react';

/**
 * Dinosaur Component
 * Supports custom generated images dropped in /public/images/:
 * - /images/dino-hero.png
 * - /images/dino-sleepy.png
 * - /images/dino-flower.png
 * - /images/dino-pleading.png
 * - /images/dino-happy.png
 * - /images/dino-determined.png
 * 
 * If a custom image exists, it renders the image.
 * Otherwise, it smoothly falls back to the built-in cartoon SVG!
 */
export default function Dinosaur({ 
  pose = 'guilty', 
  className = 'w-64 h-64', 
  eyeReaction = null,
  scale = 1,
  onMouseEnter,
  onClick
}) {
  const [imageError, setImageError] = useState(false);

  // Map pose to expected image filenames
  const imageMap = {
    guilty: '/images/dino-hero.png',
    hero: '/images/dino-hero.png',
    sleepy: '/images/dino-sleepy.png',
    apologetic: '/images/dino-flower.png',
    pleading: '/images/dino-pleading.png',
    happy: '/images/dino-happy.png',
    determined: '/images/dino-determined.png',
  };

  const imageSrc = imageMap[pose] || imageMap.guilty;

  // Reset error state if pose/imageSrc changes
  React.useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  // If custom image loaded successfully without error
  if (!imageError) {
    return (
      <div 
        className={`${className} inline-flex items-center justify-center transition-all duration-300 relative select-none pointer-events-auto`}
        style={{ transform: `scale(${scale})` }}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
      >
        <img 
          src={imageSrc} 
          alt={`Cute cartoon dinosaur expressing ${pose}`}
          draggable={false}
          className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Fallback SVG Cartoon Character matching "I AM SAURY" style
  return (
    <svg 
      viewBox="0 0 320 380" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300 select-none`}
      style={{ transform: `scale(${scale})` }}
      aria-label={`Cute cartoon dinosaur expressing ${pose}`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <defs>
        <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#29211F" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Ground Shadow */}
      <ellipse cx="160" cy="355" rx="80" ry="14" fill="#80685D" opacity="0.45" />

      {/* DORSAL PLATES / SPIKES ALONG BACK */}
      <g id="dorsal-plates">
        <path d="M 160 170 Q 155 150 170 145 Q 175 160 172 173 Z" fill="#3A3A3C" stroke="#29211F" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 162 158 Q 165 152 168 150" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        <path d="M 140 185 Q 130 165 145 162 Q 152 176 148 190 Z" fill="#3A3A3C" stroke="#29211F" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 137 175 Q 140 169 144 167" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

        <path d="M 128 210 Q 115 190 130 188 Q 138 202 134 216 Z" fill="#3A3A3C" stroke="#29211F" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 124 200 Q 128 194 130 193" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

        <path d="M 120 238 Q 105 218 122 216 Q 128 230 126 244 Z" fill="#3A3A3C" stroke="#29211F" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 114 228 Q 118 222 122 221" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

        <path d="M 108 268 Q 90 250 108 248 Q 116 260 114 274 Z" fill="#3A3A3C" stroke="#29211F" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 100 259 Q 104 254 108 253" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

        <path d="M 92 292 Q 78 278 92 274 Q 99 285 96 298 Z" fill="#3A3A3C" stroke="#29211F" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 85 285 Q 88 280 91 280" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        <path d="M 82 312 Q 70 302 82 298 Q 88 306 85 316 Z" fill="#3A3A3C" stroke="#29211F" strokeWidth="3.5" strokeLinejoin="round" />
      </g>

      {/* MAIN BODY OUTLINE */}
      <g id="body">
        <path 
          d="
            M 76 265
            C 72 285 75 315 95 330
            C 115 342 140 338 152 338
            L 155 352
            C 155 358 165 362 178 360
            C 190 358 190 348 186 340
            L 196 340
            C 198 348 204 358 214 358
            C 225 358 228 350 225 340
            C 235 320 240 270 236 230
            C 234 200 230 180 228 165
            C 222 152 210 145 186 148
            C 165 152 148 165 140 185
            C 132 205 130 235 125 255
            C 118 280 100 295 82 290
            C 72 285 70 270 76 265
            Z
          " 
          fill="#FF8A3D" 
          stroke="#29211F" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Spots */}
        <ellipse cx="160" cy="225" rx="11" ry="12" fill="#E9A66F" opacity="0.8" />
        <ellipse cx="148" cy="242" rx="7" ry="8" fill="#E9A66F" opacity="0.8" />
        <ellipse cx="98" cy="305" rx="9" ry="10" fill="#E9A66F" opacity="0.8" />
        <ellipse cx="115" cy="318" rx="6" ry="6" fill="#E9A66F" opacity="0.8" />

        {/* Pale Yellow Belly */}
        <path 
          d="
            M 175 235
            C 170 215 180 195 198 198
            C 214 200 226 215 224 240
            C 222 280 218 325 198 335
            C 176 345 160 320 162 285
            C 164 260 170 245 175 235
            Z
          " 
          fill="#FFE59A" 
          stroke="#29211F" 
          strokeWidth="3.5" 
          strokeLinejoin="round" 
        />

        {/* Highlights */}
        <path d="M 142 242 C 144 230 146 220 146 215" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 221 270 C 223 285 221 300 215 315" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />

        {/* Toes */}
        <path d="M 166 352 L 166 360" stroke="#29211F" strokeWidth="3" strokeLinecap="round" />
        <path d="M 174 353 L 174 360" stroke="#29211F" strokeWidth="3" strokeLinecap="round" />
        <path d="M 204 350 L 204 358" stroke="#29211F" strokeWidth="3" strokeLinecap="round" />
        <path d="M 212 350 L 212 358" stroke="#29211F" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* POSES */}
      {(pose === 'guilty' || pose === 'hero') && (
        <g id="guilty-pose">
          <path d="M 162 188 C 167 182 176 182 178 186" stroke="#29211F" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="182" cy="198" rx="10" ry="12" fill="#29211F" />
          <circle cx="180" cy="194" r="4.5" fill="#FFFFFF" />
          <circle cx="185" cy="202" r="2" fill="#FFFFFF" />

          <path d="M 198 220 C 205 210 220 205 228 208" stroke="#29211F" strokeWidth="3.5" strokeLinecap="round" />
          <polygon points="206,214 212,214 209,223" fill="#FFFFFF" stroke="#29211F" strokeWidth="2.5" strokeLinejoin="round" />

          <g id="clutched-arms">
            <path d="M 185 240 L 195 255 L 204 245 L 200 236 Z" fill="#FF8A3D" stroke="#29211F" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M 215 240 L 210 256 L 202 246 L 208 236 Z" fill="#FF8A3D" stroke="#29211F" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx="203" cy="250" r="4" fill="#FF8A3D" stroke="#29211F" strokeWidth="2.5" />
          </g>

          <path d="M 235 175 Q 240 185 235 190 Q 230 185 235 175 Z" fill="#80D8FF" stroke="#29211F" strokeWidth="2.5" className="animate-bounce" />
        </g>
      )}

      {pose === 'confused' && (
        <g id="confused-pose">
          <path d="M 160 182 C 168 178 175 180 180 185" stroke="#29211F" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 195 186 C 198 189 203 188 206 186" stroke="#29211F" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="176" cy="196" rx="9" ry="11" fill="#29211F" />
          <circle cx="174" cy="193" r="3.8" fill="#FFFFFF" />
          <circle cx="178" cy="200" r="1.8" fill="#FFFFFF" />
          <ellipse cx="204" cy="198" rx="7" ry="8" fill="#29211F" />
          <circle cx="203" cy="196" r="2.8" fill="#FFFFFF" />
          <path d="M 188 218 Q 196 224 204 218 Q 212 214 218 217" stroke="#29211F" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 180 235 Q 165 215 170 195 Q 175 190 180 195" fill="none" stroke="#29211F" strokeWidth="4" strokeLinecap="round" />
          <circle cx="175" cy="192" r="5" fill="#FF8A3D" stroke="#29211F" strokeWidth="3" />
        </g>
      )}

      {pose === 'sleepy' && (
        <g id="sleepy-pose">
          <path d="M 166 198 C 172 206 182 206 188 198" stroke="#29211F" strokeWidth="4" strokeLinecap="round" />
          <path d="M 198 198 C 204 206 214 206 220 198" stroke="#29211F" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="168" cy="208" rx="8" ry="4" fill="#FF8A8A" opacity="0.6" />
          <ellipse cx="222" cy="208" rx="8" ry="4" fill="#FF8A8A" opacity="0.6" />
          <path d="M 190 216 Q 196 223 204 216" stroke="#29211F" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="210" y="215" width="45" height="28" rx="10" fill="#F1E3D9" stroke="#29211F" strokeWidth="3.5" />
          <line x1="220" y1="225" x2="245" y2="232" stroke="#DCC9BD" strokeWidth="2" strokeLinecap="round" />
          <g className="animate-float-slow">
            <text x="235" y="160" fontFamily="Fredoka, cursive" fontSize="18" fontWeight="bold" fill="#F1E3D9" stroke="#29211F" strokeWidth="1.5">Z</text>
            <text x="248" y="145" fontFamily="Fredoka, cursive" fontSize="24" fontWeight="bold" fill="#FFD95A" stroke="#29211F" strokeWidth="1.8">z</text>
            <text x="264" y="130" fontFamily="Fredoka, cursive" fontSize="30" fontWeight="bold" fill="#FF8A3D" stroke="#29211F" strokeWidth="2">z</text>
          </g>
        </g>
      )}

      {pose === 'apologetic' && (
        <g id="apologetic-pose">
          <path d="M 160 188 C 166 182 176 182 178 186" stroke="#29211F" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="180" cy="198" rx="10" ry="12" fill="#29211F" />
          <circle cx="178" cy="194" r="4.5" fill="#FFFFFF" />
          <circle cx="183" cy="202" r="2" fill="#FFFFFF" />
          <path d="M 198 216 Q 206 224 214 218" stroke="#29211F" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="166" cy="206" rx="7" ry="4" fill="#FF8A8A" opacity="0.6" />
          <g id="flower" transform="translate(196, 230)">
            <path d="M 12 30 Q 15 15 22 2" stroke="#4CAF50" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 15 18 Q 24 16 22 24" fill="#81C784" stroke="#29211F" strokeWidth="2" />
            <circle cx="16" cy="0" r="6" fill="#F1E3D9" stroke="#29211F" strokeWidth="2" />
            <circle cx="28" cy="0" r="6" fill="#F1E3D9" stroke="#29211F" strokeWidth="2" />
            <circle cx="22" cy="-6" r="6" fill="#F1E3D9" stroke="#29211F" strokeWidth="2" />
            <circle cx="22" cy="6" r="6" fill="#F1E3D9" stroke="#29211F" strokeWidth="2" />
            <circle cx="22" cy="0" r="5" fill="#FFD95A" stroke="#29211F" strokeWidth="2.5" />
          </g>
          <circle cx="206" cy="245" r="5" fill="#FF8A3D" stroke="#29211F" strokeWidth="3" />
          <circle cx="214" cy="246" r="5" fill="#FF8A3D" stroke="#29211F" strokeWidth="3" />
        </g>
      )}

      {pose === 'happy' && (
        <g id="happy-pose">
          <path d="M 160 178 C 166 172 176 172 182 178" stroke="#29211F" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 194 178 C 200 172 210 172 216 178" stroke="#29211F" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 164 194 C 170 186 180 186 186 194" stroke="#29211F" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 196 194 C 202 186 212 186 218 194" stroke="#29211F" strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx="162" cy="202" rx="9" ry="5" fill="#FF8A8A" opacity="0.7" />
          <ellipse cx="222" cy="202" rx="9" ry="5" fill="#FF8A8A" opacity="0.7" />
          <path d="M 182 210 Q 196 235 210 210 Z" fill="#D32F2F" stroke="#29211F" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M 188 222 Q 196 215 204 222" fill="#FF8A8A" />
          <path d="M 180 235 Q 165 210 172 195" stroke="#29211F" strokeWidth="4" strokeLinecap="round" />
          <circle cx="172" cy="193" r="5.5" fill="#FF8A3D" stroke="#29211F" strokeWidth="3" />
          <path d="M 215 235 Q 235 210 228 195" stroke="#29211F" strokeWidth="4" strokeLinecap="round" />
          <circle cx="228" cy="193" r="5.5" fill="#FF8A3D" stroke="#29211F" strokeWidth="3" />
        </g>
      )}

      {pose === 'determined' && (
        <g id="determined-pose">
          <path d="M 160 184 L 180 190" stroke="#29211F" strokeWidth="4" strokeLinecap="round" />
          <path d="M 216 184 L 196 190" stroke="#29211F" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="175" cy="196" rx="9" ry="10" fill="#29211F" />
          <circle cx="177" cy="194" r="3.5" fill="#FFFFFF" />
          <ellipse cx="201" cy="196" rx="9" ry="10" fill="#29211F" />
          <circle cx="199" cy="194" r="3.5" fill="#FFFFFF" />
          <path d="M 184 218 Q 196 226 208 215" stroke="#29211F" strokeWidth="4" strokeLinecap="round" />
          <path d="M 148 174 Q 186 168 224 174" stroke="#F1E3D9" strokeWidth="12" strokeLinecap="round" />
          <path d="M 148 174 Q 186 168 224 174" stroke="#29211F" strokeWidth="2.5" fill="none" />
          <circle cx="186" cy="171" r="5" fill="#FF5252" stroke="#29211F" strokeWidth="1.8" />
          <path d="M 144 174 Q 130 180 126 195" stroke="#F1E3D9" strokeWidth="6" strokeLinecap="round" />
          <path d="M 144 174 Q 130 180 126 195" stroke="#29211F" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="192" cy="245" r="7" fill="#FF8A3D" stroke="#29211F" strokeWidth="3.5" />
          <circle cx="212" cy="245" r="7" fill="#FF8A3D" stroke="#29211F" strokeWidth="3.5" />
        </g>
      )}

      {eyeReaction === 'extra-worried' && (
        <g id="extra-worried-overlay">
          <path d="M 175 208 Q 170 220 175 228 Q 180 220 175 208 Z" fill="#80D8FF" stroke="#29211F" strokeWidth="2" className="animate-bounce" />
          <path d="M 215 208 Q 210 220 215 228 Q 220 220 215 208 Z" fill="#80D8FF" stroke="#29211F" strokeWidth="2" className="animate-bounce" />
        </g>
      )}

    </svg>
  );
}
