import "./App.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "./components/shared/navbar/Logo";
import { NavBar } from "./components/shared/navbar/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".r-underline",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      }
    });
    
    tl.to(".r-slab", {
      x: "100%",
      ease: "power2.inOut"
    });
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