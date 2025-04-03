import "./carasoul.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useState } from "react";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Carasoul() {
  const [activeIndex, setActiveIndex] = useState(0)

    const cards = [
        {
          profilePic: "/carousol_john.png",
          profileName: "John Doe",
          profileDesignation: "Director, ABC",
          compliment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          profilePic: "/carousol_john.png",
          profileName: "Jane Smith",
          profileDesignation: "Manager, XYZ",
          compliment:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          profilePic: "carousol_john.png",
          profileName: "Mike Johnson",
          profileDesignation: "CEO, LMN",
          compliment:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
          profilePic: "carousol_john.png",
          profileName: "Emily Brown",
          profileDesignation: "CTO, DEF",
          compliment:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ];

      const images = cards.map(card=>(
        <span className="carousol-img-box">
            <img src={`${card.profilePic}`} alt="picture" />
        </span>
      ))

      
      const CustomDot=({
        index,
        onClick,
        active
      }:{index:any, onClick:any, active:any})=>{
        return (
            <button
            onClick={e=>{
                onClick();
                e.preventDefault();
            }}
            className={`carousol-img ${active? 'carousol-img--active':''}`}
            >
                {React.Children.toArray(images)[index]}

            </button>
        )
      }

      

      const changeSlide = (previousSlide: number, currentSlide: number, dataSize: number) => {
        let activeSlide = 0
        // right arrow
        if (previousSlide < currentSlide) activeSlide = currentSlide - 2 === dataSize ? 0 : currentSlide - 2
        // left arrow
        else activeSlide = currentSlide + (currentSlide <= dataSize && currentSlide >= 2 ? -2 : dataSize - 2);
        console.log({currentSlide, previousSlide, activeSlide});
        setActiveIndex(activeSlide)
    }

 
 

      return (
        <div className='carousel-component'>
        
      <Carousel
          showDots 
          customDot={<CustomDot />}
          renderDotsOutside={true}
          focusOnSelect={true}
            responsive={responsive}  
            centerMode={true}
            infinite={true} 
            containerClass="carousel-container"
            afterChange={(previousSlide, { currentSlide }) => changeSlide(previousSlide, currentSlide, cards.length)}
           >
            {cards.map((card, index) => (
              <Card
                key={index} 
                profilePic={card.profilePic}
                profileName={card.profileName}
                profileDesignation={card.profileDesignation}
                compliment={card.compliment}
                active={((activeIndex+cards.length-1)%cards.length)===index}
              />
            ))}
          </Carousel>
        </div>
      );
    }

    
   
interface CardProps {
  profilePic: string;
  profileName: string;
  profileDesignation: string;
  compliment: string; 
  active:boolean;
}

const Card = ({
  profilePic,
  profileName,
  profileDesignation,
  compliment ,
  active
}: CardProps) => {
  return (
    <div className={`profile-card-container`}>
      <div className="profile-container">
        <img src={`${profilePic}`} alt="Profile picture" />
        <div className="profile-infor">
          <span className="profile-name">{profileName}</span>
          <span className="designation">{profileDesignation}</span>
        </div>
      </div>
      <div className={`compliment ${active ? 'compliment-active':''}`}>{compliment}</div>
    </div>
  );
};
