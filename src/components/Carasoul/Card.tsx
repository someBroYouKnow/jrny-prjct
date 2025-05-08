import { useRef    } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";



interface CardProps {
    profileName: string;
    profileDesignation: string;
    compliment: string;
    active: boolean;
    onHover?: () => void;
  }

  
  const Card = ({
    profileName,
    profileDesignation,
    compliment,
    active,
  }: CardProps) => {
    const complimentRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
    useGSAP(() => {
      const node = complimentRef.current;
      if (!node) return;
  
      const rightLine = node.querySelector(".line-right") as HTMLSpanElement;
      const leftLine = node.querySelector(".line-left") as HTMLSpanElement;
  
      const { width, height } = node.getBoundingClientRect();
  
      timelineRef.current = gsap.timeline({ paused: true });
  
      timelineRef.current
        // Right line: grow width to full, then down
        .to(rightLine, {
          width,
          duration: 0.3,
          ease: "power1.out",
        })
        .to(rightLine, {
          height: height,
          duration: 0.3,
          ease: "power1.out",
        }, "<")
  
        // Left line: down, then full width
        .to(leftLine, {
          height: height,
          duration: 0.3,
          ease: "power1.out",
        }, "<0.15")
        .to(leftLine, {
          width,
          duration: 0.3,
          ease: "power1.out",
        }, "<");
    }, []);
  
    const handleCardEnter = () => {
      timelineRef.current?.play();
    };
  
    const handleCardLeave = () => {
      timelineRef.current?.reverse();
    };
  
    return (
      <div className="profile-card-container">
        <div
          className={`compliment ${active ? "compliment-active" : ""}`}
          ref={complimentRef}
          onMouseEnter={handleCardEnter}
          onMouseLeave={handleCardLeave}
        >
          <span className="compliment-span">{compliment}</span>
          <span className="line line-right" />
          <span className="line line-left" />
        </div>
        <div className="profile-container">
          <div className="profile-infor">
            <span className="profile-name">{profileName}</span>
            <span className="designation">{profileDesignation}</span>
          </div>
        </div>
      </div>
    );
  };
  

export default Card;