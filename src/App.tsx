import "./App.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "./components/shared/navbar/Logo";
import { NavBar } from "./components/shared/navbar/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const updatePositions = () => {
      const underline = document.querySelector(".r-underline") as HTMLElement;
      const slab = document.querySelector(".r-slab") as HTMLElement;
      const verticalLine = document.querySelector(".r-vertical-line") as HTMLElement;
  
      if (underline && slab && verticalLine) {
        const underlineRect = underline.getBoundingClientRect();
        const parentRect = underline.parentElement?.getBoundingClientRect();
        if (!parentRect) return;
  
        // Calculate the exact width of r-underline
        const newWidth = window.innerWidth - 15 - underlineRect.left;
        underline.style.width = `${newWidth}px`;
  
        // Ensure r-slab starts exactly at the left of r-underline
        slab.style.left = "0px";
  
        // Position vertical line at the end of r-underline
        verticalLine.style.left = `${newWidth+ 10}px`;
        verticalLine.style.top = `${underlineRect.bottom - parentRect.top}px`; // Align precisely
      }
    };
  
    updatePositions();
    window.addEventListener("resize", updatePositions);
  
    return () => {
      window.removeEventListener("resize", updatePositions);
    };
  }, []);

  useEffect(() => {
    const slab = document.querySelector(".r-slab") as HTMLElement;
    const underline = document.querySelector(".r-underline") as HTMLElement;
    
    if (!slab || !underline) return;
    
    const maxMove = underline.offsetWidth - slab.offsetWidth;
    console.log(maxMove, { underline });
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 20; // Even a small scroll makes it move fully
      const progress = Math.min(scrollY / maxScroll, 1);
      const newX = progress * maxMove;
      
      gsap.to(".r-slab", {
        x: newX,
        ease: "power2.out",
        duration: 0.1, // Faster response time
        overwrite: true,
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="header">
        <Logo />
        <div className="navbar-div">
          <NavBar />
        </div>
      </div>

      <div className="container">
        <div className="hero-container">
          <div className="video-card">SHOW Reel</div>
          <div className="landing-text-container">
            <span className="part-of-span">Been a part of 20+ journeys</span>
            <h1 className="landing-title">
              Making Moments <br />
              <span className='landing-page-matter-text'>
                MATTE
                <span className="r-container">
                  R
                  <span className="r-underline">
                    <span className="r-slab"></span>
                  </span>
                  <span className="r-vertical-line"></span>
                </span>
              </span>
            </h1>
            <div className="landing-buttons">
              <button>Contact Us</button>
              <button>About Us</button>
            </div>
            <p className="landing-caption">
              We design immersive event experiences that captivate audiences and bring brands to life. From concept to execution, we craft seamless and engaging interactions that leave a lasting impact.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
