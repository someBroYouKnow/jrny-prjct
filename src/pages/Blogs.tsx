import Contact from "../components/Contact/Contact";
import Footer from "../components/shared/footer/Footer";
import { BlogItemExample, BlogItemType } from "../constants/blogs";
import "./../css/blog.css";

interface BlogsProps {
  route?: "base" | "derived";
}


const BlogItemArray = Array(12).fill(BlogItemExample);

export default function Blogs({ route = "base" }: BlogsProps) {
  return (
    <>
      <div className="blog-container">
        <BlogHero route={route} />
        <Footer />
      </div>
    </>
  );
}

export const BlogHero = ({route='base'}:BlogsProps)=>{
  return (
    <>
        <div className="blog-hero-container">
          <div className="blog-heading">
            <div className="blog-heading-title">
              {`${route === "base" ? "" : "More "}`}{" "}
              <span className="jrny-span">Blogs</span>
            </div>
            <div className="blog-heading-description">
              Welcome to the Zero Design Studio blog, a space where creativity
              takes center stage, innovation sets the rhythm, and insights
              illuminate the path forward. In this expansive exploration, we
              dive deep into the multifaceted realms of our industry knowledge,
              sharing insights, trends, and expertise across all categories that
              define our creative cosmos: Multimedia Production, Event
              Experience, Digital Art and New Media, and Entertainment
              Technology.
            </div>
          </div>

          <BlogTileContainer />
        </div>
    </>
  )
}

export const BlogTileContainer = ()=>{
  return (
    <>
              <div className="blog-tile-container">
            {BlogItemArray.map((BlogItem: BlogItemType) => (
              <BlogTile thumbnail = {BlogItem.thumbnail}
                        title = {BlogItem.title}
                        caption1={BlogItem.caption1}
                        caption2={BlogItem.caption2}
                        />
            ))}
          </div>
    </>
  )
}
 
interface BlogItemProps {
  thumbnail?: string;
  title: string;
  caption1: string;
  caption2: string;
}

export const BlogTile = ({ thumbnail, title, caption1, caption2 }: BlogItemProps) => {
  return (
    <div className="blog-tile">
      <div className="blog-info">
        <div className="blog-tile-heading">{title}</div>
        <div className="blog-tile-description">{caption1}</div>
        <div className="blog-tile-description">{caption2}</div>
        <button className="go-to-blog">Read More</button>
      </div>
      <div className="blog-image">
        <img src={thumbnail} alt={title} />
      </div>
    </div>
  );
}; 
