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
    const coverWidth = 9; // Increased width
    const coverLength = 150;
    const glowWidthMultiplier = 8; // Increased glow width multiplier

    // Create shadow filters with elliptical transformation
    const createEllipticalShadowFilter = (id: string, blur: number) => {
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.id = id;
      filter.setAttribute('x', '-50%');
      filter.setAttribute('y', '-50%');
      filter.setAttribute('width', '200%');
      filter.setAttribute('height', '200%');

      // Apply elliptical transformation
      const feOffset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
      feOffset.setAttribute('dx', '0');
      feOffset.setAttribute('dy', '0');
      feOffset.setAttribute('result', 'offset');

      const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
      feGaussianBlur.setAttribute('stdDeviation', String(blur));
      feGaussianBlur.setAttribute('result', 'blur');

      const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
      feComposite.setAttribute('in', 'blur');
      feComposite.setAttribute('in2', 'SourceAlpha');
      feComposite.setAttribute('operator', 'in');
      feComposite.setAttribute('result', 'shadow');

      const feFlood = document.createElementNS('http://www.w3.org/2000/svg', 'feFlood');
      feFlood.setAttribute('flood-color', '#FF5408');
      feFlood.setAttribute('result', 'color');

      const feComposite2 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
      feComposite2.setAttribute('in', 'color');
      feComposite2.setAttribute('in2', 'shadow');
      feComposite2.setAttribute('operator', 'in');

      // Apply elliptical scaling
      const feComposite3 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
      feComposite3.setAttribute('in', 'SourceGraphic');
      feComposite3.setAttribute('operator', 'over');

      filter.appendChild(feOffset);
      filter.appendChild(feGaussianBlur);
      filter.appendChild(feComposite);
      filter.appendChild(feFlood);
      filter.appendChild(feComposite2);
      filter.appendChild(feComposite3);

      return filter;
    };

    const shadowFilters = [
      { id: 'shadow-4px', blur: 4.52 },
      { id: 'shadow-9px', blur: 9.04 },
      { id: 'shadow-32px', blur: 31.65 },
      { id: 'shadow-63px', blur: 63.29 },
      { id: 'shadow-108px', blur: 108.5 },
      { id: 'shadow-190px', blur: 189.88 }
    ];

    // Create blur filter with elliptical transformation
    const blurFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    blurFilter.id = 'blur-filter';
    blurFilter.setAttribute('x', '-50%');
    blurFilter.setAttribute('y', '-50%');
    blurFilter.setAttribute('width', '200%');
    blurFilter.setAttribute('height', '200%');

    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '26.9');
    blurFilter.appendChild(feGaussianBlur);

    // Create elliptical radial gradient
    const radialGradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    radialGradient.id = 'radial-gradient';
    radialGradient.setAttribute('cx', '50%');
    radialGradient.setAttribute('cy', '50%');
    radialGradient.setAttribute('r', '50%');
    radialGradient.setAttribute('fx', '50%');
    radialGradient.setAttribute('fy', '50%');
    radialGradient.setAttribute('gradientTransform', 'scale(1, 0.3)'); // More elliptical shape

    const gradientStops = [
      { offset: '0%', color: '#FFCB64' },
      { offset: '100%', color: '#FF4900' }
    ];

    gradientStops.forEach(stop => {
      const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stopElement.setAttribute('offset', stop.offset);
      stopElement.setAttribute('stop-color', stop.color);
      radialGradient.appendChild(stopElement);
    });

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    shadowFilters.forEach(filter => defs.appendChild(createEllipticalShadowFilter(filter.id, filter.blur)));
    defs.appendChild(blurFilter);
    defs.appendChild(radialGradient);
    svgRef.current.appendChild(defs);

    const updatePaths = (progress: number) => {
      const centerLength = progress * pathLength;
      let startLength = Math.max(0, centerLength - coverLength / 2);
      let endLength = Math.min(pathLength, centerLength + coverLength / 2);

      if (endLength - startLength < coverLength) {
        if (centerLength < pathLength / 2) {
          endLength = startLength + coverLength;
        } else {
          startLength = endLength - coverLength;
        }
      }

      // Main cover path points (wider)
      const coverPoints = [];
      const segments = 40; // More segments for smoother ellipse
      
      for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        
        // Apply elliptical scaling to width
        const ellipticalFactor = Math.sin(Math.PI * ratio);
        const currentWidth = coverWidth * (0.7 + 0.3 * ellipticalFactor);
        
        coverPoints.push({
          x: point.x + normal.x * currentWidth / 2,
          y: point.y + normal.y * currentWidth / 2
        });
      }
      
      for (let i = segments; i >= 0; i--) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        
        const ellipticalFactor = Math.sin(Math.PI * ratio);
        const currentWidth = coverWidth * (0.7 + 0.3 * ellipticalFactor);
        
        coverPoints.push({
          x: point.x - normal.x * currentWidth / 2,
          y: point.y - normal.y * currentWidth / 2
        });
      }

      // Glow path points (more elliptical and wider)
      const glowPoints = [];
      const baseGlowWidth = coverWidth * glowWidthMultiplier;
      
      for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        
        // Stronger elliptical effect
        const ellipticalFactor = Math.sin(Math.PI * ratio);
        const glowWidth = baseGlowWidth * (0.2 + 0.8 * ellipticalFactor);
        
        glowPoints.push({
          x: point.x + normal.x * glowWidth / 2,
          y: point.y + normal.y * glowWidth / 2
        });
      }
      
      for (let i = segments; i >= 0; i--) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        
        const ellipticalFactor = Math.sin(Math.PI * ratio);
        const glowWidth = baseGlowWidth * (0.2 + 0.8 * ellipticalFactor);
        
        glowPoints.push({
          x: point.x - normal.x * glowWidth / 2,
          y: point.y - normal.y * glowWidth / 2
        });
      }

      coverPathRef.current?.setAttribute('d', generatePathData(coverPoints));
      glowPathRef.current?.setAttribute('d', generatePathData(glowPoints));
    };

    const getNormalAtLength = (path: SVGPathElement, length: number) => {
      const EPSILON = 1.5; // Larger epsilon for smoother normals
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
      viewBox="0 0 1536 4000" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto' }}
    >
      <defs>
        {/* Shadow filters with elliptical effect */}
        {[4.52, 9.04, 31.65, 63.29, 108.5, 189.88].map((blur, i) => (
          <filter key={i} id={`shadow-${blur}px`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={String(blur)} result="blur"/>
            <feComposite in="blur" in2="SourceAlpha" operator="in" result="shadow"/>
            <feFlood flood-color="#FF5408" result="color"/>
            <feComposite in="color" in2="shadow" operator="in"/>
          </filter>
        ))}

        {/* Blur filter */}
        <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="26.9"/>
        </filter>

        {/* More elliptical radial gradient */}
        <radialGradient id="radial-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientTransform="scale(1, 0.25)">
          <stop offset="0%" stop-color="#FFCB64"/>
          <stop offset="100%" stop-color="#FF4900"/>
        </radialGradient>
      </defs>

      <path 
        ref={originalPathRef}
        id="mainPath" 
        d="M1536,200 L1536,800 L10,600 L10,1200 L1536,1400 L1536,2800 L10,3000 L10,3500" 
        fill="none" 
        stroke="#FF5B00" 
        strokeWidth="4"
      />
      
      {/* Glow path with all shadow layers - now more elliptical */}
      <g filter="url(#blur-filter)">
        <path 
          ref={glowPathRef}
          fill="url(#radial-gradient)"
          filter="url(#shadow-190px)"
          opacity="0.6"
        />
        <path 
          ref={glowPathRef}
          fill="url(#radial-gradient)"
          filter="url(#shadow-108px)"
          opacity="0.7"
        />
        <path 
          ref={glowPathRef}
          fill="url(#radial-gradient)"
          filter="url(#shadow-63px)"
          opacity="0.8"
        />
        <path 
          ref={glowPathRef}
          fill="url(#radial-gradient)"
          filter="url(#shadow-32px)"
          opacity="0.9"
        />
        <path 
          ref={glowPathRef}
          fill="url(#radial-gradient)"
          filter="url(#shadow-9px)"
          opacity="0.95"
        />
        <path 
          ref={glowPathRef}
          fill="url(#radial-gradient)"
          filter="url(#shadow-4px)"
          opacity="1"
        />
      </g>
      
      {/* Main cover path - now more elliptical */}
      <path 
        ref={coverPathRef}
        fill="url(#radial-gradient)"
        stroke="#FF5B00"
        strokeWidth="1.3"
        strokeOpacity="0.8"
      />
    </svg>
  );
};

export default PathWithSlab; 