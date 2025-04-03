import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./partnerShow.css";

gsap.registerPlugin(ScrollTrigger);
export default function PartnerShow() {
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
  let xPercent = 0;
  let direction = 1;

  useEffect(() => {
    requestAnimationFrame(animation);
  }, []);

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
      direction= direction===-1?1:-1;
    }
    if (xPercent > 0) {
        xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += 0.15 * direction;
    requestAnimationFrame(animation);
  };

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
