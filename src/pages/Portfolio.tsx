import { useState } from "react";
import Contact from "../components/Contact/Contact";
import PartnerShow from "../components/PartnerShow/PartnerShow";
import "./../css/portfolio.css";
import FooterLine from "../components/shared/FooterLine";
import Footer from "../components/shared/Footer";


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
        Our <span className="jrny-span">Portfolio</span>
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

 
<Footer/>
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


  return (
    <div className="portfolio-middle-list"> 
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