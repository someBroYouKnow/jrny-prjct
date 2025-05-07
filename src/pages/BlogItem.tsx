
import '../css/blog-item.css' 
import { BlogItemExample, BlogItemType } from '../constants/blogs';
import { BlogHero } from './Blogs';
import ShareOn from '../components/ShareOn/ShareOn';
import Footer from '../components/shared/footer/Footer';


const HighlightedSentence = ({ text }:{text:string}) => {
  const words = text.trim().split(' ');
  const lastTwo = words.slice(-2).join(' ');
  const rest = words.slice(0, -2).join(' ');

  return (
    <p className="sentance">
      {rest} <span className="highlight">{lastTwo}</span>
    </p>
  );
};


const Blog: BlogItemType =BlogItemExample; 

export default function BlogItem() { 
  
  return (
    <>
    <div className="blog-item-container">
        <div className="blog-content-box">
          <section className="blog-item-header">
            <div className="blog-content-title">
                <HighlightedSentence text={Blog.title} />
                <div className="blog-item-caption">
              {Blog.caption1}
            </div>
            </div>
            
            <section className="blog-item-header-utils">
              <div className="blog-item-company-minute">
                <div className="blog-item-company-name">2025 - JRNY</div>
                <div className="blog-item-minute"> 5 minute read</div>
              </div>
              <div className="share-on">
                <ShareOn/>
            </div>
            </section>
          </section>
            <div className="blog-content-area">
                {Blog.content}
            </div>
        </div>
    <div className="blog-item-bottom">

    <BlogHero route='derived'/>
    <Footer/>
    </div>
    </div>
    </>
  )
}
