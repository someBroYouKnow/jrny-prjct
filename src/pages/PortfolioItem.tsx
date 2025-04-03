
import '../css/portfolio-item.css';
import { useParams } from 'react-router'; 
import { PortfolioContent } from './Portfolio';

export default function PortfolioItem() {
  const { portfolioId } = useParams();
  
  return (
    <>
      <div className="portfolio-container">
        <div className="portfolio-item-container">
            <PortfolioItemContent id={portfolioId} />
        </div>

      <PortfolioContent />
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