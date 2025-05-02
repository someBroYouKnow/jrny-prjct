import React, { useRef } from "react";
import { gsap } from "gsap";
import "./HorizontalScroll.css";
import { useGSAP } from "@gsap/react";

const imagesList = new Array(9).fill("/landing-video-card.png");

export default function HorizontalScrollSections() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const slider = sliderRef.current;
    const wrapper = wrapperRef.current;
    if (!slider || !wrapper) return;

    const cards = gsap.utils.toArray<HTMLElement>(".card");
    const viewportWidth = window.innerWidth;
    const cardWidth = cards[0]?.offsetWidth || 300;
    const gap = 20;

    // Initial slider position (left aligned)
    gsap.set(slider, {
      x: viewportWidth / 2 - cardWidth / 2,
    });

    // Set initial state for all cards
    cards.forEach((card, i) => {
      gsap.set(card, { 
        scale: 0.8,
        opacity: 0.6, 
      });
    });

    // Create sequential animation
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    cards.forEach((card, i) => {
      const targetX = viewportWidth / 2 - cardWidth / 2 - (cardWidth + gap) * i;

      tl.to(slider, {
        x: targetX,
        duration: 0.5
      });

      tl.to(card, {
        scale: 1,
        opacity: 1,
        zIndex: 10,
        duration: 0.3,
        ease: "back.out(1.7)"
      });

      // Restore previous card (if not first)
      if (i > 0) {
        tl.to(cards[i - 1], {
          scale: 0.8,
          opacity: 0.6,
          zIndex: 1,
          duration: 0.3
        }, "<"); // "<" syncs it with current step
      }

      // Optional: wait before moving to next
      tl.to({}, { duration: 0.5 });
    });

  }, []);

  return (
    <div className="wrapperH" ref={wrapperRef}>
      <div className="slider" ref={sliderRef}>
        {imagesList.map((image, index) => (
          <div className="card" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="slide-image" />
          </div>
        ))}
      </div>
    </div>
  );
}
