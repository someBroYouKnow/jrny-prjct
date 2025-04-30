import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizontalScroll.css";
import { useGSAP } from "@gsap/react";

const imagesList = [
  '/landing-video-card.png',
  '/landing-video-card.png',
  '/landing-video-card.png',
  '/landing-video-card.png',
  '/landing-video-card.png',
  '/landing-video-card.png',
  '/landing-video-card.png',
  '/landing-video-card.png',
  '/landing-video-card.png'
];

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSections() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const slider = sliderRef.current;
    const wrapper = wrapperRef.current;
    if (!slider || !wrapper) return;

    const sections = gsap.utils.toArray<HTMLElement>('.card');
    const heroContainer = document.querySelector('.hero-container') as HTMLElement | null;
    if (!heroContainer) return;

    const totalWidth = heroContainer.offsetWidth;

    const horizontalTween = gsap.to(sections, {
      xPercent: -100 * (sections.length + 1),
      ease: "none",
      scrollTrigger: {
        id: 'horizontal-scroll',
        trigger: '.hero-container',
        pin: true,
        start: "top top",
        scrub: 1,
        pinnedContainer: 'body',
        pinSpacing: true,
        end: () => "+=" + totalWidth,
      },
    });

    // Set initial scale and opacity
    sections.forEach((section) => {
      gsap.set(section, { scale: 0.3, opacity: 0.3, zIndex: 1 });
    });

    // Throttle the onUpdate callback
    let lastUpdate = 0;
    const throttleTime = 16; // Approx 60fps

    ScrollTrigger.create({
      animation: horizontalTween,
      trigger: '.hero-container',
      start: "top top",
      end: () => "+=" + totalWidth,
      scrub: 1,
      onUpdate: () => {
        const now = performance.now();
        if (now - lastUpdate < throttleTime) return; // Throttle updates
        lastUpdate = now;

        const center = window.innerWidth / 2;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.left + rect.width / 2;
          const distanceToCenter = Math.abs(center - sectionCenter);

          // Adjust scale-up and scale-down thresholds
          const maxInfluence = window.innerWidth * 0.55; // Reduced influence for earlier scaling (0.55 instead of 0.6)
          const normalized = Math.min(distanceToCenter / maxInfluence, 1); // Normalize to a value between 0 and 1

          // New scaling logic: start with smaller scale, increase more at the center
          const scale = 0.3 + (1 - normalized) * 0.9; // Scale starts at 0.3 and can go up to 1.2 at the center

          // Use GSAP timeline to animate scaling smoothly
          gsap.to(section, {
            scale,
            opacity: scale, // Keep opacity in sync with scale
            zIndex: Math.round(1 + (1 - normalized) * 9), // Keep zIndex higher for closer images
            duration: 0.2, // Quicker scaling (duration reduced)
            overwrite: "auto",
            ease: "power2.out", // A sharper ease to make the transition faster
          });
        });
      },
    });
  }, []);

  return (
    <div className="wrapperH" ref={wrapperRef}>
      <div className="slider" ref={sliderRef}>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        {
          imagesList.map((image, index) => (
            <div className="card" key={index}>
              <img src={image} alt="Slide" className="slide-image" />
            </div>
          ))
        }
      </div>
    </div>
  );
}
