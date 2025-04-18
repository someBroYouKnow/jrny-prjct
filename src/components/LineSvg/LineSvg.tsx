// Add this SVG component at the top of your file (or in a separate components file)
export const VerticalLineSVG: React.FC<{ active?: boolean }> = ({ active = false }) => (
    <svg 
      width="2" 
      height="100%" 
      viewBox="0 0 2 100%" 
      preserveAspectRatio="none"
      className="vertical-line-svg"
    >
      <line 
        x1="1" 
        y1="0" 
        x2="1" 
        y2="100%" 
        stroke={active ? '#ff0000' : '#000000'} 
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
  
export  const UnderlineSVG: React.FC<{ width: string, active?: boolean }> = ({ width, active = false }) => (
    <svg 
      width={width} 
      height="2" 
      viewBox={`0 0 ${width} 2`} 
      className="underline-svg"
    >
      <line 
        x1="0" 
        y1="1" 
        x2="100%" 
        y2="1" 
        stroke={active ? '#ff0000' : '#000000'} 
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
 