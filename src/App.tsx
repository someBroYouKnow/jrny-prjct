import "./App.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "./components/shared/navbar/Logo";
import { NavBar } from "./components/shared/navbar/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const updateUnderlineWidth = () => {
      const underline = document.querySelector(".r-underline");
      const slab = document.querySelector(".r-slab");
  
      if (underline && slab) {
        const windowWidth = window.innerWidth;
        const underlineRect = underline.getBoundingClientRect();
  
        // Set r-underline width dynamically
        const newWidth = windowWidth - 20 - underlineRect.left;
        underline.style.width = `${newWidth}px`;
  
        // Ensure r-slab starts exactly at the left of r-underline
        slab.style.left = "0px";
      }
    };
  
    updateUnderlineWidth();
    window.addEventListener("resize", updateUnderlineWidth);
  
    return () => {
      window.removeEventListener("resize", updateUnderlineWidth);
    };
  }, []);

  useEffect(() => {
    const slab = document.querySelector(".r-slab");
    const underline = document.querySelector(".r-underline");
    
    if (!slab || !underline) return;
    
    const maxMove = underline.offsetWidth - slab.offsetWidth;
    console.log(maxMove, {underline})
    
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