import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ExpandingVideo.css';

gsap.registerPlugin(ScrollTrigger);

export default function ExpandingVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const leftCardsRef = useRef(null);
  const rightCardsRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const leftCards = leftCardsRef.current;
    const rightCards = rightCardsRef.current;

    if (!container || !video || !leftCards || !rightCards) return;

    // Get individual cards
    const leftCardElements = gsap.utils.toArray('.left-card');
    const rightCardElements = gsap.utils.toArray('.right-card');

    // Set initial positions
    gsap.set(video, {
      scale: 1,
      transformOrigin: 'center center',
    });

    gsap.set(leftCardElements, {
      x: 0,
      opacity: 1,
    });

    gsap.set(rightCardElements, {
      x: 0,
      opacity: 1,
    });

    // Create timeline for scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate video expansion from 50vw to 80vw (scale 1.6)
    tl.to(video, {
      scale: 1.6,
      duration: 1,
      ease: 'power2.out',
    });

    // Animate left cards moving to left edge
    tl.to(leftCardElements, {
      x: -500,
      opacity: 0.2,
      stagger: 0.05,
      duration: 1,
      ease: 'power2.out',
    }, 0);

    // Animate right cards moving to right edge
    tl.to(rightCardElements, {
      x: 500,
      opacity: 0.2,
      stagger: 0.05,
      duration: 1,
      ease: 'power2.out',
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const cardData = [
    { id: 1, title: 'Card 1', image: 'https://picsum.photos/150/200?random=1' },
    { id: 2, title: 'Card 2', image: 'https://picsum.photos/150/200?random=2' },
    { id: 3, title: 'Card 3', image: 'https://picsum.photos/150/200?random=3' },
    { id: 4, title: 'Card 4', image: 'https://picsum.photos/150/200?random=4' },
  ];

  return (
    <div className="expanding-video-wrapper">
      <div ref={containerRef} className="expanding-video-container">
        
        {/* Left Cards */}
        <div ref={leftCardsRef} className="left-cards">
          {cardData.map((card, index) => (
            <div key={`left-${card.id}`} className="left-card card">
              <img 
                src={card.image} 
                alt={card.title}
                className="card-image"
              />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Video */}
        <video 
          ref={videoRef}
          src="https://www.w3schools.com/html/mov_bbb.mp4" 
          autoPlay 
          muted 
          loop 
          className="expanding-video"
        />

        {/* Right Cards */}
        <div ref={rightCardsRef} className="right-cards">
          {cardData.map((card, index) => (
            <div key={`right-${card.id}`} className="right-card card">
              <img 
                src={card.image} 
                alt={card.title}
                className="card-image"
              />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Background overlay for better contrast */}
        <div className="background-overlay"></div>
      </div>
      
      {/* Extra content to enable scrolling */}
      <div className="scroll-content"> 
      </div>
    </div>
  );
}