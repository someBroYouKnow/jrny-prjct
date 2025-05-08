import "./carasoul.css";
import { useState } from "react";

export default function Carasoul() {
    const [active,setActive] = useState(false);
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
        {
          profilePic: "carousol_john.png",
          profileName: "Emily Brown",
          profileDesignation: "CTO, DEF",
          compliment:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          profilePic: "carousol_john.png",
          profileName: "Emily Brown",
          profileDesignation: "CTO, DEF",
          compliment:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ];
      return (
        <div className='carousel-component'>
          <div className="carousel-slider">
            <div className="carousel-container">
              {
              cards.map((card,index:number)=>(
                <Card key={index} profileName={card.profileName} profileDesignation={card.profileDesignation}
                      compliment={card.compliment} active={active} />
              ))
              }
            </div>
          </div>
        </div>
      );
    }

    
   
interface CardProps { 
  profileName: string;
  profileDesignation: string;
  compliment: string; 
  active:boolean;
}

const Card = ({ 
  profileName,
  profileDesignation,
  compliment ,
  active
}: CardProps) => {
  return (
    <div className={`profile-card-container`}>
      <div className={` compliment ${active ? 'compliment-active':''}`}> <span className="compliment-span">{compliment}</span></div>
      <div className="profile-container"> 
        <div className="profile-infor">
          <span className="profile-name">{profileName}</span>
          <span className="designation">{profileDesignation}</span>
        </div>
      </div>
    </div>
  );
};
