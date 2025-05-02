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
        duration: 0.5,
        onUpdate: () => {
          const currentX = gsap.getProperty(slider, "x") as number;
          cards.forEach((c, j) => {
            const cardCenter = (cardWidth + gap) * j + cardWidth / 2 + currentX;
            const distanceFromCenter = Math.abs(viewportWidth / 2 - cardCenter);
            const scale = gsap.utils.clamp(0.6, 1, 1 - distanceFromCenter / viewportWidth);
            const opacity = gsap.utils.clamp(0.4, 1, 1 - distanceFromCenter / (viewportWidth / 1.5));
            gsap.set(c, { scale, opacity });
          });
        }
      });
    
      // Keep zIndex logic for active card
      tl.to(card, {
        zIndex: 10,
        duration: 0.01
      });
    
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
