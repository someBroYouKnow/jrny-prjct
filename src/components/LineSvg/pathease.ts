import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export interface PathEaseConfig {
  axis?: "x" | "y";
  precision?: number;
  smooth?: boolean | number;
  speed?: number; // Multiplier on scroll progress
}

export function pathEase(
  path: string | SVGPathElement,
  config: Partial<PathEaseConfig> = {}
): (progress: number) => number {

  const axis = config.axis || "y";
  const precision = config.precision || 100;
  let speed = config.speed ?? 1;

  // Find the <path> element
  const pathElement =
    typeof path === "string"
      ? (document.querySelector(path) as SVGPathElement)
      : path;
  if (!pathElement) {
    console.warn("pathEase: couldn’t find path", path);
    return (p) => p;
  }

  // Build the rawPath measurements
  const rawPath = MotionPathPlugin.cacheRawPathMeasurements(
    MotionPathPlugin.getRawPath(pathElement),
    Math.round(precision * 24)
  );

  const useX = axis === "x";
  const start = rawPath[0][useX ? 0 : 1];
  const lastSeg = rawPath[rawPath.length - 1];
  const end = lastSeg[lastSeg.length - (useX ? 2 : 1)];
  const range = end - start;

  const l = Math.round(precision * 200);
  const inc = 1 / l;
  const positions: number[] = [0];
  const a: number[] = [];
  const smoothIndexes: number[] = [];
  let minIndex = 0;
  const minChange = inc * 0.6;
  const smoothRange = config.smooth === true ? 7 : Math.round(config.smooth || 0);
  const fullSmooth = smoothRange * 2;

  // Fill positions[] with normalized path-progress values
  for (let i = 1; i < l; i++) {
    const posOnPath = MotionPathPlugin.getPositionOnPath(rawPath, i / l)[axis];
    positions[i] = (posOnPath - start) / range;
  }
  positions[l] = 1;

  const getClosest = (p: number) => {
    while (positions[minIndex] <= p && minIndex < l) {
      minIndex++;
    }
    const interp =
      ((p - positions[minIndex - 1]) /
        (positions[minIndex] - positions[minIndex - 1])) *
        inc +
      minIndex * inc;
    a.push(a.length ? interp : 0);

    if (
      smoothRange &&
      a.length > smoothRange &&
      a[a.length - 1] - a[a.length - 2] < minChange
    ) {
      smoothIndexes.push(a.length - smoothRange);
    }
  };

  // Build `a[]`
  for (let i = 0; i < l; i++) {
    getClosest(i / l);
  }
  a.push(1);

  if (smoothRange) {
    smoothIndexes.push(l - fullSmooth + 1);
    smoothIndexes.forEach((startIdx) => {
      const startVal = a[startIdx];
      const endIdx = Math.min(startIdx + fullSmooth, l);
      const delta = (a[endIdx] - startVal) / (endIdx - startIdx);
      let c = 1;
      for (let j = startIdx + 1; j < endIdx; j++) {
        a[j] = startVal + delta * c++;
      }
    });
  }

  return (p: number) => {
    // Apply speed multiplier & clamp to [0,1]
    let sp = Math.min(Math.max(p * speed, 0), 1);
    const idx = sp * l;
    const i0 = Math.floor(idx);
    const s = a[i0];
    const sNext = a[Math.ceil(idx)];
    const t = idx - i0;

    // Adjust speed if the slab is too close to the top or bottom of the viewport
    const progress = sp; // Current progress
    const viewportHeight = window.innerHeight;
    const scrollableHeight = document.documentElement.scrollHeight - viewportHeight;

    // Reduce speed when approaching the top or bottom of the viewport
    if (progress < 0.1 || progress > 0.9) {
      sp = Math.max(sp * 0.3, 0.1); // Slow down when near top/bottom
    }

    return s + (sNext - s) * t;
  };
}
