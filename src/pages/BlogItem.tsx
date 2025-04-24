import { useParams } from 'react-router';
import '../css/blog-item.css'
import Contact from '../components/Contact/Contact';
import { BlogItemExample, BlogItemType } from '../constants/blogs';
import { BlogHero } from './Blogs';
import { ShareOn } from './PortfolioItem';


const Blog: BlogItemType =BlogItemExample; 

export default function BlogItem() {
  const { blogId } = useParams();
  
  return (
    <>
    <div className="blog-item-container">
        <div className="blog-content-box">
          <section className="blog-item-header">
            <div className="blog-content-title">
                {Blog.title}
            </div>
            <div className="blog-item-caption">
              {Blog.caption1}
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

    <BlogHero route='derived'/>
    <Contact/>
    </div>
    </>
  )
}
