import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./partnerShow.css";

gsap.registerPlugin(ScrollTrigger);
export function PartnerShow() {
  return (
    <div className="partner-show-container">
    <div className="partner-show">  
      <div className="shadow-left"></div>
      <div className="partner-rows">

      <PartnerRow />
      <PartnerRow />
      <PartnerRow />
      </div>

      <div className="shadow-right"></div>
      </div>
    </div>
  );
}

function PartnerRow() {
    const slider = useRef(null);
    const firstText = useRef(null);
    const secondText = useRef(null);
  
    const [xPercent, setXPercent] = useState(-100);
    const [direction, setDirection] = useState(-1); // Default moving left
  
    useEffect(() => {
      const animate = () => {
        setXPercent((prevX) => {
          let newX = prevX + 0.15 * direction;
  
          if (newX <= -100){
            setDirection(direction===-1?1:-1)

            return 0;}  // Reset when it reaches -100%
          if (newX > 0) {
              setDirection(direction===-1?1:-1)
            return -100;
        }   // Ensure loop continues
  
          return newX;
        });
  
        requestAnimationFrame(animate);
      };
  
      requestAnimationFrame(animate);
    }, []); // Re-run if direction changes
  
    useEffect(() => {
      if(true ){

          gsap.set(firstText.current, { xPercent });
          gsap.set(secondText.current, { xPercent });
        }  
    }, [document.querySelector(".firstText")]);  
  
    return (
      <div ref={slider} className="partner-row">
        <p ref={firstText} className="partner-row-first">
          <img src="partner-icon.png" alt="Partner" />
          <img src="partner-icon.png" alt="Partner" />
          <img src="partner-icon.png" alt="Partner" />
          <img src="partner-icon.png" alt="Partner" />
          <img src="partner-icon.png" alt="Partner" />
          <img src="partner-icon.png" alt="Partner" />
        </p>
  
        <p ref={secondText} className="partner-row-second">
          <img src="partner-icon.png" alt="Partner" />
          <img src="partner-icon.png" alt="Partner" />
          <img src="partner-icon.png" alt="Partner" />
          <img src="partner-icon.png" alt="Partner" />
          <img src="partner-icon.png" alt="Partner" />
          <img src="partner-icon.png" alt="Partner" />
        </p>
      </div>
    );
  }
