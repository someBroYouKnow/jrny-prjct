import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pathEase } from './pathease';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const PathWithSlab: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const coverPathRef = useRef<SVGPathElement>(null);
  const originalPathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !coverPathRef.current || !originalPathRef.current || !glowPathRef.current) return;

    const path = originalPathRef.current;
    const pathLength = path.getTotalLength();
    const coverWidth = 6;
    const coverLength = 30;

    // Create glow filter
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.id = 'glow-filter';
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');

    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '4');
    feGaussianBlur.setAttribute('result', 'blur');

    const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    feComposite.setAttribute('in', 'blur');
    feComposite.setAttribute('in2', 'SourceAlpha');
    feComposite.setAttribute('operator', 'in');
    feComposite.setAttribute('result', 'glow');

    filter.appendChild(feGaussianBlur);
    filter.appendChild(feComposite);

    // Create gradient
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.id = 'path-gradient';
    gradient.setAttribute('gradientTransform', 'rotate(90)');

    const stops = [
      { offset: '0%', color: '#FF4900' },
      { offset: '26%', color: '#FFAE68' },
      { offset: '48.5%', color: '#FFD363' },
      { offset: '75%', color: '#FFAE68' },
      { offset: '97%', color: '#FF4900' }
    ];

    stops.forEach(stop => {
      const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stopElement.setAttribute('offset', stop.offset);
      stopElement.setAttribute('stop-color', stop.color);
      gradient.appendChild(stopElement);
    });

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.appendChild(filter);
    defs.appendChild(gradient);
    svgRef.current.appendChild(defs);

    const updatePaths = (progress: number) => {
      const centerLength = progress * pathLength;
      let startLength = Math.max(0, centerLength - coverLength / 2);
      let endLength = Math.min(pathLength, centerLength + coverLength / 2);

      if (endLength - startLength < coverLength) {
        if (centerLength < pathLength / 2) {
          endLength = Math.min(pathLength, startLength + coverLength);
        } else {
          startLength = Math.max(0, endLength - coverLength);
        }
      }

      // Main cover path points
      const coverPoints = [];
      const segments = 20;
      
      // Forward points
      for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        
        coverPoints.push({
          x: point.x + normal.x * coverWidth / 2,
          y: point.y + normal.y * coverWidth / 2
        });
      }
      
      // Backward points
      for (let i = segments; i >= 0; i--) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        
        coverPoints.push({
          x: point.x - normal.x * coverWidth / 2,
          y: point.y - normal.y * coverWidth / 2
        });
      }
      
      // Glow path points (wider)
      const glowPoints = [];
      const glowWidth = coverWidth * 3;
      
      // Forward points
      for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        
        glowPoints.push({
          x: point.x + normal.x * glowWidth / 2,
          y: point.y + normal.y * glowWidth / 2
        });
      }
      
      // Backward points
      for (let i = segments; i >= 0; i--) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        
        glowPoints.push({
          x: point.x - normal.x * glowWidth / 2,
          y: point.y - normal.y * glowWidth / 2
        });
      }

      // Update paths
      coverPathRef.current?.setAttribute('d', generatePathData(coverPoints));
      glowPathRef.current?.setAttribute('d', generatePathData(glowPoints));
    };

    const getNormalAtLength = (path: SVGPathElement, length: number) => {
      const EPSILON = 0.1;
      const point1 = path.getPointAtLength(Math.max(0, length - EPSILON));
      const point2 = path.getPointAtLength(Math.min(pathLength, length + EPSILON));
      
      const dx = point2.x - point1.x;
      const dy = point2.y - point1.y;
      const magnitude = Math.sqrt(dx * dx + dy * dy);
      
      return {
        x: -dy / magnitude,
        y: dx / magnitude
      };
    };

    const generatePathData = (points: {x: number, y: number}[]) => {
      return points.map((p, i) => 
        (i === 0 ? 'M' : 'L') + p.x + ',' + p.y
      ).join(' ') + ' Z';
    };

    const easeFn = pathEase('#mainPath', {});

    gsap.to(coverPathRef.current, {
      scrollTrigger: {
        trigger: ".content-svg",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          updatePaths(self.progress);
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
      <defs>
        <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feComposite in="blur" in2="SourceAlpha" operator="in" result="glow"/>
        </filter>

        <linearGradient id="path-gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#FF4900"/>
          <stop offset="26%" stop-color="#FFAE68"/>
          <stop offset="48.5%" stop-color="#FFD363"/>
          <stop offset="75%" stop-color="#FFAE68"/>
          <stop offset="97%" stop-color="#FF4900"/>
        </linearGradient>
      </defs>

      <path 
        ref={originalPathRef}
        id="mainPath" 
        d="M1536,200 L1536,400 L10,600 L10,1200 L1536,1400 L1536,2800 L10,3000 L10,3500" 
        fill="none" 
        stroke="#FF5B00" 
        strokeWidth="4"
      />
      
      {/* Glow path (behind main path) */}
      <path 
        ref={glowPathRef}
        fill="url(#path-gradient)"
        filter="url(#glow-filter)"
        opacity="0.7"
      />
      
      {/* Main cover path (on top) */}
      <path 
        ref={coverPathRef}
        fill="url(#path-gradient)"
        stroke="#FF5B00"
        strokeWidth="0.5"
      />
    </svg>
  );
};

export default PathWithSlab;