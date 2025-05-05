import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Button = ({children}:React.PropsWithChildren) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const eject1Ref = useRef<HTMLDivElement>(null);
  const eject2Ref = useRef<HTMLDivElement>(null);
  const verticalRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isHovered) {
      gsap.fromTo(eject1Ref.current,
        { top: "-2px", left: "-2px", opacity: 1 },
        { top: "-6px", left: "-6px", duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(eject2Ref.current,
        { top: "0px", left: "-6px", opacity: 1 },
        { top: "-4px", left: "-10px", duration: 0.3, ease: "power2.out" }
      );
      gsap.to(verticalRef.current, {
        height: "100%", duration: 0.3, ease: "power2.out"
      });
      gsap.to(horizontalRef.current, {
        width: "100%", duration: 0.3, ease: "power2.out"
      });
      gsap.to(textRef.current, {
        x: -10, duration: 0.3, ease: "power2.out"
      });
      gsap.to(arrowRef.current, {
        x: 10, duration: 0.3, ease: "power2.out"
      });
    } else {
      gsap.to([eject1Ref.current, eject2Ref.current], {
        opacity: 0, duration: 0.2, ease: "power2.in"
      });
      gsap.to(verticalRef.current, {
        height: "10px", duration: 0.3, ease: "power2.in"
      });
      gsap.to(horizontalRef.current, {
        width: "10px", duration: 0.3, ease: "power2.in"
      });
      gsap.to(textRef.current, {
        x: 0, duration: 0.3, ease: "power2.in"
      });
      gsap.to(arrowRef.current, {
        x: 0, duration: 0.3, ease: "power2.in"
      });
    }
  }, [isHovered]);

  return (
    <button 
      className={`button  `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ejected rectangles */}
      <div ref={eject1Ref} className="absolute bg-white w-1 h-1" style={{ opacity: 0 }} />
      <div ref={eject2Ref} className="absolute bg-white w-1 h-1" style={{ opacity: 0 }} />

      {/* Vertical line */}
      <div
        ref={verticalRef}
        className="absolute bg-white w-0.5"
        style={{ top: "-4px", left: "-3px", height: "10px" }}
      />

      {/* Horizontal line */}
      <div
        ref={horizontalRef}
        className="absolute bg-white h-0.5"
        style={{ top: "0px", left: "-7px", width: "10px" }}
      />

      {/* Text and arrow */}
      <div className="flex items-center justify-center w-full relative">
        {children}
        <img
          ref={arrowRef}
          src="/right-arrow.png"
          className="ml-1"
          alt="right arrow"
        />
      </div>
    </button>
  );
};

export default Button;
