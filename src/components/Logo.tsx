import React from "react";

interface LogoProps {
  className?: string;
  color?: string; // Optional custom color override
  isLight?: boolean; // Dynamic theme mapping for outline shadow
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "w-full h-full",
  color = "#f97316", // Matches our signature brand orange
  isLight = false
}) => {
  const bgOutline = isLight ? "#fafafa" : "#050505";

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} select-none`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Clip path for the intertwining effect: clips a section out of the N's right side to let the S loop over */}
        <clipPath id="clip-n-right">
          <rect x="0" y="0" width="100" height="100" />
        </clipPath>
      </defs>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500&display=swap');
        
        .monogram-n {
          font-family: 'Playfair Display', 'Didot', 'Bodoni MT', Georgia, serif;
          font-weight: 600;
          font-size: 82px;
          fill: ${color};
        }
        
        .monogram-s {
          font-family: 'Playfair Display', 'Didot', 'Bodoni MT', Georgia, serif;
          font-weight: 500;
          font-style: italic;
          font-size: 84px;
          fill: ${color};
        }

        /* Subtle dark outer glow to enhance premium aesthetic in black background */
        .glow-effect {
          filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.45));
        }
      `}</style>
      
      <g className="glow-effect">
        {/* 1. Underlying letter 'S' bottom loop and middle spine */}
        {/* We render a duplicate 'S' in the background so parts of it pass behind 'N' */}
        <text 
          x="32" 
          y="77" 
          className="monogram-s select-none opacity-40"
          style={{ pointerEvents: "none" }}
        >
          S
        </text>

        {/* 2. Main Letter 'N' (Upright, Roman Serif) */}
        <text 
          x="12" 
          y="76" 
          className="monogram-n select-none"
          style={{ pointerEvents: "none" }}
        >
          N
        </text>

        {/* 3. The Intertwined Overlying 'S' (Italic, Calligraphic Serif) */}
        {/* Using a white outline (masked or styled) or sheer overlay alignment */}
        {/* The top-right loop of S and main spine overlaps N's diagonal and right stem */}
        <text 
          x="32" 
          y="77" 
          className="monogram-s select-none"
          style={{ 
            pointerEvents: "none",
            textShadow: `
              -1px -1px 0 ${bgOutline},  
               1px -1px 0 ${bgOutline},
              -1px  1px 0 ${bgOutline},
               1px  1px 0 ${bgOutline},
              -2px  0px 0 ${bgOutline},
               2px  0px 0 ${bgOutline},
               0px -2px 0 ${bgOutline},
               0px  2px 0 ${bgOutline}
            `
          }}
        >
          S
        </text>
      </g>
    </svg>
  );
};
