
import '../css/portfolio-item.css';
import { useParams } from 'react-router'; 
import {   PortfolioMiddleList } from './Portfolio';
import Footer from '../components/shared/footer/Footer';

export default function PortfolioItem() {
  const { portfolioId } = useParams();
  
  return (
    <>
      <div className="portfolio-container">
        <div className="portfolio-item-container">
            <PortfolioItemContent id={portfolioId ?? ''} />
        </div>

        <div className="portfolio-item-middle-list">
            <span className="might-like">Project <span className="jrny-span"> you might Like!  </span></span>
      <PortfolioMiddleList />
        </div>
      <Footer/>
    </div>   
    </>
 
  );
}

interface PortfolioItemProps {
    id:string;
    videoLink?: string;
}

const PortfolioItemContent = ({id, videoLink}:PortfolioItemProps) =>{
    return (
        <div className="project-box">
            <div className="project-header">
            <PortfolioItemHeader/>
                <div className="project-name">
                    Project <span className='jrny-span'>Name</span>
                </div>
                <div className="project-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>

            </div>
            { videoLink && 
                <div className="project-video-container">
                <video src=""></video>
            </div>}

            <div className="project-second-box">
                <div className="project-second-header">
                    More about the <span className='jrny-span'>Project</span>
                </div>
                <div className="project-second-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
            </div>
        </div>
    )
}

const PortfolioItemHeader = () =>{
    const event = new Date(Date.now());
    return (
        <div className="portfolio-item-header-container">
            <div className="item-date-company">
                <span className="item-date">
                    { event.toISOString().split('T')?.[0] }
                </span>
                <span className="item-company">
                    JRNY
                </span>
            </div>
            <div className="share-on">
                <ShareOn/>
            </div>
        </div>
    )
}

export const ShareOn = ()=>{
    return (
        <>
        <div className="share-on-box">
            <span className="share-on-span">Share On</span>
            <div className="share-icons">
                <ShareImg src='/favicon/whatsapp.svg' / >
                <ShareImg src='/favicon/linkedin.svg' / >
                <ShareImg src='/favicon/facebook.svg' / >
            </div>
        </div>
        </>
    )
}

const ShareImg = ({src}:{src:string})=>{
    return (
        <button>
            <img src={`${src}`} alt="" />
        </button>
    )
}