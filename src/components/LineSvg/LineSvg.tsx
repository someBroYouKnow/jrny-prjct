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
    const coverWidth = 5; // Slightly wider main path
    const coverLength = 150; // 150px long traveling path
    const glowWidthMultiplier = 6; // Wider glow effect

    // Create enhanced glow filter with multiple layers
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.id = 'glow-filter';
    filter.setAttribute('x', '-100%');
    filter.setAttribute('y', '-100%');
    filter.setAttribute('width', '300%');
    filter.setAttribute('height', '300%');

    const feGaussianBlur1 = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur1.setAttribute('stdDeviation', '12');
    feGaussianBlur1.setAttribute('result', 'blur1');

    const feGaussianBlur2 = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur2.setAttribute('stdDeviation', '6');
    feGaussianBlur2.setAttribute('result', 'blur2');

    const feComposite1 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    feComposite1.setAttribute('in', 'blur1');
    feComposite1.setAttribute('in2', 'SourceAlpha');
    feComposite1.setAttribute('operator', 'in');
    feComposite1.setAttribute('result', 'glow1');

    const feComposite2 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    feComposite2.setAttribute('in', 'blur2');
    feComposite2.setAttribute('in2', 'SourceAlpha');
    feComposite2.setAttribute('operator', 'in');
    feComposite2.setAttribute('result', 'glow2');

    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode1.setAttribute('in', 'glow1');
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode2.setAttribute('in', 'glow2');
    const feMergeNode3 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode3.setAttribute('in', 'SourceGraphic');

    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    feMerge.appendChild(feMergeNode3);

    filter.appendChild(feGaussianBlur1);
    filter.appendChild(feGaussianBlur2);
    filter.appendChild(feComposite1);
    filter.appendChild(feComposite2);
    filter.appendChild(feMerge);

    // Create the main gradient (elliptical shape)
    const mainGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    mainGradient.id = 'main-gradient';
    mainGradient.setAttribute('gradientTransform', 'rotate(90)');

    const mainStops = [
      { offset: '0%', color: '#FF4900' },
      { offset: '25%', color: '#FFAE68' },
      { offset: '50%', color: '#FFD363' },
      { offset: '75%', color: '#FFAE68' },
      { offset: '100%', color: '#FF4900' }
    ];

    mainStops.forEach(stop => {
      const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stopElement.setAttribute('offset', stop.offset);
      stopElement.setAttribute('stop-color', stop.color);
      mainGradient.appendChild(stopElement);
    });

    const glowGradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    glowGradient.id = 'glow-gradient';
    glowGradient.setAttribute('cx', '50%');
    glowGradient.setAttribute('cy', '50%');
    glowGradient.setAttribute('r', '50%');
    glowGradient.setAttribute('gradientTransform', 'rotate(90) scale(1, 0.2)');

    const glowStops = [
      { offset: '0%', color: '#FF4900', opacity: '0.8' },
      { offset: '30%', color: '#FFAE68', opacity: '0.6' },
      { offset: '50%', color: '#FFD363', opacity: '0.4' },
      { offset: '70%', color: '#FFAE68', opacity: '0.6' },
      { offset: '100%', color: '#FF4900', opacity: '0.8' }
    ];

    glowStops.forEach(stop => {
      const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stopElement.setAttribute('offset', stop.offset);
      stopElement.setAttribute('stop-color', stop.color);
      stopElement.setAttribute('stop-opacity', stop.opacity);
      glowGradient.appendChild(stopElement);
    });

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.appendChild(filter);
    defs.appendChild(mainGradient);
    defs.appendChild(glowGradient);
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

      const coverPoints = [];
      const segments = 30;
      
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

      const glowPoints = [];
      const baseGlowWidth = coverWidth * glowWidthMultiplier;
      
      for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const length = startLength + ratio * coverLength;
        const point = path.getPointAtLength(length);
        const normal = getNormalAtLength(path, length);
        
        const ellipticalFactor = Math.sin(Math.PI * ratio);
        const glowWidth = baseGlowWidth * (0.3 + 0.7 * ellipticalFactor);
        
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
        const glowWidth = baseGlowWidth * (0.3 + 0.7 * ellipticalFactor);
        
        glowPoints.push({
          x: point.x - normal.x * glowWidth / 2,
          y: point.y - normal.y * glowWidth / 2
        });
      }

      coverPathRef.current?.setAttribute('d', generatePathData(coverPoints));
      glowPathRef.current?.setAttribute('d', generatePathData(glowPoints));
    };

    const getNormalAtLength = (path: SVGPathElement, length: number) => {
      const EPSILON = 1.0;
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

    // Changing the color of the glow path
    glowPathRef.current?.setAttribute("fill", "url(#glow-gradient)");

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
        <filter id="glow-filter" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="12" result="blur1"/>
          <feGaussianBlur stdDeviation="6" result="blur2"/>
          <feComposite in="blur1" in2="SourceAlpha" operator="in" result="glow1"/>
          <feComposite in="blur2" in2="SourceAlpha" operator="in" result="glow2"/>
          <feMerge>
            <feMergeNode in="glow1"/>
            <feMergeNode in="glow2"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <linearGradient id="main-gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#FF4900"/>
          <stop offset="25%" stop-color="#FFAE68"/>
          <stop offset="50%" stop-color="#FFD363"/>
          <stop offset="75%" stop-color="#FFAE68"/>
          <stop offset="100%" stop-color="#FF4900"/>
        </linearGradient>

        <radialGradient id="glow-gradient" cx="50%" cy="50%" r="50%" gradientTransform="rotate(90) scale(1, 0.2)">
          <stop offset="0%" stop-color="#FF4900" stop-opacity="0.8"/>
          <stop offset="30%" stop-color="#FFAE68" stop-opacity="0.6"/>
          <stop offset="50%" stop-color="#FFD363" stop-opacity="0.4"/>
          <stop offset="70%" stop-color="#FFAE68" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#FF4900" stop-opacity="0.8"/>
        </radialGradient>
      </defs>

      <path 
        ref={originalPathRef}
        id="mainPath" 
        d="M1536,200 L1536,400 L10,600 L10,1200 L1536,1400 L1536,2800 L10,3000 L10,3500" 
        fill="none" 
        stroke="#FF5B00" 
        strokeWidth="4"
      />
      
      <path 
        ref={glowPathRef}
        fill="url(#glow-gradient)"
        filter="url(#glow-filter)"
        opacity="0.7"
      />
      
      <path 
        ref={coverPathRef}
        fill="url(#main-gradient)"
        stroke="#FF5B00"
        strokeWidth="1"
        strokeOpacity="0.8"
      />
    </svg>
  );
};

export default PathWithSlab;
