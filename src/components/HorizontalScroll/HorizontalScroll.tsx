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
      gsap.set(section, { scale: 0.5, opacity: 0.4, zIndex: 1 });
    });

    ScrollTrigger.create({
      animation: horizontalTween,
      trigger: '.hero-container',
      start: "top top",
      end: () => "+=" + totalWidth,
      scrub: 1,
      onUpdate: () => {
        const center = window.innerWidth / 2;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.left + rect.width / 2;
          const distanceToCenter = Math.abs(center - sectionCenter);

          // Define scaling logic: the closer the image is to the center, the larger it gets
          const maxInfluence = window.innerWidth * 0.6; // Maximum distance at which the scale should change
          const normalized = Math.min(distanceToCenter / maxInfluence, 1); // Normalize to a value between 0 and 1

          // Simple scaling based on distance from the center
          const scale = 1 - normalized * 0.5; // Scale decreases as distance from the center increases, from 1 to 0.5

          gsap.to(section, {
            scale,
            opacity: scale, // Keep opacity in sync with scale
            zIndex: Math.round(1 + (1 - normalized) * 9), // Keep zIndex higher for closer images
            duration: 0.3,
            overwrite: "auto",
            ease: "power1.out",
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
