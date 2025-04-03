import Contact from "../components/Contact/Contact";
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
        <Contact />
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

          <div className="blog-tile-container">
            {BlogItemArray.map((BlogItem: BlogItemType) => (
              <div className="blog-tile">
                <img src={BlogItem.thumbnail ?? ''} alt={BlogItem.title} />
                <div className="blog-caption">
                  <div className="blog-info">

                  <div className="blog-tile-heading">{BlogItem.title}</div>
                  <div className="blog-tile-description-box">
                  <div className="blog-tile-description">{BlogItem.caption1}</div>
                  <div className="blog-tile-description">{BlogItem.caption2}</div>
                  </div>
                  </div>
                  <div className="blog-link">
                    <button className="go-to-blog ">

                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  )
}
