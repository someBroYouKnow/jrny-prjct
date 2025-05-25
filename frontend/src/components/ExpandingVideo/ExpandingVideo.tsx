import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './expandingvideo.css';

gsap.registerPlugin(ScrollTrigger);

export default function ExpandingVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const leftCardsRef = useRef(null);
  const rightCardsRef = useRef(null);

  useGSAP(() => {
    const video = videoRef.current;
    const leftCards = gsap.utils.toArray('.left-card');
    const rightCards = gsap.utils.toArray('.right-card');

    if (!video || !leftCards.length || !rightCards.length) return;

    // Set initial styles
    gsap.set(video, {
      width: '45vw',
      height: 'auto',
    });

    gsap.set(leftCards, { 
      opacity: 1,
    });

    gsap.set(rightCards, { 
      opacity: 1,
    });

    // Create ScrollTrigger animation
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom 10%",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Animate video expansion
        gsap.to(video, {
          width: `${45 + (35 * progress)}vw`, // 45vw to 80vw
          duration: 0.1,
          y: `${50 * progress}px`, // Move up as it expands
        });

 
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: containerRef });

  const leftCardData = [
    { id: 1, title: 'Card 1', image: 'https://picsum.photos/150/200?random=1' },
    { id: 2, title: 'Card 2', image: 'https://picsum.photos/150/200?random=2' },
  ];

  const rightCardData = [
    { id: 3, title: 'Card 3', image: 'https://picsum.photos/150/200?random=3' },
    { id: 4, title: 'Card 4', image: 'https://picsum.photos/150/200?random=4' },
  ];

  return (
    <div className="expanding-video-wrapper" ref={containerRef}>
      <div className="expanding-video-container">
        {/* Left Cards */}
        <div className="left-cards">
          {leftCardData.map((card) => (
            <div key={`left-${card.id}`} className="left-card card">
              <img src={card.image} alt={card.title} className="card-image" />
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
        <div className="right-cards">
          {rightCardData.map((card) => (
            <div key={`right-${card.id}`} className="right-card card">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}