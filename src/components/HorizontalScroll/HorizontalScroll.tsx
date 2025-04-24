import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./HorizontalScroll.css";

gsap.registerPlugin(ScrollTrigger);

const imagesList = [
  "/landing-video-card.png",
  "/landing-video-card.png",
  "/landing-video-card.png",
  "/landing-video-card.png",
  "/landing-video-card.png"
];

export default function HorizontalScrollSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;

    const sections = gsap.utils.toArray(".slider-item");

    gsap.to(trackRef.current, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${containerRef.current!.offsetWidth * (sections.length - 1)}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });
  }, []);

  return (
    <div className="slider-outer-container" ref={containerRef}>
      <div className="slider-track" ref={trackRef}>
        {imagesList.map((src, index) => (
          <div className="slider-item" key={index}>
            <img src={src} alt={`slide-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
