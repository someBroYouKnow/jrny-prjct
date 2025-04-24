import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const imagesList = [
  '/landing-video-card.png',
  // '/landing-video-card.png',
  // '/landing-video-card.png',
  // '/landing-video-card.png',
  // '/landing-video-card.png'
];

export default function HorizontalScrollSlider() {
  const racesWrapperRef = useRef<HTMLDivElement>(null);
  const racesRefs = useRef<HTMLDivElement[]>([]);

  // Store ref for each race element
  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !racesRefs.current.includes(el)) {
      racesRefs.current[index] = el;
    }
  };

  useEffect(() => {
    if (!racesWrapperRef.current || racesRefs.current.length === 0) return;

    gsap.to(racesWrapperRef.current, {
      x:-700,
      ease: "none",
      scrollTrigger: {
        trigger: racesWrapperRef.current,
        start: 'top top',
        pin: true,
        scrub: true,
        end: () => "+=" + racesWrapperRef.current?.offsetWidth
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="slider-outer-container">
      <div className="racesWrapper" ref={racesWrapperRef}>
        {imagesList.map((image, index) => (
          <div 
            className='races' 
            key={`race-${index}`}
            ref={el => addToRefs(el, index)}
          >
            <img src={image} alt={`slider ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}