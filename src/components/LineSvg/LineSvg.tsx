import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pathEase } from './pathease';

// Register GSAP plugin
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const PathWithSlab: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const coverPathRef = useRef<SVGPathElement>(null);
  const originalPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !coverPathRef.current || !originalPathRef.current) return;

    const path = originalPathRef.current;
    const pathLength = path.getTotalLength();
    const coverWidth = 6; // Width of the cover path (6px)
    const coverLength = 30; // Length of the white cover (30px)

    // Function to create a precise path segment with exact length
    const updateCoverPath = (progress: number) => {
      const centerLength = progress * pathLength;
      let startLength = Math.max(0, centerLength - coverLength / 2);
      let endLength = Math.min(pathLength, centerLength + coverLength / 2);
      
      // Adjust to ensure exact coverLength
      if (endLength - startLength < coverLength) {
        if (centerLength < pathLength / 2) {
          endLength = Math.min(pathLength, startLength + coverLength);
        } else {
          startLength = Math.max(0, endLength - coverLength);
        }
      }

      // Calculate points with exact length
      const points = [];
      const segments = 20; // Number of segments for smoothness
      
      // Forward points (top side)
      for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        
        points.push({
          x: point.x + normal.x * coverWidth / 2,
          y: point.y + normal.y * coverWidth / 2
        });
      }
      
      // Backward points (bottom side)
      for (let i = segments; i >= 0; i--) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        
        points.push({
          x: point.x - normal.x * coverWidth / 2,
          y: point.y - normal.y * coverWidth / 2
        });
      }
      
      // Build path data
      let pathData = points.map((p, i) => 
        (i === 0 ? 'M' : 'L') + p.x + ',' + p.y
      ).join(' ') + ' Z';
      
      coverPathRef.current?.setAttribute('d', pathData);
    };

    // Function to get normal vector with precise length measurement
    const getNormalAtLength = (path: SVGPathElement, length: number) => {
      const EPSILON = 0.1; // Small offset for derivative calculation
      const point1 = path.getPointAtLength(Math.max(0, length - EPSILON));
      const point2 = path.getPointAtLength(Math.min(pathLength, length + EPSILON));
      
      const dx = point2.x - point1.x;
      const dy = point2.y - point1.y;
      const magnitude = Math.sqrt(dx * dx + dy * dy);
      
      return {
        x: -dy / magnitude, // Perpendicular vector
        y: dx / magnitude
      };
    };

    const easeFn = pathEase('#mainPath', {});

    // GSAP animation
    gsap.to(coverPathRef.current, {
      scrollTrigger: {
        trigger: ".content-svg",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          updateCoverPath(self.progress);
        }
      },
      ease: easeFn,
    });

    return () => {
      gsap.killTweensOf(coverPathRef.current);
    };
  }, []);

  return (
    <svg 
      ref={svgRef}
      viewBox="0 0 1600 4000" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto' }}
    >
      {/* Original path (orange) */}
      <path 
        ref={originalPathRef}
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
      
      {/* Cover path (white) - exactly 30px long and 6px wide */}
      <path 
        ref={coverPathRef}
        fill="white" 
        stroke="white"
        strokeWidth="0.5"
      />
    </svg>
  );
};

export default PathWithSlab;