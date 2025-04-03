import Carasoul from "../components/Carasoul/Carasoul";
import Contact from "../components/Contact/Contact";
import PartnerShow from "../components/PartnerShow/PartnerShow";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./../css/landingpage.css";
import ShowReel from "../components/ShowReel/ShowReel";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  useEffect(() => {
    const updatePositions = () => {
      const underline = document.querySelector(".r-underline") as HTMLElement;
      const slab = document.querySelector(".r-slab") as HTMLElement;
      const verticalLine = document.querySelector(
        ".r-vertical-line"
      ) as HTMLElement;

      if (underline && slab && verticalLine) {
        const underlineRect = underline.getBoundingClientRect();
        const parentRect = underline.parentElement?.getBoundingClientRect();
        if (!parentRect) return;

        // Calculate width to reach window edge with 10px margin
        const rightEdgeMargin = 10;
        const newWidth =
          window.innerWidth - underlineRect.left - rightEdgeMargin;

        // Set underline width
        underline.style.width = `${newWidth}px`;

        // Position slab at start
        slab.style.left = "0px";

        // Position vertical line at end of underline (window edge - margin)
        // verticalLine.style.top = `${underlineRect.bottom - parentRect.top}px`;

        // Ensure elements stay within viewport
        const viewportRight = window.innerWidth - rightEdgeMargin;
        const underlineRightEdge = underlineRect.left + newWidth;

        if (underlineRightEdge > viewportRight) {
          underline.style.width = `${viewportRight - underlineRect.left}px`;
        }
      }
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
    };
  }, []);

  // Add this new useEffect for vertical line animation
  useEffect(() => {
    const verticalLine = document.querySelector(
      ".r-vertical-line"
    ) as HTMLElement;
    const verticalSlab = document.createElement("div");
    verticalSlab.classList.add("r-vertical-slab");

    if (verticalLine) {
      verticalLine.appendChild(verticalSlab);

      // Set initial position
      gsap.set(verticalSlab, {
        y: "-100%",
        height: "0%",
      });

      // Create scroll animation
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const maxScroll = 20;
        const progress = Math.min(scrollY / maxScroll, 1);

        gsap.to(verticalSlab, {
          y: `${-100 + progress * 100}%`,
          height: `${progress * 100}%`,
          ease: "power2.out",
          duration: 3,
          overwrite: true,
        });
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const slab = document.querySelector(".r-slab") as HTMLElement;
    const underline = document.querySelector(".r-underline") as HTMLElement;
    const verticalLine = document.querySelector(
      ".r-vertical-line"
    ) as HTMLElement;

    if (!slab || !underline || !verticalLine) return;

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
        duration: 3, // Faster response time
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
    <div className="landing-container">


      <div className="hero-container">
        <span className="r-vertical-line">
          <span className="r-vertical-slab"></span>
        </span>
        <div className="landing-show-reel">
        <ShowReel />
        </div>
        <div className="landing-text-container">
          <span className="part-of-span">Been a part of 20+ journeys</span>
          <h1 className="landing-title">
            Making Moments <br />
            <span className="landing-page-matter-text">
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
            <button className="button contact-btn">Contact Us</button>
            <button className="button about-btn">About Us</button>
          </div>
          <p className="landing-caption">
            We design immersive event experiences that captivate audiences and
            bring brands to life. From concept to execution, we craft seamless
            and engaging interactions that leave a lasting impact.
          </p>
        </div>
      </div>

      {/* Skewed Div */}
      <div className="skewed-div">
      </div>

      <div className="card-container">
        <span className="card-underline"></span>

        <div className="card-para-div">
          <span className="card-paragraph-start">JRNY Experential</span>
          <span className="card-paragraph">
            {" "}
            partners with you to create immersive events that engage, inspire,
            and connect. Together, we craft unforgettable experiences that leave
            a lasting impact.
          </span>
          <span className="card-para-div-crossline">
            <img src="/underline-cross.png" alt="" />
          </span>
        </div>

        <div className="cards-section">
          <div className="profile-card ">
            <img src="/jrny_example_profile_card.jpg" alt="" />
            <div className="profile-caption">
              <div className="heading">John Doe</div>
              <div className="description">Event Specialist & Designer</div>
            </div>
          </div>
          <div className="profile-card generic">
            <img src="jrny_example_profile_card.jpg" alt="" />
            <div className="profile-caption">
              <div className="heading">John Doe</div>
              <div className="description">Event Specialist & Designer</div>
            </div>
          </div>
          <div className="profile-card generic">
            <img src="jrny_example_profile_card.jpg" alt="" />
            <div className="profile-caption">
              <div className="heading">John Doe</div>
              <div className="description">Event Specialist & Designer</div>
            </div>
          </div>
          <div className="profile-card generic">
            <img src="jrny_example_profile_card.jpg" alt="" />
            <div className="profile-caption">
              <div className="heading">John Doe</div>
              <div className="description">Event Specialist & Designer</div>
            </div>
          </div>
        </div>
      </div>

      <div className="slanted-div"></div>

      <div className="journeys-div">
        <div className="testimonial-top">
          We have worked closely with over 20 companies, helping them design and
          deliver meaningful experiences.
        </div>

        <div className="partners-slideshow">
          <span className="partnered">Partnered with:</span>
          <PartnerShow />

          <div className="landing-line">
            <img src="landing_line.png" alt="" />
          </div>
        </div>

        <div className="testimonial-bottom">
          <span className="testimonial-span">We created </span>
          <span className="jrny-span">JRNY</span>{" "}
          <span className="testimonial-span">
            {" "}
            to enhance journeys, ensuring people cherish the moments that
            matter.
          </span>
        </div>

        <div className="carousol-container">
          <div className="carousol-logo">
            <img src="/jrny-testimonial-logo.png" />
            <span className="testimonial-logo-trusted">Trusted by:</span>
          </div>
          <div className="carousol">
            <div className="profile-section"></div>
            <div className="carousol-card-section"></div>
            <Carasoul />
          </div>
        </div>
      </div>

      <div className="slanted-div-rev"></div>

      <div className="penultimate-container">
        <RightChoice />
      </div>
      <div className="footer-container">
        <Contact />
      </div>
      </div>
    </>
  );
}

export const RightChoice = () => {
  return (
    <>
    <div className="right-choice-container">


      <h1 className="right-choice-h1">
        Why <span className="jrny-span">JRNY</span> is the Right Choice
      </h1>
      <p className="right-choice-p">
        JRNY is the right choice because we specialize in crafting unforgettable
        journeys that leave a lasting impact.
      </p>
      <button className="about-us-home button">About Us</button>

      <div className="features">
        <div className="feature-container">
          <span className="feature-title">INNOVATION</span>
          <div className="feature-caption">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>
        <div className="feature-container">
          <span className="feature-title">CUSTOMIZATION</span>
          <div className="feature-caption">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>
        <div className="feature-container">
          <span className="feature-title">EXCELLENCE</span>
          <div className="feature-caption">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation.
          </div>
        </div>
        <div className="feature-container">
          <span className="feature-title">GLOBAL REACH </span>
          <div className="feature-caption">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </div>
        </div>
      </div>
      <div className="testimonial-caption">
        <div className="caption-title">
          Begin creating journeys that leave a lasting impression, ensuring
          every moment is unforgettable.
        </div>
        <div className="contact-us-button button">Contact Us</div>
      </div>

      <div className="footer-line">
        <img src="landing_line.png" alt="" />
      </div>
      </div>
    </>
  );
};
