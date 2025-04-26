import { useRef, useLayoutEffect } from "react";
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
  '/landing-video-card.png'
  
]

gsap.registerPlugin(ScrollTrigger);
export default function HorizontalScrollSections() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(()=>{
    const slider = sliderRef.current;
    const wrapper = wrapperRef.current;
    if (!slider || !wrapper) return;


    const sections = gsap.utils.toArray<HTMLElement>('.card') as HTMLElement[];
    const totalWidth = sections.reduce((acc, section) => acc + section.offsetWidth, 0);
 
    console.log({sections, totalWidth})
    gsap.to(sections, {
      xPercent: -100 * (sections.length +1),
      ease: "none",
      scrollTrigger: {
        trigger: '.hero-container',
        pin: true,
        start:" top center",
        markers: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        pinSpacing: true,
        end:()=> "+=" + totalWidth,
      },
    });
  },[])

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
  )
}