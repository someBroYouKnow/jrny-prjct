import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './PartnerSlider.css';

// Define the type for a slide element
type SlideElement = HTMLElement;

const sliderImages = [
  '/assets/slider1.png',
  '/assets/slider2.png',
  '/assets/slider3.png',
  '/assets/slider1.png',
  '/assets/slider2.png',
  '/assets/slider3.png'
];

const PartnerSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize animation using useGSAP within the scope of containerRef
  useGSAP(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement) return;

    const slides = gsap.utils.toArray<SlideElement>('.partner-image', sliderElement); // Limit scope to the slider element
    if (slides.length === 0) return;

    const firstSlide = slides[0];
    const marginRight = parseFloat(gsap.getProperty(firstSlide, 'marginRight') as string || '0');


    // Create a seamless horizontal loop
    animationRef.current = horizontalLoop(slides, {
      speed: 1, // Adjust speed as needed (1 = ~100px per second)
      repeat: -1, // Infinite repeat
      paused: false,
      paddingRight: marginRight
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, { scope: containerRef }); // Associate useGSAP with the containerRef

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (animationRef.current) {
        animationRef.current.kill();
        const sliderElement = sliderRef.current;
        if (!sliderElement) return;

        const slides = gsap.utils.toArray<SlideElement>('.partner-image', sliderElement); // Limit scope
        if (slides.length > 0) {
           const firstSlide = slides[0];
           const marginRight = parseFloat(gsap.getProperty(firstSlide, 'marginRight') as string || '0');

          animationRef.current = horizontalLoop(slides, {
            speed: 1,
            repeat: -1,
            paddingRight: marginRight
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pause/resume animation on hover
  const handleMouseEnter = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  return (
    <div
      className="partner-slider"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="partner-slider-container">
        <div className="partner-images" ref={sliderRef}>
          {/* First set of images */}
          {sliderImages.map((image, index) => (
            <div className="partner-image" key={`first-${index}`}>
              <img
                className="partner-image-img"
                src={image}
                alt={`Partner ${index + 1}`}
                loading="lazy"
                width="100"
                height="50"
              />
            </div>
          ))}
          {/* Second set of images (duplicates for seamless looping) */}
          {sliderImages.map((image, index) => (
            <div className="partner-image" key={`second-${index}`} aria-hidden="true">
              <img
                className="partner-image-img"
                src={image}
                alt="" // Alt text for aria-hidden elements can be empty
                loading="lazy"
                width="100"
                height="50"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Define type for the config object
interface HorizontalLoopConfig {
    speed?: number;
    repeat?: number;
    paused?: boolean;
    paddingRight?: number;
    snap?: number | boolean;
    reversed?: boolean;
}


// Horizontal loop helper function (slightly modified from original)
function horizontalLoop(items: SlideElement[], config: HorizontalLoopConfig): gsap.core.Timeline {
    items = gsap.utils.toArray(items) as SlideElement[];
    config = config || {};
  
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times: number[] = [],
      widths: number[] = [],
      xPercents: number[] = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1),
      totalWidth: number,
      curX: number,
      distanceToStart: number,
      distanceToLoop: number,
      item: SlideElement,
      i: number;
  
    // Measure widths and initial xPercents
    gsap.set(items, {
      xPercent: (i, el) => {
        const element = el as HTMLElement;
        let w = (widths[i] = parseFloat(gsap.getProperty(element, "width", "px") as string || '0'));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(element, "x", "px") as string || '0') / w * 100 +
            parseFloat(gsap.getProperty(element, "xPercent") as string || '0'))
        );
        return xPercents[i];
      },
    });
  
    gsap.set(items, { x: 0 });
  
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        parseFloat(gsap.getProperty(items[length - 1], "scaleX") as string || '1') +
      (parseFloat(config.paddingRight as any) || 0);
  
    // Main animation logic
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop = distanceToStart + widths[i] * parseFloat(gsap.getProperty(item, "scaleX") as string || '1');
  
      // Animate to loop out (left -> right)
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
          opacity: 1, // ensure fully visible while scrolling left to right
        },
        0
      );
  
      // Fade out just before leaving viewport (exit left)
      tl.to(
        item,
        {
          opacity: 0,
          duration: 0.2,
        },
        (distanceToLoop - 0.2 * pixelsPerSecond) / pixelsPerSecond
      );
  
      // Reset position offscreen right & fade in (right -> left)
      tl.fromTo(
        item,
        {
          xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
          opacity: 0,
        },
        {
          xPercent: xPercents[i],
          opacity: 1,
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      );
  
      tl.add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
  
    // Control methods
    function toIndex(index: number, vars?: gsap.TweenVars): gsap.core.Tween {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
  
    tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
    (tl as any).times = times;
  
    // Pre-render
    tl.progress(1, true).progress(0, true);
  
    if (config.reversed) {
      tl.vars.onReverseComplete?.();
      tl.reverse();
    }
  
    return tl;
  }
  

export default PartnerSlider;