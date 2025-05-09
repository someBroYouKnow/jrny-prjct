import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  classList: string;
};

const Button = ({ children, classList }: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const topBorderRef = useRef<HTMLSpanElement>(null);
  const leftBorderRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const topLine = topBorderRef.current;
    const leftLine = leftBorderRef.current;

    if (!button || !topLine || !leftLine) return;

    const expandTimeline = gsap.timeline({ paused: true });

    expandTimeline.to(topLine, {
      width: '100%',
      duration: 0.5,
      ease: 'power2.out',
    }).to(
      leftLine,
      {
        height: '100%',
        duration: 0.5,
        ease: 'power2.out',
      },
      '<' // sync
    );

    const fullExpand = () => {
      gsap.to(topLine, {
        width: '100%',
        duration: 1,
        ease: 'power2.inOut',
      });
      gsap.to(leftLine, {
        height: '100%',
        duration: 1,
        ease: 'power2.inOut',
      });
    };

    const resetLines = () => {
      gsap.to([topLine, leftLine], {
        width: 0,
        height: 0,
        duration: 0.3,
        ease: 'power1.inOut',
      });
    };

    button.addEventListener('mouseenter', () => expandTimeline.play());
    button.addEventListener('mouseleave', resetLines);
    button.addEventListener('mousedown', fullExpand);
    button.addEventListener('mouseup', () => expandTimeline.play(0));

    return () => {
      button.removeEventListener('mouseenter', () => expandTimeline.play());
      button.removeEventListener('mouseleave', resetLines);
      button.removeEventListener('mousedown', fullExpand);
      button.removeEventListener('mouseup', () => expandTimeline.play(0));
    };
  }, []);

  return (
    <>
      <button ref={buttonRef} className={`custom-button ${classList}`}>
        {/* Border lines (below content using z-index) */}
        <span ref={topBorderRef} className="border-line top-line"></span>
        <span ref={leftBorderRef} className="border-line left-line"></span>

        {/* Actual content above border lines */}
        <span className="button-content">{children}</span>
      </button>

    </>
  );
};

export default Button;
