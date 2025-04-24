import Carasoul from "../components/Carasoul/Carasoul";
import Contact from "../components/Contact/Contact";
import PartnerShow from "../components/PartnerShow/PartnerShow";
import { useRef } from "react"; 
import "./../css/landingpage.css";
import ShowReel from "../components/ShowReel/ShowReel";
import AnimatedPathWithSlab from "../components/LineSvg/LineSvg";
import HorizontalScrollSlider from "../components/HorizontalScroll/HorizontalScroll";

 

export default function LandingPage() {

  return (
    <>
    <div className="landing-container">

    <section className="landing-carousol">
      <HorizontalScrollSlider />
    </section>

    <section className="svg-content">
      <div className="content-svg">
        
    <AnimatedPathWithSlab/>
      </div>

    </section>

      <div className="hero-container"> 
        <div className="landing-show-reel">
        <ShowReel />
        </div>
        <div className="landing-text-container">
          <span className="part-of-span">Been a part of 20+ journeys</span>
          <h1 className="landing-title">
            Making Moments <br />
            <span className="landing-page-matter-text">
              MATTER
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

 

      <div className="card-container">
        {/* <span className="card-underline"></span> */}

        <div className="card-para-div">
          <span className="card-paragraph-start">JRNY Experential</span>
          <span className="card-paragraph">
            {" "}
            partners with you to create immersive events that engage, inspire,
            and connect. Together, we craft unforgettable experiences that leave
            a lasting impact.
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

 

      <div className="journeys-div">

        {/* <span className="r-vertical-line-journeys-div">
          <span className="r-vertical-line-journeys-div-slab"></span>
        </span> */}
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

 

      <div className="penultimate-container">
        {/* <span className="right-choice-line">
          <span className="right-choice-line-slab"></span>
        </span> */}
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
