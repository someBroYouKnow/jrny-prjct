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
  '/assets/slider3.png',
  '/assets/slider1.png',
  '/assets/slider2.png',
  '/assets/slider3.png',
  '/assets/slider1.png',
  '/assets/slider2.png',
  '/assets/slider3.png',
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
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Initialize animation using useGSAP within the scope of containerRef
  useGSAP(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement) return;

    // Target the correct elements - first-partner and second-partner divs
    const firstPartner = sliderElement.querySelector('.first-partner') as HTMLElement;
    const secondPartner = sliderElement.querySelector('.second-partner') as HTMLElement;
    
    if (!firstPartner || !secondPartner) return;
    
    // Calculate total width of the first partner section (including all images)
    const totalWidth = firstPartner.offsetWidth;
    
    // Create infinite loop animation
    animationRef.current = gsap.to([firstPartner, secondPartner], {
      x: `-${totalWidth}px`,
      duration: 20, // slower speed for smoother animation
      ease: "linear",
      repeat: -1, 
      onRepeat: () => {
        // Reset position when animation repeats
        gsap.set([firstPartner, secondPartner], { x: 0 });
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, { scope: containerRef });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (animationRef.current) {
        // Kill existing animation
        animationRef.current.kill();
        
        // Re-initialize with new dimensions
        const sliderElement = sliderRef.current;
        if (!sliderElement) return;

        const firstPartner = sliderElement.querySelector('.first-partner') as HTMLElement;
        const secondPartner = sliderElement.querySelector('.second-partner') as HTMLElement;
        
        if (!firstPartner || !secondPartner) return;
        
        const totalWidth = firstPartner.offsetWidth;
        
        animationRef.current = gsap.to([firstPartner, secondPartner], {
          x: `-${totalWidth}px`,
          duration: 4,
          ease: "linear",
          repeat: -1,
          onRepeat: () => {
            gsap.set([firstPartner, secondPartner], { x: 0 });
          }
        });
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
          <div className="first-partner">
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
          </div>
          <div className="second-partner">
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
    </div>
  );
};

export default PartnerSlider;