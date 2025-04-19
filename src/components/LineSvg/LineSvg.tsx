import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugin
gsap.registerPlugin(MotionPathPlugin);

const PathWithSlab: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const slabRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (!svgRef.current || !slabRef.current) return;

    const path = svgRef.current.querySelector('#mainPath') as SVGPathElement;
    const pathLength = path.getTotalLength();
    const slabLength = 20; // Height of your slab

    // Get start and end points for slab positioning
    const getSlabPoints = (progress: number) => {
      const startProgress = Math.max(0, progress - 0.01);
      const endProgress = Math.min(1, progress + 0.01);
      
      const startPoint = path.getPointAtLength(startProgress * pathLength);
      const endPoint = path.getPointAtLength(endProgress * pathLength);
      
      return { startPoint, endPoint };
    };

    // Create a clipped path for the slab
    const clipPathId = 'slab-clip';
    const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    clipPath.id = clipPathId;
    const clipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    clipPath.appendChild(clipRect);
    svgRef.current.appendChild(clipPath);

    // Animate with GSAP
    gsap.to(slabRef.current, {
      motionPath: {
        path: '#mainPath',
        align: '#mainPath',
        alignOrigin: [0.5, 0.5],
      },
      duration: 10,
      repeat: -1,
      ease: 'none',
      onUpdate: function() {
        const progress = this.progress();
        const { startPoint, endPoint } = getSlabPoints(progress);
        
        // Calculate angle for proper slab orientation
        const angle = Math.atan2(
          endPoint.y - startPoint.y, 
          endPoint.x - startPoint.x
        ) * 180 / Math.PI;
        
        // Update slab position and rotation
        if (slabRef.current) {
          slabRef.current.setAttribute('transform', `rotate(${angle} ${endPoint.x} ${endPoint.y})`);
          slabRef.current.setAttribute('x', String(endPoint.x - 10));
          slabRef.current.setAttribute('y', String(endPoint.y - slabLength/2));
          
          // Update clip path to match line width
          clipRect.setAttribute('x', String(endPoint.x - 10));
          clipRect.setAttribute('y', String(endPoint.y - slabLength/2));
          clipRect.setAttribute('width', '20');
          clipRect.setAttribute('height', String(slabLength));
        }
      }
    });

    return () => {
      // Clean up
      gsap.killTweensOf(slabRef.current);
    };
  }, []);

  return (
    <svg 
      ref={svgRef}
      viewBox="0 0 1600 4000" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto' }}
    >
      {/* Main path */}
      <path 
        id="mainPath" 
        d="
          M1536,200 
          L1536,400
          L10,600
          L10,1200
          L1536,1400
          L1536,2800
          L10,3000
          L10,3500
        " 
        fill="none" 
        stroke="#FF5B00" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="4"
      />
      
      {/* Slab that strictly follows the path */}
      <rect 
        ref={slabRef}
        width="20" 
        height="20" 
        fill="#FF5B00" 
        opacity="0.8"
        clipPath="url(#slab-clip)"
      />
    </svg>
  );
};

export default PathWithSlab;