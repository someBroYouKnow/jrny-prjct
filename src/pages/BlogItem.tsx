import { useParams } from 'react-router';
import '../css/blog-item.css'
import Contact from '../components/Contact/Contact';
import { BlogItemExample, BlogItemType } from '../constants/blogs';
import { BlogHero } from './Blogs';


const Blog: BlogItemType =BlogItemExample; 

export default function BlogItem() {
  const { blogId } = useParams();
  
  return (
    <>
    <div className="blog-item-container">
        <div className="blog-content-box">
            <div className="blog-content-title">
                {Blog.title}
            </div>
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
