
import '../css/portfolio.css';
import Contact from "../components/Contact/Contact";
import { useParams } from 'react-router';
import { PortfolioMiddleList } from './Portfolio';

export default function PortfolioItem() {
  const { portfolioId } = useParams();
  
  return (
    <div className="portfolio-container">
      <div className="portfolio-landing-container">
        <div className="portfolio-item-content">
          <h1>Portfolio Item {portfolioId}</h1>
          {/* Add your detailed content here */}
        </div>
       <PortfolioMiddleList />      
      </div>


      <div className="portfolio-contact">
        <Contact />
      </div>
    </div>
  );
}