import { useState } from "react";
import Contact from "../components/Contact/Contact";
import PartnerShow from "../components/PartnerShow/PartnerShow";
import "./../css/portfolio.css";


export default function Portfolio() {

  return (
    <>
      <div className="portfolio-container">
        < PortfolioContent />
      </div>
    </>
  );
}

export const PortfolioContent = ()=>{
  return (
    <>
    <div className="portfolio-landing-container">

<div className="portfolio-top-section">
  <div className="portfolio-our-projects">
    <div className="our-projects-heading">
      <span className="our-projects-span">
        Our <span className="jrny-span">Projects</span>
      </span>
    </div>
    <p className="our-projects-p">
      We create immersive and impactful digital experiences, from
      virtual conferences to interactive brand activations. Our work
      transforms ideas into unforgettable moments that engage and
      inspire audiences. Explore our portfolio to see the journeys
      we’ve crafted.
    </p>
  </div>
  <div className="portfolio-partner-show">
    <PartnerShow />
  </div>
</div>
<PortfolioMiddleList />
</div>

<div className="portfolio-tags">
<span className="tags">Virtual Networking</span>
<span className="tags"> Event Branding and Digital Identity</span>
<span className="tags">Event Analytics</span>
<span className="tags"></span>
<span className="tags"></span>
<span className="tags"></span>
</div>
<div className="portfolio-contact">
<Contact />
</div>
    </>
  )
}

interface PortfolioTileProps{
  videoLink:string,
  thumbnail?:string,
  tileTitle: string
}

const PortfolioTile = ({videoLink, thumbnail, tileTitle}:PortfolioTileProps) =>{
  if(!thumbnail){

  }

  return (
    <div className="portfolio-tile-box">
      <div className="tile-thumbnail">
        <img src={thumbnail ?? '/landing-video-card.png'} alt="" />
      </div>
      <div className="tile-title">
        {tileTitle}
      </div>
    </div>
  )
}


export const PortfolioMiddleList = () =>{
  const sidebarTabs = ['All Categories', 'Experiential Marketing', 'Content Creation', 'Multimedia Production', 'Experience Design', 'Articles'];
  const [selectedTab,setSelectedTab] = useState(0);


  return (
    <div className="portfolio-middle-list">
    <div className="portfolio-list-sidebar">
      <div className="portfolio-list-our-jrny">
        Our <span className="jrny-span">JRNY</span>
      </div>
      <div className="portfolio-list-sidebar-elements">
        <ul>
          { sidebarTabs.map((tab:string, index:number)=>
            <li 
            key={tab}
            onClick={
              ()=>{
                setSelectedTab(index);
              }
            }
            className={`portfolio-list-sidebar-element ${
              selectedTab === index ? 'portfolio-sidebar-element-active' : ''
            }`}
          >                    <button className="sidebar-list-tab">
              {" "}
              {tab}
            </button>
          </li>
          )  
        }
        </ul>
      </div>
      <div className="portfolio-reels"></div>
    </div>
    <div className="portfolio-tile-container">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="portfolio-tile">
          <PortfolioTile key={i + 1} tileTitle={`dolor sit`} videoLink={'http'} />
        </div>
      ))}
    </div>
  </div>
  )
}